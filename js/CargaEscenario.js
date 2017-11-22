// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

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
    // console.log('progreso', res.progreso);
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
            ipcRenderer.send('algoritmo:descarga', rutaEscenarioOriginal, select_algoritmo.value);
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
        ipcRenderer.send('escenario_entradas:leer', rutaEscenarioOriginal, SESION.algoritmo);

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

// Inicia la busqueda del escenario, primero obtiene UTC de la fecha solicitada
function cargarEscenario() {
    // Deshabilita los menus
    // menuInfo.classList.add('invalido');
    // menuModifica.classList.add('invalido');
    // menuCompara.classList.add('invalido');
    // menuAdmin.classList.add('invalido');

    // Borra los objetos de escenarios anteriores
    objEscOriginal = null;
    objEscModificado = null;

    // Elimina el objeto anterior
    objArchivos = null;

    // manda a obtener el utc de la fecha seleccionada
    // Comienza con vista compacta
    banner.modoNormal();
    banner.vistaCompacta();
    banner.mostrar();
    banner.actualizando();
    banner.setMensaje('Consultando UTC');
    banner.setProgreso(0);
    banner.ocultarProgreso();
    banner.ocultarBoton();

    flag_modo_folio = false;

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

    if (flag_modo_folio === true) {
        let {rutaId, dia, mes, anio, id} = generarRutaEscenarioFolio(json.utc);
        obj = {
            id_escenario: id,
            dirRemoto: `${SESION.config.exalogic.base}${SESION.sistemaCarpeta}/${select_algoritmo.value}/datosh/${rutaId}`,
            pathLocal: `${SESION.sistema}/${select_algoritmo.value}/escenario_modificado/`,
            dia: dia,
            mes: mes,
            anio: anio,
            algoritmo: select_algoritmo_folio.value
        };
    } else {
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
    }

    mensajeConsola(`Solicitando escenario ${obj.id_escenario}`, false);

    SESION.id_solicitud = obj.id_escenario;
    SESION.algoritmo = select_algoritmo.value;

    if (flag_modo_folio === true) {
        ipcRenderer.send('escenarios_folios:leer', obj);
        banner.setMensaje('Leyendo folios...');
    } else {
        ipcRenderer.send('directorio:descarga', obj);
        banner.setMensaje('Buscando escenario');
    }
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

function generarRutaEscenarioFolio(utc) {
    let fecha = input_fecha_folio.value;

    if (fecha.trim() === '') {
        input_fecha_folio.bordeOriginal = input_fecha_folio.style.borderColor;
        input_fecha_folio.style.borderColor = 'red';
        input_fecha_folio.focus();
        return;
    }

    input_fecha_folio.style.borderColor = input_fecha_folio.bordeOriginal;

    let hora = select_hora_folio.value;
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

function  consultarFolios() {
    // Borra los objetos de escenarios anteriores
    objEscOriginal = null;
    objEscModificado = null;

    // Elimina el objeto anterior
    objArchivos = null;

    // manda a obtener el utc de la fecha seleccionada
    // Comienza con vista compacta
    banner.modoNormal();
    banner.vistaCompacta();
    banner.mostrar();
    banner.actualizando();
    banner.setMensaje('Consultando UTC');
    banner.setProgreso(0);
    banner.ocultarProgreso();
    banner.ocultarBoton();

    flag_modo_folio = true;

    ipcRenderer.send('utc:consulta', `${input_fecha.value} ${select_hora.value}:00`, SESION.sistemaZona);
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

ipcRenderer.on('escenarios_folios:leidos', (event, res) => {
    sel_folio_ce.innerHTML = '';

    if (res.estado === true) {
        let txt = document.createTextNode('Folio');
        let opt = document.createElement('option');
        opt.appendChild(txt);
        opt.selected = true;
        opt.disabled = true;
        sel_folio_ce.appendChild(opt);

        for (let folio of res.lista) {
            txt = document.createTextNode(`${folio} (Local)`);
            opt = document.createElement('option');
            opt.appendChild(txt);
            sel_folio_ce.appendChild(opt);
        }

        banner.ok();
        banner.setMensaje('Hecho');
        setTimeout(() => {
            banner.ocultar();
        }, 1000);
    } else {
        banner.error();
        console.log(res.error);
        if (res.error.code === 'ENOENT') {
            banner.setMensaje('Hay escenarios modificados locales para esa fecha');
        } else {
            banner.setMensaje(`Error leyendo los escenarios: ${res.error.code}`);
        }

        setTimeout(() => {
            banner.ocultar();
        }, 2000);
    }
});
