
// Progreso de descarga de directorio
ipcRenderer.on('directorio:progreso', (event, res) => {
    banner.vistaNormal();
    banner.mostrarProgreso();
    banner.setMensaje(res.mensaje);
    banner.setProgreso(res.progreso);

    if (res.progreso >= 100) {
        setTimeout(() => {
            banner.ocultarProgreso();
            banner.vistaCompacta();
        }, 1000);
    }
});

// Descarga finalizada (?)
ipcRenderer.on('directorio:descargado', (event, res) => {
    if (res.estado) {
        if (res.error) {
            banner.setMensaje(res.error);
            if (typeof res.targz !== 'undefined' && res.targz) {
                banner.trabajando();
            }
        } else {
            banner.setProgreso(100);
            banner.ok();

            if (typeof res.flagLocal === 'undefined') {
                banner.setMensaje('Escenario descargado correctamente');
                banner.mostrarProgreso();
            } else {
                banner.setMensaje('Escenario encontrado localmente');
            }

            // OCulta banner
            setTimeout(() => {
                banner.setProgreso(0);
            }, 1000);

            setTimeout(() => {
                banner.ocultarProgreso();
            }, 1100);

            rutaEscenarioOriginal = res.rutaLocal;
            console.log('Ruta de escenario:', rutaEscenarioOriginal);

            mensajeConsola(`Escenario cargado localmente: ${rutaEscenarioOriginal}`, false);

            // Descarga algoritmo
            setTimeout(() => {
                banner.vistaCompacta();
            }, 1500);

            banner.setMensaje('Verificando algoritmo');
            banner.actualizando();
            ipcRenderer.send('algoritmo:descarga', rutaEscenarioOriginal, select_algoritmo.value, 'algoritmo:descargado');
        }
    } else {
        banner.ocultarProgreso();
        banner.setMensaje(res.error);
        banner.error();
        setTimeout(() => {
            banner.ocultar();
        }, 2000);
    }
});

ipcRenderer.on('algoritmo:descargado', (event, res) => {
    res_algoritmo = res;
    let to_lectura = 1500;
    if (res.estado !== true) {
        banner.alerta();
        banner.setMensaje(`Error durante la descarga del algoritmo: ${res.error}`);
        to_lectura = 3000;
    }

    visor_archivos.actualizar();
    setTimeout(() => {
        // banner.ocultar();
        banner.trabajando();
        banner.vistaCompacta();
        banner.setMensaje('Leyendo información');

        // Actualiza las etiquetas
        let algoritmo_val = select_algoritmo.value.toUpperCase();
        for (let label of algoritmo_labels) {
            label.innerHTML = `Algoritmo: <b>${algoritmo_val}</b>`;
        }

        let fecha_val = input_fecha.value;
        for (let label of fecha_labels) {
            label.innerHTML = `Fecha: <b>${fecha_val}</b>`;
        }

        let hora_val = select_hora.value + '';
        if (hora_val.length < 2) {
            hora_val = `0${hora_val}`;
        }

        for (let label of hora_labels) {
            label.innerHTML = `Hora: <b>${hora_val}</b>`;
        }

        let intervalo_val = select_intervalo.value;
        if (intervalo_val.length < 2) {
            intervalo_val = `0${intervalo_val}`;
        }

        for (let label of intervalo_labels) {
            label.innerHTML = `Intervalo: <b>${intervalo_val}</b>`;
        }

        for (let label of folio_labels) {
            label.innerHTML = `Folio: <b>- ORIGINAL -</b>`;
        }

        // Pasa al menu de información
        // ipcRenderer.send('escenario_entradas:leer', rutaEscenarioOriginal, SESION.algoritmo);
        ipcRenderer.send('escenario_completo:leer', rutaEscenarioOriginal, SESION.algoritmo);

        // Deshabilita botón ejecutar y actualizar
        boton_ejecutarEscenario.disabled = true;
        boton_actualizarEscenario.disabled = true;

        // Habilita el menu info
        menuInfo.classList.remove('deshabilitado');

        // Despliegua la seccion
        menuInfo.onclick();
        // Primer menú, informacion general
        opciones_menu_info[0].onclick();
    }, to_lectura);
});

