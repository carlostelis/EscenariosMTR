// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function colapsar(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo') || trigger.classList.contains('vacio')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = false;
    let tabla_buscada;

    for (tabla of tablas_info) {
        if (tabla.id === id) {
            tabla_buscada = tabla;
            break;
        }
    }

    // Si no la encontró en la lista la busca en el dom
    if (!tabla_buscada) {
        tabla_buscada = document.getElementById(id);
    }

    if (!typeof trigger.desplegado === 'undefined') {
        trigger.desplegado = false;
    }

    if (tabla_buscada) {
        let contenedor = document.getElementById(tabla_buscada.dataset.contenedor);
        if (contenedor) {
            // La muestra
            if (!trigger.desplegado) {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        nodo.appendChild(tabla_buscada);
                        contenedor.classList.remove('invisible');
                        contenedor.classList.add('visible');
                        // tabla_buscada.elementoVisible = true;
                        iconoAbajo = false;
                    }
                }
            }
            // la oculta
            else {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        nodo.removeChild(tabla_buscada);
                        contenedor.classList.add('invisible');
                        contenedor.classList.remove('visible');
                        // tabla_buscada.elementoVisible = false;
                        iconoAbajo = true;
                    }
                }
            }
        }
    }

    // Cambia el icono
    for (let nodoA of trigger.childNodes) {
        // div hijo
        if (nodoA.nodeName.toLowerCase() === 'div') {
            for (let nodoB of nodoA.childNodes) {
                if (nodoB.nodeName.toLowerCase() === 'span') {
                    for (let nodoC of nodoB.childNodes) {
                        if (nodoC.nodeName.toLowerCase() === 'i') {
                            if (iconoAbajo) {
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
    trigger.desplegado = !iconoAbajo;
}

function mostrarContenedor(id, trigger) {
    let contenedores = document.getElementsByClassName('contenedor-info');
    for (let cont of contenedores) {
        if (cont.id === id) {
            cont.style.display = 'block';
        } else {
            cont.style.display = 'none';
        }
    }

    let opciones = document.getElementsByClassName('opcion-menu-info');
    for (let opc of opciones) {
        opc.classList.remove('active');
    }
    trigger.classList.add('active');
}

function mostrarTodas() {
    // Reestablece los colapsos
    let colapsos = document.getElementsByClassName('celda-header-info');
    for (let col of colapsos) {
        col.classList.remove('inactivo');
        col.classList.remove('vacio');
        // col.desplegado = false;

        // Busca su tabla
        // Si no existe la propiedad o esta colapsado, activa su funcion
        if (typeof col.desplegado === 'undefined' || col.desplegado === false) {
            col.onclick();
        }
    }
}

function colapsarTodas(flagClass) {
    let colapsos = document.getElementsByClassName('celda-header-info');
    for (let col of colapsos) {
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

function desactivarColapsos() {
    // Reestablece los colapsos
    let colapsos = document.getElementsByClassName('celda-header-info');
    for (let col of colapsos) {
        col.classList.add('inactivo');
    }
}

function borrarThPeriodos() {
    // Borra los periodos anteriores
    let th_periodos = document.getElementsByClassName('th-periodo');

    // Se asegura de borrar todos los th-periodo
    // No se borran todos a la primer pasada
    do {
        console.log('periodos a borrar', th_periodos.length);
        for (let thp of th_periodos) {
            if (thp.nodeName.toLowerCase() === 'th') {
                thp.parentNode.removeChild(thp);
            }
        }

        th_periodos = document.getElementsByClassName('th-periodo');
    } while (th_periodos.length > 0);
}

function vaciarTablas() {
    let tablas = document.getElementsByClassName('tabla-info');

    // Tablas del dom
    for (let tabla of tablas) {
        for (let nodo of tabla.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'tbody') {
                tabla.removeChild(nodo);
                break;
            }
        }
    }
}

ipcRenderer.on('escenario:leido', (event, obj) => {
    console.log('Recibe archivos:', obj.lista.length);
    console.log(obj);

    objEscOriginal = obj;

    // Muestra las tablas para que esten en el dom
    mostrarTodas();
    // Borra los periodos
    borrarThPeriodos();
    // Vacia los datos de las tablas (desde el dom)
    vaciarTablas();

    // Obtiene el numero de periodos por algoritmo
    let periodos = 0;
    SESION.config.algoritmos.forEach((algoritmo) => {
        if (algoritmo.carpeta === SESION.algoritmo) {
            periodos = algoritmo.periodos;
        }
    });
    console.log('>>> Periodos:', periodos);

    // Tablas de Periodos 1-N
    let thead_periodo = document.getElementsByClassName('alg-dep');
    for (let thead of thead_periodo) {
        for (let nodoA of thead.childNodes) {
            if (nodoA.nodeName.toLowerCase() === 'tr') {
                // Agrega las cabeceras de los periodos
                for (let i = 1; i <= periodos; i++) {
                    let th = document.createElement('th');
                    th.classList.add('th-periodo');
                    let texto = document.createTextNode(`Periodo ${i}`);

                    th.appendChild(texto);
                    nodoA.appendChild(th);
                }
                break;
            }
        }
    }

    // Tablas de de intervalos min y max 1-N
    thead_periodo = document.getElementsByClassName('alg-dep-i');

    for (let tabla of thead_periodo) {
        for (let nodoA of tabla.childNodes) {
            if (nodoA.nodeName.toLowerCase() === 'tr') {
                // Agrega las cabeceras de los periodos
                for (let i = 1; i <= periodos; i++) {
                    let thmin = document.createElement('th');
                    let thmax = document.createElement('th');

                    thmin.classList.add('th-periodo');
                    thmax.classList.add('th-periodo');

                    let texto_min = document.createTextNode(`Flujo mínimo en I_${i}`);
                    let texto_max = document.createTextNode(`Flujo máximo en I_${i}`);

                    thmin.appendChild(texto_min);
                    thmax.appendChild(texto_max);

                    nodoA.appendChild(thmin);
                    nodoA.appendChild(thmax);
                }
                break;
            }
        }
    }

    // Crea la tabla de cada archivo
    // Las guarda en tablas_info

    // Desactiva todos los colapsos
    desactivarColapsos();

    // Crea las nuevas tablas
    objEscOriginal.lista.forEach((archivo) => {
        crearTablaInfo(archivo);
    });
    console.log('Tablas:', tablas_info.length);
    console.log('MAX ROWS', MAX_ROWS);
    // Oculta todas
    colapsarTodas(true);

    banner2.ocultar();
});

function crearTablaInfo(objArchivo, copia) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];

    // REvisa si es copia
    if (typeof copia !== 'undefined' && copia === true) {
        // Agrega copia del identificador
        id += '_COPIA';
    }

    // Busca la tabla en el dom
    let tabla = document.getElementById(id);

    if (typeof tabla === 'undefined' || tabla === null) {
        // Si no la encuentra la busca en la lista
        for (let t of tablas_info) {
            if (t.id === id) {
                tabla = t;
                break;
            }
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
    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // Fila
        let tr = document.createElement('tr');

        // Agrega numero de registro
        let td_fila = document.createElement('td');
        let texto_fila = document.createTextNode(num_fila);
        td_fila.appendChild(texto_fila);
        td_fila.style.fontWeight = 'bold';
        td_fila.style.textShadow = '1px 1px 1px';
        tr.appendChild(td_fila);

        // Crea columnas
        let num_col = 1;
        fila.forEach((objDato) => {
            let td = document.createElement('td');
            td.data = objDato;

            // Agrega input o no para editable
            if (objArchivo.editable) {
                let input = document.createElement('input');
                input.value = objDato.valor;
                input.fila = num_fila;
                input.columna = num_col;

                // Respaldo
                input.original = objDato.valor;
                input.onblur = () => {
                    // Si hubo cambio, se notifica
                    if (input.value != input.original) {
                        if (objDato.tipo === 'number') {
                            if (isNaN(input.value)) {
                                objDato.valor = input.value;
                                alert(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                input.classList.add('input-error');
                                setTimeout(() => {
                                    input.focus();
                                }, 100);
                            } else {
                                objDato.valor = input.value;
                                mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${input.original}" a "${input.value}" (${objArchivo.archivo})`);
                                input.classList.remove('input-error');
                                objArchivo.editado = true;
                            }
                        } else {
                            objDato.valor = input.value;
                            mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${input.original}" a "${input.value}" (${objArchivo.archivo})`);
                            input.classList.remove('input-error');
                            objArchivo.editado = true;
                        }
                    }
                };

                td.appendChild(input);
                num_col++;
            } else {
                let texto = document.createTextNode(objDato.valor);
                td.appendChild(texto);
            }

            tr.appendChild(td);
        });

        num_fila++;
        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);

    if (objArchivo.filas.length > MAX_ROWS) {
        // Si ya existe el objeto, solo reconstruye
        if (typeof tabla.paginacion !== 'undefined') {
            tabla.paginacion.init();
        } else {
            tabla.paginacion = new Paginacion(tabla);
        }
    } else {

    }

    // Remueve la tabla del dom por defecto
    // Al dar click al colapso se reinserta
    // tabla.elementoVisible = false;

    // Se reinserta en su parent
    let id_parent = tabla.dataset.contenedor;
    if (id_parent) {
        let parent = document.getElementById(id_parent);
        if (parent) {
            for (let nodo of parent.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'div') {
                    nodo.appendChild(tabla);
                }
            }
        }
    }

    // Agrega la tabla a la lista
    if (!tablas_info.some((t) => {
        return t.id === tabla.id;
    })) {
        tablas_info.push(tabla);
    }

    let colapso = document.getElementById(tabla.dataset.colapso);
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

    /* ********************** */
    /* Busca copias de tabla  */
    /* ********************** */
    if (id === 'ZONASRES_DERS') {
        console.log('Copiando ZONASRES_DERS');
        crearTablaInfo(objArchivo, true);
    }

    if (id === 'AUSUBSIS_DERS') {
        console.log('Copiando AUSUBSIS_DERS_COPIA');
        crearTablaInfo(objArchivo, true);
    }
}

function guardarEscenario() {
    let folio;
    let flag_copiar;

    // Si no esta definido se crea un nuevo folio,
    if (typeof objEscModificado === 'undefined' || objEscModificado === null) {
        folio = moment().format('YYYYMMDDHHmm');
        flag_copiar = true;
        banner2.setMensaje(`Generando escenario modificado`);
    } else {
        folio = objEscModificado.folio;
        flag_copiar = false;
        banner2.setMensaje(`Actualizando escenario`);
    }

    console.log('folio',folio);

    banner2.vistaCompacta();
    banner2.normal();
    banner2.ocultarBoton();
    banner2.trabajando();
    banner2.mostrar();

    setTimeout(() => {
        ipcRenderer.send('escenario-original:copiar', rutaEscenarioOriginal, folio, objEscOriginal, flag_copiar);
    }, 500);
}

ipcRenderer.on('escenario-original:copiado', (event, res) => {
    if (res.estado) {
        banner2.ok();

        if (typeof objEscModificado !== 'undefined' && objEscModificado !== null && objEscModificado.folio === res.folio) {
            mensajeConsola(`Se actualizó el escenario modificado con folio ${res.folio} a partir de ${res.id}`);
            banner2.setMensaje(`Actualización completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);
        } else {
            mensajeConsola(`Se generó un escenario modificado con folio ${res.folio} a partir de ${res.id}`);
            banner2.setMensaje(`Copia completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);
        }

        // Actualiza las etiquetas
        let folio_labels = document.getElementsByClassName('label-folio-esc');
        for (let label of folio_labels) {
            label.innerHTML = `Folio: <b>${res.folio}</b>`;
        }

        // Asigna el nuevo objeto acarreado
        objEscModificado = null;
        objEscModificado = res.obj;
        objEscModificado.folio = res.folio;
        objEscModificado.ruta = res.ruta;

        // Desmarca el escenario original
        objEscOriginal.lista.forEach((archivo) => {
            if (typeof archivo.editado !== 'undefined' && archivo.editado === true) {
                archivo.editado = false;
            }
        });

        let boton_ejecutarEscenario = document.getElementById('boton_ejecutarEscenario');
        if (boton_ejecutarEscenario) {
            boton_ejecutarEscenario.disabled = false;
        }

        setTimeout(() => {
            banner2.ocultar();
        }, 2000);

        // Habilita el menu modificados
        menuModifica.classList.remove('invalido');
    } else {
        banner2.error();
        mensajeConsola(`Ocurrió un problema al generar el escenario modificado: ${res.error}`);
        banner2.setMensaje(res.error);
        banner2.setBoton('Aceptar', () => {
            banner2.ocultar();
        });
    }
});

function ejecutarAlgoritmo() {
    console.log('Ejecuta', objEscModificado.ruta, SESION.algoritmo);
    ipcRenderer.send('algoritmo:ejecutar', objEscModificado.ruta, SESION.algoritmo);

    // Vista prompt
    banner2.prompt();
    banner2.setTituloPrompt(`Ejecución de algoritmo ${SESION.algoritmo} para folio ${objEscModificado.folio}`);
    banner2.setTextoPrompt('');
    banner2.ocultarBoton();
    banner2.setBoton('Hecho', () => {
        banner2.ocultar();
    });
    banner2.mostrar();
}

ipcRenderer.on('algoritmo:salida', (event, mensajes) => {
    mostrarMensajes(mensajes).then(() => {
        setTimeout(() => {
            ipcRenderer.send('algoritmo:salidaSiguiente');
        }, 100);
    }, () => {
        setTimeout(() => {
            ipcRenderer.send('algoritmo:salidaSiguiente');
        }, 100);
    });
});

function mostrarMensajes(mensajes) {
    return new Promise((resolve, reject) => {
        mensajes.forEach((mensaje) => {
            try {
                let lineas = mensaje.split('\n');
                lineas.forEach((linea) => {
                    banner2.appendTextoPrompt(linea);

                    // Verifica si la linea contiene el mensaje de terminacion exitosa del algoritmo
                    if (linea.includes('TERMINACION NORMAL')) {
                        objEscModificado.exito = true;
                    }
                });

                resolve();
            } catch (e) {
                reject();
            }
        });
    });
}

ipcRenderer.on('algoritmo:ejecutado', (event, res) => {
    console.log(res);
    banner2.setTextoPrompt(res.cadena);
    banner2.saltoPrompt();

    if (res.exito === true) {
        banner2.appendTextoPrompt(`<font color='lawngreen'>Fin de ejecución del algoritmo con código local: ${res.codigo}</font>`);
    } else {
        if (res.codigo < 0) {
            banner2.appendTextoPrompt(`<font color='red'>Error de ejecución del algoritmo: ${res.mensaje}</font>`);
        } else {
            banner2.appendTextoPrompt(`<font color='red'>Fin de ejecución del algoritmo con código local: ${res.codigo}</font>`);
        }
    }

    banner2.mostrarBoton();
});
