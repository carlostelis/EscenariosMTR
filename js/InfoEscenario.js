
// InfoEscenario.js - Javascript con funciones y eventos asociados al despliegue
// de Informaicón de escenarios

// Función para invertir el estado de un colapso de una tabla
// ${trigger} es el elemento que lanza la función
// ${id} es el nombre del contenedor a colapsar
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

// Función para expandir un colapso de una tabla
// ${trigger} es el elemento que lanza la función
// ${id} es el nombre del contenedor a colapsar
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

// Función para colapsar un colapso de una tabla
// ${trigger} es el elemento que lanza la función
// ${id} es el nombre del contenedor a colapsar
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

// Función para mostrar un contenedor de sección de información
// ${id} es el identificador del contenedor a mostrar
// ${trigger} es el elemento que invoca la función
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

// Función para desactivar (ocultar) todos los colapsos
function desactivarColapsos() {
    // Reestablece los colapsos
    for (let col of colapsos) {
        col.classList.add('inactivo');
        col.desplegado = false;
    }
}

// Función para ocultar todas las tablas
function ocultarTodasInfo() {
    console.log('~ Resetea Información Escenario ~');

    desactivarColapsos();

    // Destruye las tablas kendo
    colapsables.forEach((col) => {
        col.innerHTML = '';
        col.classList.remove('visible');
        col.classList.add('invisible');
    });

    gridsInfo = [];

    objEscOriginal = undefined;
    objEscModificado = undefined;
}

// Función que permite generar una tabla Kendo
// ${objData} es el objeto de archivo con información y metadatos de insumo
// ${flag_copia} es una bandera indicando si el archivo actual se está
//  generando en una tabla copia
function crearTablaInfoKendo(objData, flag_copia) {
	// Remueve el contenido anterior
	// Busca el contenedor
	let id_cont = '#COLAPSABLE_' + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`;
	let contenedor = $(id_cont);
	// Vacia su contenido
	contenedor.html('');
	// Inserta una nueva tabla
	let nueva_tabla = document.createElement('table');
	nueva_tabla.classList.add('table');
	nueva_tabla.classList.add('table-sm');
	nueva_tabla.classList.add('table-striped');
	nueva_tabla.id = objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`;
	// Inserta la nueva tabla
	contenedor.append(nueva_tabla);

	// Id de la tabla (nombre del archivo)
	let id = objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`;

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

    // Colapso de la tabla
    let colapso = colapsos.find((col) => { return col.id === 'COLAPSO_'  + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`; });

    try {
        if (typeof objData.dataSource === 'undefined') {
            // Inserta el modelo y los datos en el dataSource
        	let dataSourceObj = {
                pageSize: page_size,
        		schema: {
        			model: objData.insumo.modelo
        		},
        		data: objData.filas,
        		autoSync: true
        	};

            console.log(objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`, 'dataSourceObj',dataSourceObj, "excluir");

    		objData.dataSource = new kendo.data.DataSource(dataSourceObj);
        }

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

                    // Si es DERSPRMTS se usa un editor específico
                    if (objData.insumo.modelo.id === 'DERSPRMTS' && typeof objData.insumo.registrosExcluir === 'object') {
                        console.log('>>>>>> PARAMETROS SINTONIZACION EDITOR');
                        columna.editor = function (container, options) {
                            // Verifica si el valor se encuentra en la lista a excluir
                            let obj = objData.insumo.registrosExcluir.find((item) => {
                                return item === options.model.descripcion;
                            });

                            // Si no se encontró, se edita normal
                            if (typeof obj === 'undefined') {
                                if (campo.type === 'number') {
                                    $('<input name="' + options.field + '"/>')
                                     .appendTo(container)
                                     .kendoNumericTextBox(campo.validation)
                                }
                            } else {
                                var input = kendo.toString(options.model[options.field]);
                                $(container).text(input);
                                $(container).toggleClass("k-edit-cell");

                                // alert('No se puede modificar la fila seleccionada');
                                // console.log('No se puede modificar la fila seleccionada');
                                ipcRenderer.send('dialogo:alerta', 'No se puede modificar la fila seleccionada');
                            }
                        };
                    } else {
                        // Si es numerico crea un editor para validacion
    					if (campo.type === 'number') {
                            if (typeof campo.validation !== 'undefined') {
                                // console.log('Aplicando editor personalizado:', campo.validation);
                                // Aplica editor personalizado
                                columna.editor = function (container, options) {
                                    $('<input name="' + options.field + '"/>')
                                     .appendTo(container)
                                     .kendoNumericTextBox(campo.validation)
                                };
                            } else {
                                // console.log('Aplicando editor basico');
                                // Aplica editor básico
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
                    }
				} catch (e) {
					console.log('ERR EDITOR', objData.insumo.modelo.id, e);
				}
			});
		} else {
			console.log('No trae columnas');
		}

        let rowTemplateString;
        let altRowTemplateString;

        // Plantilla para resaltar diferencias
        rowTemplateString = `<tr
        class="
            ${objData.insumo.modelo.id === 'SEMAFOROSDERS' ? '#: getClaseSEMAFOROSDERS(bandera) #' : '' }
            ${objData.insumo.modelo.id === 'DERSPRMTS' ? '#: getClaseDERSPRMTS(descripcion) #' : '' }
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
            </td>`;
        });

        rowTemplateString += '</tr>';

        // plantilla alternativa
        altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');

		// En el objeto del grid inserta las columnas
        gridsInfo.push($(id).kendoGrid({
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
                        contains: "Contiene",
                        doesnotcontains: "No contiene",
						eq: "Igual que",
						neq: "Diferente que",
						startswith: "Comienza con",
						endswith: "Termina con",
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
                let objCelda = listaFilasColumnas.find((obj) => { return obj.id === objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}` && obj.fila === ultimaFila && obj.columna === ultimaColumna});
                if (objCelda) {
                    // console.log('Celda modificada');
                    objCelda.modificado = true;
                    // Actualiza las filas
                    objData.filas = gridsInfo.find((grid) => {return grid[0].id === objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`}).data('kendoGrid').dataSource.data();
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
                // Si encuentra el input, se registra el cambio
                if (inputCell) {
                    let tdPadre = inputCell.parentNode.parentNode.parentNode;
                    ultimaColumna = e.container[0].cellIndex;
                    ultimaFila = tdPadre.parentNode.dataset.uid;

                    // los registra en la lista de modificados
                    if (!listaFilasColumnas.find((obj) => { return obj.id === objData.insumo.modelo.id && obj.fila === ultimaFila && obj.columna === ultimaColumna})) {
                        listaFilasColumnas.push({id: objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`, fila: ultimaFila, columna: ultimaColumna, modificado: false});
                    }
                }
			},
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
    	colapsar(colapso, 'COLAPSABLE_' + objData.insumo.modelo.id + `${flag_copia === true ? '_COPIA' : ''}`);
        if (objData.insumo.tieneCopia === true && flag_copia !== true) {
            console.log('>>>>>>>>>>>>>>>>>>>>> Creando copia de ', objData.insumo.modelo.id);
            crearTablaInfoKendo(objData, true);
        }
    }
}

