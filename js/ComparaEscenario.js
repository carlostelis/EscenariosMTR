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
                        if (contenedor.tabla_res.paginacion !== null && typeof contenedor.tabla_res.paginacion !== 'undefined') {
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

ipcRenderer.on('escenario_resultados:leidoComparado', (event, objA, objB) => {
    console.log('Recibe archivos:', objA.lista.length, objB.lista.length);

    objEscA_res = objA;
    objEscB_res = objB;

    objEscA_res.contador = 0;
    objEscB_res.contador = 0;

    flag_A_cargado = false;
    flag_B_cargado = false;

    // Vacia los datos de las tablas (desde el dom)
    vaciarTablasResulados();
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
    setTimeout(() => {
        promesas.push(new Promise((resolve, reject) => {
            ban.setMensaje(`Procesando archivo:<br><font style="color:lightgreen;">${obj_archivo.archivo}</font>`);
            crearTablaResultado(obj_archivo, marco);
            resolve();
        }));
    });

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

ipcRenderer.on('archivo:leido', (event, obj) => {
    if (obj.opc === 'RES_COMPARA') {
        obj.res = obj.res.replace(new RegExp('\n+\s*', 'g'), '<br>')

        // VErifica infactibilidad
        if (obj.res.includes('PROBLEMA INFACTIBLE')) {
            console.log('Verificando infactibilidad');
            obj.res += `<br><font color='red'>Infactibilidad encontrada durante la ejecución</font>`;

            // Resalta en la salida
            obj.res = obj.res.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');

            ipcRenderer.send('algoritmo:diagnosticar', obj.rutaBase, 'RES_COMPARA');
        } else if (obj.res.includes('TERMINACION NORMAL')) {
            // Resalta en la salida
            obj.res = obj.res.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');

            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        let con = null;

        if (obj.rutaBase === objEscA_res.ruta) {
            flag_resOutput_A = true;
            con = consola_resA;
        } else if (obj.rutaBase === objEscB_res.ruta) {
            flag_resOutput_B = true;
            con = consola_resB;
        }

        if (con !== null) {
            con.ocultarBanner();
            con.setTexto(obj.res);
        }
    } else if (obj.opc === 'RES_ORIGINAL') {
        obj.res = obj.res.replace(new RegExp('\n+\s*', 'g'), '<br>')

        // VErifica infactibilidad
        if (obj.res.includes('PROBLEMA INFACTIBLE')) {
            obj.res += `<br><font color='red'>Infactibilidad encontrada durante la ejecución</font>`;

            // Resalta en la salida
            obj.res = obj.res.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');

            console.log('Verificando infactibilidad');
            ipcRenderer.send('algoritmo:diagnosticar', obj.rutaBase, 'RES_ORIGINAL');
        } else if (obj.res.includes('TERMINACION NORMAL')) {
            // Resalta en la salida
            obj.res = obj.res.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');

            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        // banner.promptQuitaEspera();
        consolaExe.ocultarBanner();
        consolaExe.setTexto(obj.res);
    } else if (obj.opc.startsWith('RES_COSTOS_')) {
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));

        let objDatos = obj.opc.endsWith('A') ? objEscA_res : objEscB_res;

        // console.log(datos_costos);
        objDatos.costo_total = '---';
        objDatos.costo_gen = '---';
        objDatos.costo_gen_rd = '---';
        objDatos.costo_gen_rc = '---';
        objDatos.beneficio_social = '---';
        objDatos.costo_arranque = '---';
        objDatos.costo_reservas = '---';
        objDatos.ingreso_total = '---';
        objDatos.ingreso_demanda = '---';
        objDatos.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objDatos.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objDatos.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objDatos.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objDatos.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objDatos.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objDatos.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objDatos.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objDatos.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objDatos.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objDatos.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });

        let tabla_par;
        for (let col of colapsos_res) {
            if (col.id ==='col_datos_costos' && col.classList.contains(obj.opc.charAt(obj.opc.length - 1))) {
                // Quita la clase inactivo
                col.classList.remove('inactivo');
                // Busca la tabla
                let tabla_encontrada;
                for (let tabla of tablas_res) {
                    // Tabla par
                    if (tabla.id === 'DATOS_COSTOS' && !tabla.classList.contains(obj.opc.charAt(obj.opc.length - 1))) {
                        tabla_par = tabla;
                    }

                    if (tabla.id === 'DATOS_COSTOS' && tabla.classList.contains(obj.opc.charAt(obj.opc.length - 1))) {
                        // Borra el tbody anterior
                        if (typeof tabla.tbody !== "undefined" && tabla.tbody !== null) {
                            try {
                                tabla.removeChild(tabla.tbody);
                            } catch (e) {}
                        }
                        // Crea el tbody
                        tabla.tbody = document.createElement('tbody');
                        tabla.tbody.classList.add('tabla-body');
                        tabla.appendChild(tabla.tbody);

                        tabla.filas = [];

                        crearFilaCosto(tabla, 'Costo Total', objDatos.costo_total, true);
                        crearFilaCosto(tabla, 'Costo Generación', objDatos.costo_gen, true);
                        crearFilaCosto(tabla, 'Costo Generación RD', objDatos.costo_gen_rd, true);
                        crearFilaCosto(tabla, 'Costo Generación RC', objDatos.costo_gen_rc, true);
                        crearFilaCosto(tabla, 'Beneficio Social', objDatos.beneficio_social, true);
                        crearFilaCosto(tabla, 'Costo Arranque', objDatos.costo_arranque, true);
                        crearFilaCosto(tabla, 'Costo Reservas', objDatos.costo_reservas, true);
                        crearFilaCosto(tabla, 'Ingreso Total', objDatos.ingreso_total, true);
                        crearFilaCosto(tabla, 'Ingreso Demanda', objDatos.ingreso_demanda, true);
                        crearFilaCosto(tabla, 'Ingreso Reservas', objDatos.ingreso_reservas, true);

                        tabla_encontrada = tabla;
                    }
                }

                tabla_encontrada.tabla_par = tabla_par;
            }
        }
    } else if (obj.opc === 'INFO_COSTOS') {
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos;
        try {
            datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));
        } catch (e) {
            console.log('Error generando costos');
            return;
        }

        // Lo guarda en el objeto original
        objEscOriginal.costo_total = '---';
        objEscOriginal.costo_gen = '---';
        objEscOriginal.costo_gen_rd = '---';
        objEscOriginal.costo_gen_rc = '---';
        objEscOriginal.beneficio_social = '---';
        objEscOriginal.costo_arranque = '---';
        objEscOriginal.costo_reservas = '---';
        objEscOriginal.ingreso_total = '---';
        objEscOriginal.ingreso_demanda = '---';
        objEscOriginal.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objEscOriginal.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objEscOriginal.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objEscOriginal.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objEscOriginal.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objEscOriginal.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objEscOriginal.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objEscOriginal.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objEscOriginal.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objEscOriginal.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objEscOriginal.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });

        for (let col of colapsos) {
            if (col.id ==='col_info_datos_costos') {
                // Busca el icono para mostrarlo
                for (let nodo of col.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'span') {
                        nodo.classList.remove('invisible');
                        console.log('muestra icono', nodo.classList.contains('invisible'));
                    }
                }

                // Quita la clase inactivo
                col.classList.remove('inactivo');
                // Busca la tabla
                let tabla_encontrada;
                for (let tabla of tablas_info) {
                    if (tabla.id === 'DATOS_COSTOS') {
                        // Borra el tbody anterior
                        if (typeof tabla.tbody !== "undefined" && tabla.tbody !== null) {
                            try {
                                tabla.removeChild(tabla.tbody);
                            } catch (e) {}
                        }
                        // Crea el tbody
                        tabla.tbody = document.createElement('tbody');
                        tabla.tbody.classList.add('tabla-body');
                        tabla.appendChild(tabla.tbody);

                        tabla.filas = [];

                        crearFilaCosto(tabla, 'Costo Total', objEscOriginal.costo_total);
                        crearFilaCosto(tabla, 'Costo Generación', objEscOriginal.costo_gen);
                        crearFilaCosto(tabla, 'Costo Generación RD', objEscOriginal.costo_gen_rd);
                        crearFilaCosto(tabla, 'Costo Generación RC', objEscOriginal.costo_gen_rc);
                        crearFilaCosto(tabla, 'Beneficio Social', objEscOriginal.beneficio_social);
                        crearFilaCosto(tabla, 'Costo Arranque', objEscOriginal.costo_arranque);
                        crearFilaCosto(tabla, 'Costo Reservas', objEscOriginal.costo_reservas);
                        crearFilaCosto(tabla, 'Ingreso Total', objEscOriginal.ingreso_total);
                        crearFilaCosto(tabla, 'Ingreso Demanda', objEscOriginal.ingreso_demanda);
                        crearFilaCosto(tabla, 'Ingreso Reservas', objEscOriginal.ingreso_reservas);

                        tabla_encontrada = tabla;
                    }
                }
            }
        }
    }  else if (obj.opc === 'MOD_COSTOS') {
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));
        console.log();
        // Lo guarda en el objeto original
        objEscVistaMod.costo_total = '---';
        objEscVistaMod.costo_gen = '---';
        objEscVistaMod.costo_gen_rd = '---';
        objEscVistaMod.costo_gen_rc = '---';
        objEscVistaMod.beneficio_social = '---';
        objEscVistaMod.costo_arranque = '---';
        objEscVistaMod.costo_reservas = '---';
        objEscVistaMod.ingreso_total = '---';
        objEscVistaMod.ingreso_demanda = '---';
        objEscVistaMod.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objEscVistaMod.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objEscVistaMod.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objEscVistaMod.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objEscVistaMod.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objEscVistaMod.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objEscVistaMod.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objEscVistaMod.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objEscVistaMod.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objEscVistaMod.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objEscVistaMod.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });

        for (let col of colapsos_mod) {
            if (col.id ==='col_info_datos_costos') {
                // Busca el icono para mostrarlo
                for (let nodo of col.childNodes) {
                    if (nodo.nodeName.toLowerCase() === 'span') {
                        nodo.classList.remove('invisible');
                        console.log('muestra icono', nodo.classList.contains('invisible'));
                    }
                }

                // Quita la clase inactivo
                col.classList.remove('inactivo');
                // Busca la tabla
                let tabla_encontrada;
                for (let tabla of tablas_mod) {
                    if (tabla.id === 'DATOS_COSTOS') {
                        // Borra el tbody anterior
                        if (typeof tabla.tbody !== "undefined" && tabla.tbody !== null) {
                            try {
                                tabla.removeChild(tabla.tbody);
                            } catch (e) {}
                        }
                        // Crea el tbody
                        tabla.tbody = document.createElement('tbody');
                        tabla.tbody.classList.add('tabla-body');
                        tabla.appendChild(tabla.tbody);

                        tabla.filas = [];

                        crearFilaCosto(tabla, 'Costo Total', objEscVistaMod.costo_total);
                        crearFilaCosto(tabla, 'Costo Generación', objEscVistaMod.costo_gen);
                        crearFilaCosto(tabla, 'Costo Generación RD', objEscVistaMod.costo_gen_rd);
                        crearFilaCosto(tabla, 'Costo Generación RC', objEscVistaMod.costo_gen_rc);
                        crearFilaCosto(tabla, 'Beneficio Social', objEscVistaMod.beneficio_social);
                        crearFilaCosto(tabla, 'Costo Arranque', objEscVistaMod.costo_arranque);
                        crearFilaCosto(tabla, 'Costo Reservas', objEscVistaMod.costo_reservas);
                        crearFilaCosto(tabla, 'Ingreso Total', objEscVistaMod.ingreso_total);
                        crearFilaCosto(tabla, 'Ingreso Demanda', objEscVistaMod.ingreso_demanda);
                        crearFilaCosto(tabla, 'Ingreso Reservas', objEscVistaMod.ingreso_reservas);

                        tabla_encontrada = tabla;
                    }
                }
            }
        }
    } else if (obj.opc === 'MOD_COMENTARIOS') {
        if (obj.res.startsWith('ERROR')) {
            console.log(obj.res);
        } else {
            textarea_comentarios_mod.value = obj.res;
        }

    } else if (obj.opc === 'FOLIO_COMENTARIOS') {
        if (obj.res.startsWith('ERROR')) {
            console.log(obj.res);
        } else {
            textarea_comentarios_info.value = obj.res;
        }
    }
});

