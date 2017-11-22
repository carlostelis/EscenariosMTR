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
let select_algoritmo_folio = null;
let input_fecha_folio = null;
let select_hora_folio = null;
let select_intervalo_folio = null;
let select_folio = null;
let pestanias_ce = null;
let form_folios_ce = null;
let form_exalogic_ce = null;
let boton_cargarEscenarioFolio = null;
let boton_cargarConsultarFolios = null;
let flag_modo_folio;

// Informacion de escenario
let contenedores_info = [];
let opciones_menu_info = [];
let colapsos = [];
let th_periodos = [];
let tablas_info = [];
let thead_periodo = [];
let thead_periodo_i = [];
let colapsables_info = [];
let tr_modificados = [];
let promesas_archivos = [];
let salida_algoritmo;
let res_algoritmo;

// Escenarios modificados
let contenedores_mod = [];
let opciones_menu_mod = [];
let colapsos_mod = [];
let tablas_mod = [];
let thead_periodo_mod = [];
let thead_periodo_i_mod = [];
let colapsables_mod = [];
let objEscVistaMod;
let boton_cargaEscenarioMod;
let boton_guardaBDEscenarioMod;
let boton_cargaEscenarioModActual;

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
let flag_resOutput_A = false;
let flag_resOutput_B = false;
let spans_archivos_res = [];
let promesas_archivos_A = [];
let promesas_archivos_B = [];
let flag_A_cargado;
let flag_B_cargado;

