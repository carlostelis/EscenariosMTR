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

    setTimeout(() => {
        var divLogin = document.querySelector('#div-layout');
        divLogin.classList.add('d-none');

        var divLayout = document.querySelector('#div-login');
        divLayout.classList.remove('d-none');
    }, 1000);

    setTimeout(() => {
        body.style.opacity = '1';
        paginaActual = 'login';
        // Habilita los menus
        menuInfo.classList.add('invalido');
        menuModifica.classList.add('invalido');
        menuCompara.classList.add('invalido');
        menuAdmin.classList.add('invalido');

        // Regresa al menu de carga escenario
        menuCarga.onclick();
    }, 1100);
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

// Progreso de descarga de directorio
ipcRenderer.on('directorio:progreso', (event, res) => {
    banner2.vistaNormal();
    banner2.mostrarProgreso();
    banner2.setMensaje(res.mensaje);
    banner2.setProgreso(res.progreso);
});

// Descarga finalizada (?)
ipcRenderer.on('directorio:descargado', (event, res) => {
    if (res.estado) {
        if (res.error) {
            banner2.setMensaje(res.error);
            if (typeof res.targz !== 'undefined' && res.targz) {
                banner2.trabajando();
            }
        } else {
            banner2.setProgreso(100);
            banner2.ok();

            if (typeof res.flagLocal === 'undefined') {
                banner2.setMensaje('Escenario descargado correctamente');
                banner2.mostrarProgreso();
            } else {
                banner2.setMensaje('Escenario encontrado localmente');
            }

            // OCulta banner
            setTimeout(() => {
                banner2.setProgreso(0);
            }, 500);

            setTimeout(() => {
                banner2.ocultarProgreso();
                banner2.vistaCompacta();
            }, 600);

            rutaEscenarioOriginal = res.rutaLocal;
            console.log('Ruta de escenario:', rutaEscenarioOriginal);

            mensajeConsola(`Escenario cargado localmente: ${rutaEscenarioOriginal}`);

            // Descarga algoritmo
            banner2.setMensaje('Verificando algoritmo');
            banner2.actualizando();
            ipcRenderer.send('algoritmo:descarga', rutaEscenarioOriginal, document.querySelector('#sel_algoritmo_ce').value);
        }
    } else {
        banner2.ocultarProgreso();
        banner2.setMensaje(res.error);
        banner2.error('darkred');
        banner2.setBoton('Aceptar', () => {
            banner2.ocultar();
        });
        banner2.mostrarBoton();
    }
});

ipcRenderer.on('algoritmo:descargado', (event, res) => {
    if (res.estado) {
        visor_archivos.actualizar();
        setTimeout(() => {
            // Habilita el menu info
            menuInfo.classList.remove('invalido');

            // banner2.ocultar();
            banner2.trabajando();
            banner2.vistaCompacta();
            banner2.setMensaje('Leyendo información');

            // Despliega los datos en la siguiente seccion
            let div = document.querySelector('.contenedor-datos-escenario');
            if (div) {
                let sel_algoritmo_ce = document.querySelector('#sel_algoritmo_ce').value.toUpperCase();
                let algoritmo_labels = document.getElementsByClassName('label-algoritmo-esc');
                for (let label of algoritmo_labels) {
                    label.innerHTML = `Algoritmo: <b>${sel_algoritmo_ce}</b>`;
                }

                let input_fecha_ce = document.querySelector('#input_fecha_ce').value;
                let fecha_labels = document.getElementsByClassName('label-fecha-esc');
                for (let label of fecha_labels) {
                    label.innerHTML = `Fecha: <b>${input_fecha_ce}</b>`;
                }

                let sel_hora_ce = document.querySelector('#sel_hora_ce').value + '';
                if (sel_hora_ce.length < 2) {
                    sel_hora_ce = `0${sel_hora_ce}`;
                }
                let hora_labels = document.getElementsByClassName('label-hora-esc');
                for (let label of hora_labels) {
                    label.innerHTML = `Hora: <b>${sel_hora_ce}</b>`;
                }

                let sel_intervalo_ce = document.querySelector('#sel_intervalo_ce').value;
                if (sel_intervalo_ce.length < 2) {
                    sel_intervalo_ce = `0${sel_intervalo_ce}`;
                }
                let intervalo_labels = document.getElementsByClassName('label-intervalo-esc');
                for (let label of intervalo_labels) {
                    label.innerHTML = `Intervalo: <b>${sel_intervalo_ce}</b>`;
                }

                let folio_labels = document.getElementsByClassName('label-folio-esc');
                for (let label of folio_labels) {
                    label.innerHTML = `Folio: <b>- ORIGINAL -</b>`;
                }
            }

            // Pasa al menu de información
            ipcRenderer.send('escenario:leer', rutaEscenarioOriginal, SESION.algoritmo);
            menuInfo.onclick();
        }, 1500);
    } else {
        banner2.error();
        banner2.setMensaje(`Error durante la descarga del algoritmo: ${res.error}`);
        banner2.setBoton('Aceptar', () => {
            banner2.ocultar();
        });
        banner2.mostrarBoton();
    }
});

// Inicializa componentes, listas, combos, vistas, etc.
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
        let hora_txt = `${i}`;
        if (hora_txt.trim().length === 1) {
            hora_txt = `0${hora_txt}`;
        }

        let nodo_txt = document.createTextNode(`${hora_txt}:00`);

        nodo_opc.appendChild(nodo_txt);
        nodo_opc.value = i;
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

// Inicia la busqueda del escenario, primero obtiene UTC de la fecha solicitada
function cargarEscenario() {
    // Deshabilita los menus
    menuInfo.classList.add('invalido');
    menuModifica.classList.add('invalido');
    menuCompara.classList.add('invalido');
    menuAdmin.classList.add('invalido');

    // Borra los objetos de escenarios anteriores
    objEscOriginal = null;
    objEscModificado = null;

    // Elimina el objeto anterior
    objArchivos = null;

    // manda a obtener el utc de la fecha seleccionada
    let input_fecha_ce = document.querySelector('#input_fecha_ce');
    let sel_hora_ce = document.querySelector('#sel_hora_ce');

    // Comienza con vista compacta
    banner2.normal();
    banner2.vistaCompacta();
    banner2.mostrar();
    banner2.actualizando('steelblue');
    banner2.setMensaje('Consultando UTC');
    banner2.setProgreso(0);
    banner2.ocultarProgreso();
    banner2.ocultarBoton();

    ipcRenderer.send('utc:consulta', `${input_fecha_ce.value} ${sel_hora_ce.value}:00`, SESION.sistemaZona);
}

// Recibe UTC de Java
ipcRenderer.on('utc:respuesta', (event, json) => {
    console.log('UTC => ', json);

    if (!json.estado || typeof json.utc === 'undefined') {
        banner2.error('darkred');
        banner2.setMensaje(json.mensaje);
        banner2.setBoton('Aceptar', () => {
            banner2.ocultar();
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

    mensajeConsola(`Solicitando escenario ${id}`);

    SESION.algoritmo = sel_algoritmo_ce.value;

    ipcRenderer.send('directorio:descarga', obj);

    banner2.setMensaje('Buscando escenario');
});

// Construye el nombre del escenario
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

    console.log('UTC: ', utc);
    let id = `${anio}${mes}${dia}${hora}${intervalo}_${utc}`;

    return {rutaId: `${anio}/${mes}/${dia}/${id}`, dia: dia, mes: mes, anio: anio, id: id};
}
