// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

const electron = require('electron');
const { ipcRenderer } = electron;

require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
		label: 'Rainbow',
		// Only show it when right-clicking images
		visible: params.mediaType === 'image'
	}]
});

const body = document.querySelector("body");
const div_msg_consola = document.getElementById('div_msg_consola');
const banner = new Banner(body);
const visor_archivos = new VistaArchivos();
const moment = require('moment');
const SESION = {
	usuario: '',
	sistema: ''
}

// Login
const inputNombre = document.querySelector('#input_nombre_IS');
const inputContrasena = document.querySelector('#input_contrasena_IS');
const selectSistema = document.querySelector('#select_sistema_IS');
const divLogin = document.querySelector('#div-login');
const divLayout = document.querySelector('#div-layout');

let paginaActual = 'login';
let primeraVez = true; // Para carga de sistemas
let intervaloCarga = null;
let objEscOriginal = null;
let objEscModificado = null;
let rutaEscenarioOriginal = null;

// Elementos del menu general
let menuCarga = null;
let menuInfo = null;
let menuModifica = null;
let menuCompara = null;
let menuAdmin = null;

let vistaCarga = null;
let vistaInfo = null;
let vistaModifica = null;
let vistaCompara = null;
let vistaAdmin = null;

let menusOpcion = null;
let vistasOpcion = null;
let vistasContenedor = null;

// Elementos del formulario de carga
let select_algoritmo = null;
let input_fecha = null;
let select_hora = null;
let select_intervalo = null;
let select_folio = null;

// Informacion de escenario
let contenedores_info = null;
let opciones_menu_info = null;
let colapsos = null;
let th_periodos = null;
let tablas_info = null;
let thead_periodo = null;
let thead_periodo_i = null;
let colapsables_info = null;

// Comparacion de resultados
let tablas_res = null;
let divs_res = null;
let colapsos_res = null;
let objEscA_res = null;
let objEscB_res = null;
let marcoSeleccionado = null;
let divsScrollRes = [];
let banner_resA = null;
let banner_resB = null;
let flag_espera_esc = false;
let folios_mod = null;
let botones_folio_res = null;
let colapsables_res = null;
let label_resA = null;
let label_resB = null;

// Etiquetas comunes
let usuario_labels = null;
let sistema_labels = null;
let algoritmo_labels = null;
let fecha_labels = null;
let hora_labels = null;
let intervalo_labels = null;
let folio_labels = null;

let boton_ejecutarEscenario = null;
let boton_actualizarEscenario = null;

// Al cargar la pagina es inicio de sesion, se consultan
// sistemas disponibles y cargan documentos en el area de trabajo
body.onload = () => {
    body.style.opacity = '1';
	div_msg_consola.innerHTML = '';
    solicitarSistemas();

	// Componentes de vistas y menus desde index

	menusOpcion = Array.from(document.getElementsByClassName('opcion-menu'));
	vistasOpcion = Array.from(document.getElementsByClassName('opc-vista'));
	contenedor = Array.from(document.getElementById('vistas_contenedor'));

	menuCarga = document.getElementById('menu-esc-carga');
	menuCarga.onclick = fn_menuCarga;
	menuCarga.deshabilitado = false;
	menuInfo = document.getElementById('menu-esc-info');
	menuInfo.onclick = fn_menuInfo;
	menuInfo.deshabilitado = false;
	menuModifica = document.getElementById('menu-esc-modifica');
	menuModifica.onclick = fn_menuModifica;
	menuModifica.deshabilitado = false;
	menuCompara = document.getElementById('menu-esc-compara');
	menuCompara.onclick = fn_menuCompara;
	menuCompara.deshabilitado = false;
	menuAdmin = document.getElementById('menu-esc-admin');
	menuAdmin.onclick = fn_menuAdmin;
	menuAdmin.deshabilitado = false;

	vistaCarga = document.getElementById('vista-esc-carga');
	vistaInfo = document.getElementById('vista-esc-info');
	vistaModifica = document.getElementById('vista-esc-modifica');
	vistaCompara = document.getElementById('vista-esc-compara');
	vistaAdmin = document.getElementById('vista-esc-admin');

    ipcRenderer.send('paginas:leer');
};

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
	colapsables_info = Array.from(document.getElementsByClassName('colapsable'));

    // Comparacion de resultados
    tablas_res = Array.from(document.getElementsByClassName('tabla-res'));
    divs_res = Array.from(document.getElementsByClassName('div-tabla-res'));
    colapsos_res = Array.from(document.getElementsByClassName('celda-header-res'));
    divsScrollRes = Array.from(document.getElementsByClassName('div-scroll-res'));
    folios_mod = Array.from(document.getElementsByClassName('sel-folios-mod'));
    boton_cargarFolios = document.getElementById('boton_cargarFolios');
    vistasContenedor = document.getElementById('vistas_contenedor');
	label_resA = document.getElementById('label_idResA');
	label_resB = document.getElementById('label_idResB');

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

	colapsos_res.forEach((col_res) => {
		col_res.desplegado = true;
	});

	// Asocia las tablas de resultados a sus contenedores
	divs_res.forEach((col_res) => {
		for (let nodoA of col_res.childNodes) {
			// Encuentra el div de la tabla
			if (nodoA.nodeName.toLowerCase() === 'div') {
				col_res.div_tabla = nodoA;
				for (let nodoB of nodoA.childNodes) {
					// Encuentra la tabla
					if (nodoB.nodeName.toLowerCase() === 'table') {
						col_res.tabla_res = nodoB;
						break;
					}
				}
				break;
			}
		}
	});

    // Etiquetas comunes
    usuario_labels = Array.from(document.getElementsByClassName('label-usuario-esc'));
    sistema_labels = Array.from(document.getElementsByClassName('label-sistema-esc'));
    algoritmo_labels = Array.from(document.getElementsByClassName('label-algoritmo-esc'));
    fecha_labels = Array.from(document.getElementsByClassName('label-fecha-esc'));
    hora_labels = Array.from(document.getElementsByClassName('label-hora-esc'));
    intervalo_labels = Array.from(document.getElementsByClassName('label-intervalo-esc'));
    folio_labels = Array.from(document.getElementsByClassName('label-folio-esc'));

    boton_ejecutarEscenario = document.getElementById('boton_ejecutarEscenario');
	boton_actualizarEscenario = document.getElementById('boton_actualizarEscenario');

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