// Modificados
let select_mod_anio;
let select_mod_algoritmo;
let select_mod_mes;
let select_mod_dia;
let select_mod_esc_original;
let select_mod_esc_modificado;
let th_periodos_mod = [];
let spans_archivos = [];

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
let boton_nuevoFolio = null;
let boton_resultadoOriginal = null;

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
	menuCarga.onclick = () => { mostrarVista(vistaCarga, menuCarga); };
	menuCarga.deshabilitado = false;
	menuInfo = document.getElementById('menu-esc-info');
	menuInfo.onclick = () => { mostrarVista(vistaInfo, menuInfo); };
	menuInfo.deshabilitado = false;
	menuModifica = document.getElementById('menu-esc-modifica');
	menuModifica.onclick = () => { mostrarVista(vistaModifica, menuModifica); };
	menuModifica.deshabilitado = false;
	menuCompara = document.getElementById('menu-esc-compara');
	menuCompara.onclick = () => { mostrarVista(vistaCompara, menuCompara); };
	menuCompara.deshabilitado = false;
	menuAdmin = document.getElementById('menu-esc-admin');
	menuAdmin.onclick = () => { mostrarVista(vistaAdmin, menuAdmin); };
	menuAdmin.deshabilitado = false;

	vistaCarga = document.getElementById('vista-esc-carga');
	vistaInfo = document.getElementById('vista-esc-info');
	vistaModifica = document.getElementById('vista-esc-modifica');
	vistaCompara = document.getElementById('vista-esc-compara');
	vistaAdmin = document.getElementById('vista-esc-admin');

	// Funciones de carga
	vistaCarga.funcion = null;
	vistaInfo.funcion = null;
	vistaModifica.funcion = null;
	vistaCompara.funcion = null;
	vistaAdmin.funcion = null;

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
	select_algoritmo_folio = document.getElementById('sel_algoritmo_ce_folio');
    input_fecha_folio = document.getElementById('input_fecha_ce_folio');
    select_hora_folio = document.getElementById('sel_hora_ce_folio');
    select_intervalo_folio = document.getElementById('sel_intervalo_ce_folio');
    select_folio = document.getElementById('sel_folio_ce');
	pestanias_ce = Array.from(document.getElementsByClassName('pestania-ce'));
	div_opc_folios_ce = document.getElementById('div_opc_folios_ce');
	form_folios_ce = document.getElementById('form_folios_ce');
	form_exalogic_ce = document.getElementById('form_exalogic_ce');
	boton_cargarEscenarioFolio = document.getElementById('boton_cargarEscenarioFolio');
	boton_cargarConsultarFolios = document.getElementById('boton_cargarConsultarFolios');

	// Informacion de escenario
	// Separa objetos de de seccion de informacion y seccion modificados
	let cont_temp = Array.from(document.getElementsByClassName('contenedor-info'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('contenedor-mod')) {
			contenedores_mod.push(item);
		} else {
			contenedores_info.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('opcion-menu-info'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('opcion-menu-mod')) {
			opciones_menu_mod.push(item);
		} else {
			opciones_menu_info.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('celda-header-info'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('celda-header-mod')) {
			colapsos_mod.push(item);
		} else {
			colapsos.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('tabla-info'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('tabla-mod')) {
			tablas_mod.push(item);
		} else {
			tablas_info.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('alg-dep'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('alg-dep-mod')) {
			thead_periodo_mod.push(item);
		} else {
			thead_periodo.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('alg-dep-i'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('alg-dep-i-mod')) {
			thead_periodo_i_mod.push(item);
		} else {
			thead_periodo_i.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('colapsable'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('colapsable-mod')) {
			colapsables_mod.push(item);
		} else {
			colapsables_info.push(item);
		}
	});

	cont_temp = Array.from(document.getElementsByClassName('th-periodo'));
	cont_temp.forEach((item) => {
		if (item.classList.contains('th-periodo-mod')) {
			th_periodos_mod.push(item);
		} else {
			th_periodos.push(item);
		}
	});

	boton_cargaEscenarioMod = document.getElementById('boton_cargaEscenarioMod');
	boton_cargaEscenarioModActual = document.getElementById('boton_cargaEscenarioModActual');
	boton_guardaBDEscenarioMod = document.getElementById('boton_guardaBDEscenarioMod');
	spans_archivos = Array.from(document.getElementsByClassName('span-archivo'));

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
	spans_archivos_res = Array.from(document.getElementsByClassName('span-archivo-res'));

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

	// Modificados
	select_mod_anio = document.getElementById('select_mod_anio');
	select_mod_algoritmo = document.getElementById('select_mod_algoritmo');
	select_mod_mes = document.getElementById('select_mod_mes');
	select_mod_dia = document.getElementById('select_mod_dia');
	select_mod_esc_original = document.getElementById('select_mod_esc_original');
	select_mod_esc_modificado = document.getElementById('select_mod_esc_modificado');

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
	boton_nuevoFolio = document.getElementById('boton_nuevoFolio');
	boton_resultadoOriginal = document.getElementById('boton_resultadoOriginal');

    let div_archivos = document.getElementById('div_visor-archivos');

    // Fecha actual
    input_fecha.value = moment().format('YYYY-MM-DD');
	input_fecha_folio.value = moment().format('YYYY-MM-DD');

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

		select_algoritmo_folio.innerHTML = select_algoritmo.innerHTML;
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

	select_hora_folio.innerHTML = select_hora.innerHTML;

    // Carga intervalos
    let intervalos_fun = (select_trigger, select) => {
        let max_intervalos;
        SESION.config.algoritmos.forEach((algoritmo) => {

            if (algoritmo.nombre.toLowerCase().replace('-', '') === select_trigger.value) {
                max_intervalos = algoritmo.intervalos;
            }
        });

        // Ingresa los intervalos en el combo
		select.innerHTML = "";

        for (let i = 1; i <= max_intervalos; i++) {
            let nodo_opc = document.createElement('option');
            let nodo_txt = document.createTextNode(`${i}`);

            nodo_opc.appendChild(nodo_txt);
			select.appendChild(nodo_opc);
        }
    };

    // select_algoritmo.onmouseup = function () {intervalos_fun(select_algoritmo, select_intervalo)};
    // select_algoritmo.onkeyup = function () {intervalos_fun(select_algoritmo, select_intervalo)};
	select_algoritmo.onchange = function () {intervalos_fun(select_algoritmo, select_intervalo)};
    select_algoritmo.onchange();

	// select_algoritmo_folio.onmouseup = function () {intervalos_fun(select_algoritmo_folio, select_intervalo_folio)};
    // select_algoritmo_folio.onkeyup = function () {intervalos_fun(select_algoritmo_folio, select_intervalo_folio)};
	select_algoritmo_folio.onchange = function () {intervalos_fun(select_algoritmo_folio, select_intervalo_folio)};
    select_algoritmo_folio.onchange();

    // selecciona el primero
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

function mensajeConsola(mensaje, flagArchivo) {
	// Agrega la estampa de tiempo
	let mensaje_consola = `<b>[${moment().format('YYYY-MM-DD HH:mm:ss')}]</b>\t${mensaje}`;

	// Escribe Mensaje a la consola
	if (div_msg_consola.innerHTML === '') {
		div_msg_consola.innerHTML += `${mensaje_consola}`;
	} else {
		div_msg_consola.innerHTML += `<br>${mensaje_consola}`;
	}

	div_msg_consola.scrollTop = div_msg_consola.scrollHeight;

	if (typeof flagArchivo !== 'undefined' && flagArchivo === true) {
		let mensaje_bitacora = moment().format('YYYY-MM-DD HH:mm:ss') + '\t' + mensaje;

		// Manda mensaje a la bitacora
		ipcRenderer.send('bitacora:escribir', mensaje_bitacora);
	}
}

window.onbeforeunload = function(e) {
    body.style.opacity = '0';
};

function mostrarVista(vistaMostrar, menu) {
	if (menu.classList.contains('deshabilitado')) {
		return;
	}

	if (menu.classList.contains('invalido')) {
		return;
	}

	// Ejecuta funcion, si tiene
	if (typeof vistaMostrar.funcion !== 'undefined' && vistaMostrar.funcion !== null) {
		setTimeout(() => {
			vistaMostrar.funcion();
		}, 10);
	}

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
