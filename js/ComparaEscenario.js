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

                        // Inserta la tabla al dom
                        contenedor.div_tabla.appendChild(contenedor.tabla_res);
                        setTimeout(() => {
                            if (contenedor.div_tabla.scrollWidth > contenedor.div_tabla.clientWidth) {
                                setTimeout(() => {
                                    contenedor.div_tabla.onscroll();
                                }, 50);
                            }
                        }, 10);

                        // PAra asegurar que se muestre la primera pagina la primera vez que se despliegue
                        if (contenedor.tabla_res.paginacion !== null) {
                            if (contenedor.tabla_res.paginacion.flagVisualiza !== true) {
                                contenedor.tabla_res.paginacion.cambiarPagina(1);
                                contenedor.tabla_res.paginacion.flagVisualiza = true;
                            }
                        }
                    }
                }
            }
            // la oculta
            else {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        contenedor.classList.add('invisible');
                        contenedor.classList.remove('visible');

                        // Retira la tabla del dom
                        contenedor.div_tabla.removeChild(contenedor.tabla_res);
                    }
                }
            }
        }
    }

    // Invierte el incono de los colapsos con el mismo id
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
        // if (col.classList.contains(marcoSeleccionado))
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

        while (col.desplegado !== false) {
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

    flag_resOutput_A = false;
    flag_resOutput_B = false;

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

ipcRenderer.on('escenario_resultados:leidoComparado', (event, objA, objB) => {
    console.log('Recibe archivos:', objA.lista.length, objB.lista.length);

    objEscA_res = objA;
    objEscB_res = objB;

    // Vacia los datos de las tablas (desde el dom)
    vaciarTablasResulados();
    // Desactiva todos los colapsos
    desactivarColapsosResultados();

    crearTablasResultadoMarco(objEscA_res, 'A').then(() => {
        setTimeout(() => {
            banner_resA.ocultar();
        }, 50);
        mensajeConsola(`Resultados de algoritmo (${objEscA_res.algoritmo}) cargados en marco A`);
        label_resA.innerHTML = `<font color="black">Escenario:</font> <b>${objEscA_res.id}</b> (${objEscA_res.id.length > 12 ? 'Original' : 'Modificado'})<span onclick="mostrarSalidasAlgoritmo();"><i class="demo-icon icon-terminal"></i></span>`;

        crearTablasResultadoMarco(objEscB_res, 'B').then(() => {
            banner_resB.ocultar();
            mensajeConsola(`Resultados de algoritmo (${objEscB_res.algoritmo}) cargados en marco B`);
            label_resB.innerHTML = `<font color="black">Escenario:</font> <b>${objEscB_res.id}</b> (${objEscB_res.id.length > 12 ? 'Original' : 'Modificado'})<span onclick="mostrarSalidasAlgoritmo();"><i class="demo-icon icon-terminal"></i></span>`;

            console.log('Resultados cargados...');

            if (SESION.flag_cargarFolios === true) {
                // 3 segundos después del segundo resultado, solicita la lista de modificados
                setTimeout(() => {
                    console.log('Carga folios modificados');
                    ipcRenderer.send('escenarios_mod:leer', objEscOriginal.ruta.replace('escenario_original', 'escenario_modificado'));
                }, 500);
            }
        }, () => {
            console.log('Error cargando marco B');
        });
    }, () => {
        console.log('Error cargando marco A');
    });
});

function mostrarSalidasAlgoritmo() {
    // Configura banner
    banner_resA.modoPrompt();
    banner_resA.setBoton('Cerrar', () => {
        banner_resA.ocultar();
        banner_resB.ocultar();
    });
    banner_resA.mostrarBoton();
    banner_resA.setTituloPrompt(`Ejecución del escenario ${objEscB_res.id}`);

    // Configura banner
    banner_resB.modoPrompt();
    banner_resB.setBoton('Cerrar', () => {
        banner_resA.ocultar();
        banner_resB.ocultar();
    });
    banner_resB.mostrarBoton();
    banner_resB.setTituloPrompt(`Ejecución del escenario ${objEscB_res.id}`);

    if (flag_resOutput_A === false) {
        banner_resA.promptEspera();
        ipcRenderer.send('archivo:leer', objEscA_res.ruta, ['dirres', 'bitacora.res'], 'RES_COMPARA');
    }

    if (flag_resOutput_B === false) {
        banner_resB.promptEspera();
        ipcRenderer.send('archivo:leer', objEscB_res.ruta, ['dirres', 'bitacora.res'], 'RES_COMPARA');
    }
    // Colapsa todas
    colapsarTodasResultados(true);

    // Muestra banners
    banner_resA.mostrar();
    banner_resB.mostrar();
}

ipcRenderer.on('archivo:leido', (event, obj) => {
    if (obj.opc === 'RES_COMPARA') {
        if (obj.res.includes('TERMINACION NORMAL')) {
            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        let ban = null;

        if (obj.rutaBase === objEscA_res.ruta) {
            flag_resOutput_A = true;
            ban = banner_resA;
        } else if (obj.rutaBase === objEscB_res.ruta) {
            flag_resOutput_B = true;
            ban = banner_resB;
        }

        if (ban !== null) {
            ban.promptQuitaEspera();
            ban.setTextoPrompt(obj.res);
        }
    } else if (obj.opc === 'RES_ORIGINAL') {
        if (obj.res.includes('TERMINACION NORMAL')) {
            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        banner.promptQuitaEspera();
        banner.setTextoPrompt(obj.res);
    }
});

function crearTablasResultadoMarco(escenario, marco) {
    marcoSeleccionado = marco;
    return new Promise((resolve, reject) => {
        // Crea las nuevas tablas del escenario A
        escenario.lista.forEach((archivo) => {
            try {
                crearTablaResultado(archivo);
            }catch (e) {
                console.log('Error creando tabla', e);
            }
        });

        resolve();
    })
}

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
    let flag_diferencias = false;

    // Crea arreglo de filas para referencias en hover
    tabla.filas = [];

    // Nodo tr anterior
    let tr_anterior = null;

    // filas filtro de la tabla
    tabla.filas = [];
    tabla.filasFiltro = [];
    tabla.paginacion = null;
    tabla.ultimoFiltro = '';
    tabla.inputFiltros = [];

    // Crea las filas
    // En resultados se crea el encabezado también

    objArchivo.filas.forEach((fila) => {
        // si es la primer fila, procesa las cabeceras

        // SEMAFOROSDERS no trae cabeceras
        /* *************************************************** */
        /* Temporal mientras queda el archivo de configuracion */
        /* *************************************************** */

        if (flag_primera && tabla.id !== 'SEMAFOROSDERS') {
            for (let nodoA of tabla.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'thead') {
                    for (let nodoB of nodoA.childNodes) {
                        if (nodoB.nodeName.toLowerCase() === 'tr') {
                            // Clona el encabezado
                            objArchivo.trHeader_aux = document.createElement('tr');
                            objArchivo.trHeader_aux.classList.add('tr-aux');

                            nodoB.innerHTML = "";
                            // Inserta los valores en la fila
                            // La primer columna es el número de fila
                            let th = document.createElement('th');
                            nodoB.appendChild(th);

                            // Inserta a auxiliar
                            let td = document.createElement('td');
                            objArchivo.trHeader_aux.appendChild(td);

                            let cont_filtro = 0;

                            fila.forEach((objHeader) => {
                                th = document.createElement('th');
                                th.colPos = cont_filtro;

                                // Para filtro de busqueda
                                if (objHeader.valor === 'UNIDAD') {
                                    let input = document.createElement('input');
                                    input.classList.add('input-filtro');
                                    // input.style.width = '5vw'; // Si no se
                                    input.placeholder = `${String.fromCharCode(0xf50d)} ${objHeader.valor}`;
                                    input.indice = cont_filtro++;

                                    input.onkeyup = (event, cadena) => {
                                        let filtro;

                                        // Si es cadena, el metodo se invocó desde su tabla par
                                        // de lo contrario, el usuario esta escribiendo en el input
                                        if (typeof cadena === 'string') {
                                            filtro = cadena;
                                            input.value = cadena;
                                        } else {
                                            filtro = input.value;
                                        }

                                        if (filtro === tabla.ultimoFiltro) {
                                            // Si no hay diferencia, no hace nada
                                            return;
                                        }

                                        tabla.filasFiltro = [];
                                        if (filtro === '') {
                                            // Todas visibles
                                            tabla.filasFiltro = tabla.filasFiltro.concat(tabla.filas);
                                        } else {
                                            // En el arreglo de filas busca el filtro
                                            tabla.filas.forEach((fila_tr) => {
                                                // Busca la columna asociada
                                                let colAsociada = fila_tr.columnasFiltro[th.colPos];
                                                // Compara el valor como cadena
                                                if (colAsociada.innerHTML.startsWith(`${filtro}`)) {
                                                    tabla.filasFiltro.push(fila_tr);
                                                }
                                            });
                                        }

                                        // Si la tabla tiene paginacion, controla la vista  através de ella
                                        if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
                                            // Valida filas, solo se hace aca
                                            // ya que es el botón que se invoca cuando se filtran
                                            tabla.paginacion.validarFilas();
                                            tabla.paginacion.liPrimero.onclick();
                                        } else {
                                            tabla.tbody.innerHTML = '';
                                            tabla.filasFiltro.forEach((fila) => {
                                                tabla.tbody.appendChild(fila);
                                            });
                                        }

                                        tabla.ultimoFiltro = filtro;

                                        // Invoca el filtro de la tabla par
                                        if (typeof tabla.tabla_par !== 'undefined' && tabla.tabla_par !== null) {
                                            // Activa el evento de la otra tabla
                                            if (tabla.tabla_par.inputFiltros !== null && typeof cadena === 'undefined') {
                                                tabla.tabla_par.inputFiltros[input.indice].onkeyup(event, input.value);
                                            }
                                        }
                                    };

                                    // Agrega a una lista de filtros
                                    tabla.inputFiltros.push(input);

                                    th.appendChild(input);
                                } else {
                                    let texto = document.createTextNode(objHeader.valor);
                                    th.appendChild(texto);
                                }

                                nodoB.appendChild(th);

                                // Inserta a auxiliar
                                td = document.createElement('td');
                                td.appendChild(document.createTextNode(objHeader.valor));
                                objArchivo.trHeader_aux.appendChild(td);
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

            // Fila aux
            tr.tr_anterior = tr_anterior;

            // Agrega numero de registro
            let td = document.createElement('td');
            let texto = document.createTextNode(num_fila);

            tr.num_fila = num_fila;
            td.appendChild(texto);
            td.style.fontWeight = 'bold';
            td.style.textShadow = '0px 0px 1px';
            tr.appendChild(td);

            tr.columnasFiltro = [];
            tr.columnasFiltro.push(td);

            fila.forEach((objDato) => {
                let td = document.createElement('td');
                let texto = document.createTextNode(objDato.valor);

                if (typeof objDato.diferencia !== 'undefined' && objDato.diferencia === true) {
                    // Resalta la celda
                    td.classList.add('modificado');
                    // Resalta la fila
                    tr.classList.add('modificado');
                    flag_diferencias = true;
                }

                td.appendChild(texto);
                tr.appendChild(td);
                tr.columnasFiltro.push(td);
                // No guarda referencia del objeto porque no se va a editar
            });

            // hover
            tr.onmouseover = (event, flagRebote) => {
                setTimeout(() => {
                    // Para la tabla par vinculada
                    if (typeof flagRebote === 'undefined') {
                        tabla.tabla_par.filas[tr.num_fila - 1].onmouseover(event, true);
                    }

                    if (tabla.tabla_par && flagRebote !== true) {
                        if (tr.num_fila >= 0 && tr.num_fila <= tabla.tabla_par.filas.length) {
                            tabla.tabla_par.filas[tr.num_fila - 1].classList.add('hover-simulado');
                        }
                    }
                });

                // Inserta header para guia
                if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
                    // Si no es la fila proxima al header principal
                    if (tr.flagTop === false) {
                        try {
                            tbody.insertBefore(objArchivo.trHeader_aux, tr.tr_anterior);
                        } catch (e) {}

                        try {
                            tbody.removeChild(tr.tr_anterior);
                        } catch (e) {}
                    }
                }
            };

            tr.onmouseout = (event, flagRebote) => {
                setTimeout(() => {
                    // Para la tabla par vinculada
                    if (typeof flagRebote === 'undefined') {
                        tabla.tabla_par.filas[tr.num_fila - 1].onmouseout(event, true);
                    }

                    if (tabla.tabla_par) {
                        if (tr.num_fila >= 0 && tr.num_fila <= tabla.tabla_par.filas.length) {
                            tabla.tabla_par.filas[tr.num_fila - 1].classList.remove('hover-simulado');
                        }
                    }
                });

                // Inserta header para guia
                if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
                    // Si no es la fila proxima al header principal
                    if (tr.flagTop === false) {
                        // Reinserta la fila antes del header aux
                        try {
                            tbody.insertBefore(tr.tr_anterior, objArchivo.trHeader_aux);
                        } catch (e) {}

                        try {
                            // Quita  el header aux del dom
                            tbody.removeChild(objArchivo.trHeader_aux);
                        } catch (e) {}
                    }
                }
            };

            num_fila++;
            tbody.appendChild(tr);
            tabla.filas.push(tr);

            // Por defecto agrega todas las filas a la vista
            tabla.filasFiltro = [].concat(tabla.filas);

            // Fila auxiliar
            tr_anterior = tr;
        }
    });

    // Asterisco de diferencias
    colapsos_res.forEach((col) => {
        if (col.id === tabla.dataset.colapso && col.classList.contains(marcoSeleccionado)) {
            for (let nodo of col.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span') {
                    if (flag_diferencias) {
                        nodo.classList.remove('invisible');
                        break;
                    } else {
                        nodo.classList.add('invisible');
                        break;
                    }
                }
            }
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

    // Verifica su archivo para el nombre en el span del colapso
    spans_archivos_res.forEach((span) => {
        let arch_id = span.id.replace('ARCH-', '');
        console.log(id, arch_id);
        if (id.startsWith(arch_id)) {
            span.innerHTML = `${id}.csv`;
        }
    });
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
            if (nodo.paginacion) {
                nodo.paginacion.desplazarPaginacion(elemento.scrollLeft);
            }
        }
    }
}

function mostrarResultados() {
    menuCompara.onclick();

    flag_resOutput_A = false;
    flag_resOutput_B = false;

    banner_resA.modoNormal();
    banner_resA.ocultarBoton()
    banner_resA.ocultarProgreso()
    banner_resA.vistaIcono();
    banner_resA.cargando();

    banner_resB.modoNormal();
    banner_resB.ocultarBoton()
    banner_resB.ocultarProgreso()
    banner_resB.vistaIcono();
    banner_resB.cargando();

    banner_resA.mostrar();
    banner_resB.mostrar();

    // Colapsa resultados
    colapsarTodasResultados(true);
    SESION.flag_cargarFolios = true;

    mensajeConsola('Cargando resultados de los escenarios...');

    ipcRenderer.send('escenario_resultados:leerComparar', objEscOriginal.ruta, objEscModificado.ruta, SESION.algoritmo);
}

function mostrarResultadosSeleccionados() {
    flag_resOutput_A = false;
    flag_resOutput_B = false;

    banner_resA.modoNormal();
    banner_resA.ocultarBoton()
    banner_resA.ocultarProgreso()
    banner_resA.vistaIcono();
    banner_resA.cargando();

    banner_resB.modoNormal();
    banner_resB.ocultarBoton()
    banner_resB.ocultarProgreso()
    banner_resB.vistaIcono();
    banner_resB.cargando();

    banner_resA.mostrar();
    banner_resB.mostrar();

    // Colapsa resultados
    colapsarTodasResultados(true);

    mensajeConsola('Cargando resultados de los escenarios...');

    // Genera la ruta A
    let folio = folios_mod[0].value;
    let ruta_A;
    if (folio.length > 12) {
        ruta_A = objEscOriginal.ruta;
    } else {
        ruta_A = `${objEscModificado.ruta.substr(0, objEscModificado.ruta.length - 12)}${folio}`;
    }

    // Genera la ruta B
    folio = folios_mod[1].value;
    let ruta_B;
    if (folio.length > 12) {
        ruta_B = objEscOriginal.ruta;
    } else {
        ruta_B = `${objEscModificado.ruta.substr(0, objEscModificado.ruta.length - 12)}${folio}`;
    }

    console.log(ruta_A);
    console.log(ruta_B);
    SESION.flag_cargarFolios = false;
    ipcRenderer.send('escenario_resultados:leerComparar', ruta_A, ruta_B, SESION.algoritmo);
}

ipcRenderer.on('escenarios_mod:leidos', (event, res) => {
    let flag_primero = true;
    if (res.estado === true) {
        for (let sel of folios_mod) {
            sel.innerHTML = '';

            let txt = document.createTextNode(SESION.id_solicitud);
            let opt = document.createElement('option');

            opt.appendChild(txt);
            sel.appendChild(opt);

            if (flag_primero) {
                // Selecciona originall
                opt.selected = true;
            }

            for (let folio of res.lista) {
                txt = document.createTextNode(folio);
                opt = document.createElement('option');
                opt.appendChild(txt);
                sel.appendChild(opt);

                if (flag_primero === false && folio === SESION.folio_generado) {
                    opt.selected = true;
                }

                if (flag_primero === true && folio === SESION.folio_generado) {
                    flag_primero = false;
                }
            }

            sel.valido = false;
        }

        boton_cargarFolios.disabled = true;
    }
});