ipcRenderer.on('algoritmo_folio:descargado', (event, res) => {
    res_algoritmo = res;
    let to_lectura = 1500;
    if (res.estado !== true) {
        banner.alerta();
        banner.setMensaje(`Error durante la descarga del algoritmo: ${res.error}`);
        to_lectura = 3000;

        // Deshabilita botón ejecutar y actualizar
        boton_ejecutarEscenario.disabled = true;
    } else {
        // banner.ok();
        // banner.setMensaje('Hecho');
        visor_archivos.actualizar();
        // Deshabilita botón ejecutar y actualizar
        boton_ejecutarEscenario.disabled = false;
    }

    setTimeout(() => {
        // Actualiza las etiquetas
        for (let label of algoritmo_labels) {
            label.innerHTML = `Algoritmo: <b>${objEscFolio.algoritmo}</b>`;
        }

        for (let label of fecha_labels) {
            label.innerHTML = `Fecha: <b>${objEscFolio.fecha}</b>`;
        }

        for (let label of hora_labels) {
            label.innerHTML = `Hora: <b>${objEscFolio.hora}</b>`;
        }

        for (let label of intervalo_labels) {
            label.innerHTML = `Intervalo: <b>${objEscFolio.intervalo}</b>`;
        }

        for (let label of folio_labels) {
            label.innerHTML = `Folio: <b>${objEscFolio.folio}</b>`;
        }

        // banner.ocultar();
        // Habilita el menu info
        menuInfo.classList.remove('deshabilitado');

        // Despliegua la seccion
        menuInfo.onclick();
        // Primer menú, informacion general
        opciones_menu_info[0].onclick();

        // Invoca la lectura del escenario
        // let obj_folio = JSON.parse(select_folio_ce.value);
        console.log(objEscFolio);
        banner.setMensaje('Leyendo información');
        ipcRenderer.send('escenario_completo:leer', objEscFolio.ruta + '\\' + objEscFolio.folio, objEscFolio.algoritmo, objEscFolio.folio);
    }, to_lectura);
});

// Inicia la busqueda del escenario, primero obtiene UTC de la fecha solicitada
function cargarEscenario() {
    // Borra los objetos de escenarios anteriores
    objEscOriginal = null;
    objEscModificado = null;

    // Elimina el objeto anterior
    objArchivos = null;

    // manda a obtener el utc de la fecha seleccionada
    // Comienza con vista compacta
    banner.vistaCompacta();
    banner.mostrar();
    banner.actualizando();
    banner.setMensaje('Consultando UTC');
    banner.setProgreso(0);
    banner.ocultarProgreso();
    banner.ocultarBoton();

    ipcRenderer.send('utc:consulta', `${input_fecha.value} ${select_hora.value}:00`, SESION.sistemaZona);
}

// Recibe UTC de Java
ipcRenderer.on('utc:respuesta', (event, json) => {
    if (!json.estado || typeof json.utc === 'undefined') {
        banner.error();
        banner.setMensaje(json.mensaje);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });

        return;
    }

    let obj;

    let {rutaId, dia, mes, anio, id} = generarRutaEscenario(json.utc);
    obj = {
        id_escenario: id,
        dirRemoto: `${SESION.config.exalogic.base}${SESION.sistemaCarpeta}/${select_algoritmo.value}/datosh/${rutaId}`,
        pathLocal: `${SESION.sistema}/${select_algoritmo.value}/escenario_original/`,
        dia: dia,
        mes: mes,
        anio: anio,
        algoritmo: select_algoritmo.value
    };

    /* * * * * * * * * * * */
    /* VERSION TEST URIEL */
    /* * * * * * * * * * * */
    if (SESION.sistema === 'BCS') {
        console.log('Prueba de BCS');
        obj.dirRemoto = `${SESION.config.exalogicPruebas.base}${SESION.sistemaCarpeta}/${select_algoritmo.value}/datosh/${rutaId}`;
    }

    mensajeConsola(`Solicitando escenario ${obj.id_escenario}`, false);

    SESION.id_solicitud = obj.id_escenario;
    SESION.algoritmo = select_algoritmo.value;

    ipcRenderer.send('directorio:descarga', obj);
    banner.setMensaje('Buscando escenario');
});

