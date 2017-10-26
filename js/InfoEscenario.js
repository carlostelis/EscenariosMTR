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
            banner.ocultar();
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
    // Borra el tbody anterior
    for (let nodo of tabla.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'thead') {
            for (let nodoA of nodo.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'tr') {
                    // Clona el encabezado
                    objArchivo.trHeader_aux = document.createElement('tr');
                    objArchivo.trHeader_aux.classList.add('tr-aux');

                    for (let nodoB of nodoA.childNodes) {
                        if (nodoB.nodeName.toLowerCase() === 'th') {
                            // Inserta a auxiliar
                            let td = document.createElement('td');
                            td.innerHTML = nodoB.innerHTML;
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

    let num_fila = 1;
    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // Fila
        let tr = document.createElement('tr');

        // Fila aux
        tr.tr_anterior = tr_anterior;

        // Agrega numero de registro
        let td_fila = document.createElement('td');
        let texto_fila = document.createTextNode(num_fila);
        td_fila.appendChild(texto_fila);
        td_fila.style.fontWeight = 'bold';
        td_fila.style.textShadow = '0px 0px 1px';
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
                objDato.input = input;

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
                                objDato.valor = input.value;
                                alert(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                input.classList.add('input-error');
                                setTimeout(() => {
                                    input.focus();
                                }, 100);
                            } else {
                                objDato.valor = input.value;
                                mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${objDato.valorOriginal}" a "${input.value}" (${objArchivo.archivo})`);
                                input.classList.remove('input-error');
                                // input.style.backgroundColor = 'darksalmon';
                                input.classList.add('modificado');
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
                            // input.style.backgroundColor = 'darksalmon';
                            input.classList.add('modificado');
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
                    tbody.insertBefore(objArchivo.trHeader_aux, tr.tr_anterior);
                    // tr.tr_anterior.style.display = 'none';
                    tbody.removeChild(tr.tr_anterior);
                }
            }
        };

        tr.onmouseout = () => {
            // Inserta header para guia
            if (objArchivo.trHeader_aux && tr.tr_anterior != null) {
                // Si no es la fila proxima al header principal
                if (tr.flagTop === false) {
                    // Reinserta la fila antes del header aux
                    tbody.insertBefore(tr.tr_anterior, objArchivo.trHeader_aux);

                    try {
                        // Quita  el header aux del dom
                        tbody.removeChild(objArchivo.trHeader_aux);
                    } catch (e) {}

                    // tr.tr_anterior.style.display = 'table-row';
                }
            }
        };

        num_fila++;
        tbody.appendChild(tr);

        // Fila auxiliar
        tr_anterior = tr;
    });

    tabla.appendChild(tbody);

    // Verifica si require paginacion
    if (objArchivo.filas.length > MAX_ROWS) {
        // Si ya existe el objeto, solo reconstruye
        if (typeof tabla.paginacion !== 'undefined') {
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

function guardarEscenario() {
    let folio;
    let flag_copiar;

    // Si no esta definido se crea un nuevo folio,
    if (typeof objEscModificado === 'undefined' || objEscModificado === null) {
        folio = moment().format('YYYYMMDDHHmm');
        flag_copiar = true;
        banner.setMensaje(`Generando escenario modificado`);
    } else {
        folio = objEscModificado.folio;
        flag_copiar = false;
        banner.setMensaje(`Actualizando escenario`);
    }

    console.log('folio',folio);

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
    banner.deshabilitarBoton();
    banner.setBoton('Resultados', () => {
        //mostrarResultados();
        mostrarResultados2();
        banner.ocultar();
    });
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
