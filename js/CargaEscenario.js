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
    if (res.estado) {
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

            // Deshabilita botón ejecutar
        	//let boton_ejecutarEscenario = document.getElementById('boton_ejecutarEscenario');
        	// if (boton_ejecutarEscenario) {
        	boton_ejecutarEscenario.disabled = true;
            boton_actualizarEscenario.disabled = true;
        	// }

            // Habilita el menu info
            menuInfo.classList.remove('deshabilitado');

            // Despliegua la seccion
            menuInfo.onclick();
            // Primer menú, informacion general
            opciones_menu_info[0].onclick();
        }, 1500);
    } else {
        banner.error();
        // banner.vistaNormal();
        banner.setMensaje(`Error durante la descarga del algoritmo: ${res.error}`);
        setTimeout(() => {
            banner.ocultar();
        }, 3000);
    }
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

    let {rutaId, dia, mes, anio, id} = generarRutaEscenario(json.utc);

    let obj = {
        id_escenario: id,
        dirRemoto: `${SESION.config.exalogic.base}${SESION.sistemaCarpeta}/${select_algoritmo.value}/datosh/${rutaId}`,
        pathLocal: `${select_algoritmo.value}/escenario_original/`,
        dia: dia,
        mes: mes,
        anio: anio,
        algoritmo: select_algoritmo.value
    };

    mensajeConsola(`Solicitando escenario ${id}`, false);

    SESION.id_solicitud = id;
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