// Construye el nombre del escenario
function generarRutaEscenario(utc) {
    let fecha = input_fecha.value;

    if (fecha.trim() === '') {
        input_fecha.bordeOriginal = input_fecha.style.borderColor;
        input_fecha.style.borderColor = 'red';
        input_fecha.focus();
        return;
    }
    input_fecha.style.borderColor = input_fecha.bordeOriginal;

    let hora = select_hora.value;
    if (hora.length === 1) {
        hora = `0${hora}`;
    }

    let intervalo = select_intervalo.value;
    if (intervalo.length === 1) {
        intervalo = `0${intervalo}`;
    }

    console.log('fecha', fecha);
    let [ anio, mes, dia ] = fecha.split('-');

    console.log('UTC: ', utc);
    let id = `${anio}${mes}${dia}${hora}${intervalo}_${utc}`;

    return {rutaId: `${anio}/${mes}/${dia}/${id}`, dia: dia, mes: mes, anio: anio, id: id};
}

function switchBusqueda(trigger, flag_folios) {
    pestanias_ce.forEach((pestania) => {
        pestania.classList.add('inactiva');
    });

    trigger.classList.remove('inactiva');

    if (flag_folios === true) {
        form_folios_ce.style.display = 'block';
        form_exalogic_ce.style.display = 'none';
    } else {
        form_folios_ce.style.display = 'none';
        form_exalogic_ce.style.display = 'block';
    }
}

function consultarAniosFolios() {
    if (select_algoritmo_folio.value === 'defecto') {
        return;
    }

    banner.vistaIcono();
    banner.actualizando();
    banner.ocultarBoton();
    banner.setMensaje('');
    banner.mostrar();

    select_anio_ce_folio.innerHTML = '';
    select_mes_ce_folio.innerHTML = '';
    select_dia_ce_folio.innerHTML = '';
    select_folio_ce.innerHTML = '';

    // Desactiva boton
    boton_cargarEscenarioFolio.disabled = true;

    ipcRenderer.send('escenarios_folio_anios:leer', select_algoritmo_folio.value);
}

function consultarMesesFolios() {
    if (select_anio_ce_folio.value === 'defecto') {
        return;
    }

    banner.vistaIcono();
    banner.actualizando();
    banner.ocultarBoton();
    banner.setMensaje('');
    banner.mostrar();

    select_mes_ce_folio.innerHTML = '';
    select_dia_ce_folio.innerHTML = '';
    select_folio_ce.innerHTML = '';

    // Desactiva boton
    boton_cargarEscenarioFolio.disabled = true;

    ipcRenderer.send('escenarios_folio_meses:leer', select_algoritmo_folio.value, select_anio_ce_folio.value);
}

function consultarDiasFolios() {console.log('activa');
    if (select_mes_ce_folio.value === 'defecto') {
        return;
    }

    banner.vistaIcono();
    banner.actualizando();
    banner.ocultarBoton();
    banner.setMensaje('');
    banner.mostrar();

    select_dia_ce_folio.innerHTML = '';
    select_folio_ce.innerHTML = '';

    // Desactiva boton
    boton_cargarEscenarioFolio.disabled = true;

    ipcRenderer.send('escenarios_folio_dias:leer', select_algoritmo_folio.value, select_anio_ce_folio.value, select_mes_ce_folio.value);
}

function consultarFoliosEscenariosFolios() {
    if (select_dia_ce_folio.value === 'defecto') {
        return;
    }

    banner.vistaIcono();
    banner.actualizando();
    banner.ocultarBoton();
    banner.setMensaje('');
    banner.mostrar();

    select_folio_ce.innerHTML = '';

    // Desactiva boton
    boton_cargarEscenarioFolio.disabled = true;
    SESION.algoritmo = select_algoritmo_folio.value;

    ipcRenderer.send('escenarios_folio_escenarios:leer', select_algoritmo_folio.value, select_anio_ce_folio.value, select_mes_ce_folio.value, select_dia_ce_folio.value);
}

function verificarFolioCE() {
    if (select_folio_ce.value === 'defecto') {
        boton_cargarEscenarioFolio.disabled = true;
    } else {
        boton_cargarEscenarioFolio.disabled = false;
    }

    console.log('Seleccionado: ', JSON.parse(select_folio_ce.value));
}

