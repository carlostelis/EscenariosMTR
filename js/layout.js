// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

// Escucha instruccion para cerrar sesion,
// carga los componentes de login
ipcRenderer.on('sesion:cerrar', (event) => {
    console.log('sesion cerrar');
    body.style.opacity = '0';

    //solicitarSistemas();

    setTimeout(() => {
        var divLogin = document.querySelector('#div-layout');
        divLogin.classList.add('d-none');

        var divLayout = document.querySelector('#div-login');
        divLayout.classList.remove('d-none');
    }, 1500);

    setTimeout(() => {
        body.style.opacity = '1';
        paginaActual = 'login';
    }, 1600);
});

// Lee los datos de las paginas para los paneles
ipcRenderer.on('paginas:envia', (event, paginas) => {
    let vistas = document.getElementsByClassName('opc-vista');
    paginas.forEach((pagina) => {
        Array.from(vistas).forEach((vista) => {
            if (vista.dataset.opc === pagina.id) {
                vista.innerHTML = pagina.data;
            }
        });
    });

    setTimeout(() => {
        cargaComponentes();
    }, 100);
});

ipcRenderer.on('directorio:progreso', (event, res) => {
    banner.mostrarProgreso('darkgreen');
    banner.setMensaje(res.mensaje);
    banner.setProgreso(res.progreso);
});

ipcRenderer.on('directorio:descargado', (event, res) => {
    if (res.estado) {
        if (res.error) {
            banner.setMensaje(res.error);
            if (typeof res.targz !== 'undefined' && res.targz) {
                banner.trabajando('lightseagreen');
            }
        } else {
            banner.setProgreso(100);
            banner.ok('darkgreen');
            banner.setMensaje('Escenario descargado correctamente');
            console.log('Ruta de escenario:', res.rutaLocal);
            visor_archivos.actualizar();
            setTimeout(() => {
                banner.ocultar();
            }, 2000);
        }
    } else {
        banner.ocultarProgreso();
        banner.setMensaje(res.error);
        banner.error('darkred');
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    }
});

function cargaComponentes() {
    let div_archivos = document.getElementById('div_visor-archivos');

    // Fecha actual
    let hora = moment().format('YYYY-MM-DD');
    console.log(hora);
    let input_fecha_ce = document.querySelector('#input_fecha_ce');
    input_fecha_ce.value = hora;

    // Carga algoritmos
    // algoritmos
    let sel_algoritmo_ce = document.querySelector('#sel_algoritmo_ce');
    if (typeof SESION.config.algoritmos !== 'undefined' && SESION.config.algoritmos) {
        // Obtiene la lista y la limpia
        sel_algoritmo_ce.innerHTML = "";

        // Agrega los algoritmos disponibles
        SESION.config.algoritmos.forEach((algoritmo) => {
            opcion = document.createElement("option");
            texto = document.createTextNode(algoritmo.nombre);
            opcion.disabled = false;
            opcion.selected = false;
            opcion.value = algoritmo.carpeta;
            opcion.name = algoritmo.nombre;
            opcion.appendChild(texto);
            sel_algoritmo_ce.appendChild(opcion);
        });
    }

    // Cargar escenario
    visor_archivos.set(div_archivos, ipcRenderer);

    // Carga horas
    let sel_hora_ce = document.querySelector('#sel_hora_ce');
    for (var i = 0; i < 24; i++) {
        let nodo_opc = document.createElement('option');
        let nodo_txt = document.createTextNode(`${i}`);

        nodo_opc.appendChild(nodo_txt);
        sel_hora_ce.appendChild(nodo_opc);
    }

    // Carga intervalos
    let intervalos_fun = (event) => {
        let max_intervalos;
        let sel_intervalo_ce = document.querySelector('#sel_intervalo_ce');
        SESION.config.algoritmos.forEach((algoritmo) => {

            if (algoritmo.nombre.toLowerCase().replace('-', '') === sel_algoritmo_ce.value) {
                max_intervalos = algoritmo.intervalos;
            }
        });

        // Ingresa los intervalos en el combo
        sel_intervalo_ce.innerHTML = "";

        for (let i = 1; i <= max_intervalos; i++) {
            let nodo_opc = document.createElement('option');
            let nodo_txt = document.createTextNode(`${i}`);

            nodo_opc.appendChild(nodo_txt);
            sel_intervalo_ce.appendChild(nodo_opc);
        }
    };

    sel_algoritmo_ce.onmouseup = intervalos_fun;
    sel_algoritmo_ce.onkeyup = intervalos_fun;
    sel_algoritmo_ce.onkeyup();

    // selecciona el primero
    document.querySelector('.opc-menu').click();
}

function cargarEscenario() {
    // manda a obtener el utc de la fecha seleccionada
    let input_fecha_ce = document.querySelector('#input_fecha_ce');
    let sel_hora_ce = document.querySelector('#sel_hora_ce');
    banner.mostrar();
    banner.actualizando('coral');
    banner.setMensaje('Consultando UTC');
    banner.ocultarProgreso();
    banner.ocultarBoton();

    ipcRenderer.send('utc:consulta', `${input_fecha_ce.value} ${sel_hora_ce.value}:00`, SESION.sistemaZona);
}

ipcRenderer.on('utc:respuesta', (event, json) => {
    console.log('UTC => ', json);

    if (!json.estado || typeof json.utc === 'undefined') {
        banner.error('darkred');
        banner.setMensaje(json.mensaje);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });

        return;
    }

    let {rutaId, dia, mes, anio, id} = generarRutaEscenario(json.utc);

    let sel_algoritmo_ce = document.querySelector('#sel_algoritmo_ce');

    let obj = {
        id_escenario: id,
        dirRemoto: `${SESION.config.exalogic.base}${SESION.sistemaCarpeta}/${sel_algoritmo_ce.value}/datosh/${rutaId}`,
        pathLocal: `${sel_algoritmo_ce.value}/escenario_original/`,
        dia: dia,
        mes: mes,
        anio: anio,
        algoritmo: sel_algoritmo_ce.value
    };

    console.log(dia, obj.dia);
    ipcRenderer.send('directorio:descarga', obj);

    banner.setMensaje('Descargando escenario');
    banner.setProgreso(0);
    banner.mostrarProgreso();
});

function generarRutaEscenario(utc) {
    let input_fecha_ce = document.querySelector('#input_fecha_ce');
    let fecha = input_fecha_ce.value;

    if (fecha.trim() === '') {
        input_fecha_ce.bordeOriginal = input_fecha_ce.style.borderColor;
        input_fecha_ce.style.borderColor = 'red';
        input_fecha_ce.focus();
        return;
    }
    input_fecha_ce.style.borderColor = input_fecha_ce.bordeOriginal;

    let hora = document.querySelector('#sel_hora_ce').value;
    if (hora.length === 1) {
        hora = `0${hora}`;
    }

    let intervalo = document.querySelector('#sel_intervalo_ce').value;
    if (intervalo.length === 1) {
        intervalo = `0${intervalo}`;
    }

    console.log('fecha', fecha);
    let [ anio, mes, dia ] = fecha.split('-');
    // let utc = `${new Date(anio, mes, dia).getTimezoneOffset() / 60}`;
    // if (utc.length === 1) {
    //     utc = `0${utc}`;
    // }
    console.log('UTC: ', utc);
    let id = `${anio}${mes}${dia}${hora}${intervalo}_${utc}`;

    return {rutaId: `${anio}/${mes}/${dia}/${id}`, dia: dia, mes: mes, anio: anio, id: id};
}
