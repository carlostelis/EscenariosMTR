// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function colapsarResultado(trigger, clase) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo') || trigger.classList.contains('vacio')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = !trigger.desplegado;

    // Busca los contenedores con la clase asociada
    // Y los hace visibles
    let clase_cont = `CONT-${clase}`;
    for (let contenedor of divs_res) {
        if (contenedor.classList.contains(clase_cont)) {
            if (iconoAbajo) {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        contenedor.classList.remove('invisible');
                        contenedor.classList.add('visible');
                    }
                }
            }
            // la oculta
            else {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        contenedor.classList.add('invisible');
                        contenedor.classList.remove('visible');
                    }
                }
            }
        }
    }

    // Ivierte el incono de los colapsos con el mismo id
    for (let col of colapsos_res) {
        if (col.id === trigger.id) {
            // Cambia el icono
            for (let nodoA of col.childNodes) {
                // div hijo
                if (nodoA.nodeName.toLowerCase() === 'div') {
                    for (let nodoB of nodoA.childNodes) {
                        if (nodoB.nodeName.toLowerCase() === 'span') {
                            for (let nodoC of nodoB.childNodes) {
                                if (nodoC.nodeName.toLowerCase() === 'i') {
                                    if (!iconoAbajo) {
                                        nodoC.classList.add('fa-caret-square-o-down');
                                        nodoC.classList.remove('fa-caret-square-o-up');
                                    } else {
                                        nodoC.classList.remove('fa-caret-square-o-down');
                                        nodoC.classList.add('fa-caret-square-o-up');
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }

            // Marca el div como colapsado
            col.desplegado = iconoAbajo;
        }
    }
}

function cargarResultado(id, marco) {
    marcoSeleccionado = marco;

    // Busca el escenario con el id y genera una ruta
    let ruta;
    ipcRenderer.send('escenario-resultados:leer', ruta, SESION.algoritmo);
}

function vaciarTablasResulados() {
    // Tablas del dom
    for (let tabla of tablas_res) {
        if (tabla.classList.contains(marcoSeleccionado)) {
            for (let nodo of tabla.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'tbody') {
                    tabla.removeChild(nodo);
                    break;
                }
            }
        }
    }
}

function desactivarColapsosResultados() {
    // Reestablece los colapsos
    for (let col of colapsos_res) {
        if (col.classList.contains(marcoSeleccionado))
        col.classList.add('inactivo');
    }
}

function colapsarTodasResultados(flagClass) {
    for (let col of colapsos_res) {
        let flagInactivo = col.classList.contains('inactivo');
        let flagVacio = col.classList.contains('vacio');

        // Forzar inactivos y vacio
        if (typeof flagClass !== 'undefined' && flagClass === true) {
            col.classList.remove('inactivo');
            col.classList.remove('vacio');
        }

        // Busca su tabla
        // Si existe la propiedad y esta desplegado, activa su funcion
        if (typeof col.desplegado !== 'undefined' && col.desplegado === true) {
            col.onclick();
        }

        if (typeof flagClass !== 'undefined' && flagClass === true) {
            if (flagInactivo) {
                col.classList.add('inactivo');
            }
            if (flagVacio) {
                col.classList.add('vacio');
            }
        }
    }
}

ipcRenderer.on('escenario_resultados:leido', (event, obj) => {
    console.log('Recibe archivos:', obj.lista.length);

    new Promise((resolve, reject) => {
        if (marcoSeleccionado === 'A') {
            objEscA_res = obj;
        } else {
            objEscB_res = obj;
        }

        // Vacia los datos de las tablas (desde el dom)
        vaciarTablasResulados();
        // Desactiva todos los colapsos
        desactivarColapsosResultados();

        // Crea las nuevas tablas
        obj.lista.forEach((archivo) => {
            crearTablaResultado(archivo);
        });

        resolve();
    }).then(() => {
        // Oculta todas
        colapsarTodasResultados(true);

        if (marcoSeleccionado === 'A') {
            banner_resA.ocultar();
            mensajeConsola(`Resultados de algoritmo (${obj.algoritmo}) cargados en marco A`);
        } else {
            banner_resB.ocultar();
            mensajeConsola(`Resultados de algoritmo (${obj.algoritmo}) cargados en marco B`);
        }

        if (flag_espera_esc) {
            flag_espera_esc = false;
            marcoSeleccionado = 'B';
            ipcRenderer.send('escenario_resultados:leer', objEscModificado.ruta, SESION.algoritmo);

            // 3 segundos después del segundo resultado, solicita la lista de modificados
            setTimeout(() => {
                ipcRenderer.send('escenarios_mod:leer', objEscOriginal.ruta.replace('escenario_original', 'escenario_modificado'));
            }, 3000);
        }
    });
});

function crearTablaResultado(objArchivo) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];

    // Busca la tabla en la lista, no en el dom
    let tabla = null;
    for (let t of tablas_res) {
        let nombre_tabla = t.id.replace('$', SESION.sistema.toUpperCase());
        // Pruba con terminacion sistema
        if (id === nombre_tabla && t.classList.contains(marcoSeleccionado)) {
            // console.log('tabla encontrada', nombre_tabla, marcoSeleccionado);
            tabla = t;
            break;
        }

        nombre_tabla = t.id.replace('$', '1');
        // Pruba con terminacion 1
        if (id === nombre_tabla && t.classList.contains(marcoSeleccionado)) {
            // console.log('tabla encontrada', nombre_tabla, marcoSeleccionado);
            tabla = t;
            break;
        }
    }

    if (typeof tabla === 'undefined' || tabla === null) {
        // console.log('No existe la tabla', id);
        return;
    }

    // Borra el tbody anterior
    for (let nodo of tabla.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'tbody') {
            tabla.removeChild(nodo);
        }
    }

    // Crea tbody
    let tbody = document.createElement('tbody');
    tbody.classList.add('tabla-body');

    let num_fila = 1;
    let flag_primera = true;

    // Crea arreglo de filas para referencias en hover
    tabla.filas = [];

    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // si es la primer fila, procesa las cabeceras
        if (flag_primera) {
            for (let nodoA of tabla.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'thead') {
                    for (let nodoB of nodoA.childNodes) {
                        if (nodoB.nodeName.toLowerCase() === 'tr') {
                            nodoB.innerHTML = "";
                            // Inserta los valores en la fila
                            // La primer columna es el número de fila
                            let th = document.createElement('th');
                            nodoB.appendChild(th);

                            fila.forEach((objHeader) => {
                                th = document.createElement('th');
                                let texto = document.createTextNode(objHeader.valor);
                                th.appendChild(texto);
                                nodoB.appendChild(th);
                            });

                            break;
                        }
                    }

                    break;
                }
            }
            flag_primera = false;
        } else {
            // Inserta las filas de datos
            // Agrega numero de registro
            let tr = document.createElement('tr');
            // Agrega numero de registro
            let td = document.createElement('td');
            let texto = document.createTextNode(num_fila);

            tr.num_fila = num_fila;
            td.appendChild(texto);
            td.style.fontWeight = 'bold';
            td.style.textShadow = '0px 0px 1px';
            tr.appendChild(td);

            fila.forEach((objDato) => {
                let td = document.createElement('td');
                let texto = document.createTextNode(objDato.valor);
                td.appendChild(texto);
                tr.appendChild(td);
                // No guarda referencia del objeto porque no se va a editar
            });

            // hover
            tr.onmouseover = () => {
                if (tabla.tabla_par) {
                    if (tr.num_fila >= 0 && tr.num_fila <= tabla.tabla_par.filas.length) {
                        tabla.tabla_par.filas[tr.num_fila - 1].classList.add('hover-simulado');
                    }
                }
            };
            tr.onmouseout = () => {
                if (tabla.tabla_par) {
                    if (tr.num_fila >= 0 && tr.num_fila <= tabla.tabla_par.filas.length) {
                        tabla.tabla_par.filas[tr.num_fila - 1].classList.remove('hover-simulado');
                    }
                }
            };

            num_fila++;
            tbody.appendChild(tr);
            tabla.filas.push(tr);
        }
    });

    tabla.appendChild(tbody);

    // Verifica si require paginacion
    // Resta una fila para no contar el encabezado
    if ((objArchivo.filas.length - 1) > MAX_ROWS) {
        // Si ya existe el objeto, solo reconstruye
        if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
            tabla.paginacion.init();
        } else {
            tabla.paginacion = new Paginacion(tabla, true);
        }
    } else {
        tabla.paginacion = null;
    }

    let colapso = null;
    for (let col of colapsos_res) {
        if (col.id === tabla.dataset.colapso && col.classList.contains(marcoSeleccionado)) {
            colapso = col;
            break;
        }
    }

    // Habilita su colapso si hubo datos
    if (colapso) {
        if (objArchivo.numFilas > 0) {
            colapso.classList.remove('inactivo');
            colapso.classList.remove('vacio');
        } else {
            // console.log(id, 'no tiene datos');
            colapso.classList.remove('inactivo');
            colapso.classList.add('vacio');
        }
    }
}

