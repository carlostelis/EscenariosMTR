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

// Etiquetas comunes
let usuario_labels = null;
let sistema_labels = null;
let algoritmo_labels = null;
let fecha_labels = null;
let hora_labels = null;
let intervalo_labels = null;
let folio_labels = null;

let boton_ejecutarEscenario = null;

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
	if (menuInfo.deshabilitado) { console.log('deshabilitado info');
		return;
	}

	if (menuInfo.classList.contains('invalido')) {
		console.log('invalido info');
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
