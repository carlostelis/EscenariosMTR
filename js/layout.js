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
        divLogin.classList.remove('d-none');
        divLayout.classList.add('d-none');
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
    paginas.forEach((pagina) => {
        vistasOpcion.forEach((vista) => {
            if (vista.dataset.opc === pagina.id) {
                vista.innerHTML = pagina.data;
            }
        });
    });

    // Carga componentes cuando están todas en el dom
    setTimeout(() => {
        cargaComponentes();
    }, 100);
});

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
            }, 500);

            setTimeout(() => {
                banner.ocultarProgreso();
            }, 100);

            rutaEscenarioOriginal = res.rutaLocal;
            console.log('Ruta de escenario:', rutaEscenarioOriginal);

            mensajeConsola(`Escenario cargado localmente: ${rutaEscenarioOriginal}`);

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
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    }
});

ipcRenderer.on('algoritmo:descargado', (event, res) => {
    if (res.estado) {
        visor_archivos.actualizar();
        setTimeout(() => {
            // Habilita el menu info
            menuInfo.classList.remove('invalido');

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
        	let boton_ejecutarEscenario = document.getElementById('boton_ejecutarEscenario');
        	if (boton_ejecutarEscenario) {
        		boton_ejecutarEscenario.disabled = true;
        	}

            // Despliegua la seccion
            menuInfo.onclick();
            // Primer menú, informacion general
            opciones_menu_info[0].onclick();
        }, 1500);
    } else {
        banner.error();
        banner.vistaNormal();
        banner.setMensaje(`Error durante la descarga del algoritmo: ${res.error}`);
        banner.setBoton('Aceptar', () => {
            banner.ocultar();
        });
        banner.mostrarBoton();
    }
});