function scrollContenedor(elemento) {
    if (!elemento.isScrolling) {
        elemento.div_par.isScrolling = true;
        elemento.div_par.scrollTop = elemento.scrollTop;
    }
    elemento.isScrolling = false;
}

function scrollTabla(elemento) {
    for (let nodo of elemento.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'table') {
            // console.log('scroll', elemento, nodo.tabla_par.parentNode);
            nodo.tabla_par.parentNode.scrollLeft = elemento.scrollLeft;
        }
    }
}

function mostrarResultados() {
    menuCompara.onclick();
    banner_resA.mostrar();
    banner_resB.mostrar();

    mensajeConsola('Cargando resultados de los escenarios...');

    flag_espera_esc = true;
    marcoSeleccionado = 'A';
    ipcRenderer.send('escenario_resultados:leer', objEscOriginal.ruta, SESION.algoritmo);
}

ipcRenderer.on('escenarios_mod:leidos', (event, res) => {
    if (res.estado === true) {
        for (let sel of folios_mod) {
            sel.innerHTML = '';

            let txt = document.createTextNode('- Folio -');
            let opt = document.createElement('option');
            opt.disabled = true;
            opt.selected = true;
            opt.appendChild(txt);
            sel.appendChild(opt);

            for (let folio of res.lista) {
                txt = document.createTextNode(folio);
                opt = document.createElement('option');
                opt.appendChild(txt);
                sel.appendChild(opt);
            }
        }
    }
});
