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

let paginaActual = 'login';
let primeraVez = true; // Para carga de sistemas
let intervaloCarga;
const body = document.querySelector("body");
const banner = new Banner(body);
const visor_archivos = new VistaArchivos();
const moment = require('moment');
const SESION = {
	usuario: '',
	sistema: ''
}

let objArchivos;

let menuCarga;
let menuInfo;
let menuModifica;
let menuCompara;
let menuAdmin;

// Al cargar la pagina es inicio de sesion, se consultan
// sistemas disponibles y cargan documentos en el area de trabajo
body.onload = () => {
    body.style.opacity = '1';

    solicitarSistemas();

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

    ipcRenderer.send('paginas:leer');
};

function mensajeConsola(mensaje) {
	// Agrega la estampa de tiempo
	let mensaje_consola = `<b>[${moment().format('YYYY-MM-DD HH:mm:ss')}]</b>\t${mensaje}`;

	// Escribe Mensaje a la consola
	let div_msg_consola = document.getElementById('div_msg_consola');
	let nodo_span = document.createElement('span');
	nodo_span.innerHTML = mensaje_consola;

	div_msg_consola.appendChild(nodo_span);
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
	let vista = document.getElementById('vista-esc-carga');
	mostrarVista(vista, menuCarga);
}

function fn_menuInfo() {
	if (menuInfo.deshabilitado) {
		return;
	}

	if (menuInfo.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	let vista = document.getElementById('vista-esc-info');
	mostrarVista(vista, menuInfo);
}

function fn_menuModifica() {
	if (menuModifica.deshabilitado) {
		return;
	}

	if (menuModifica.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	let vista = document.getElementById('vista-esc-modifica');
	mostrarVista(vista, menuModifica);
}

function fn_menuCompara() {
	if (menuCompara.deshabilitado) {
		return;
	}

	if (menuCompara.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	let vista = document.getElementById('vista-esc-compara');
	mostrarVista(vista, menuCompara);
}

function fn_menuAdmin() {
	if (menuAdmin.deshabilitado) {
		return;
	}

	if (menuAdmin.classList.contains('invalido')) {
		return;
	}

	// oculta las vistas
	let vista = document.getElementById('vista-esc-admin');
	mostrarVista(vista, menuAdmin);
}

function mostrarVista(vistaMostrar, menu) {
	let vistas = document.getElementsByClassName('opc-vista');
	let menus = document.getElementsByClassName('opcion-menu');

	for (let menuItem of menus) {
		menuItem.classList.remove('deshabilitado');
		menuItem.deshabilitado = false;
	}

	for (let vista of vistas) {
		if (vista === vistaMostrar) {
			// Aca está opaco aun
			setTimeout(() => {
				vista.style.display = 'initial';
				setTimeout(() => {
					vista.classList.add('visible');
				}, 310);
			}, 300);

			// deshabilita el boton
			console.log('deshabilita', menu);
			menu.classList.add('deshabilitado');
			menu.deshabilitado = true;
		} else {
			//vista.style.display = 'none';
			vista.classList.remove('visible');
			setTimeout(() => {
				vista.style.display = 'none';
			}, 300);
		}
	}
}
