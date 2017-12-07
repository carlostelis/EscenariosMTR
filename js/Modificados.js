// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function consultarAniosEscOriginales() {
    if (select_mod_algoritmo.value === 'defecto') {
        return;
    }

    select_mod_anio.innerHTML = '';
    select_mod_mes.innerHTML = '';
    select_mod_dia.innerHTML = '';
    select_mod_esc_original.innerHTML = '';
    select_mod_esc_modificado.innerHTML = '';

    // Desactiva boton
    boton_cargaEscenarioMod.disabled = true;
    // boton_guardaBDEscenarioMod.disabled = true;

    ipcRenderer.send('escenarios_mod_anios:leer', select_mod_algoritmo.value);
}

function consultarMesesEscOriginales() {
    if (select_mod_anio.value === 'defecto') {
        return;
    }

    select_mod_mes.innerHTML = '';
    select_mod_dia.innerHTML = '';
    select_mod_esc_original.innerHTML = '';
    select_mod_esc_modificado.innerHTML = '';

    // Desactiva boton
    boton_cargaEscenarioMod.disabled = true;
    // boton_guardaBDEscenarioMod.disabled = true;

    ipcRenderer.send('escenarios_mod_meses:leer', select_mod_algoritmo.value, select_mod_anio.value);
}

function consultarDiasEscOriginales() {
    if (select_mod_mes.value === 'defecto') {
        return;
    }

    select_mod_dia.innerHTML = '';
    select_mod_esc_original.innerHTML = '';
    select_mod_esc_modificado.innerHTML = '';

    // Desactiva boton
    boton_cargaEscenarioMod.disabled = true;
    // boton_guardaBDEscenarioMod.disabled = true;

    ipcRenderer.send('escenarios_mod_dias:leer', select_mod_algoritmo.value, select_mod_anio.value, select_mod_mes.value);
}

function consultarEscOriginales() {
    if (select_mod_dia.value === 'defecto') {
        return;
    }

    select_mod_esc_original.innerHTML = '';
    select_mod_esc_modificado.innerHTML = '';

    // Desactiva boton
    boton_cargaEscenarioMod.disabled = true;
    // boton_guardaBDEscenarioMod.disabled = true;

    ipcRenderer.send('escenarios_mod_originales:leer', select_mod_algoritmo.value, select_mod_anio.value, select_mod_mes.value, select_mod_dia.value);
}

function consultarEscOriginalesMod() {
    if (select_mod_esc_original.value === 'defecto') {
        return;
    }

    select_mod_esc_modificado.innerHTML = '';

    // Desactiva boton
    boton_cargaEscenarioMod.disabled = true;
    // boton_guardaBDEscenarioMod.disabled = true;

    ipcRenderer.send('escenarios_mod_modificados:leer', select_mod_algoritmo.value, select_mod_anio.value, select_mod_mes.value, select_mod_dia.value, select_mod_esc_original.value);
}

function verificarDatosEscenarioMod() {
    if (select_mod_esc_modificado.value === 'defecto' || typeof select_mod_esc_modificado.value === 'undefined') {
        boton_cargaEscenarioMod.disabled = true;
    } else {
        boton_cargaEscenarioMod.disabled = false;
    }
}

ipcRenderer.on('escenarios_mod_anios:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_anio, lista, 'Año');
        }
    }
});

ipcRenderer.on('escenarios_mod_meses:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_mes, lista, 'Mes');
        }
    }
});

ipcRenderer.on('escenarios_mod_dias:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_dia, lista, 'Día');
        }
    }
});

ipcRenderer.on('escenarios_mod_originales:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_esc_original, lista, 'Escenario');
        }
    }
});

ipcRenderer.on('escenarios_mod_modificados:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_esc_modificado, lista, 'Escenarios');
        }
    }
});

function cargarSelectMod(select, lista, defecto) {
    select.innerHTML = '';

    // Agrega opcion defecto
    opt = document.createElement('option');
    opt.innerHTML = defecto;
    opt.selected = true;
    opt.disabled = true;
    opt.value = 'defecto';
    select.appendChild(opt);

    lista.forEach((item) => {
        opt = document.createElement('option');
        opt.innerHTML = item;
        opt.value = item;
        select.appendChild(opt);
    });
}