function folio_selecciona() {
	if ((!objEscA_res.ruta.endsWith(folios_mod[0].value) && !objEscB_res.ruta.endsWith(folios_mod[0].value)) || (!objEscA_res.ruta.endsWith(folios_mod[1].value) && !objEscB_res.ruta.endsWith(folios_mod[1].value))) {
		boton_cargarFolios.disabled = false;

		// Si son iguales
		if (folios_mod[0].value !== folios_mod[1].value) {
			boton_cargarFolios.disabled = false;
		} else {
			boton_cargarFolios.disabled = true;
		}
	} else {
		boton_cargarFolios.disabled = true;
	}
}

function mensajeConsola(mensaje) {
	// Agrega la estampa de tiempo
	let mensaje_consola = `<b>[${moment().format('YYYY-MM-DD HH:mm:ss')}]</b>\t${mensaje}`;

	// Escribe Mensaje a la consola
	if (div_msg_consola.innerHTML === '') {
		div_msg_consola.innerHTML += `${mensaje_consola}`;
	} else {
		div_msg_consola.innerHTML += `<br>${mensaje_consola}`;
	}

	div_msg_consola.scrollTop = div_msg_consola.scrollHeight;

	let mensaje_bitacora = moment().format('YYYY-MM-DD HH:mm:ss') + '\t' + mensaje;

	// Manda mensaje a la bitacora
	ipcRenderer.send('bitacora:escribir', mensaje_bitacora);
}

window.onbeforeunload = function(e) {
    body.style.opacity = '0';
};

function fn_menuCarga() {
	if (menuCarga.deshabilitado) {
		return;
	}

	if (menuCarga.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	mostrarVista(vistaCarga, menuCarga);
}

function fn_menuInfo() {
	if (menuInfo.deshabilitado) {
		return;
	}

	if (menuInfo.classList.contains('invalido')) {
		return;
	}

	// Deshabilita
	mostrarVista(vistaInfo, menuInfo);
}

function fn_menuModifica() {
	if (menuModifica.deshabilitado) {
		return;
	}

	if (menuModifica.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	mostrarVista(vistaModifica, menuModifica);
}

function fn_menuCompara() {
	if (menuCompara.deshabilitado) {
		return;
	}

	if (menuCompara.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	mostrarVista(vistaCompara, menuCompara);
}

function fn_menuAdmin() {
	if (menuAdmin.deshabilitado) {
		return;
	}

	if (menuAdmin.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	mostrarVista(vistaAdmin, menuAdmin);
}

function mostrarVista(vistaMostrar, menu) {
	for (let menuItem of menusOpcion) {
		if (menuItem === menu) {
			// deshabilita el boton
			menu.classList.add('deshabilitado');
			menu.deshabilitado = true;
		} else {
			menuItem.classList.remove('deshabilitado');
			menuItem.deshabilitado = false;
		}
	}

	for (let vista of vistasOpcion) {
		if (vista !== vistaMostrar) {
			vista.classList.remove('visible');
			setTimeout(() => {
				vista.style.display = 'none';
			}, 300);

			setTimeout(() => {
				try {
					vistasContenedor.removeChild(vista);
				} catch (e) {}
			}, 350);
		}
	}

	vistasContenedor.appendChild(vistaMostrar);

	// Aca está opaco aun
	setTimeout(() => {
		vistaMostrar.style.display = 'initial';
		setTimeout(() => {
			vistaMostrar.classList.add('visible');
		}, 310);
	}, 300);
}
