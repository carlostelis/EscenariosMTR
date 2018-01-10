
function toggleColapso(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = false;
    let contenedor_buscado = $('#' + id);

    if (!typeof trigger.desplegado === 'undefined') {
        trigger.desplegado = false;
    }

    if (contenedor_buscado) {
        // Si no esta desplegado, lo muestra
        if (!trigger.desplegado) {
            contenedor_buscado.removeClass('invisible');
            contenedor_buscado.addClass('visible');
            iconoAbajo = false;
        }
        // la oculta
        else {
            contenedor_buscado.addClass('invisible');
            contenedor_buscado.removeClass('visible');
            iconoAbajo = true;
        }
    }

    // Cambia el icono
    for (let nodoA of trigger.childNodes) {
        // div hijo
        if (nodoA.nodeName.toLowerCase() === 'div') {
            for (let nodoB of nodoA.childNodes) {
                if (nodoB.nodeName.toLowerCase() === 'span' && nodoB.classList.length === 0) {
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

    return trigger.desplegado;
}

function expandir(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = false;
    let contenedor_buscado = $('#' + id);

    // Bandera despliegue
    trigger.desplegado = false;

    // Oculta contenedor
    contenedor_buscado.removeClass('invisible');
    contenedor_buscado.addClass('visible');
    iconoAbajo = false;

    // Cambia el icono
    for (let nodoA of trigger.childNodes) {
        // div hijo
        if (nodoA.nodeName.toLowerCase() === 'div') {
            for (let nodoB of nodoA.childNodes) {
                if (nodoB.nodeName.toLowerCase() === 'span' && nodoB.classList.length === 0) {
                    for (let nodoC of nodoB.childNodes) {
                        if (nodoC.nodeName.toLowerCase() === 'i') {
                            nodoC.classList.remove('fa-caret-square-o-down');
                            nodoC.classList.add('fa-caret-square-o-up');
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
}

function colapsar(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = true;
    let contenedor_buscado = $('#' + id);

    if (!typeof trigger.desplegado === 'undefined') {
        trigger.desplegado = false;
    }

    if (contenedor_buscado) {
        contenedor_buscado.addClass('invisible');
        contenedor_buscado.removeClass('visible');
        iconoAbajo = false;
    }

    // Cambia el icono
    for (let nodoA of trigger.childNodes) {
        // div hijo
        if (nodoA.nodeName.toLowerCase() === 'div') {
            for (let nodoB of nodoA.childNodes) {
                if (nodoB.nodeName.toLowerCase() === 'span' && nodoB.classList.length === 0) {
                    for (let nodoC of nodoB.childNodes) {
                        if (nodoC.nodeName.toLowerCase() === 'i') {
                            nodoC.classList.add('fa-caret-square-o-down');
                            nodoC.classList.remove('fa-caret-square-o-up');
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
    trigger.desplegado = iconoAbajo;

    return trigger.desplegado;
}

function mostrarContenedor(id, trigger) {
    // Oculta tooltips, de repente se cuelgan con el banner
    $("[data-toggle='tooltip']").tooltip('hide');

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

// function mostrarTodas() {
//     // Reestablece los colapsos
//     for (let col of colapsos) {
//         col.classList.remove('inactivo');
//         col.classList.remove('vacio');
//
//         // Busca su tabla
//         // Si no existe la propiedad o esta colapsado, activa su funcion
//         if (typeof col.desplegado === 'undefined' || col.desplegado === false) {
//             col.onclick();
//         }
//     }
// }

// function colapsarTodas(flagClass) {
//     for (let col of colapsos) {
//         let flagInactivo = col.classList.contains('inactivo');
//         let flagVacio = col.classList.contains('vacio');
//
//         // Oculta el asterisco de cambios, excepto el de costos
//         for (let nodo of col.childNodes) {
//             if (nodo.nodeName.toLowerCase() === 'span' && !nodo.classList.contains('span-costos')) {
//                 nodo.classList.add('invisible');
//                 break;
//             }
//         }
//
//         // Forzar inactivos y vacio
//         if (typeof flagClass !== 'undefined' && flagClass === true) {
//             col.classList.remove('inactivo');
//             col.classList.remove('vacio');
//         }
//
//         // Busca su tabla
//         // Si existe la propiedad y esta desplegado, activa su funcion
//         if (typeof col.desplegado !== 'undefined' && col.desplegado === true) {
//             col.onclick();
//         }
//
//         if (typeof flagClass !== 'undefined' && flagClass === true) {
//             if (flagInactivo) {
//                 col.classList.add('inactivo');
//             }
//             if (flagVacio) {
//                 col.classList.add('vacio');
//             }
//         }
//     }
// }

function desactivarColapsos() {
    console.log('Oculta colapsos');
    // Reestablece los colapsos
    for (let col of colapsos) {
        col.classList.add('inactivo');
    }
}

// function borrarThPeriodos() {
//     // Borra los periodos anteriores
//     // Se asegura de borrar todos los th-periodo
//     // No se borran todos a la primer pasada
//     do {
//         console.log('periodos a borrar', th_periodos.length);
//         for (let thp of th_periodos) {
//             if (thp.nodeName.toLowerCase() === 'th') {
//                 thp.parentNode.removeChild(thp);
//             }
//         }
//
//         th_periodos = document.getElementsByClassName('th-periodo');
//     } while (th_periodos.length > 0);
// }

// function vaciarTablas() {
//     // Tablas del dom
//     for (let tabla of tablas_info) {
//         for (let nodo of tabla.childNodes) {
//             if (nodo.nodeName.toLowerCase() === 'tbody') {
//                 tabla.removeChild(nodo);
//                 break;
//             }
//         }
//     }
// }

// function vaciarTablasResultados() {
//     // Tablas del dom
//     for (let tabla of tablas_info) {
//         if (typeof tabla.isResultado !== 'undefined' && tabla.isResultado === true) {
//             for (let nodo of tabla.childNodes) {
//                 if (nodo.nodeName.toLowerCase() === 'tbody') {
//                     tabla.removeChild(nodo);
//                     break;
//                 }
//             }
//         }
//     }
// }

ipcRenderer.on('escenario_completo:leido', (event, obj) => {
    console.log('Recibe contenedor de archivos:', obj.lista.length);
    textarea_comentarios_info.innerHTML = '';

    // Desactiva todos los colapsos
    desactivarColapsos();

    // Limpia la lista de celdas modificadas
    listaFilasColumnas = [];
    gridsInfo = [];

    // Recibe el contenedor
    objEscOriginal = obj;
    objEscOriginal.contador = 0;
    promesas_archivos = [];
});

ipcRenderer.on('escenario_completo:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo, obj_archivo.filas.length);

    // Recibe el contenedor
    objEscOriginal.lista.push(obj_archivo);
    objEscOriginal.contador++;

    // Agrega lista de promesas
    promesas_archivos.push(new Promise((resolve, reject) => {
        // crearTablaInfo(obj_archivo);
        crearTablaInfoKendo(obj_archivo);
        resolve();
    }));

    if (objEscOriginal.contador === objEscOriginal.numArchivos) {
        setTimeout(() => {
            Promise.all(promesas_archivos).then(() => {
                // Habilita botones
                boton_actualizarEscenario.disabled = false;
                boton_nuevoFolio.disabled = false;
                boton_resultadoOriginal.disabled = false;

                banner.ok();
                banner.setMensaje('Lectura Finalizada');

                // Activa boton cargar actual en modificados
                if (flag_guardandoBD === true) {
                    boton_cargaEscenarioModActual_estado = false;
                } else {
                    boton_cargaEscenarioModActual.disabled = false;
                }

                promesas_archivos = [];

                setTimeout(() => {
                    // Si el escenario contiene un folio, se invocó desde su folio
                    if (typeof objEscOriginal.folio !== 'undefined' && objEscOriginal.folio !== '') {
                        // IGuala al objeto;
                        objEscModificado = objEscOriginal;

                        // Manda a leer el archivo de costos e ingresos
                        ipcRenderer.send('archivo:leer', objEscModificado.ruta, ['dirres', 'r_desphora1.res'], 'INFO_COSTOS');

                        // Lee los COMENTARIOS
                        ipcRenderer.send('archivo:leer', objEscModificado.ruta, ['comentarios.txt'], 'FOLIO_COMENTARIOS');

                        // Genera una referencia al escenario original
                        objEscOriginal = {
                            algoritmo: objEscModificado.algoritmo,
                            lista: objEscModificado.lista,
                            numArchivos: objEscModificado.numArchivos,
                            ruta: objEscModificado.rutaOriginal
                        };

                        setTimeout(() => {
                            banner.ocultar();
                        }, 1000);
                    } else {
                        guardarEscenario(false);
                    }
                }, 1000);
            });
        }, 1000);
    }
});

// function crearTablaInfo(objArchivo, copia) {
//     let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];
//
//     // REvisa si es copia
//     if (typeof copia !== 'undefined' && copia === true) {
//         // Agrega copia del identificador
//         id += '_COPIA';
//     }
//
//     // Busca la tabla en la lista, no en el dom
//     let tabla = null;
//     for (let t of tablas_info) {
//         if (t.id === id || t.id.replace('$', '1') === id || t.id.replace('$', SESION.sistema) === id) {
//             tabla = t;
//             break;
//         }
//     }
//
//     if (typeof tabla === 'undefined' || tabla === null) {
//         // console.log('No existe la tabla', id);
//         return;
//     }
//
//     // MEnsaje a pantalla
//     banner.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${objArchivo.archivo}</font>`);
//
//     // Nodo tr anterior
//     let tr_anterior = null;
//     let num_columnas = 0;
//
//     // filas filtro de la tabla
//     tabla.filas = [];
//     tabla.filasFiltro = [];
//     tabla.paginacion = null;
//     tabla.ultimoFiltro = '';
//
//     // Borra el tbody anterior
//     for (let nodo of tabla.childNodes) {
//         if (nodo.nodeName.toLowerCase() === 'thead') {
//             for (let nodoA of nodo.childNodes) {
//                 if (nodoA.nodeName.toLowerCase() === 'tr') {
//                     // Clona el encabezado
//                     objArchivo.trHeader_aux = document.createElement('tr');
//                     objArchivo.trHeader_aux.classList.add('tr-aux');
//
//                     let col_pos = 0;
//                     for (let nodoB of nodoA.childNodes) {
//                         if (nodoB.nodeName.toLowerCase() === 'th') {
//                             // Busca input de filtro
//                             nodoB.colPos = col_pos++;
//                             for (let nodoC of nodoB.childNodes) {
//                                 if (nodoC.nodeName.toLowerCase() === 'input') {
//                                     nodoC.onkeyup = (event) => {
//                                         if (nodoC.value === tabla.ultimoFiltro) {
//                                             // Si no hay diferencia, no hace nada
//                                             return;
//                                         }
//
//                                         tabla.filasFiltro = [];
//                                         if (nodoC.value === '') {
//                                             // Todas visibles
//                                             tabla.filasFiltro = tabla.filasFiltro.concat(tabla.filas);
//                                         } else {
//                                             // console.log('Buscando', nodoC.value, nodoC.colPos);
//
//                                             // En el arreglo de filas busca el filtro
//                                             tabla.filas.forEach((fila) => {
//                                                 // Busca la columna asociada
//                                                 let colAsociada = fila.columnasFiltro[nodoB.colPos];
//                                                 if (colAsociada.input === null) {
//                                                     // Compara el valor como cadena
//                                                     if (colAsociada.innerHTML.includes(`${nodoC.value}`)) {
//                                                         tabla.filasFiltro.push(fila);
//                                                     }
//                                                 } else {
//                                                     if (colAsociada.input.value.includes(`${nodoC.value}`)) {
//                                                         tabla.filasFiltro.push(fila);
//                                                     }
//                                                 }
//                                             });
//                                         }
//
//                                         // Si la tabla tiene paginacion, controla la vista  através de ella
//                                         if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
//                                             // Valida filas, solo se hace aca
//                                             // ya que es el botón que se invoca cuando se filtran
//                                             tabla.paginacion.validarFilas();
//                                             tabla.paginacion.liPrimero.onclick();
//                                         } else {
//                                             tabla.tbody.innerHTML = '';
//                                             tabla.filasFiltro.forEach((fila) => {
//                                                 tabla.tbody.appendChild(fila);
//                                             });
//                                         }
//
//                                         tabla.ultimoFiltro = nodoC.value;
//                                     };
//                                 }
//                             }
//
//                             // Inserta a auxiliar
//                             let td = document.createElement('td');
//                             td.innerHTML = nodoB.innerHTML;
//
//                             // revisa si hay un input de filtro
//                             for (let nodoC of td.childNodes) {
//                                 if (nodoC.nodeName.toLowerCase() === 'input') {
//                                     nodoC.disabled = true;
//                                     nodoC.value = nodoC.placeholder;
//                                 }
//                             }
//
//                             objArchivo.trHeader_aux.appendChild(td);
//                             num_columnas++;
//                         }
//                     }
//                 }
//             }
//         }
//
//         if (nodo.nodeName.toLowerCase() === 'tbody') {
//             tabla.removeChild(nodo);
//         }
//     }
//
//     // Crea tbody
//     let tbody = document.createElement('tbody');
//     tbody.classList.add('tabla-body');
//
//     tabla.tbody = tbody;
//
//     let flag_primera = true;
//     let num_fila = 1;
//     // Crea las filas
//     objArchivo.filas.forEach((fila) => {
//         // si es resultado y la primer fila, procesa las cabeceras
//
//         // SEMAFOROSDERS no trae cabeceras
//         /* *************************************************** */
//         /* Temporal mientras queda el archivo de configuracion */
//         /* *************************************************** */
//
//         if (flag_primera && tabla.id !== 'SEMAFOROSDERS' && objArchivo.isResultado === true) {
//             for (let nodoA of tabla.childNodes) {
//                 if (nodoA.nodeName.toLowerCase() === 'thead') {
//                     for (let nodoB of nodoA.childNodes) {
//                         if (nodoB.nodeName.toLowerCase() === 'tr') {
//                             // Clona el encabezado
//                             objArchivo.trHeader_aux = document.createElement('tr');
//                             objArchivo.trHeader_aux.classList.add('tr-aux');
//
//                             nodoB.innerHTML = "";
//                             // Inserta los valores en la fila
//                             // La primer columna es el número de fila
//                             let th = document.createElement('th');
//                             nodoB.appendChild(th);
//
//                             // Inserta a auxiliar
//                             let td = document.createElement('td');
//                             objArchivo.trHeader_aux.appendChild(td);
//
//                             let cont_filtro = 0;
//
//                             fila.forEach((objHeader) => {
//                                 th = document.createElement('th');
//                                 th.colPos = cont_filtro;
//
//                                 // Para filtro de busqueda
//                                 if (objHeader.valor === 'UNIDAD') {
//                                     let input = document.createElement('input');
//                                     input.classList.add('input-filtro');
//                                     // input.style.width = '5vw'; // Si no se
//                                     input.placeholder = `${String.fromCharCode(0xf50d)} ${objHeader.valor}`;
//                                     input.indice = cont_filtro++;
//
//                                     input.onkeyup = (event, cadena) => {
//                                         let filtro;
//
//                                         // Si es cadena, el metodo se invocó desde su tabla par
//                                         // de lo contrario, el usuario esta escribiendo en el input
//                                         if (typeof cadena === 'string') {
//                                             filtro = cadena;
//                                             input.value = cadena;
//                                         } else {
//                                             filtro = input.value;
//                                         }
//
//                                         if (filtro === tabla.ultimoFiltro) {
//                                             // Si no hay diferencia, no hace nada
//                                             return;
//                                         }
//
//                                         tabla.filasFiltro = [];
//                                         if (filtro === '') {
//                                             // Todas visibles
//                                             tabla.filasFiltro = tabla.filasFiltro.concat(tabla.filas);
//                                         } else {
//                                             // En el arreglo de filas busca el filtro
//                                             tabla.filas.forEach((fila_tr) => {
//                                                 // Busca la columna asociada
//                                                 let colAsociada = fila_tr.columnasFiltro[th.colPos];
//                                                 // Compara el valor como cadena
//                                                 if (colAsociada.innerHTML.includes(`${filtro}`)) {
//                                                     tabla.filasFiltro.push(fila_tr);
//                                                 }
//                                             });
//                                         }
//
//                                         // Si la tabla tiene paginacion, controla la vista  através de ella
//                                         if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
//                                             // Valida filas, solo se hace aca
//                                             // ya que es el botón que se invoca cuando se filtran
//                                             tabla.paginacion.validarFilas();
//                                             tabla.paginacion.liPrimero.onclick();
//                                         } else {
//                                             tabla.tbody.innerHTML = '';
//                                             tabla.filasFiltro.forEach((fila) => {
//                                                 tabla.tbody.appendChild(fila);
//                                             });
//                                         }
//
//                                         tabla.ultimoFiltro = filtro;
//                                     };
//
//                                     th.appendChild(input);
//                                 } else {
//                                     let texto = document.createTextNode(objHeader.valor);
//                                     th.appendChild(texto);
//                                 }
//
//                                 nodoB.appendChild(th);
//
//                                 // Inserta a auxiliar
//                                 td = document.createElement('td');
//                                 td.appendChild(document.createTextNode(objHeader.valor));
//                                 objArchivo.trHeader_aux.appendChild(td);
//                             });
//
//                             break;
//                         }
//                     }
//
//                     break;
//                 }
//             }
//             flag_primera = false;
//         } else {
//             // Fila
//             let tr = document.createElement('tr');
//
//             // Fila aux
//             tr.tr_anterior = tr_anterior;
//             tr.modificado = false;
//
//             // Agrega numero de registro
//             let td_fila = document.createElement('td');
//             let texto_fila = document.createTextNode(num_fila);
//             td_fila.appendChild(texto_fila);
//             td_fila.style.fontWeight = 'bold';
//             td_fila.style.textShadow = '0px 0px 1px';
//             tr.appendChild(td_fila);
//
//             tr.columnasFiltro = [];
//             tr.columnasFiltro.push(td_fila);
//
//             // Crea columnas
//             let num_col = 1;
//             fila.forEach((objDato) => {
//                 let td = document.createElement('td');
//                 td.data = objDato;
//                 td.input = null;
//
//                 // Agrega input o no para editable
//                 if (objArchivo.editable) {
//                     let input = document.createElement('input');
//                     input.value = objDato.valor;
//                     input.fila = num_fila;
//                     input.columna = num_col;
//                     objDato.input = input;
//
//                     td.input = input;
//                     td.objDato = objDato;
//
//                     // Verifica flag unidad para inhabilitar la edicion de la unidad referenciada
//                     // TEmporal hasta que se consoliden los archivos de configuracion
//                     if (typeof objDato.flag_unidad !== 'undefined' && objDato.flag_unidad === true) {
//                         input.disabled = true;
//                         tabla.flag_unidades = true;
//                     }
//
//                     // Respaldo
//                     objDato.valorOriginal = objDato.valor;
//                     input.onblur = () => {
//                         // Si hubo cambio, se notifica
//                         if (input.value != objDato.valorOriginal) {
//                             // Verifica flag unidad para inhabilitar la edicion de la unidad referenciada
//                             // TEmporal hasta que se consoliden los archivos de configuracion
//                             if (typeof objDato.flag_unidad !== 'undefined' && objDato.flag_unidad === true) {
//                                 input.value = objDato.valorOriginal;
//                             }
//
//                             if (objDato.tipo === 'number') {
//                                 if (isNaN(input.value) || input.value === '') {
//                                     //objDato.valor = input.value;
//                                     alert(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
//                                     // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
//                                     input.classList.add('input-error');
//
//                                     setTimeout(() => {
//                                         input.focus();
//                                     }, 100);
//                                 } else {
//                                     /* *************************************************** */
//                                     /* Temporal mientras queda el archivo de configuracion */
//                                     /* *************************************************** */
//                                     if (tabla.id === 'OPPARORC_DERS') {
//                                         let valorNum = parseInt(input.value);
//                                         if (valorNum < 0 || valorNum > 24) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//                                     if (tabla.id.startsWith('ARRAR')) {
//                                         input.value = parseInt(input.value);
//                                         // Positivo
//                                         if (parseInt(input.value) < 0) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor numérico positivo`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico positivo`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//                                     if (tabla.id.startsWith('DISPO') || tabla.id.startsWith('ASIGN') || tabla.id.startsWith('COORD')) {
//                                         let valorNum = parseFloat(input.value);
//
//                                         if (valorNum !== 0 && valorNum !== 1) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//                                     if (tabla.id.endsWith('CI_DERS')) {
//                                         let valorNum = parseInt(input.value);
//
//                                         if (input.columna === 2) {
//                                             // Positivo
//                                             if (valorNum !== 0 && valorNum !== 1) {
//                                                 alert(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
//                                                 // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor 0 o 1`);
//                                                 input.classList.add('input-error');
//
//                                                 setTimeout(() => {
//                                                     input.focus();
//                                                 }, 100);
//
//                                                 return;
//                                             }
//                                         }
//
//                                         if (input.columna === 4) {
//                                             // Lo hace entero con el parseInt
//                                             valorNum = parseFloat(input.value);
//
//                                             // Positivo
//                                             if (valorNum < 0) {
//                                                 alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                                 // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                                 input.classList.add('input-error');
//
//                                                 setTimeout(() => {
//                                                     input.focus();
//                                                 }, 100);
//
//                                                 return;
//                                             }
//                                         }
//
//                                         if (input.columna === 3 || input.columna === 5) {
//                                             // Positivo
//                                             if (valorNum < 0 || valorNum > 24) {
//                                                 alert(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
//                                                 // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico entre 0 y 24`);
//                                                 input.classList.add('input-error');
//
//                                                 setTimeout(() => {
//                                                     input.focus();
//                                                 }, 100);
//
//                                                 return;
//                                             }
//                                         }
//                                     }
//
//                                     if (tabla.id.startsWith('CGMR') || tabla.id.startsWith('PREVE') || tabla.id.startsWith('POTVE') || tabla.id.startsWith('LIUNIT') || tabla.id.startsWith('LSUNIT')) {
//                                         // Positivo
//                                         if (parseFloat(input.value) < 0) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//                                     /* Zonas de reserva REQ. */
//                                     if (tabla.id.startsWith('ZONASRES_DERS') || tabla.id.startsWith('RRERO10Z_DERS') || tabla.id.startsWith('PRERO10Z_DERS') || tabla.id.startsWith('RRE10Z_DERS') || tabla.id.startsWith('PRE10Z_DERS') || tabla.id.startsWith('RRESUZ_DERS') || tabla.id.startsWith('PRESUZ_DERS') || tabla.id.startsWith('RRERESEZ_DERS') || tabla.id.startsWith('PRERESEZ_DERS')) {
//                                         // Positivo
//                                         if (parseFloat(input.value) < 0) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//                                     /* Zonas de reserva REQ. */
//                                     if (tabla.id.startsWith('AUSUBSIS_DERS') || tabla.id.startsWith('RRERO10S_DERS') || tabla.id.startsWith('PRERO10S_DERS') || tabla.id.startsWith('RRE10S_DERS') || tabla.id.startsWith('PRE10S_DERS') || tabla.id.startsWith('RRESUS_DERS') || tabla.id.startsWith('PRESUS_DERS') || tabla.id.startsWith('RRERESES_DERS') || tabla.id.startsWith('PRERESES_DERS')) {
//                                         // Positivo
//                                         if (parseFloat(input.value) < 0) {
//                                             alert(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             // mensajeConsola(`Error en el valor "${input.value}": se requiere un valor flotante positivo`);
//                                             input.classList.add('input-error');
//
//                                             setTimeout(() => {
//                                                 input.focus();
//                                             }, 100);
//
//                                             return;
//                                         }
//                                     }
//
//
//                                     /* *************************************************** */
//
//                                     objDato.valor = input.value;
//                                     mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${(tabla.flag_unidades === true ? input.columna - 1 : input.columna)}) de "${objDato.valorOriginal}" a "${input.value}" (${objArchivo.archivo})`, true);
//                                     input.classList.remove('input-error');
//                                     // Resalta el input
//                                     input.classList.add('modificado');
//                                     // REsalta la fila
//                                     tr.classList.add('modificado');
//                                     tr.modificado = true;
//                                     tr_modificados.push(tr);
//                                     objArchivo.editado = true;
//
//                                     // Marca el colapso con asterisco
//                                     let colapso = colapsos.find((col) => {
//                                         return col.id === tabla.dataset.colapso;
//                                     });
//
//                                     if (colapso) {
//                                         for (let nodo of colapso.childNodes) {
//                                             if (nodo.nodeName.toLowerCase() === 'span') {
//                                                 nodo.classList.remove('invisible');
//                                                 break;
//                                             }
//                                         }
//                                     }
//                                 }
//                             } else {
//                                 objDato.valor = input.value;
//                                 mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${objDato.valorOriginal}" a "${input.value}" (${objArchivo.archivo})`, true);
//                                 input.classList.remove('input-error');
//                                 // Resalta el input modificado
//                                 input.classList.add('modificado');
//                                 // REsalta la fila
//                                 tr.classList.add('modificado');
//                                 td.modificado = true;
//                                 tr_modificados.push(tr);
//                                 objArchivo.editado = true;
//
//                                 // Marca el colapso con asterisco
//                                 let colapso = colapsos.find((col) => {
//                                     return col.id === tabla.dataset.colapso;
//                                 });
//
//                                 if (colapso) {
//                                     for (let nodo of colapso.childNodes) {
//                                         if (nodo.nodeName.toLowerCase() === 'span') {
//                                             nodo.classList.remove('invisible');
//                                             break;
//                                         }
//                                     }
//                                 }
//                             }
//                         } else {
//                             // Si es el valor original, no hay cambio ni error
//                             input.classList.remove('modificado');
//                             input.classList.remove('input-error');
//
//                             // Verifica que hay algun valor modificado para desmarcar la fila
//                             let flag_fila_modificada = false;
//                             for (let col of tr.columnasFiltro) {
//                                 if (col.input !== null && typeof col.input !== 'undefined' && col.input.classList.contains('modificado')) {
//                                     flag_fila_modificada = true;
//                                     break;
//                                 }
//                             }
//
//                             if (flag_fila_modificada === false) {
//                                 tr.classList.remove('modificado');
//                             } else {
//                                 tr.classList.add('modificado');
//                             }
//
//
//                             // Revisa si hay modificaciones otras, sino la desmarca
//                             objArchivo.editado = false;
//
//                             for (let fila of objArchivo.filas) {
//                                 for (let columna of fila) {
//                                     if (typeof columna.input !== 'undefined' && columna.input !== null) {
//                                         if (columna.input.classList.contains('modificado')) {
//                                             objArchivo.editado = true;
//                                             break;
//                                         }
//                                     }
//
//                                     // Ya no busca más
//                                     if (objArchivo.editado === true) {
//                                         break;
//                                     }
//                                 }
//                             }
//
//                             if (objArchivo.editado === false) {
//                                 // Remueve el asterisco
//                                 let colapso = colapsos.find((col) => {
//                                     return col.id === tabla.dataset.colapso;
//                                 });
//
//                                 if (colapso) {
//                                     for (let nodo of colapso.childNodes) {
//                                         if (nodo.nodeName.toLowerCase() === 'span') {
//                                             nodo.classList.add('invisible');
//                                             break;
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     };
//
//                     td.appendChild(input);
//                     num_col++;
//                 } else {
//                     let valor;
//                     if (objDato.valor.length > 15) {
//                         let valorFloat = parseFloat(objDato.valor);
//                         // Si es numero y tiene más de 6 decimales
//                         if (!isNaN(valorFloat) && objDato.valor.includes('.') && objDato.valor.split('.')[1].length > 10) {
//                             valor = `${valorFloat.toFixed(10)}`;
//                         } else {
//                             valor = objDato.valor;
//                         }
//                     } else {
//                         valor = objDato.valor;
//                     }
//
//                     let texto = document.createTextNode(valor);
//                     td.appendChild(texto);
//                 }
//
//                 tr.appendChild(td);
//                 tr.columnasFiltro.push(td);
//             });
//
//             // Si trae menos columnas, completa
//             for (let i = num_col; i < num_columnas; i++) {
//                 td = document.createElement('td');
//                 tr.appendChild(td);
//             }
//
//             // Eventos mouse
//             // hover
//             tr.onmouseover = () => {
//                 // Inserta header para guia
//                 if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
//                     // Si no es la fila proxima al header principal
//                     if (tr.flagTop === false) {
//                         try {
//                             // Inserta el header auxiliar
//                             tbody.insertBefore(objArchivo.trHeader_aux, tr.tr_anterior);
//                         } catch (e) {}
//
//                         try {
//                             // Quita la fila anterior
//                             tbody.removeChild(tr.tr_anterior);
//                         } catch (e) {}
//                     }
//                 }
//             };
//
//             tr.onmouseout = () => {
//                 // Inserta header para guia
//                 if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
//                     // Si no es la fila proxima al header principal
//                     if (tr.flagTop === false) {
//                         // Reinserta la fila antes del header aux
//                         try {
//                             tbody.insertBefore(tr.tr_anterior, objArchivo.trHeader_aux);
//                         } catch (e) {}
//
//                         try {
//                             // Quita  el header aux del dom
//                             tbody.removeChild(objArchivo.trHeader_aux);
//                         } catch (e) {}
//                     }
//                 }
//             };
//
//             num_fila++;
//             tbody.appendChild(tr);
//
//             tabla.filas.push(tr);
//
//             // Fila auxiliar
//             tr_anterior = tr;
//         }
//     });
//
//     tabla.appendChild(tbody);
//
//     // Por defecto agrega todas las filas a la vista
//     tabla.filasFiltro = [].concat(tabla.filas);
//
//     // Verifica si require paginacion
//     if (objArchivo.filas.length > MAX_ROWS) {
//         // Si ya existe el objeto, solo reconstruye
//         if (typeof tabla.paginacion !== 'undefined' && tabla.paginacion !== null) {
//             tabla.paginacion.init();
//         } else {
//             tabla.paginacion = new Paginacion(tabla);
//         }
//     } else {
//         // Elimina paginacion anterior
//         if (typeof tabla.tfoot !== 'undefined') {
//             tabla.tfoot.innerHTML = '';
//         }
//     }
//
//     let colapso = null;
//     for (let col of colapsos) {
//         if (col.id === tabla.dataset.colapso) {
//             colapso = col;
//             break;
//         }
//     }
//
//     // Habilita su colapso si hubo datos
//     if (colapso) {
//         if (objArchivo.numFilas > 0) {
//             colapso.classList.remove('inactivo');
//             colapso.classList.remove('vacio');
//         } else {
//             // console.log(id, 'no tiene datos');
//             colapso.classList.remove('inactivo');
//             colapso.classList.add('vacio');
//         }
//     }
//
//     /* ********************** */
//     /* Busca copias de tabla  */
//     /* ********************** */
//     if (id === 'ZONASRES_DERS') {
//         console.log('Copiando ZONASRES_DERS');
//         crearTablaInfo(objArchivo, true);
//     }
//
//     if (id === 'AUSUBSIS_DERS') {
//         console.log('Copiando AUSUBSIS_DERS_COPIA');
//         crearTablaInfo(objArchivo, true);
//     }
//
//     // Verifica su archivo para el nombre en el span del colapso
//     if (objArchivo.isResultado === true) {
//         spans_archivos_info.forEach((span) => {
//             if (span.id.startsWith('ARCH')) {
//                 let arch_id = span.id.replace('ARCH-', '');
//                 if (id.startsWith(arch_id)) {
//                     span.innerHTML = `${id}.csv`;
//                 }
//             }
//         });
//         tabla.isResultado = true;
//     }
// }

function crearTablaInfoKendo(objData) {
	// Remueve el contenido anterior
	// Busca el contenedor
	let id_cont = '#COLAPSABLE_' + objData.insumo.modelo.id;
	let contenedor = $(id_cont);
	// Vacia su contenido
	contenedor.html('');
	// Inserta una nueva tabla
	let nueva_tabla = document.createElement('table');
	nueva_tabla.classList.add('table');
	nueva_tabla.classList.add('table-sm');
	nueva_tabla.classList.add('table-striped');
	nueva_tabla.id = objData.insumo.modelo.id;
	// Inserta la nueva tabla
	contenedor.append(nueva_tabla);

	// Id de la tabla (nombre del archivo)
	let id = objData.insumo.modelo.id;

    banner.trabajando();
    banner.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${objData.archivo}</font>`);

	if (!id.startsWith('#')) {
		id = '#' + id;
	}

    // Determina el tamano de paginacion
    let page_size = 10;
    if (typeof objData.insumo.segmentos === 'number' && objData.insumo.segmentos > 0) {
        page_size = objData.insumo.segmentos;

        // Si es un numero pequeño
        if (page_size < 5) {
            page_size *= 3;
        } else if (page_size < 10) {
            page_size *= 2;
        }
    }

	// Inserta el modelo y los datos en el dataSource
	let dataSourceObj = {
        pageSize: page_size,
		schema: {
			model: objData.insumo.modelo
		},
		data: objData.filas,
		autoSync: true
	};

    // Colapso de la tabla
	let colapso = colapsos.find((col) => { return col.id === 'COLAPSO_'  + objData.insumo.modelo.id; });
    console.log(objData.insumo.modelo.id, 'dataSourceObj',dataSourceObj, colapso);

	try {
		let dataSource = new kendo.data.DataSource(dataSourceObj);
		// Valida campos dependientes del algoritmo
		if (objData.insumo.algDep === true) {
			let periodos = 8;
			if (objData.algoritmo === 'dersmi') {
				periodos = 4;
			} else if (objData.algoritmo === 'dersi') {
				periodos = 1;
			}
			console.log('>>>> Periodos', periodos);

            // Oculta la columna de periodo que no aplica
			objData.insumo.columnas.forEach((columna) => {
				if (typeof columna.periodo === 'number' && columna.periodo > periodos) {
					columna.hidden = true;
					// console.log('Oculta', columna.field);
				}
			});
		}

		// Agrega editor a valores numéricos para validar decimales
		if (objData.insumo.columnas !== null && typeof objData.insumo.columnas !== 'undefined')  {
			objData.insumo.columnas.forEach((columna) => {
				try {
					let campo = objData.insumo.modelo.fields[columna.field];

					// Si es numerico crea un editor para validacion
					if (campo.type === 'number') {
                        if (typeof campo.validation !== 'undefined') {
                            console.log('Aplicando editor personalizado:', campo.validation);
                            columna.editor = function (container, options) {
                                $('<input name="' + options.field + '"/>')
                                 .appendTo(container)
                                 .kendoNumericTextBox(campo.validation)
                            };
                        } else {
                            console.log('Aplicando editor basico');
                            columna.editor = function (container, options) {
                                $('<input name="' + options.field + '"/>')
                                 .appendTo(container)
                                 .kendoNumericTextBox({
                                     decimals: 2,
                                     format: 'n',
                                     round: false
                                 })
                            };
                        }
					}
				} catch (e) {
					console.log('ERR EDITOR', objData.insumo.modelo.id, e);
				}
			});
		} else {
			console.log('No trae columnas');
		}

		// En el objeto del grid inserta las columnas
        gridsInfo.push($(id).kendoGrid({
			dataSource: dataSource,
			columns: objData.insumo.columnas,
			sortable: {
				showIndexes: true,
				mode: "multiple"
			},
			filterable: {
				messages: {
					and: "Y",
					or: "O",
					filter: "Aplicar Filtro",
					clear: "Limpiar Filtro",
					info: "Elementos filtrados por"
				},
				operators: {
					string: {
						eq: "Igual que",
						neq: "Diferente que",
						startswith: "Comienza con",
						endswith: "Termina con",
						contains: "Contiene",
						doesnotcontains: "No contiene",
						isnull: "Es nula",
						isnotnull: "No es nula",
						isempty: "Está vacía",
						isnotempty: "No está vacía"
					},
					number: {
						eq: "Igual que",
						neq: "Diferente que",
						gt: "Mayor que",
						gte: "Mayor o igual que",
						lt: "Menor que",
						lte: "Menor o igual que",
						isnull: "Es nulo",
						isnotnull: "No es nulo",
					}
				}
			},
			scrollable: {endless: true},
			navigatable: true,
			pageable: {
				messages: {
					display: "Mostrando {0}-{1} de {2} registros",
					empty: "No hay registros en el archivo"
				}
			},
			reorderable: false,
			groupable: false,
			resizable: true,
			columnMenu: false,
			editable: true,
			save: function (e) {
                // Confirma la celda modificada
                let objCelda = listaFilasColumnas.find((obj) => { return obj.id === objData.insumo.modelo.id && obj.fila === ultimaFila && obj.columna === ultimaColumna});
                if (objCelda) {
                    console.log('Celda modificada');
                    objCelda.modificado = true;
                    // Actualiza las filas
                    objData.filas = gridsInfo.find((grid) => {return grid[0].id === objData.insumo.modelo.id}).data('kendoGrid').dataSource.data();
                }

                // Marca el colapso como editado
                if (colapso) {
                    for (let nodo of colapso.childNodes) {
                        if (nodo.nodeName.toLowerCase() === 'span') {
                            nodo.classList.remove('invisible');
                            break;
                        }
                    }
                }

                // Resalta las celdas modificadas (todas las tablas)
                // Usa un timeout porque el grid genera nuevos elementos al actualizar
                // El timeout asegura que se tomen los nuevos elementos insertados
                setTimeout(() => {
                    resaltarCeldas();
                }, 100);
			},
			edit: function(e) {
                // Obtiene el indice de la celda y el uid de la fila
                let inputCell = e.container.find("input")[0];
                let tdPadre = inputCell.parentNode.parentNode.parentNode;
                ultimaColumna = e.container[0].cellIndex;
                ultimaFila = tdPadre.parentNode.dataset.uid;

                // los registra en la lista de modificados
                if (!listaFilasColumnas.find((obj) => { return obj.id === objData.insumo.modelo.id && obj.fila === ultimaFila && obj.columna === ultimaColumna})) {
                    listaFilasColumnas.push({id: objData.insumo.modelo.id, fila: ultimaFila, columna: ultimaColumna, modificado: false});
                }
			},
		}));
	} catch (e) {
		console.log(' ERROR >>>', e);
	}

    // Habilita su colapso si hubo datos
    if (colapso) {
		colapso.classList.remove('inactivo');
        // Si no tiene datos, marca como vacio
		if (objData.filas.length > 0) {
			colapso.classList.remove('vacio');
		} else {
			colapso.classList.add('vacio');
		}
    }

	// Colapsa el contenedor
	colapsar(colapso, 'COLAPSABLE_' + objData.insumo.modelo.id);
}

function resaltarCeldas() {
    // Quita los objetos sin modificacion confirmada
    listaFilasColumnas = listaFilasColumnas.filter((obj) => {return obj.modificado === true});
    console.log('Filtrando modificados', listaFilasColumnas);

    listaFilasColumnas.forEach((obj) => {
        let columna = $(`tr[data-uid='${obj.fila}'] > td:nth-child(${obj.columna + 1})`);
        // console.log('Columna', columna[0]);
        columna[0].classList.add('celda-modificada');

        let fila = columna[0].parentNode;
        // console.log('Fila', fila);
        fila.classList.add('fila-modificada');
    });
}

function actualizarResultadoInfo(flag_banner) {
    if (objEscModificado.resActualizados === true) {
        console.log();
        return;
    }

    salida_algoritmo += '<br>Actualizando resultados...';
    consolaExe.setTexto(salida_algoritmo);

    mensajeConsola('Cargando resultados en información del escenario...', false);
    banner.setMensaje('Actualizando Resultados...');
    banner.actualizando();

    if (flag_banner === true) {
        banner.mostrar();
    } else {
        banner.ocultar();
    }

    ipcRenderer.send('escenario_resultados:leer', objEscModificado.ruta, SESION.algoritmo);
}

ipcRenderer.on('escenario_resultados:leido', (event, obj) => {
    console.log('Recibe contenedor de archivos resultado:', obj.lista.length);

    // Recibe el contenedor
    objEscModificado.totalResultados = obj.numArchivos;
    objEscModificado.contadorResultados = 0;
});

ipcRenderer.on('escenario_resultados:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo);

    // Busca el obj en el arreglo y lo reemplaza
    for (let i = 0; i < objEscModificado.lista.length; i++) {
        if (objEscModificado.lista.archivo === obj_archivo.archivo) {
            objEscModificado.splice(i, 1, obj_archivo);
            break;
        }
    }

    objEscModificado.contadorResultados++;

    // Agrega lista de promesas
    setTimeout(() => {
        promesas_archivos.push(new Promise((resolve, reject) => {
            crearTablaInfoKendo(obj_archivo);
            resolve();
        }));
    });

    if (objEscModificado.contadorResultados === objEscModificado.totalResultados) {
        setTimeout(() => {
            Promise.all(promesas_archivos).then(() => {
                banner.ok();
                banner.setMensaje('Actualización Finalizada');

                // Marca la bandera para que no vuelva a actualizar
                objEscModificado.resActualizados = true;

                // Manda a leer el archivo de costos e ingresos
                ipcRenderer.send('archivo:leer', objEscModificado.ruta, ['dirres', 'r_desphora1.res'], 'INFO_COSTOS');

                salida_algoritmo += '. Hecho';
                consolaExe.setTexto(salida_algoritmo);

                setTimeout(() => {
                    banner.ocultar();

                    // Habilita botones
                    consolaExe.habilitarBoton('ejecutar', true);
                    consolaExe.habilitarBoton('cerrar', true);
                    consolaExe.habilitarBoton('resultados', true);
                }, 1000);

                promesas_archivos = [];
            });
        });
    }
});

function guardarEscenario(flag_actualizar) {
    let folio;
    let flag_copiar;
    let listaArchivos = [];
    let ruta_origen;
    let ruta_destino;

    // Si no esta definido se crea un nuevo folio,
    if (typeof objEscModificado === 'undefined' || objEscModificado === null || typeof flag_actualizar === 'undefined' || flag_actualizar === false) {
        folio = moment().format('YYYYMMDDHHmm');
        flag_copiar = true;
        banner.setMensaje(`Generando escenario modificado`);

        // Si ya generó previamente un modificado,
        // utiliza esos archivos para incluir todos los cambios realizados
        if (objEscModificado !== null && typeof objEscModificado !== 'undefined') {
            ruta_origen = objEscModificado.ruta;
            ruta_destino = ruta_origen.replace(objEscModificado.folio, folio);
        } else {
            ruta_origen = objEscOriginal.ruta;
            ruta_destino = `${objEscOriginal.ruta.replace('escenario_original', 'escenario_modificado')}\\${folio}`;
        }

        // Manda a leer el archivo de costos e ingresos
        ipcRenderer.send('archivo:leer', objEscOriginal.ruta, ['dirres', 'r_desphora1.res'], 'INFO_COSTOS');
        // objEscModificado = null;
    } else {
        folio = objEscModificado.folio;
        flag_copiar = false;

        ruta_origen = objEscModificado.ruta;
        ruta_destino = ruta_origen.replace(objEscModificado.folio, folio);

        banner.setMensaje(`Actualizando escenario`);

        // Sublista para obtener los id de los archivos
        let sublista = [];
        listaFilasColumnas.forEach((obj) => {
            if (obj.modificado === true) {
                if (!sublista.find((item) => { return item === obj.id})) {
                    sublista.push(obj.id);
                }
            }
        });

        listaArchivos = objEscOriginal.lista.filter((archivo) => { return sublista.find((item) => {return item === archivo.insumo.modelo.id}) });
        console.log('listaArchivos', listaArchivos);
    }

    console.log('folio',folio);
    SESION.folio_generado = folio;

    banner.vistaCompacta();
    banner.ocultarBoton();
    banner.trabajando();
    banner.mostrar();

    setTimeout(() => {
        ipcRenderer.send('escenario_original:copiar', ruta_origen, ruta_destino, folio, listaArchivos, flag_copiar, textarea_comentarios_info.value);
    }, 250);
}

ipcRenderer.on('escenario_original:copiado', (event, res) => {
    if (res.estado) {
        banner.ok();

        if (typeof objEscModificado !== 'undefined' && objEscModificado !== null && objEscModificado.folio === res.folio) {
            mensajeConsola(`Se actualizó el escenario modificado con folio ${res.folio} a partir de ${res.id}`, true);

            banner.setMensaje(`Actualización completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);

            // boton_nuevoFolio.disabled = false;
        } else {
            mensajeConsola(`Se generó un escenario modificado con folio ${res.folio} a partir de ${res.id}`, false);
            ipcRenderer.send('bitacora:inicializa', res.ruta);
            banner.setMensaje(`Copia completada. Folio del escenario: <font style="color:lightgreen; text-decoration:underline;">${res.folio}</font>`);

            boton_nuevoFolio.disabled = true;
            // Establece un to de 1 min para habilitar nuevo folio
            setTimeout(() => {
                boton_nuevoFolio.disabled = false;
            }, 60000);
        }

        // Actualiza las etiquetas
        // let folio_labels = document.getElementsByClassName('label-folio-esc');
        for (let label of folio_labels) {
            label.innerHTML = `Folio: <b>${res.folio}</b>`;
        }

        // Asigna el nuevo objeto acarreado
        // Internamente se comparte la lista de objetos archivo
        // No afecta, debido a que el escenario original nunca será modificado
        // Y las comparaciones se hacen con archivos resultados en objetos diferentes
        objEscModificado = null;
        objEscModificado = {
            algoritmo: objEscOriginal.algoritmo,
            lista: objEscOriginal.lista,
            numArchivos: objEscOriginal.numArchivos
        };
        objEscModificado.folio = res.folio;
        objEscModificado.ruta = res.ruta;

        // Desmarca modificaciones
        listaFilasColumnas.forEach((obj) => {
            $(`tr[data-uid='${obj.fila}']`).removeClass('fila-modificada');
            $('td.celda-modificada').removeClass('celda-modificada');
        });
        // Borra la lista de filas/columnas
        listaFilasColumnas = [];

        // Quita asteriscos de cambios
        for (let col of colapsos) {
            for (let nodo of col.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span' && !nodo.classList.contains('span-costos')) {
                    nodo.classList.add('invisible');
                    break;
                }
            }
        }

        // Habilita boton actualizar
        boton_actualizarEscenario.disabled = false;

        // Habilita el boton de ejecutar
        if (res_algoritmo.estado === true) {
            boton_ejecutarEscenario.disabled = false;
            boton_ejecutarEscenario.innerHTML = '<span class=""><i class="demo-icon icon-play-2"></i></span>Ejecutar';
        } else {
            boton_ejecutarEscenario.disabled = true;
            boton_ejecutarEscenario.innerHTML = '<span class=""><i class="demo-icon icon-warning" style="color:yellow;"></i></span>No hay algoritmo';
        }

        setTimeout(() => {
            banner.ocultar();
        }, 2000);
    } else {
        banner.error();
        // mensajeConsola(`Ocurrió un problema al generar el escenario modificado: ${res.error}`);
        banner.setMensaje(res.error);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
    }
});

function ejecutarAlgoritmo() {
    consolaExe.setTitulo(`Ejecución de algoritmo ${SESION.algoritmo} para folio ${objEscModificado.folio}`);
    consolaExe.addBoton('resultados', 'Resultados', () => {
        consolaExe.ocultar();
        mostrarResultados();

        // Actualiza la info resultados
        actualizarResultadoInfo(false);
        // Oculta el banner
        banner.ocultar();
    });
    consolaExe.addBoton('ejecutar', 'Ejecutar', () => {
        salida_algoritmo = '';
        consolaExe.setTexto('');
        consolaExe.mostrarBanner();
        console.log('Ejecuta', objEscModificado.ruta, SESION.algoritmo);
        ipcRenderer.send('algoritmo:ejecutar', objEscModificado.ruta, SESION.algoritmo);
        mensajeConsola(`Ejecutando algoritmo ${SESION.algoritmo} para folio ${objEscModificado.folio}`, true);

        // Deshabilita botones
        consolaExe.habilitarBoton('ejecutar', false);
        consolaExe.habilitarBoton('cerrar', false);
        consolaExe.habilitarBoton('resultados', false);
    });
    consolaExe.addBoton('cerrar', 'Cerrar', () => {
        consolaExe.ocultar();
        // Actualiza la info resultados
        // actualizarResultadoInfo(true);
    });

    consolaExe.habilitarBoton('ejecutar', false);
    consolaExe.habilitarBoton('cerrar', false);
    consolaExe.mostrar();

    // Si no se ha ejecutado
    if (objEscModificado.ejecutado !== true) {
        consolaExe.getBoton('ejecutar').onclick();

        // Habilita ejecutar y cerrar
        consolaExe.habilitarBoton('ejecutar', false);
        consolaExe.habilitarBoton('cerrar', false);
    } else {
        // Resultados se habilita solo al recibir el resultado sin infactibilidad
        consolaExe.habilitarBoton('ejecutar', true);
        consolaExe.habilitarBoton('cerrar', true);
    }
}

ipcRenderer.on('algoritmo:ejecucionParcial', (event, output) => {
    salida_algoritmo += output;
    consolaExe.setTexto(salida_algoritmo);
});

ipcRenderer.on('algoritmo:ejecutado', (event, res) => {
    salida_algoritmo += res.cadena;

    consolaExe.setTexto(salida_algoritmo);
    consolaExe.salto();
    // consolaExe.habilitarBoton('cerrar', true);

    // Marca el escenario como ejecutado
    objEscModificado.ejecutado = true;
    objEscModificado.resActualizados = false;
    objEscModificado.infactible = res.infactible;

    // Invo0ca diagnostico
    if (res.infactible === true) {
        console.log('Verificando infactibilidad');
        consolaExe.appendTexto(`<font color='red'>Infactibilidad encontrada durante la ejecución.</font>`);
        mensajeConsola(`Infactibilidad encontrada durante la ejecución.`, true);

        ipcRenderer.send('algoritmo:diagnosticar', objEscModificado.ruta, 'RES_EJECUCION');

        if (res.codigo < 0) {
            consolaExe.appendTexto(`<font color='red'>Error de ejecución del algoritmo: ${res.mensaje}</font>`);
            mensajeConsola(`Error de ejecución del algoritmo: ${res.mensaje}`, true);
        }

        // Habilita botones
        consolaExe.habilitarBoton('ejecutar', true);
        consolaExe.habilitarBoton('cerrar', true);
        consolaExe.habilitarBoton('resultados', false);
    } else {
        // Si no hubo infactibilidad, se habilita resultados
        // consolaExe.habilitarBoton('resultados', true);

        if (res.exito === true) {
            consolaExe.appendTexto(`<font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`);
            mensajeConsola(`Fin de ejecución del algoritmo; terminación normal`, true);

            setTimeout(() => {
                actualizarResultadoInfo(true);
            }, 250);
        } else {
            // Habilita botones
            consolaExe.habilitarBoton('ejecutar', true);
            consolaExe.habilitarBoton('cerrar', true);
            consolaExe.habilitarBoton('resultados', false);
        }
    }

    // consolaExe.habilitarBoton('ejecutar', true);
    setTimeout(() => {
        consolaExe.ocultarBanner();
    }, 500);
});

ipcRenderer.on('algoritmo:diagnosticado', (event, res) => {
    if (res.codigo >= 0) {
        if (res.opc === 'RES_EJECUCION') {
            consolaExe.appendTexto(`<br><label style="display:block;text-align: center;">= = = = = = = = = =<font style="color:greenyellow;"> Verificación de Infactibilidad </font>= = = = = = = = = =</label><br>${res.cadena}<br><br>`);
        } else if (res.opc === 'RES_ORIGINAL') {
            consolaExe.appendTexto(`<br><label style="display:block;text-align: center;">= = = = = = = = = =<font style="color:greenyellow;"> Verificación de Infactibilidad </font>= = = = = = = = = =</label><br>${res.cadena}<br><br>`);
        } else if (res.opc === 'RES_COMPARA') {
            let con = null;

            if (res.rutaBase === objEscA_res.ruta) {
                con = consola_resA;
            } else if (res.rutaBase === objEscB_res.ruta) {
                con = consola_resB;
            }

            con.appendTexto(`<br><label style="display:block;text-align: center;">= = = = = = = = = =<font style="color:greenyellow;"> Verificación de Infactibilidad </font>= = = = = = = = = =</label><br>${res.cadena}<br><br>`);
        }
    }
});

function mostrarSalidaAlgoritmoOriginal() {
    ipcRenderer.send('archivo:leer', objEscOriginal.ruta, ['dirres', 'bitacora.res'], 'RES_ORIGINAL');

    let ruta = objEscOriginal.ruta;
    if (ruta.endsWith('\\')) {
        ruta = objEscOriginal.ruta.slice(0, objEscOriginal.ruta.length - 1);
    }

    let arg_id = ruta.split('\\');
    let id = arg_id[arg_id.length - 1];
    // Muestra banner
    consolaExe.setTitulo(`Ejecución de algoritmo en escenario ${id}`);
    consolaExe.setTexto('');
    consolaExe.mostrarBanner();
    consolaExe.ocultarBoton('ejecutar');
    consolaExe.ocultarBoton('resultados');
    consolaExe.addBoton('cerrar', 'Cerrar', () => {
        consolaExe.ocultar();
    });
    consolaExe.mostrar();
}
