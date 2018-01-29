// Modificados.js - Javascript con funciones y eventos asociados al despliegue
// de escenarios modificados > BD

// Función para consultar los años de los escenarios originales locales
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

// Función para consultar los meses de los escenarios originales locales
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

// Función para consultar los días de los escenarios originales locales
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

// Función para consultar los identificadores de los escenarios originales locales
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

// Función para consultar los folios de los escenarios modificados al escenario
// original seleccionado
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

// Función que verifica el habilitar/deshabiliotar el botón de carga de escenario
// en base al folio seleccionado
function verificarDatosEscenarioMod() {
    if (select_mod_esc_modificado.value === 'defecto' || typeof select_mod_esc_modificado.value === 'undefined') {
        boton_cargaEscenarioMod.disabled = true;
    } else {
        boton_cargaEscenarioMod.disabled = false;
    }
}

// Función para cargar una lista de elementos a una lista desplegable
// ${select} es el elemento html a llenar
// ${lista} es la lista de items a incluir
// ${defecto} es el valor por defecto de la primera opción de la lista
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

// Función para invertir el estado de un colapso de una tabla
// ${trigger} es el elemento que lanza la función
// ${id} es el nombre del contenedor a colapsar
function toggleColapsoMod(trigger, id) {
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

// Función para colapsar un colapso de una tabla
// ${trigger} es el elemento que lanza la función
// ${id} es el nombre del contenedor a colapsar
function colapsarMod(trigger, id) {
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

// Función para mostrar un contenedor de sección de información
// ${id} es el identificador del contenedor a mostrar
// ${trigger} es el elemento que invoca la función
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

// Función para ocultar todas las tablas
function ocultarTodasMod() {
    console.log('~ Resetea Escenarios Modificados ~');

    desactivarColapsosMod();

    // Destruye las tablas kendo
    colapsables_mod.forEach((col) => {
        col.innerHTML = '';
        col.classList.remove('visible');
        col.classList.add('invisible');
    });

    gridsMod = [];

    objEscVistaMod = undefined;
}

// Función para desactivar (ocultar) todos los colapsos
function desactivarColapsosMod() {
    // Reestablece los colapsos
    for (let col of colapsos_mod) {
        col.classList.add('inactivo');
        col.desplegado = false;
    }
}

// Función para cargar en Modificados el escenario cargado en información de escenario
function cargarEscenarioModActual() {
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
            // Desactiva todos los colapsos
            desactivarColapsosMod();

            // Carga las tablas
            let promesas_mod = [];
            let to = 0;
            objEscVistaMod.lista.forEach((obj_archivo) => {
                promesas_mod.push(new Promise((resolve, reject) => {
                    to += 20;
                    setTimeout(() => {
                        obj_archivo.dataSource = undefined;
                        crearTablaModKendo(obj_archivo);
                        resolve();
                    }, to);
                }));
            });

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

                // Actualiza tooltips de botones excel
                actualizarTooltipsKendo();
            });
        });
    }, 1000);
}

// Función para cargar el escenario con el folio seleccionado
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