// Inicializa componentes, listas, combos, vistas, etc.
function cargaComponentes() {
    // Obtiene las referencias de los componentes globales
    select_algoritmo = document.getElementById('sel_algoritmo_ce');
    input_fecha = document.getElementById('input_fecha_ce');
    select_hora = document.getElementById('sel_hora_ce');
    select_intervalo = document.getElementById('sel_intervalo_ce');
    select_folio = document.getElementById('sel_folio_ce');

    // Informacion de escenario
    contenedores_info = Array.from(document.getElementsByClassName('contenedor-info'));
    opciones_menu_info = Array.from(document.getElementsByClassName('opcion-menu-info'));
    colapsos = Array.from(document.getElementsByClassName('celda-header-info'));
    th_periodos = Array.from(document.getElementsByClassName('th-periodo'));
    tablas_info = Array.from(document.getElementsByClassName('tabla-info'));
    thead_periodo = Array.from(document.getElementsByClassName('alg-dep'));
    thead_periodo_i = Array.from(document.getElementsByClassName('alg-dep-i'));

    // Comparacion de resultados
    tablas_res = Array.from(document.getElementsByClassName('tabla-res'));
    divs_res = Array.from(document.getElementsByClassName('div-tabla-res'));
    colapsos_res = Array.from(document.getElementsByClassName('celda-header-res'));
    divsScrollRes = Array.from(document.getElementsByClassName('div-scroll-res'));
    folios_mod = Array.from(document.getElementsByClassName('sel-folios-mod'));
    botones_folio_res = Array.from(document.getElementsByClassName('btn-folio-res'));
    vistasContenedor = document.getElementById('vistas_contenedor');

    // Empareja tablas para resultados
    let tablas_res_a = [];
    let tablas_res_b = [];
    for (let tabla of tablas_res) {
        if (tabla.classList.contains('A')) {
            tablas_res_a.push(tabla);
            tabla.marco = 'A';
        } else if (tabla.classList.contains('B')) {
            tablas_res_b.push(tabla);
            tabla.marco = 'B';
        }
    }

    tablas_res_a.forEach((tabla_a) => {
        tablas_res_b.forEach((tabla_b) => {
            if (tabla_a.id === tabla_b.id) {
                tabla_a.tabla_par = tabla_b;
                tabla_b.tabla_par = tabla_a;
            }
        });
    });
    tablas_res_a = null;
    tablas_res_b = null;

    // EMpareja divs scroll res
    if (divsScrollRes.length > 1) {
        divsScrollRes[0].div_par = divsScrollRes[1];
        divsScrollRes[0].isScrolling = false;
        divsScrollRes[1].div_par = divsScrollRes[0];
        divsScrollRes[1].isScrolling = false;

        // Agrega banner a cada div
        banner_resA = new Banner(divsScrollRes[0]);
        banner_resB = new Banner(divsScrollRes[1]);
        // Pre-configura
        banner_resA.ocultarBoton()
        banner_resA.ocultarProgreso()
        banner_resA.vistaIcono();
        banner_resA.cargando();

        banner_resB.ocultarBoton()
        banner_resB.ocultarProgreso()
        banner_resB.vistaIcono();
        banner_resB.cargando();
    }

    // Funcion de los combos de folios
    let folio_res_fun = (sel, marco) => {
        let folio;
        let boton;
        if (marco === 'A') {
            folio = sel.value;
            boton = botones_folio_res[0];
        } else {
            folio = sel.value;
            boton = botones_folio_res[1];
        }

        console.log(folio, marco);
        console.log(objEscA_res.ruta);
        console.log(objEscB_res.ruta);

        if (objEscA_res.ruta.endsWith(folio) || objEscB_res.ruta.endsWith(folio)) {
            boton.disabled = true;
        } else {
            boton.disabled = false;
        }
    };

    // Asigna evento
    for (let i = 0; i < 2; i++) {
        folios_mod[i].onmouseup = function() { folio_res_fun(this, (i === 0 ? 'A' : 'B')); };
        folios_mod[i].onkeyup = function() { folio_res_fun(this, (i === 0 ? 'A' : 'B')); };
    }

    // Etiquetas comunes
    usuario_labels = Array.from(document.getElementsByClassName('label-usuario-esc'));
    sistema_labels = Array.from(document.getElementsByClassName('label-sistema-esc'));
    algoritmo_labels = Array.from(document.getElementsByClassName('label-algoritmo-esc'));
    fecha_labels = Array.from(document.getElementsByClassName('label-fecha-esc'));
    hora_labels = Array.from(document.getElementsByClassName('label-hora-esc'));
    intervalo_labels = Array.from(document.getElementsByClassName('label-intervalo-esc'));
    folio_labels = Array.from(document.getElementsByClassName('label-folio-esc'));

    boton_ejecutarEscenario = document.getElementById('boton_ejecutarEscenario');

    let div_archivos = document.getElementById('div_visor-archivos');

    // Fecha actual
    input_fecha.value = moment().format('YYYY-MM-DD');

    // Carga algoritmos
    // algoritmos
    if (typeof SESION.config.algoritmos !== 'undefined' && SESION.config.algoritmos) {
        // Obtiene la lista y la limpia
        select_algoritmo.innerHTML = "";

        // Agrega los algoritmos disponibles
        SESION.config.algoritmos.forEach((algoritmo) => {
            opcion = document.createElement("option");
            texto = document.createTextNode(algoritmo.nombre);
            opcion.disabled = false;
            opcion.selected = false;
            opcion.value = algoritmo.carpeta;
            opcion.name = algoritmo.nombre;
            opcion.appendChild(texto);
            select_algoritmo.appendChild(opcion);
        });
    }

    // Cargar escenario
    visor_archivos.set(div_archivos, ipcRenderer);

    // Carga horas
    for (var i = 0; i < 24; i++) {
        let nodo_opc = document.createElement('option');
        let hora_txt = `${i}`;
        if (hora_txt.trim().length === 1) {
            hora_txt = `0${hora_txt}`;
        }

        let nodo_txt = document.createTextNode(`${hora_txt}:00`);

        nodo_opc.appendChild(nodo_txt);
        nodo_opc.value = i;
        select_hora.appendChild(nodo_opc);
    }

    // Carga intervalos
    let intervalos_fun = (event) => {
        let max_intervalos;
        SESION.config.algoritmos.forEach((algoritmo) => {

            if (algoritmo.nombre.toLowerCase().replace('-', '') === select_algoritmo.value) {
                max_intervalos = algoritmo.intervalos;
            }
        });

        // Ingresa los intervalos en el combo
        select_intervalo.innerHTML = "";

        for (let i = 1; i <= max_intervalos; i++) {
            let nodo_opc = document.createElement('option');
            let nodo_txt = document.createTextNode(`${i}`);

            nodo_opc.appendChild(nodo_txt);
            select_intervalo.appendChild(nodo_opc);
        }
    };

    select_algoritmo.onmouseup = intervalos_fun;
    select_algoritmo.onkeyup = intervalos_fun;
    select_algoritmo.onkeyup();

    // selecciona el primero
    // document.querySelector('.opc-menu').click();
    menuCarga.onclick();
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

    mensajeConsola(`Solicitando escenario ${id}`);

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