// Función para resaltar las celdas modificadas
function resaltarCeldas() {
    // Quita los objetos sin modificacion confirmada
    listaFilasColumnas = listaFilasColumnas.filter((obj) => {return obj.modificado === true});
    console.log('Filtrando modificados', listaFilasColumnas);

    listaFilasColumnas.forEach((obj) => {
        let columna = $(`tr[data-uid='${obj.fila}'] > td:nth-child(${obj.columna + 1})[data-archivo='${obj.id}']`);
        // console.log('Columna', columna[0]);
        columna[0].classList.add('celda-modificada');

        let fila = columna[0].parentNode;
        // console.log('Fila', fila);
        fila.classList.add('fila-modificada');
    });
}

function getClaseDERSPRMTS(descripcion) {
    let objData = objEscOriginal.lista.find((obj) => {
        return obj.insumo.modelo.id === 'DERSPRMTS';
    });

    if (objData) {
        if (typeof objData.insumo.registrosExcluir !== 'undefined' && objData.insumo.registrosExcluir.find((item) => { return item === descripcion; })) {
            return 'ROW-DERSPRMTS-NEDIT';
        }
    }

    return '';
}

// Función que procesa las validaciones visuales del archivo DERS_MI_TOTALES_AREA
function getClaseVal_DERS_MI_TOTALES_AREA(id, campo, valor) {
    if (id === 'DERS_MI_TOTALES_AREA') {
        if (campo === 'Corte') {
            if (valor > 0) {
                return 'corte-excedente-gt-cero';
            } else if (valor < 0) {
                return 'corte-excedente-lt-cero';
            }
        }
    }

    return '';
}

// Función que procesa las validaciones visuales del archivo SEMAFOROSDERS
function getClaseSEMAFOROSDERS(bandera) {
    if (bandera !== 0) {
        return 'penalizacion-activada';
    } else {
        return '';
    }
}

// Función que procesa las validaciones visuales del archivo RESUMEN_UNIDADES (filas)
function getClaseFilaRESUMEN_UNIDADES(disponibilidad, coordinabilidad) {
    if (disponibilidad === 0) {
        return 'unidad-no-disponible';
    } else {
        if (coordinabilidad === 0) {
            return 'unidad-no-coordinable';
        }
    }

    return '';
}

// Función que procesa las validaciones visuales del archivo RESUMEN_UNIDADES (columnas)
function getClaseColumnaRESUMEN_UNIDADES(archivo, campo, valor) {
    if (archivo === 'RESUMEN_UNIDADES') {
        if (campo === 'MARGEN_SUBIR' || campo === 'MARGEN_BAJAR') {
            if (valor === 0) {
                return 'unidad-sin-margen';
            } else {
                return 'unidad-con-margen';
            }
        }
    }

    return '';
}

