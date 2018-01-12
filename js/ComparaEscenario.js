
function toggleColapsoResultado(trigger, clase) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo') || trigger.classList.contains('vacio')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = !trigger.desplegado;

    // Busca los contenedores con la clase asociada
    // Y los hace visibles
    for (let contenedor of divs_res) {
        if (contenedor.classList.contains(clase)) {
            if (iconoAbajo) {
                contenedor.classList.remove('invisible');
                contenedor.classList.add('visible');
            }
            // la oculta
            else {
                contenedor.classList.add('invisible');
                contenedor.classList.remove('visible');
            }
        }
    }

    // Invierte el incono de los colapsos con el mismo onclick
    for (let col of colapsos_res) {
        if (col.onclick === trigger.onclick) {
            // Cambia el icono
            for (let nodoA of col.childNodes) {
                // div hijo
                if (nodoA.nodeName.toLowerCase() === 'div') {
                    for (let nodoB of nodoA.childNodes) {
                        // Span
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
                            // break;
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

function colapsarResultado(trigger, id, marco) {
    console.log('Colapsa Resltado', trigger, id, marco);
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo') || trigger.classList.contains('vacio')) {
        trigger.desplegado = false;
        return;
    }

    let iconoAbajo = true;

    // Busca los contenedores con la clase marco asociada
    // Y los hace visibles
    let contenedor_buscado = $(`.${id}.${marco}`);
    console.log('contenedor_buscado', contenedor_buscado);
    if (contenedor_buscado) {
        contenedor_buscado.addClass('invisible');
        contenedor_buscado.removeClass('visible');
    }

    // Invierte el incono de los colapsos con el mismo id
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

function ocultarTodasResultados() {
    // Reestablece los colapsos
    for (let col of colapsos_res) {
        col.classList.add('inactivo');

        // Siesta desplegado, lo colpasa
        if (col.desplegado === true) {
            col.onclick();
        }
    }
}

function crearTablaInfoKendoResultado(objData, marco) {
    // Remueve el contenido anterior
    // Busca el contenedor
    let clase_cont = `.COLAPSABLE_${objData.insumo.modelo.id}.${marco}`;
    let contenedor = $(clase_cont);
    console.log('clase_cont', clase_cont, contenedor);
    // Vacia su contenido
    contenedor.html('');
    // Inserta una nueva tabla
    let nueva_tabla = document.createElement('table');
    nueva_tabla.classList.add('table');
    nueva_tabla.classList.add('table-sm');
    nueva_tabla.classList.add('table-striped');
    nueva_tabla.id = `${objData.insumo.modelo.id}_${marco}`;
    // Inserta la nueva tabla
    contenedor.append(nueva_tabla);

    // Id de la tabla (nombre del archivo)
    let id = nueva_tabla.id;
    if (!id.startsWith('#')) {
        id = '#' + id;
    }

    banner.trabajando();
    banner.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${objData.archivo}</font>`);

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
        change: function(e) {
            // Obtiene el grid
            let grid = gridsRes.find((grid) => {
                return grid[0].id === nueva_tabla.id;
            });
            if (grid) {
                // Obtiene el id del grid a buscar
                let id_grid_otro = objData.insumo.modelo.id;
                if (marco === 'A') {
                    id_grid_otro += '_B';
                } else {
                    id_grid_otro += '_A';
                }

                // busca el otro grid
                let grid_otro = gridsRes.find((grid) => {
                    return grid[0].id === id_grid_otro;
                });

                console.log('grid_otro', grid_otro);

                if (grid_otro) {
                    // Pagina
                    let pagina = grid.data('kendoGrid').dataSource.page();
                    console.log('Cambia pagina', nueva_tabla.id, pagina);

                    if (grid_otro.data('kendoGrid').dataSource.page() !== pagina) {
                        grid_otro.data('kendoGrid').dataSource.page(pagina);
                    }

                    if (grid_otro.data('kendoGrid').dataSource.page() !== pagina) {
                        grid_otro.data('kendoGrid').dataSource.page(pagina);
                    }

                    // Filtro
                    let filtro = grid.data('kendoGrid').dataSource.filter();
                    console.log('Cambia filtro', nueva_tabla.id, filtro);

                    // Verifica si el otro tiene filtro
                    let filtro_otro = grid_otro.data('kendoGrid').dataSource.filter();
                    if (filtro_otro) {
                        if (!isEquivalent(filtro_otro, filtro)) {
                            grid_otro.data('kendoGrid').dataSource.filter(filtro);
                        }
                    } else {
                        // Si no tiene también lo aplica
                        grid_otro.data('kendoGrid').dataSource.filter(filtro);
                    }

                    // Filtro
                    let sort = grid.data('kendoGrid').dataSource.sort();
                    console.log('Cambia orden', nueva_tabla.id, sort);

                    // Verifica si el otro tiene orden
                    let sort_otro = grid_otro.data('kendoGrid').dataSource.sort();
                    if (sort_otro) {
                        if (!isEquivalent(sort_otro, sort)) {
                            grid_otro.data('kendoGrid').dataSource.sort(sort);
                        }
                    } else {
                        // Si no tiene también lo aplica
                        grid_otro.data('kendoGrid').dataSource.sort(sort);
                    }
                }

            }
        }
    };

    // Colapso de la tabla
    let colapso = colapsos_res.find((col) => {
        return col.id === `COLAPSO_${marco}_${objData.insumo.modelo.id}`;
    });
    console.log(objData.insumo.modelo.id, 'dataSourceObj', dataSourceObj, colapso);

    // Busca si tiene diferencias
    let hayDiferencias = false;
    for (let fila of objData.filas) {
        if (fila.hayDiferencia === true) {
            hayDiferencias = true;

            break;
        }
    }

    // Muestra/oculta el icono
    for (let nodo of colapso.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'span') {
            if (hayDiferencias) {
                nodo.classList.remove('invisible');
                break;
            } else {
                nodo.classList.add('invisible');
                break;
            }
        }
    }

    // Si hay diferencias, agrega los templates, si no, no es necesario
    let rowTemplateString;
    let altRowTemplateString;

    // if (hayDiferencias) {
        // Plantilla para resaltar diferencias
        rowTemplateString = `<tr onmouseover="marcarFilaModificada('${objData.insumo.modelo.id}', '${marco === 'A' ? 'B' : 'A'}', '#: numFila #'); " onmouseout="desmarcarFilaModificada('${objData.insumo.modelo.id}', '${marco === 'A' ? 'B' : 'A'}', '#: numFila #');" class="#: (hayDiferencia === true ? "fila-modificada" : "") # ${objData.insumo.modelo.id} ${marco}" data-indice="#: numFila #" data-uid="#: uid #">`;
        // Recorre las columnas
        objData.insumo.columnas.forEach((col) => {
            rowTemplateString += `<td class="#: getClaseCeldaRes(${col.field}) #">#: getValorSinDiferencia(${col.field}) #</td>`
        });
        rowTemplateString += '</tr>';

        // plantilla alternativa
        altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');
    // }

    try {
        let dataSource = new kendo.data.DataSource(dataSourceObj);

        // En el objeto del grid inserta las columnas
        gridsRes.push($(id).kendoGrid({
            dataSource: dataSource,
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
            resizable: false,
            columnMenu: false,
            editable: false
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
    colapsarResultado(colapso, 'COLAPSABLE_' + objData.insumo.modelo.id, marco);
}

function isEquivalent(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function getClaseCeldaRes(valor) {
    if (`${valor}`.endsWith('*+*')) {
        return 'celda-modificada';
    } else {
        return '';
    }
}

function getValorSinDiferencia(valor) {
    return `${valor}`.replace('*+*', '');
}

function marcarFilaModificada(clase, marco, numFila) {
    // console.log(`marca tr.${clase}.${marco}[data-numFila="${numFila}"]`);
    let fila = $(`tr.${clase}.${marco}[data-indice="${numFila}"]`);
    // console.log(fila);
    fila.addClass('hover-grid-simulado');
}

function desmarcarFilaModificada(clase, marco, numFila) {
    // console.log(`desmarca tr.${clase}.${marco}[data-numFila="${numFila}"]`);
    let fila = $(`tr.${clase}.${marco}[data-indice="${numFila}"]`);
    // console.log(fila);
    fila.removeClass('hover-grid-simulado');
}

function mostrarSalidasAlgoritmo() {
    consola_resA.setTitulo(`Ejecución del escenario ${objEscA_res.id}`);
    consola_resB.setTitulo(`Ejecución del escenario ${objEscB_res.id}`);

    if (flag_resOutput_A === false) {
        // banner_resA.promptEspera();
        consola_resA.mostrarBanner();
        ipcRenderer.send('archivo:leer', objEscA_res.ruta, ['dirres', 'bitacora.res'], 'RES_COMPARA');
    }

    if (flag_resOutput_B === false) {
        // banner_resB.promptEspera();
        consola_resB.mostrarBanner();
        ipcRenderer.send('archivo:leer', objEscB_res.ruta, ['dirres', 'bitacora.res'], 'RES_COMPARA');
    }
    // Colapsa todas
    colapsarTodasResultados(true);

    // Muestra banners
    consola_resA.mostrar();
    consola_resB.mostrar();
}

function scrollContenedor(elemento) {
    if (!elemento.isScrolling) {
        elemento.div_par.isScrolling = true;
        elemento.div_par.scrollTop = elemento.scrollTop;
    }
    elemento.isScrolling = false;
}

function scrollTabla(elemento, clase) {
    divs_res.forEach((div) => {
        if (div.classList.contains(clase)) {
            div.scrollLeft = elemento.scrollLeft;
        }
    });
}

function mostrarResultados() {
    // Habilita el menu info
    menuCompara.classList.remove('deshabilitado');
    menuCompara.onclick();

    flag_resOutput_A = false;
    flag_resOutput_B = false;

    banner_resA.ocultarBoton()
    banner_resA.ocultarProgreso()
    banner_resA.vistaCompacta();
    banner_resA.cargando();
    banner_resA.setMensaje('Consultando resultados');

    banner_resB.ocultarBoton()
    banner_resB.ocultarProgreso()
    banner_resB.vistaCompacta();
    banner_resB.cargando();
    banner_resB.setMensaje('Consultando resultados');

    banner_resA.mostrar();
    banner_resB.mostrar();

    // Colapsa resultados
    colapsarTodasResultados(true);
    SESION.flag_cargarFolios = true;

    mensajeConsola('Cargando resultados de los escenarios...', false);

    ipcRenderer.send('escenario_resultados:leerComparar', objEscOriginal.ruta, objEscModificado.ruta, SESION.algoritmo);
}

function mostrarResultadosSeleccionados() {
    flag_resOutput_A = false;
    flag_resOutput_B = false;

    banner_resA.ocultarBoton()
    banner_resA.ocultarProgreso()
    banner_resA.vistaCompacta();
    banner_resA.cargando();
    banner_resA.setMensaje('Consultando resultados');

    banner_resB.ocultarBoton()
    banner_resB.ocultarProgreso()
    banner_resB.vistaCompacta();
    banner_resB.cargando();
    banner_resB.setMensaje('Consultando resultados');

    banner_resA.mostrar();
    banner_resB.mostrar();

    // Colapsa resultados
    colapsarTodasResultados(true);

    mensajeConsola('Cargando resultados de los escenarios...', false);

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

ipcRenderer.on('escenario_resultados:leidoComparado', (event, objA, objB) => {
    console.log('Recibe archivos resultados:', objA.lista.length, objB.lista.length);

    objEscA_res = objA;
    objEscB_res = objB;

    objEscA_res.contador = 0;
    objEscB_res.contador = 0;

    flag_A_cargado = false;
    flag_B_cargado = false;

    // Vacía la lista de grids
    gridsRes = [];

    // Vacia los datos de las tablas (desde el dom)
    // vaciarTablasResulados();
    // Desactiva todos los colapsos
    desactivarColapsosResultados();
});

ipcRenderer.on('escenario_resultados:archivo_leidoComparado', (event, obj_archivo, marco) => {
    console.log('Recibe resultado:', obj_archivo.archivo);

    let ban;
    let objContenedor;
    let promesas;
    let label;
    let string_opc;
    if (marco === 'A') {
        ban = banner_resA;
        objContenedor = objEscA_res;
        promesas = promesas_archivos_A;
        label = label_resA;
        string_opc = 'RES_COSTOS_A';
    } else if (marco === 'B') {
        ban = banner_resB;
        objContenedor = objEscB_res;
        promesas = promesas_archivos_B;
        label = label_resB;
        string_opc = 'RES_COSTOS_B';
    }

    objContenedor.lista.push(obj_archivo);
    objContenedor.contador++;

    // Al recibir archivo cambia icono a procesando
    ban.trabajando();

    // Agrega lista de promesas
    // setTimeout(() => {
    promesas.push(new Promise((resolve, reject) => {
        ban.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${obj_archivo.archivo}</font>`);
        crearTablaInfoKendoResultado(obj_archivo, marco);
        resolve();
    }));
    // });

    // Si recibió todos los archivos
    if (objContenedor.contador >= objContenedor.numArchivos) {
        setTimeout(() => {
            Promise.all(promesas).then(() => {
                ban.ok();
                ban.setMensaje('Completado');
                mensajeConsola(`Resultados de algoritmo (${objContenedor.algoritmo}) cargados en marco ${marco}`, false);
                label.innerHTML = `<font color="black">Escenario:</font> <b>${objContenedor.id}</b> (${objContenedor.id.length > 12 ? 'Original' : 'Modificado'})<span onclick="mostrarSalidasAlgoritmo();"><i class="demo-icon icon-terminal"></i></span>`;

                // Carga los costos A
                ipcRenderer.send('archivo:leer', objContenedor.ruta, ['dirres', 'r_desphora1.res'], string_opc);

                if (marco === 'A') {
                    flag_A_cargado = true;
                } else if (marco === 'B') {
                    flag_B_cargado = true;
                }

                // Si se completaron ambas
                if (flag_A_cargado === true && flag_B_cargado === true) {
                    // Oculta banners
                    setTimeout(() => {
                        banner_resA.ocultar();
                        banner_resB.ocultar();
                    }, 1000);

                    // Esta banera solo se activa cuando se carga comparacion desde ejecucion de algoritmo
                    if (SESION.flag_cargarFolios === true) {
                        // 3 segundos después del segundo resultado, solicita la lista de modificados
                        setTimeout(() => {
                            console.log('Carga folios modificados');
                            ipcRenderer.send('escenarios_mod:leer', objEscOriginal.ruta.replace('escenario_original', 'escenario_modificado'));
                        }, 500);
                    }
                }
            }, () => {
                console.log(`Error cargando resultados en marco ${marco}`);
            });
        });
    }
});

ipcRenderer.on('escenarios_mod:leidos', (event, res) => {
    let flag_primero = true;
    if (res.estado === true) {
        for (let sel of folios_mod) {
            sel.innerHTML = '';

            console.log('ID SOLICITUD', SESION.id_solicitud);
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

        // HAbilita selects de compara escenario
        folios_mod.forEach((folio) => {
            folio.disabled = false;
        });
    }
});