function crearFilaCosto(tabla, info, valor, flag_comparacion) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(info));
    td.style.fontWeight = 'bold';
    td.style.paddingRight = '1vw';
    td.style.textAlign = 'right';
    tr.appendChild(td);
    tr.num_fila = tabla.filas.length + 1;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(valor));
    td.style.paddingLeft = '1vw';
    td.style.textAlign = 'left';
    tr.appendChild(td);
    tabla.tbody.appendChild(tr);
    tabla.filas.push(tr);

    // Ya no sigue si no es para comparacion
    if (flag_comparacion !== true) {
        return;
    }

    // Eventos tabla par
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
    };
}

function leerResultadoCostos() {
    ipcRenderer.send('archivo:leer', objEscOriginal.ruta, ['dirres', 'r_desphora1.res'], 'RES_COSTOS');
}

function crearTablaResultado(objArchivo, marco) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];

    // Busca la tabla en la lista, no en el dom
    let tabla = null;
    for (let t of tablas_res) {
        let nombre_tabla = t.id.replace('$', SESION.sistema.toUpperCase());
        // Pruba con terminacion sistema
        if (id === nombre_tabla && t.classList.contains(marco)) {
            // console.log('tabla encontrada', nombre_tabla, marco);
            tabla = t;
            break;
        }

        nombre_tabla = t.id.replace('$', '1');
        // Pruba con terminacion 1
        if (id === nombre_tabla && t.classList.contains(marco)) {
            // console.log('tabla encontrada', nombre_tabla, marco);
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
        if (col.id === tabla.dataset.colapso && col.classList.contains(marco)) {
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
        if (col.id === tabla.dataset.colapso && col.classList.contains(marco)) {
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