// Función que permite generar una tabla Kendo
// ${objData} es el objeto de archivo con información y metadatos de insumo
// ${flag_copia} es una bandera indicando si el archivo actual se está
//  generando en una tabla copia
function crearTablaModKendo(objData, flag_copia) {
	// Remueve el contenido anterior
	// Busca el contenedor
	let id_cont = '#COLAPSABLE_MOD_' + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`;
	let contenedor = $(id_cont);
	// Vacia su contenido
	contenedor.html('');
	// Inserta una nueva tabla
	let nueva_tabla = document.createElement('table');
	nueva_tabla.classList.add('table');
	nueva_tabla.classList.add('table-sm');
	nueva_tabla.classList.add('table-striped');
	nueva_tabla.id = objData.insumo.modelo.id + '_MOD' + `${flag_copia === true ? '_COPIA' : ''}`;
	// Inserta la nueva tabla
	contenedor.append(nueva_tabla);

	// Id de la tabla (nombre del archivo)
	let id = nueva_tabla.id;

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

    // Deshabilita edicion
    objData.insumo.columnas.forEach((col) => {
        objData.insumo.modelo.fields[col.field].editable = false;
    });

    // Colapso de la tabla
	let colapso = colapsos_mod.find((col) => { return col.id === 'COLAPSO_MOD_'  + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`; });

	try {
        if (typeof objData.dataSource === 'undefined') {
            // Inserta el modelo y los datos en el dataSource
        	let dataSourceObj = {
                pageSize: page_size,
        		schema: {
        			model: objData.insumo.modelo
        		},
        		data: objData.filas
        	};

            console.log(objData.insumo.modelo.id, 'dataSourceObj',dataSourceObj, colapso);

            objData.dataSource = new kendo.data.DataSource(dataSourceObj);
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
    				}
    			});
    		}
        }

        let rowTemplateString;
        let altRowTemplateString;

        // Plantilla para resaltar diferencias
        rowTemplateString = `<tr
        class="
            ${objData.insumo.modelo.id === 'SEMAFOROSDERS' ? '#: getClaseSEMAFOROSDERS(bandera) #' : '' }
            ${objData.insumo.modelo.id === 'RESUMEN_UNIDADES' ? '#: getClaseFilaRESUMEN_UNIDADES(DISPONIBILIDAD, COORDINABILIDAD) #' : '' }"
        data-indice="#: numFila #" data-uid="#: uid #">`;

        // Recorre las columnas
        objData.insumo.columnas.forEach((col) => {
            rowTemplateString += `<td class="
            ${col.hidden === true ? 'celda-oculta ' : '' }
            #: getClaseVal_DERS_MI_TOTALES_AREA('${objData.insumo.modelo.id}', '${col.field}', ${col.field}) #
            #: getClaseColumnaRESUMEN_UNIDADES('${objData.insumo.modelo.id}', '${col.field}', ${col.field}) #
            ${objData.insumo.modelo.id.startsWith('DTR_ZONAS_RESERVA') ? '#: getClaseVal_DTR_ZONAS_RESERVA("' + col.field + '", REQ_MW_RREG, MW_RREG_ASIGNADOS, REQ_MW_RR10, MW_RR10_ASIGNADOS, REQ_MW_R10, MW_R10_ASIGNADOS, REQ_MW_RS, MW_RS_ASIGNADOS) #' : '' } " data-archivo="${objData.insumo.modelo.id + (flag_copia === true ? '_COPIA' : '')}">
                #: kendo.toString(${col.field}, "${typeof col.format !== 'undefined' ? col.format.replace('{0:', '').replace('}', '') : ''}") #
            </td>`
        });

        rowTemplateString += '</tr>';

        // plantilla alternativa
        altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');

		// En el objeto del grid inserta las columnas
        gridsMod.push($(id).kendoGrid({
            toolbar: (objData.filas.length > 0 ? [ {
                name: "excel",
                text: "Exportar a Excel"
            } ] : undefined),
            excel: (objData.filas.length > 0 ? {
                fileName: `${objData.insumo.modelo.id}.xlsx`,
                allPages: true
            } : undefined),
            dataSource: objData.dataSource,
			columns: objData.insumo.columnas,
            rowTemplate: rowTemplateString,
            altRowTemplate: altRowTemplateString,
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
			editable: false,
            excelExport: function(e) {
                var sheet = e.workbook.sheets[0];
                for (var i = 0; i < sheet.columns.length; i++) {
                    sheet.columns[i].width = 100;
                }
            }
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

        // Colapsa el contenedor
    	colapsarMod(colapso, 'COLAPSABLE_MOD_' + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`);

        if (objData.insumo.tieneCopia === true && flag_copia !== true) {
            console.log('>>>>>>>>>>>>>>>>>>>>> Creando copia de ', objData.insumo.modelo.id);
            crearTablaModKendo(objData, true);
        }
    }
}

// Función para solicitar el registro de un escenario en la BD
function guardarEnBaseDatos() {
    // Para ALE
    // bannerBD.vistaCompacta();
    // bannerBD.ocultarProgreso();
    // bannerBD.setBoton('Aceptar', () => {
    //     bannerBD.ocultar();
    // });
    // bannerBD.mostrarBoton();
    // bannerBD.setMensaje(`<span class="">Función deshabilitada<i style="color: greenyellow;font-size: 3vh;margin-left: 5px;" class="demo-icon icon-emo-unhappy"></i></span>`);
    // bannerBD.alerta();
    // bannerBD.mostrar();

    // Primero genera el archivo zip del escenario modificado
    bannerBD.vistaCompacta();
    bannerBD.ocultarProgreso();
    bannerBD.ocultarBoton();
    bannerBD.setMensaje('Preparando escenario modificado');
    bannerBD.trabajando();
    bannerBD.mostrar();
    ipcRenderer.send('escenario_bd:comprimir', objEscVistaMod.ruta, 'escenario_bd:comprimido_modificado');
}

// Evento que recibe la lista de anños de escenarios originales locales
// ${flag_estado} es una bandera que indica el estado de la operación
// ${lista} es la lista de años
ipcRenderer.on('escenarios_mod_anios:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_anio, lista, 'Año');
        }
    }
});

// Evento que recibe la lista de meses de escenarios originales locales
// ${flag_estado} es una bandera que indica el estado de la operación
// ${lista} es la lista de meses
ipcRenderer.on('escenarios_mod_meses:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_mes, lista, 'Mes');
        }
    }
});

// Evento que recibe la lista de días de escenarios originales locales
// ${flag_estado} es una bandera que indica el estado de la operación
// ${lista} es la lista de días
ipcRenderer.on('escenarios_mod_dias:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_dia, lista, 'Día');
        }
    }
});

// Evento que recibe la lista de identificadores de escenarios originales locales
// ${flag_estado} es una bandera que indica el estado de la operación
// ${lista} es la lista de identificadores
ipcRenderer.on('escenarios_mod_originales:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_esc_original, lista, 'Escenario');
        }
    }
});

// Evento que recibe la lista de folios de escenarios modificados locales
// ${flag_estado} es una bandera que indica el estado de la operación
// ${lista} es la lista de folios
ipcRenderer.on('escenarios_mod_modificados:leidos', (event, flag_estado, lista) => {
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mod_esc_modificado, lista, 'Escenarios');
        }
    }
});

// Evento que recibe la inicialización del contenedor de archivos de entrada de un escenario
// ${obj} es un json con los valores de inicialización
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

// Evento que recibe la inicialización del contenedor de archivos de un escenario
// ${obj} es un json con los valores de inicialización
ipcRenderer.on('escenarios_mod:leido_todo', (event, obj) => {
    console.log('Recibe contenedor de archivos:', obj.lista.length);

    // Desactiva todos los colapsos
    desactivarColapsosMod();

    // Recibe el contenedor
    objEscVistaMod = obj;
    objEscVistaMod.contador = 0;
    promesas_archivos = [];

    // Vacía la lista de grids
    gridsMod = [];

    // Obtiene los COMENTARIOS
    ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['comentarios.txt'], 'MOD_COMENTARIOS');
});

// Evento que recibe un archivo leido y procesado
// ${obj_archivo} es un objeto con la información necesaria de un archivo para
//  visualizarse en el despliegue
ipcRenderer.on('escenarios_mod:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo);

    // Recibe el contenedor
    objEscVistaMod.lista.push(obj_archivo);
    objEscVistaMod.contador++;

    // Agrega lista de promesas
    // setTimeout(() => {
        promesas_archivos.push(new Promise((resolve, reject) => {
            obj_archivo.dataSource = undefined;
            crearTablaModKendo(obj_archivo);
            resolve();
        }));
    // });

    if (objEscVistaMod.contador === objEscVistaMod.numArchivos) {
        setTimeout(() => {
            Promise.all(promesas_archivos).then(() => {
                banner.ok();
                banner.setMensaje('Lectura finalizada');

                // Activa boton guardar en BD
                boton_guardaBDEscenarioMod.disabled = false;

                // Manda a leer el archivo de costos e ingresos
                ipcRenderer.send('archivo:leer', objEscVistaMod.ruta, ['dirres', 'r_desphora1.res'], 'MOD_COSTOS');

                // Actualiza tooltips de botones excel
                actualizarTooltipsKendo();

                setTimeout(() => {
                    banner.ocultar();
                }, 1000);
            });
        });
    }
});

// Evento que recibe la respuestade la compresión de un escenario modificado
// ${res} es un objeto que incluye el estado de la operación
ipcRenderer.on('escenario_bd:comprimido_modificado', (event, res) => {
    if (res.estado === true) {
        console.log('ZIP modificado:', res.rutaZip);
        objEscVistaMod.rutaZip_mod = res.rutaZip;

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

// Evento que recibe la respuestade la compresión de un escenario original
// ${res} es un objeto que incluye el estado de la operación
ipcRenderer.on('escenario_bd:comprimido_original', (event, res) => {
    if (res.estado === true) {
        console.log('ZIP original:', res.rutaZip);
        objEscVistaMod.rutaZip_ori = res.rutaZip;

        botonProgresoBD.modoProgreso();
        botonProgresoBD.setProgreso(15);

        // Desactiva los select para evitar busquedas hasta que termine de guardar
        select_mod_anio.disabled = true;
        select_mod_algoritmo.disabled = true;
        select_mod_mes.disabled = true;
        select_mod_dia.disabled = true;

        select_mod_esc_original.disabled = true;
        select_mod_esc_modificado.disabled = true;

        // Respalda estados
        boton_cargaEscenarioMod_estado = boton_cargaEscenarioMod.disabled;
        boton_cargaEscenarioModActual_estado = boton_cargaEscenarioModActual.disabled;

        // DEshabilita botones
        boton_cargaEscenarioMod.disabled = true;
        boton_cargaEscenarioModActual.disabled = true;

        if (typeof objEscVistaMod.folio === 'undefined') {
            let elementos = objEscVistaMod.ruta.split('\\');
            objEscVistaMod.folio = elementos[elementos.length - 1];
        }

        // Verifica si existe el arhcivo .bd para saber si ya fue guardado
        ipcRenderer.send('archivo_bd:verificar', objEscVistaMod.ruta);
    } else {
        bannerBD.mostrar();
        bannerBD.error();
        bannerBD.setMensaje(`Error: ${res.mensaje}`);
        bannerBD.setBoton('Aceptar', () => {
            bannerBD.ocultar();
        });
        bannerBD.mostrarBoton();
        botonProgresoBD.modoNormal();
    }
});

// Evento que recibe la verificación de un escenario local guardado en BD
// ${res} es un objeto que incluye la bandera
ipcRenderer.on('archivo_bd:verificado', (event, res) => {
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

    bannerBD.ok();

    if (res.existe === true) {
        json.opc = '2';
        json.estado = '2';
        console.log('Actualizacion');

        bannerBD.setMensaje('Iniciando actualización en Base de Datos');
    } else {
        bannerBD.setMensaje('Iniciando registro en Base de Datos');
        console.log('Nuevo Registro');
    }

    // Oculta banner
    setTimeout(() => {
        bannerBD.ocultar();
    }, 2000);

    // Envía la peticion
    ipcRenderer.send('escenario_bd:operacion', json, 'escenario:guardarBD');
});

// Evento que recibe el progreso de una operación en BD
// ${res} es un objeto que incluye el estado y progreso de la operación
ipcRenderer.on('escenario_bd:progreso', (event, res) => {
    console.log('Finalizado progreso, estado:', res.estado);
    if (res.estado === true) {
        if (res.progreso >= 100) {
            res.progreso = 99;
        }

        botonProgresoBD.setProgreso(res.progreso);
    } else {
        bannerBD.mostrar();
        bannerBD.error();
        bannerBD.setMensaje(`Error: ${res.mensaje}`);
        bannerBD.setBoton('Aceptar', () => {
            bannerBD.ocultar();
        });
        bannerBD.mostrarBoton();
        botonProgresoBD.modoNormal();
    }
});

// Evento recibido al finalizar el registro de un escenario en BD
// ${res} es un objeto que incluye el estado de la operación
ipcRenderer.on('escenario:guardarBD', (event, res) => {
    if (res.estado === true) {
        botonProgresoBD.setProgreso(100);
        bannerBD.mostrar();
        bannerBD.ok();
        bannerBD.setMensaje(`Escenario <font style="color:lightgreen; text-decoration:underline;">${objEscVistaMod.folio}</font> guardado en la base de datos.`);
        bannerBD.setBoton('Aceptar', () => {
            bannerBD.ocultar();
        });
        bannerBD.mostrarBoton();
    } else {
        bannerBD.mostrar();
        bannerBD.error();
        bannerBD.setMensaje(`Error: ${res.mensaje}`);
        bannerBD.setBoton('Aceptar', () => {
            bannerBD.ocultar();
        });
        bannerBD.mostrarBoton();
        botonProgresoBD.modoNormal();
    }

    // Reactiva los select para nueva búsqueda
    select_mod_anio.disabled = false;
    select_mod_algoritmo.disabled = false;
    select_mod_mes.disabled = false;
    select_mod_dia.disabled = false;
    select_mod_esc_original.disabled = false;
    select_mod_esc_modificado.disabled = false;

    flag_guardandoBD = false;

    // Habilita botones
    boton_cargaEscenarioMod.disabled = boton_cargaEscenarioMod_estado;
    boton_cargaEscenarioModActual.disabled = boton_cargaEscenarioModActual_estado;

    // _Intenta Borrar zips
    if (typeof objEscVistaMod.rutaZip_mod !== 'undefined') {
        ipcRenderer.send('archivo:borrar', objEscVistaMod.rutaZip_mod);
    }
    if (typeof objEscVistaMod.rutaZip_ori !== 'undefined') {
        ipcRenderer.send('archivo:borrar', objEscVistaMod.rutaZip_ori);
    }
});