ipcRenderer.on('escenarios_folio_anios:leidos', (event, flag_estado, lista) => {
    banner.ocultar();
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_anio_ce_folio, lista, 'Año');
        }
    }
});

ipcRenderer.on('escenarios_folio_meses:leidos', (event, flag_estado, lista) => {
    banner.ocultar();
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_mes_ce_folio, lista, 'Mes');
        }
    }
});

ipcRenderer.on('escenarios_folio_dias:leidos', (event, flag_estado, lista) => {
    banner.ocultar();
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            cargarSelectMod(select_dia_ce_folio, lista, 'Día');
        }
    }
});

ipcRenderer.on('escenarios_folio_escenarios:leidos', (event, flag_estado, lista) => {
    banner.ocultar();
    if (flag_estado === true) {
        if (lista !== null && typeof lista !== 'undefined') {
            // console.log(select_dia_ce_folio, lista);
            select_folio_ce.innerHTML = '';

            // Agrega opcion defecto
            opt = document.createElement('option');
            opt.innerHTML = 'Folio';
            opt.selected = true;
            opt.disabled = true;
            opt.value = 'defecto';
            select_folio_ce.appendChild(opt);

            lista.forEach((item) => {
                opt = document.createElement('option');
                opt.innerHTML = `${item.folio} (${item.tipo}) - Propietario: ${item.usuario}`;

                opt.value = JSON.stringify(item);
                select_folio_ce.appendChild(opt);
            });
        }
    }
});

function cargarFolioCE() {
    if (select_folio_ce.value === 'defecto') {
        return;
    }

    objEscFolio = JSON.parse(select_folio_ce.value);

    // Si está local, lo procesa, de lo contrario lo descarga
    if (objEscFolio.tipo.includes('LOCAL')) {
        cargarEscenarioEnDiscoCE();
    } else if (objEscFolio.tipo === 'BD') {
        console.log(objEscFolio);
        console.log('Descargando modificado');

        banner.vistaCompacta();
        banner.cargando();
        banner.ocultarBoton();
        banner.setMensaje('Descargando desde la Base de Datos');
        banner.mostrar();

        // Solicita el modificado
        ipcRenderer.send('escenario_bd:descargar', objEscFolio);
    }
}

ipcRenderer.on('escenario_bd:descargado', (event, res) => {
    if (res.estado === false) {
        banner.error();
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.setMensaje('Error: ' + res.mensaje);
        banner.mostrar();
    }
});

function cargarEscenarioEnDiscoCE() {
    console.log(`Consultando ${objEscFolio.folio} - ${objEscFolio.tipo} en ${objEscFolio.ruta}`);
    console.log('ID:', objEscFolio.id_original);
    SESION.id_solicitud = objEscFolio.id_original;

    for (let label of algoritmo_labels) {
        label.innerHTML = `Algoritmo: <b>${objEscFolio.algoritmo}</b>`;
    }

    for (let label of fecha_labels) {
        label.innerHTML = `Fecha: <b>${objEscFolio.fecha}</b>`;
    }

    for (let label of hora_labels) {
        label.innerHTML = `Hora: <b>${objEscFolio.hora}</b>`;
    }

    for (let label of intervalo_labels) {
        label.innerHTML = `Intervalo: <b>${objEscFolio.intervalo}</b>`;
    }

    for (let label of folio_labels) {
        label.innerHTML = `Folio: <b>${objEscFolio.folio}</b>`;
    }

    // Borra los objetos de escenarios anteriores
    objEscOriginal = null;
    objEscModificado = null;

    // Elimina el objeto anterior
    objArchivos = null;

    // manda a obtener el utc de la fecha seleccionada
    // Comienza con vista compacta
    banner.vistaCompacta();
    banner.mostrar();
    banner.trabajando();
    banner.setMensaje('Verificando algoritmo');
    banner.setProgreso(0);
    banner.ocultarProgreso();
    banner.ocultarBoton();

    // Verifica el algoritmo del escenario
    ipcRenderer.send('algoritmo:descarga', objEscFolio.ruta, select_algoritmo.value, 'algoritmo_folio:descargado');

    // Deshabilita botón ejecutar y actualizar
    boton_ejecutarEscenario.disabled = true;
    boton_actualizarEscenario.disabled = true;
}