// Función que procesa las validaciones visuales del archivo DTR_ZONAS_RESERVA
function getClaseVal_DTR_ZONAS_RESERVA(campo, req_mw_rreg, mw_rreg_asignados, req_mw_rr10, mw_rr10_asignados, req_mw_r10, mw_r10_asignados, req_mw_rs, mw_rs_asignados) {
    if (campo === 'MW_RREG_ASIGNADOS') {
        if (mw_rreg_asignados < req_mw_rreg) {
            return 'escasez-reserva';
        }
    } else if (campo === 'MW_RR10_ASIGNADOS') {
        if (mw_rr10_asignados < req_mw_rr10) {
            return 'escasez-reserva';
        }
    } else if (campo === 'MW_R10_ASIGNADOS') {
        if (mw_r10_asignados < req_mw_r10) {
            return 'escasez-reserva';
        }
    } else if (campo === 'MW_RS_ASIGNADOS') {
        if (mw_rs_asignados < req_mw_rs) {
            return 'escasez-reserva';
        }
    }

    return '';
}

// Función que solicita la actualización de las tablas de resultados luego de
// la ejecución del algoritmo
function actualizarResultadoInfo(flag_banner) {
    if (objEscModificado.resActualizados === true) {
        console.log();
        return;
    }

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

// Función que muestra la salida del archivo bitacora.res del escenario original
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

// función que permite guardar un escenario
// ${flag_actualizar} bandera para indicar si el proceso es una actualización
//  del escenario mnodificado actual o se generará un folio nuevo
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

        listaArchivos = objEscOriginal.lista.filter((archivo) => {
             return sublista.find((item) => {
                 return item === archivo.insumo.modelo.id || item === archivo.insumo.modelo.id + '_COPIA';
             });
         });
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

// Función que invoca la ejecución del algoritmo en el escenario modificado actual
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

// Evento que recibe el resultado de la copia del escenario original
// ${res} es un objeto con el estado del proceso
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
            boton_ejecutarEscenario.innerHTML = '<span class=""><i class="demo-icon icon-warning" style="color:yellow;"></i></span>Sin algoritmo';
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

// Evento que recibe la inicialización del contenedor de archivos de resultados de un escenario
// ${obj} es un json con los valores de inicialización
ipcRenderer.on('escenario_resultados:leido', (event, obj) => {
    console.log('Recibe contenedor de archivos resultado:', obj.lista.length);

    // Recibe el contenedor
    objEscModificado.totalResultados = obj.numArchivos;
    objEscModificado.contadorResultados = 0;
});

// Evento que recibe un archivo de resultados leido y procesado
// ${obj_archivo} es un objeto con la información necesaria de un archivo para
//  visualizarse en el despliegue
ipcRenderer.on('escenario_resultados:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo, 'Filas', obj_archivo.filas.length);

    // Busca el obj en el arreglo y lo reemplaza
    for (let i = 0; i < objEscModificado.lista.length; i++) {
        if (objEscModificado.lista[i].archivo === obj_archivo.archivo) {
            objEscModificado.lista.splice(i, 1, obj_archivo);
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

                setTimeout(() => {
                    banner.ocultar();

                    // Habilita botones
                    consolaExe.habilitarBoton('ejecutar', true);
                    consolaExe.habilitarBoton('cerrar', true);
                    consolaExe.habilitarBoton('resultados', true);
                }, 1000);

                promesas_archivos = [];

                // Actualiza tooltips de botones excel
                actualizarTooltipsKendo();
            });
        });
    }
});

// Evento que recibe información de la salida de ejecución de algoritmo en proceso
// ${output} es una cadena de resultado parcial para concatenar
ipcRenderer.on('algoritmo:ejecucionParcial', (event, output) => {
    salida_algoritmo += output;
    consolaExe.setTexto(salida_algoritmo);
});

// Evento que se recibe cuando finaliza la ejecucón del algoritmo
// ${res} es un objeto con el estado de ejecución del algoritmo
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

// Evento que recibe el resultado de diagnóstico de un escenario infactible
// ${res} contiene el mensaje de respuesta del diagnóstico
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

// Evento que recibe la inicialización del contenedor de archivos de un escenario
// ${obj} es un json con los valores de inicialización
ipcRenderer.on('escenario_completo:leido', (event, obj) => {
    console.log('Recibe contenedor de archivos:', obj.lista.length);
    textarea_comentarios_info.value = '';
    console.log('>>> Limpia comentarios');

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

// Evento que recibe un archivo leido y procesado
// ${obj_archivo} es un objeto con la información necesaria de un archivo para
//  visualizarse en el despliegue
ipcRenderer.on('escenario_completo:archivo_leido', (event, obj_archivo) => {
    console.log('Recibe archivo:', obj_archivo.archivo, 'Filas', obj_archivo.filas.length);

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

                    // Actualiza tooltips de botones excel
                    actualizarTooltipsKendo();
                }, 1000);
            });
        }, 1000);
    }
});