function colapsarMod(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = false;
    let tabla_buscada;

    // La busca en el arreglo en vez de ir al dom
    for (let tabla of tablas_mod) {
        if (tabla.id === id || tabla.id.replace('$', '') === id) {
            tabla_buscada = tabla;
            break;
        }
    }

    if (!typeof trigger.desplegado === 'undefined') {
        trigger.desplegado = false;
    }

    if (tabla_buscada) {
        // let contenedor = document.getElementById(tabla_buscada.dataset.contenedor);
        let contenedor = colapsables_mod.find((col_info) => {
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

function mostrarContenedorMod(id, trigger) {
    for (let cont of contenedores_mod) {
        if (cont.id === id) {
            cont.style.display = 'block';
        } else {
            cont.style.display = 'none';
        }
    }

    for (let opc of opciones_menu_mod) {
        opc.classList.remove('active');
    }
    trigger.classList.add('active');
}

function mostrarTodasMod() {
    // Reestablece los colapsos
    for (let col of colapsos_mod) {
        col.classList.remove('inactivo');
        col.classList.remove('vacio');

        // Busca su tabla
        // Si no existe la propiedad o esta colapsado, activa su funcion
        if (typeof col.desplegado === 'undefined' || col.desplegado === false) {
            col.onclick();
        }
    }
}

function ocultarTodasMod() {
    // Reestablece los colapsos
    for (let col of colapsos_mod) {
        col.classList.add('inactivo');

        // Siesta desplegado, lo colpasa
        if (col.desplegado === true) {
            col.onclick();
        }
    }
}

function colapsarTodasMod(flagClass) {
    for (let col of colapsos_mod) {
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

function desactivarColapsosMod() {
    // Reestablece los colapsos
    for (let col of colapsos_mod) {
        col.classList.add('inactivo');
    }
}

function borrarThPeriodosMod() {
    // Borra los periodos anteriores
    // Se asegura de borrar todos los th-periodo
    // No se borran todos a la primer pasada
    do {
        console.log('periodos a borrar', th_periodos_mod.length);
        for (let thp of th_periodos_mod) {
            if (thp.nodeName.toLowerCase() === 'th') {
                thp.parentNode.removeChild(thp);
            }
        }

        th_periodos = document.getElementsByClassName('th-periodo-mod');
    } while (th_periodos_mod.length > 0);
}

function vaciarTablasMod() {
    // Tablas del dom
    for (let tabla of tablas_mod) {
        for (let nodo of tabla.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'tbody') {
                tabla.removeChild(nodo);
                break;
            }
        }
    }
}

ipcRenderer.on('escenario_entradas:leido', (event, obj) => {
    console.log('Recibe contenedor de archivos:', obj.lista.length);

    setTimeout(() => {
        // Oculta todas
        colapsarTodas(true);

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
    }, 100);

    // Recibe el contenedor
    objEscOriginal = obj;
    objEscOriginal.contador = 0;
    promesas_archivos = [];
});

function cargarEscenarioModActual() {
    // C:\AppAnalizadorEscenarios\BCA\autr\escenario_modificado\2017\11\17\201711170001_-08\201711171559
    let elementos = objEscModificado.ruta.split('\\');
    let size = elementos.length;
    let esc_mod = elementos[size - 1];
    let esc_ori = elementos[size - 2];
    let dia = elementos[size - 3];
    let mes = elementos[size - 4];
    let anio = elementos[size - 5];
    let algoritmo = elementos[size - 7];

    console.log(algoritmo, anio, mes, dia, esc_ori, esc_mod);

    // Configura banner
    banner.vistaCompacta();
    banner.setMensaje('Leyendo Información');
    banner.ocultarBoton();
    banner.cargando();
    banner.mostrar();

    ipcRenderer.send('escenarios_mod:leer_todo', SESION.algoritmo, anio, mes, dia, esc_ori, esc_mod);
}

function cargarEscenarioModActual2() {
    // Configura banner
    banner.vistaCompacta();
    banner.setMensaje('Leyendo Información');
    banner.ocultarBoton();
    banner.cargando();
    banner.mostrar();

    setTimeout(() => {
        new Promise((resolve, reject) => {
            // GEnera una copia del objeto
            objEscVistaMod = JSON.parse(JSON.stringify(objEscModificado));

            // Obtiene los COMENTARIOS
            ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['comentarios.txt'], 'MOD_COMENTARIOS');

            resolve();
        }).then(() => {
            // Oculta todas
            colapsarTodasMod(true);

            // Muestra las tablas para que esten en el dom
            mostrarTodasMod();
            // Borra los periodos
            borrarThPeriodosMod();
            // Vacia los datos de las tablas (desde el dom)
            vaciarTablasMod();

            // Obtiene el numero de periodos por algoritmo
            let periodos = 0;
            SESION.config.algoritmos.forEach((algoritmo) => {
                if (algoritmo.carpeta === SESION.algoritmo) {
                    periodos = algoritmo.periodos;
                }
            });
            console.log('>>> Periodos:', periodos);

            // Tablas de Periodos 1-N
            for (let thead of thead_periodo_mod) {
                for (let nodoA of thead.childNodes) {
                    if (nodoA.nodeName.toLowerCase() === 'tr') {
                        // Agrega las cabeceras de los periodos
                        for (let i = 1; i <= periodos; i++) {
                            let th = document.createElement('th');
                            th.classList.add('th-periodo-mod');
                            let texto = document.createTextNode(`Periodo ${i}`);

                            th.appendChild(texto);
                            nodoA.appendChild(th);
                        }
                        break;
                    }
                }
            }

            // Tablas de de intervalos min y max 1-N
            for (let tabla of thead_periodo_i_mod) {
                for (let nodoA of tabla.childNodes) {
                    if (nodoA.nodeName.toLowerCase() === 'tr') {
                        // Agrega las cabeceras de los periodos
                        for (let i = 1; i <= periodos; i++) {
                            let thmin = document.createElement('th');
                            let thmax = document.createElement('th');

                            thmin.classList.add('th-periodo-mod');
                            thmax.classList.add('th-periodo-mod');

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
            desactivarColapsosMod();

            // Carga las tablas
            let promesas_mod = [];
            let to = 0;
            objEscVistaMod.lista.forEach((obj_archivo) => {
                promesas_mod.push(new Promise((resolve, reject) => {
                    to += 20;
                    setTimeout(() => {
                        crearTablaMod(obj_archivo);
                        resolve();
                    }, to);
                }));
            });

            // Oculta todas
            colapsarTodasMod(true);

            Promise.all(promesas_mod).then(() => {
                banner.ok();
                banner.setMensaje('Lectura finalizada');

                // Activa boton guardar en BD
                boton_guardaBDEscenarioMod.disabled = false;

                // Archivo de costos e ingresos
                ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['dirres', 'r_desphora1.res'], 'MOD_COSTOS');

                setTimeout(() => {
                    banner.ocultar();
                }, 1000);
            });
        });
    }, 1000);
}

function cargarEscenarioMod() {
    let algoritmo = select_mod_algoritmo.value;
    let anio = select_mod_anio.value;
    let mes = select_mod_mes.value;
    let dia = select_mod_dia.value;
    let esc_ori = select_mod_esc_original.value;
    let esc_mod = select_mod_esc_modificado.value;

    if (algoritmo === '' || typeof algoritmo === 'undefined' || algoritmo === 'defecto') {
        return;
    }

    if (anio === '' || typeof anio === 'undefined' || anio === 'defecto') {
        return;
    }

    if (mes === '' || typeof mes === 'undefined' || mes === 'defecto') {
        return;
    }

    if (dia === '' || typeof dia === 'undefined' || dia === 'defecto') {
        return;
    }

    if (esc_ori === '' || typeof esc_ori === 'undefined' || esc_ori === 'defecto') {
        return;
    }

    if (esc_mod === '' || typeof esc_mod === 'undefined' || esc_mod === 'defecto') {
        return;
    }

    // Configura banner
    banner.vistaCompacta();
    banner.setMensaje('Leyendo Información');
    banner.ocultarBoton();
    banner.cargando();
    banner.mostrar();

    ipcRenderer.send('escenarios_mod:leer_todo', algoritmo, anio, mes, dia, esc_ori, esc_mod);
}

ipcRenderer.on('escenarios_mod:leido_todo', (event, obj) => {
    console.log('Recibe contenedor de archivos:', obj.lista.length);

    setTimeout(() => {
        // Oculta todas
        colapsarTodasMod(true);

        // Muestra las tablas para que esten en el dom
        mostrarTodasMod();
        // Borra los periodos
        borrarThPeriodosMod();
        // Vacia los datos de las tablas (desde el dom)
        vaciarTablasMod();

        // Obtiene el numero de periodos por algoritmo
        let periodos = 0;
        SESION.config.algoritmos.forEach((algoritmo) => {
            if (algoritmo.carpeta === SESION.algoritmo) {
                periodos = algoritmo.periodos;
            }
        });
        console.log('>>> Periodos:', periodos);

        // Tablas de Periodos 1-N
        for (let thead of thead_periodo_mod) {
            for (let nodoA of thead.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'tr') {
                    // Agrega las cabeceras de los periodos
                    for (let i = 1; i <= periodos; i++) {
                        let th = document.createElement('th');
                        th.classList.add('th-periodo-mod');
                        let texto = document.createTextNode(`Periodo ${i}`);

                        th.appendChild(texto);
                        nodoA.appendChild(th);
                    }
                    break;
                }
            }
        }

        // Tablas de de intervalos min y max 1-N
        for (let tabla of thead_periodo_i_mod) {
            for (let nodoA of tabla.childNodes) {
                if (nodoA.nodeName.toLowerCase() === 'tr') {
                    // Agrega las cabeceras de los periodos
                    for (let i = 1; i <= periodos; i++) {
                        let thmin = document.createElement('th');
                        let thmax = document.createElement('th');

                        thmin.classList.add('th-periodo-mod');
                        thmax.classList.add('th-periodo-mod');

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
        desactivarColapsosMod();
    }, 100);

    // Recibe el contenedor
    objEscVistaMod = obj;
    objEscVistaMod.contador = 0;
    promesas_archivos = [];

    // Obtiene los COMENTARIOS
    ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['comentarios.txt'], 'MOD_COMENTARIOS');
});

ipcRenderer.on('escenarios_mod:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo);

    // Recibe el contenedor
    objEscVistaMod.lista.push(obj_archivo);
    objEscVistaMod.contador++;

    // Agrega lista de promesas
    setTimeout(() => {
        promesas_archivos.push(new Promise((resolve, reject) => {
            crearTablaMod(obj_archivo);
            resolve();
        }));
    });

    if (objEscVistaMod.contador === objEscVistaMod.numArchivos) {
        setTimeout(() => {
            Promise.all(promesas_archivos).then(() => {
                // Oculta todas
                colapsarTodasMod(true);

                banner.ok();
                banner.setMensaje('Lectura finalizada');

                // Activa boton guardar en BD
                boton_guardaBDEscenarioMod.disabled = false;

                // Manda a leer el archivo de costos e ingresos
                ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['dirres', 'r_desphora1.res'], 'MOD_COSTOS');

                setTimeout(() => {
                    banner.ocultar();
                }, 1000);
            });
        });
    }
});

function crearTablaMod(objArchivo, copia) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];

    // REvisa si es copia
    if (typeof copia !== 'undefined' && copia === true) {
        // Agrega copia del identificador
        id += '_COPIA';
    }

    // Busca la tabla en la lista, no en el dom
    let tabla = null;
    for (let t of tablas_mod) {
        if (t.id === id || t.id.replace('$', '1') === id || t.id.replace('$', SESION.sistema) === id) {
            tabla = t;
            break;
        }
    }

    if (typeof tabla === 'undefined' || tabla === null) {
        // console.log('No existe la tabla', id);
        return;
    }

    // MEnsaje a pantalla
    banner.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${objArchivo.archivo}</font>`);

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

    let flag_primera = true;
    let num_fila = 1;
    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // si es la primer fila, procesa las cabeceras

        // SEMAFOROSDERS no trae cabeceras
        /* *************************************************** */
        /* Temporal mientras queda el archivo de configuracion */
        /* *************************************************** */

        if (flag_primera && tabla.id !== 'SEMAFOROSDERS' && objArchivo.isResultado === true) {
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
                                                if (colAsociada.innerHTML.includes(`${filtro}`)) {
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
                                    };

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

                let valor;
                if (objDato.valor.length > 15) {
                    let valorFloat = parseFloat(objDato.valor);
                    // Si es numero y tiene más de 6 decimales
                    if (!isNaN(valorFloat) && objDato.valor.includes('.') && objDato.valor.split('.')[1].length > 10) {
                        valor = `${valorFloat.toFixed(10)}`;
                    } else {
                        valor = objDato.valor;
                    }
                } else {
                    valor = objDato.valor;
                }

                let texto = document.createTextNode(valor);
                td.appendChild(texto);

                tr.appendChild(td);
                tr.columnasFiltro.push(td);
            });

            // Si trae menos columnas, completa
            for (let i = num_col; i < num_columnas; i++) {
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
        }
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
        // Elimina paginacion anterior
        if (typeof tabla.tfoot !== 'undefined') {
            tabla.tfoot.innerHTML = '';
        }
    }

    let colapso = null;
    for (let col of colapsos_mod) {
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
        crearTablaMod(objArchivo, true);
    }

    if (id === 'AUSUBSIS_DERS') {
        console.log('Copiando AUSUBSIS_DERS_COPIA');
        crearTablaMod(objArchivo, true);
    }

    // Verifica su archivo para el nombre en el span del colapso
    if (objArchivo.isResultado === true) {
        spans_archivos.forEach((span) => {
            if (span.id.startsWith('ARCH')) {
                let arch_id = span.id.replace('ARCH-', '');
                if (id.startsWith(arch_id)) {
                    span.innerHTML = `${id}.csv`;
                }
            }
        });
    }
}

function guardarEnBaseDatos() {
    // Primero genera el archivo zip del escenario modificado
    bannerBD.vistaCompacta();
    bannerBD.ocultarProgreso();
    bannerBD.ocultarBoton();
    bannerBD.setMensaje('Preparando escenario modificado');
    bannerBD.trabajando();
    bannerBD.mostrar();
    ipcRenderer.send('escenario_bd:comprimir', objEscVistaMod.ruta, 'escenario_bd:comprimido_modificado');
}

ipcRenderer.on('escenario_bd:comprimido_modificado', (event, res) => {
    if (res.estado === true) {
        bannerBD.setMensaje('Preparando escenario original');
        let elementos = objEscVistaMod.ruta.split('\\');
        let ruta_original = `${objEscVistaMod.ruta.replace('escenario_modificado', 'escenario_original').replace(elementos[elementos.length - 1], '')}`;
        // Genera el zip del escenario original
        ipcRenderer.send('escenario_bd:comprimir', ruta_original, 'escenario_bd:comprimido_original');
    } else {
        bannerBD.error();
        bannerBD.setMensaje('Error: ' + res.mensaje);
        setTimeout(() => {
            bannerBD.ocultar();
        }, 2000);
    }
});

ipcRenderer.on('escenario_bd:comprimido_original', (event, res) => {
    if (res.estado === true) {
        bannerBD.ok();
        bannerBD.setMensaje('Iniciando escritura en Base de Datos');
        botonProgresoBD.modoProgreso();
        botonProgresoBD.setProgreso(15);

        // Desactiva los select para evitar busquedas hasta que termine de guardar
        select_mod_anio.disabled = true;
        select_mod_algoritmo.disabled = true;
        select_mod_mes.disabled = true;
        select_mod_dia.disabled = true;
        select_mod_esc_original.disabled = true;
        select_mod_esc_modificado.disabled = true;

        if (typeof objEscVistaMod.folio === 'undefined') {
            let elementos = objEscVistaMod.ruta.split('\\');
            objEscVistaMod.folio = elementos[elementos.length - 1];
        }

        setTimeout(() => {
            let elementos = objEscVistaMod.ruta.split('\\');
            let json = {
                opc: '1',
                folio: objEscVistaMod.folio,
                usuario: SESION.usuario,
                id: elementos[elementos.length - 2],
                algoritmo: objEscVistaMod.algoritmo.toUpperCase(),
                estado: '1',
                ruta: objEscVistaMod.ruta,
                sistema: SESION.sistema
            };
            ipcRenderer.send('escenario_bd:guardar', json);
        }, 1000);

        setTimeout(() => {
            bannerBD.ocultar();
        }, 3000);
    } else {
        bannerBD.error();
        bannerBD.setMensaje('Error: ' + res.mensaje);
        setTimeout(() => {
            bannerBD.ocultar();
        }, 2000);
    }
});

ipcRenderer.on('escenario_bd:progreso', (event, res) => {
    if (res.estado === true) {
        botonProgresoBD.setProgreso(res.progreso);

        if (res.progreso >= 100) {
            // Reactiva los select para nueva búsqueda
            select_mod_anio.disabled = false;
            select_mod_algoritmo.disabled = false;
            select_mod_mes.disabled = false;
            select_mod_dia.disabled = false;
            select_mod_esc_original.disabled = false;
            select_mod_esc_modificado.disabled = false;

            console.log('Finalizado');
            bannerBD.mostrar();
            bannerBD.ok();
            bannerBD.setMensaje(`Escenario <font style="color:lightgreen; text-decoration:underline;">${objEscVistaMod.folio}</font> guardado en la base de datos.`);
            setTimeout(() => {
                bannerBD.ocultar();
            }, 2000);
        }
    } else {
        // Reactiva los select para nueva búsqueda
        select_mod_anio.disabled = false;
        select_mod_algoritmo.disabled = false;
        select_mod_mes.disabled = false;
        select_mod_dia.disabled = false;
        select_mod_esc_original.disabled = false;
        select_mod_esc_modificado.disabled = false;

        bannerBD.mostrar();
        bannerBD.error();
        bannerBD.setMensaje(`Error al guardar en base de datos: ${res.mensaje}`);
        bannerBD.setBoton('Aceptar', banner.ocultar);
        botonProgresoBD.modoNormal();
    }
});
