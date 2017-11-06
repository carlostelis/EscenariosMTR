// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function colapsar(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = false;
    let tabla_buscada;

    // La busca en el arreglo en vez de ir al dom
    for (let tabla of tablas_info) {
        if (tabla.id === id) {
            tabla_buscada = tabla;
            break;
        }
    }

    if (!typeof trigger.desplegado === 'undefined') {
        trigger.desplegado = false;
    }

    if (tabla_buscada) {
        // let contenedor = document.getElementById(tabla_buscada.dataset.contenedor);
        let contenedor = colapsables_info.find((col_info) => {
            return col_info.id === tabla_buscada.dataset.contenedor;
        });

        if (contenedor) {
            // La muestra
            if (!trigger.desplegado) {
                for (let nodo of contenedor.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'div') {
                        contenedor.classList.remove('invisible');
                        contenedor.classList.add('visible');
                        iconoAbajo = false;

                        // Inserta la tabla al dom
                        for (let nodo of contenedor.childNodes) {
                            if (nodo.nodeName.toLowerCase() === 'div') {
                                nodo.appendChild(tabla_buscada);
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
                        iconoAbajo = true;

                        // Inserta la tabla al dom
                        for (let nodo of contenedor.childNodes) {
                            if (nodo.nodeName.toLowerCase() === 'div') {
                                nodo.removeChild(tabla_buscada);
                            }
                        }
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
    for (let cont of contenedores_info) {
        if (cont.id === id) {
            cont.style.display = 'block';
        } else {
            cont.style.display = 'none';
        }
    }

    for (let opc of opciones_menu_info) {
        opc.classList.remove('active');
    }
    trigger.classList.add('active');
}

function mostrarTodas() {
    // Reestablece los colapsos
    for (let col of colapsos) {
        col.classList.remove('inactivo');
        col.classList.remove('vacio');

        // Busca su tabla
        // Si no existe la propiedad o esta colapsado, activa su funcion
        if (typeof col.desplegado === 'undefined' || col.desplegado === false) {
            col.onclick();
        }
    }
}

function colapsarTodas(flagClass) {
    for (let col of colapsos) {
        let flagInactivo = col.classList.contains('inactivo');
        let flagVacio = col.classList.contains('vacio');

        // Oculta el asterisco de cambios
        for (let nodo of col.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'span') {
                nodo.classList.add('invisible');
                break;
            }
        }

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
    for (let col of colapsos) {
        col.classList.add('inactivo');
    }
}

function borrarThPeriodos() {
    // Borra los periodos anteriores
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
    // Tablas del dom
    for (let tabla of tablas_info) {
        for (let nodo of tabla.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'tbody') {
                tabla.removeChild(nodo);
                break;
            }
        }
    }
}

ipcRenderer.on('escenario_entradas:leido', (event, obj) => {
    console.log('Recibe archivos:', obj.lista.length);

    // Oculta todas
    colapsarTodas(true);

    new Promise((resolve, reject) => {
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
        for (let tabla of thead_periodo_i) {
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

        // Desactiva todos los colapsos
        desactivarColapsos();

        // Crea las nuevas tablas
        objEscOriginal.lista.forEach((archivo) => {
            crearTablaInfo(archivo);
        });

        resolve();
    }).then(() => {
        // Oculta todas
        colapsarTodas(true);

        banner.ok();
        banner.setMensaje('Lectura finalizada');

        setTimeout(() => {
            //banner.ocultar();
            guardarEscenario(false);
        }, 1000);
    });
});

function crearTablaInfo(objArchivo, copia) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];

    // REvisa si es copia
    if (typeof copia !== 'undefined' && copia === true) {
        // Agrega copia del identificador
        id += '_COPIA';
    }

    // Busca la tabla en la lista, no en el dom
    let tabla = null;
    for (let t of tablas_info) {
        if (t.id === id) {
            tabla = t;
            break;
        }
    }

    if (typeof tabla === 'undefined' || tabla === null) {
        // console.log('No existe la tabla', id);
        return;
    }

    // Nodo tr anterior
    let tr_anterior = null;
    let num_columnas = 0;

    // filas filtro de la tabla
    tabla.filas = [];
    tabla.filasFiltro = [];
    tabla.paginacion = null;
    tabla.ultimoFiltro = '';

    // Borra el tbody anterior
    for (let nodo of tabla.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'thead') {
            for (let nodoA of nodo.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'tr') {
                    // Clona el encabezado
                    objArchivo.trHeader_aux = document.createElement('tr');
                    objArchivo.trHeader_aux.classList.add('tr-aux');

                    let col_pos = 0;
                    for (let nodoB of nodoA.childNodes) {
                        if (nodoB.nodeName.toLowerCase() === 'th') {
                            // Busca input de filtro
                            nodoB.colPos = col_pos++;
                            for (let nodoC of nodoB.childNodes) {
                                if (nodoC.nodeName.toLowerCase() === 'input') {
                                    nodoC.onkeyup = (event) => {
                                        if (nodoC.value === tabla.ultimoFiltro) {
                                            // Si no hay diferencia, no hace nada
                                            return;
                                        }

                                        tabla.filasFiltro = [];
                                        if (nodoC.value === '') {
                                            // Todas visibles
                                            tabla.filasFiltro = tabla.filasFiltro.concat(tabla.filas);
                                        } else {
                                            // console.log('Buscando', nodoC.value, nodoC.colPos);

                                            // En el arreglo de filas busca el filtro
                                            tabla.filas.forEach((fila) => {
                                                // Busca la columna asociada
                                                let colAsociada = fila.columnasFiltro[nodoB.colPos];
                                                if (colAsociada.input === null) {
                                                    // Compara el valor como cadena
                                                    if (colAsociada.innerHTML.startsWith(`${nodoC.value}`)) {
                                                        tabla.filasFiltro.push(fila);
                                                    }
                                                } else {
                                                    if (colAsociada.input.value.startsWith(`${nodoC.value}`)) {
                                                        tabla.filasFiltro.push(fila);
                                                    }
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

                                        tabla.ultimoFiltro = nodoC.value;
                                    };
                                }
                            }

                            // Inserta a auxiliar
                            let td = document.createElement('td');
                            td.innerHTML = nodoB.innerHTML;

                            // revisa si hay un input de filtro
                            for (let nodoC of td.childNodes) {
                                if (nodoC.nodeName.toLowerCase() === 'input') {
                                    nodoC.disabled = true;
                                    nodoC.value = nodoC.placeholder;
                                }
                            }

                            objArchivo.trHeader_aux.appendChild(td);
                            num_columnas++;
                        }
                    }
                }
            }
        }

        if (nodo.nodeName.toLowerCase() === 'tbody') {
            tabla.removeChild(nodo);
        }
    }

    // Crea tbody
    let tbody = document.createElement('tbody');
    tbody.classList.add('tabla-body');

    tabla.tbody = tbody;

    let num_fila = 1;
    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // Fila
        let tr = document.createElement('tr');

        // Fila aux
        tr.tr_anterior = tr_anterior;
        tr.modificado = false;

        // Agrega numero de registro
        let td_fila = document.createElement('td');
        let texto_fila = document.createTextNode(num_fila);
        td_fila.appendChild(texto_fila);
        td_fila.style.fontWeight = 'bold';
        td_fila.style.textShadow = '0px 0px 1px';
        tr.appendChild(td_fila);

        tr.columnasFiltro = [];
        tr.columnasFiltro.push(td_fila);

        // Crea columnas
        let num_col = 1;
        fila.forEach((objDato) => {
            let td = document.createElement('td');
            td.data = objDato;
            td.input = null;

            // Agrega input o no para editable
            if (objArchivo.editable) {
                let input = document.createElement('input');
                input.value = objDato.valor;
                input.fila = num_fila;
                input.columna = num_col;
                objDato.input = input;

                td.input = input;
                td.objDato = objDato;

                // Verifica flag unidad para inhabilitar la edicion de la unidad referenciada
                // TEmporal hasta que se consoliden los archivos de configuracion
                if (typeof objDato.flag_unidad !== 'undefined' && objDato.flag_unidad === true) {
                    input.disabled = true;
                }

                // Respaldo
                objDato.valorOriginal = objDato.valor;
                input.onblur = () => {
                    // Si hubo cambio, se notifica
                    if (input.value != objDato.valorOriginal) {
                        // Verifica flag unidad para inhabilitar la edicion de la unidad referenciada
                        // TEmporal hasta que se consoliden los archivos de configuracion
                        if (typeof objDato.flag_unidad !== 'undefined' && objDato.flag_unidad === true) {
                            input.value = objDato.valorOriginal;
                        }

                        if (objDato.tipo === 'number') {
                            if (isNaN(input.value) || input.value === '') {
                                //objDato.valor = input.value;
                                alert(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                input.classList.add('input-error');

                                setTimeout(() => {
                                    input.focus();
                                }, 100);
                            } else {
                                /* *************************************************** */
                                /* Temporal mientras queda el archivo de configuracion */
                                /* *************************************************** */
                                if (tabla.id === 'OPPARORC_DERS') {
                                    let valorNum = parseInt(input.value);
                                    if (valorNum < 0 || valorNum > 24) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }

                                if (tabla.id.startsWith('ARRAR')) {
                                    input.value = parseInt(input.value);
                                    // Positivo
                                    if (parseInt(input.value) < 0) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor numérico positivo`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico positivo`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }

                                if (tabla.id.startsWith('DISPO') || tabla.id.startsWith('ASIGN') || tabla.id.startsWith('COORD')) {
                                    let valorNum = parseFloat(input.value);

                                    if (valorNum !== 0 && valorNum !== 1) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }

                                if (tabla.id.endsWith('CI_DERS')) {
                                    let valorNum = parseInt(input.value);

                                    if (input.columna === 2) {
                                        // Positivo
                                        if (valorNum !== 0 && valorNum !== 1) {
                                            alert(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
                                            mensajeConsola(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
                                            input.classList.add('input-error');

                                            setTimeout(() => {
                                                input.focus();
                                            }, 100);

                                            return;
                                        }
                                    }

                                    if (input.columna === 4) {
                                        // Lo hace entero con el parseInt
                                        valorNum = parseFloat(input.value);

                                        // Positivo
                                        if (valorNum < 0) {
                                            alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                            mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                            input.classList.add('input-error');

                                            setTimeout(() => {
                                                input.focus();
                                            }, 100);

                                            return;
                                        }
                                    }

                                    if (input.columna === 3 || input.columna === 5) {
                                        // Positivo
                                        if (valorNum < 0 || valorNum > 24) {
                                            alert(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
                                            mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
                                            input.classList.add('input-error');

                                            setTimeout(() => {
                                                input.focus();
                                            }, 100);

                                            return;
                                        }
                                    }
                                }

                                if (tabla.id.startsWith('CGMR') || tabla.id.startsWith('PREVE') || tabla.id.startsWith('POTVE') || tabla.id.startsWith('LIUNIT') || tabla.id.startsWith('LSUNIT')) {
                                    // Positivo
                                    if (parseFloat(input.value) < 0) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }

                                /* Zonas de reserva REQ. */
                                if (tabla.id.startsWith('ZONASRES_DERS') || tabla.id.startsWith('RRERO10Z_DERS') || tabla.id.startsWith('PRERO10Z_DERS') || tabla.id.startsWith('RRE10Z_DERS') || tabla.id.startsWith('PRE10Z_DERS') || tabla.id.startsWith('RRESUZ_DERS') || tabla.id.startsWith('PRESUZ_DERS') || tabla.id.startsWith('RRERESEZ_DERS') || tabla.id.startsWith('PRERESEZ_DERS')) {
                                    // Positivo
                                    if (parseFloat(input.value) < 0) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }

                                /* Zonas de reserva REQ. */
                                if (tabla.id.startsWith('AUSUBSIS_DERS') || tabla.id.startsWith('RRERO10S_DERS') || tabla.id.startsWith('PRERO10S_DERS') || tabla.id.startsWith('RRE10S_DERS') || tabla.id.startsWith('PRE10S_DERS') || tabla.id.startsWith('RRESUS_DERS') || tabla.id.startsWith('PRESUS_DERS') || tabla.id.startsWith('RRERESES_DERS') || tabla.id.startsWith('PRERESES_DERS')) {
                                    // Positivo
                                    if (parseFloat(input.value) < 0) {
                                        alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
                                        input.classList.add('input-error');

                                        setTimeout(() => {
                                            input.focus();
                                        }, 100);

                                        return;
                                    }
                                }


                                /* *************************************************** */

                                objDato.valor = input.value;
                                mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${objDato.valorOriginal}" a "${input.value}" (${objArchivo.archivo})`);
                                input.classList.remove('input-error');
                                // Resalta el input
                                input.classList.add('modificado');
                                // REsalta la fila
                                tr.classList.add('modificado');
                                tr.modificado = true;
                                objArchivo.editado = true;

                                // Marca el colapso con asterisco
                                let colapso = colapsos.find((col) => {
                                    return col.id === tabla.dataset.colapso;
                                });

                                if (colapso) {
                                    for (let nodo of colapso.childNodes) {
                                        if (nodo.nodeName.toLowerCase() === 'span') {
                                            nodo.classList.remove('invisible');
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            objDato.valor = input.value;
                            mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${objDato.valorOriginal}" a "${input.value}" (${objArchivo.archivo})`);
                            input.classList.remove('input-error');
                            // Resalta el input modificado
                            input.classList.add('modificado');
                            // REsalta la fila
                            tr.classList.add('modificado');
                            td.modificado = true;
                            objArchivo.editado = true;

                            // Marca el colapso con asterisco
                            let colapso = colapsos.find((col) => {
                                return col.id === tabla.dataset.colapso;
                            });

                            if (colapso) {
                                for (let nodo of colapso.childNodes) {
                                    if (nodo.nodeName.toLowerCase() === 'span') {
                                        nodo.classList.remove('invisible');
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        // Si es el valor original, no hay cambio ni error
                        input.classList.remove('modificado');
                        input.classList.remove('input-error');

                        // Verifica que hay algun valor modificado para desmarcar la fila
                        let flag_fila_modificada = false;
                        for (let col of tr.columnasFiltro) {
                            if (col.input !== null && col.input.classList.contains('modificado')) {
                                flag_fila_modificada = true;
                                break;
                            }
                        }

                        if (flag_fila_modificada === false) {
                            tr.classList.add('modificado');
                        } else {
                            tr.classList.remove('modificado');
                        }


                        // Revisa si hay modificaciones otras, sino la desmarca
                        objArchivo.editado = false;

                        for (let fila of objArchivo.filas) {
                            for (let columna of fila) {
                                if (typeof columna.input !== 'undefined' && columna.input !== null) {
                                    if (columna.input.classList.contains('modificado')) {
                                        objArchivo.editado = true;
                                        break;
                                    }
                                }

                                // Ya no busca más
                                if (objArchivo.editado === true) {
                                    break;
                                }
                            }
                        }

                        if (objArchivo.editado === false) {
                            // Remueve el asterisco
                            let colapso = colapsos.find((col) => {
                                return col.id === tabla.dataset.colapso;
                            });

                            if (colapso) {
                                for (let nodo of colapso.childNodes) {
                                    if (nodo.nodeName.toLowerCase() === 'span') {
                                        nodo.classList.add('invisible');
                                        break;
                                    }
                                }
                            }
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
            tr.columnasFiltro.push(td);
        });

        // Si trae menos columnas, completa
        for (let i = num_col; i <= num_columnas; i++) {
            td = document.createElement('td');
            tr.appendChild(td);
        }

        // Eventos mouse
        // hover
        tr.onmouseover = () => {
            // Inserta header para guia
            if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
                // Si no es la fila proxima al header principal
                if (tr.flagTop === false) {
                    try {
                        // Inserta el header auxiliar
                        tbody.insertBefore(objArchivo.trHeader_aux, tr.tr_anterior);
                    } catch (e) {}

                    try {
                        // Quita la fila anterior
                        tbody.removeChild(tr.tr_anterior);
                    } catch (e) {}
                }
            }
        };

        tr.onmouseout = () => {
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

        // Fila auxiliar
        tr_anterior = tr;
    });

    tabla.appendChild(tbody);

    // Por defecto agrega todas las filas a la vista
    tabla.filasFiltro = [].concat(tabla.filas);

    // Verifica si require paginacion
    if (objArchivo.filas.length > MAX_ROWS) {
        // Si ya existe el objeto, solo reconstruye
        if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
            tabla.paginacion.init();
        } else {
            tabla.paginacion = new Paginacion(tabla);
        }
    } else {

    }

    let colapso = null;
    for (let col of colapsos) {
        if (col.id === tabla.dataset.colapso) {
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

function guardarEscenario(flag_actualizar) {
    let folio;
    let flag_copiar;

    // Si no esta definido se crea un nuevo folio,
    if (typeof objEscModificado === 'undefined' || objEscModificado === null || typeof flag_actualizar === 'undefined' || flag_actualizar === false) {
        folio = moment().format('YYYYMMDDHHmm');
        flag_copiar = true;
        banner.setMensaje(`Generando escenario modificado`);
        objEscModificado = null;
    } else {
        folio = objEscModificado.folio;
        flag_copiar = false;
        banner.setMensaje(`Actualizando escenario`);
    }

    console.log('folio',folio);
    SESION.folio_generado = folio;

    banner.vistaCompacta();
    banner.modoNormal();
    banner.ocultarBoton();
    banner.trabajando();
    banner.mostrar();

    setTimeout(() => {
        ipcRenderer.send('escenario-original:copiar', rutaEscenarioOriginal, folio, objEscOriginal, flag_copiar);
    }, 500);
}

ipcRenderer.on('escenario-original:copiado', (event, res) => {
    if (res.estado) {
        banner.ok();

        if (typeof objEscModificado !== 'undefined' && objEscModificado !== null && objEscModificado.folio === res.folio) {
            mensajeConsola(`Se actualizó el escenario modificado con folio ${res.folio} a partir de ${res.id}`);
            banner.setMensaje(`Actualización completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);
        } else {
            mensajeConsola(`Se generó un escenario modificado con folio ${res.folio} a partir de ${res.id}`);
            banner.setMensaje(`Copia completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);
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
                archivo.filas.forEach((fila) => {
                    fila.forEach((objDato) => {
                        objDato.valorOriginal = objDato.valor;
                        objDato.input.classList.remove('modificado');
                    });
                });
                archivo.editado = false;
            }
        });

        // Quita asteriscos de cambios
        for (let col of colapsos) {
            for (let nodo of col.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span') {
                    nodo.classList.add('invisible');
                    break;
                }
            }
        }

        // Habilita boton actualizar
        boton_actualizarEscenario.disabled = false;

        // Habilita el boton de ejecutar
        if (boton_ejecutarEscenario) {
            boton_ejecutarEscenario.disabled = false;
        }

        setTimeout(() => {
            banner.ocultar();
        }, 2000);
    } else {
        banner.error();
        mensajeConsola(`Ocurrió un problema al generar el escenario modificado: ${res.error}`);
        banner.setMensaje(res.error);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
    }
});

function ejecutarAlgoritmo() {
    console.log('Ejecuta', objEscModificado.ruta, SESION.algoritmo);
    ipcRenderer.send('algoritmo:ejecutar', objEscModificado.ruta, SESION.algoritmo);

    mensajeConsola(`Ejecutando algoritmo ${SESION.algoritmo} para folio ${objEscModificado.folio}`);

    // Vista prompt
    banner.modoPrompt();
    banner.setTituloPrompt(`Ejecución de algoritmo ${SESION.algoritmo} para folio ${objEscModificado.folio}`);
    banner.setTextoPrompt('');
    banner.promptEspera();
    banner.mostrarBoton();
    banner.setBoton('Resultados', () => {
        mostrarResultados();
        banner.ocultar();
    });
    banner.deshabilitarBoton();
    banner.mostrar();
}

ipcRenderer.on('algoritmo:ejecutado', (event, res) => {
    banner.promptQuitaEspera();
    banner.setTextoPrompt(res.cadena);
    banner.saltoPrompt();

    if (res.exito === true) {
        // Habilita el menu para comparar resultados
        menuCompara.classList.remove('invalido');

        banner.appendTextoPrompt(`<font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`);
        mensajeConsola(`Fin de ejecución del algoritmo; terminación normal`);
    } else {
        if (res.codigo < 0) {
            banner.appendTextoPrompt(`<font color='red'>Error de ejecución del algoritmo: ${res.mensaje}</font>`);
            mensajeConsola(`Error de ejecución del algoritmo: ${res.mensaje}`);
        } else {
            banner.appendTextoPrompt(`<font color='red'>Fin de ejecución del algoritmo. Se presentan errores en el resultado.</font>`);
            mensajeConsola(`Fin de ejecución del algoritmo; se presentan errores en el resultado.`);
        }
    }

    // Habilita el menu modificados
    //menuModifica.classList.remove('invalido');
    menuCompara.classList.remove('invalido');

    banner.habilitarBoton();
});

function mostrarSalidaAlgoritmoOriginal() {
    ipcRenderer.send('archivo:leer', objEscOriginal.ruta, ['dirres', 'bitacora.res'], 'RES_ORIGINAL');

    let arg_id = objEscOriginal.ruta.split('\\');
    let id = arg_id[arg_id.length - 1];
    // Muestra banner
    banner.modoPrompt();
    banner.setTituloPrompt(`Ejecución de algoritmo en escenario ${id}`);
    banner.setTextoPrompt('');
    banner.promptEspera();
    banner.mostrarBoton();
    banner.setBoton('Cerrar', () => {
        banner.ocultar();
    });
    banner.habilitarBoton();
    banner.mostrar();
}
