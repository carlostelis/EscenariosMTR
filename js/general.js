// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Inicializa electron
const electron = require('electron');
// ipcRenderer es el objeto que permite la comunicación con el proceso main.
const { ipcRenderer } = electron;

// Instancia que permite abrir el menu contextual del clic derecho en modo desarrollo
require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
		label: 'Rainbow',
		// Only show it when right-clicking images
		visible: params.mediaType === 'image'
	}]
});

// Inicializa tooltips en todos los elementos que contengan el atributo data-toggle="tooltip"
// Añade 1000ms de delay para mostrar y 100ms de delay para ocultar
$(function () {
	$('[data-toggle="tooltip"]').tooltip({delay: {show: 1000, hide: 100}, trigger: 'hover'});
});

// Mute al debug de la librería
// Sin esto salen muchos mensajes a la consola
jQuery.migrateMute = true;

// Creación de objetos, variables y constantes
const body = document.querySelector("body");
const div_msg_consola = document.getElementById('div_msg_consola');
const banner = new Banner(body);
const bannerIcono = new Banner(body);
const bannerBD = new Banner(body);
const consolaExe = new Consola(body);
const visor_archivos = new VistaArchivos();
const moment = require('moment');
const nodePath = require('path');
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
let select_anio_ce_folio = null;
let select_mes_ce_folio = null;
let select_dia_ce_folio = null;
let select_folio_ce = null;
let pestanias_ce = null;
let form_folios_ce = null;
let form_exalogic_ce = null;
let boton_cargarEscenarioFolio = null;
let objEscFolio = null;

// Informacion de escenario
let contenedores_info = [];
let opciones_menu_info = [];
let colapsos = [];
let promesas_archivos = [];
let salida_algoritmo;
let res_algoritmo;
let textarea_comentarios_info;
let listaFilasColumnas = [];
let gridsInfo = [];
let ultimaFila;
let ultimaColumna;

// Escenarios modificados
let contenedores_mod = [];
let opciones_menu_mod = [];
let colapsos_mod = [];
let objEscVistaMod;
let boton_cargaEscenarioMod;
let boton_cargaEscenarioModActual;
let boton_guardaBDEscenarioMod;
let boton_cargaEscenarioMod_estado;
let boton_cargaEscenarioModActual_estado;
let flag_guardandoBD = false;
let gridsMod = [];

// Comparacion de resultados
let divs_res = null;
let colapsos_res = null;
let objEscA_res = null;
let objEscB_res = null;
let marcoSeleccionado = null;
let divsScrollRes = [];
let banner_resA = null;
let banner_resB = null;
let consola_resA = null;
let consola_resB = null;
let flag_espera_esc = false;
let folios_mod = null;
let botones_folio_res = null;
let label_resA = null;
let label_resB = null;
let flag_resOutput_A = false;
let flag_resOutput_B = false;
let promesas_archivos_A = [];
let promesas_archivos_B = [];
let flag_A_cargado;
let flag_B_cargado;
let gridsRes = [];
let listaRebote = [];
let listaDiferencias = [];

// Modificados
let select_mod_anio;
let select_mod_algoritmo;
let select_mod_mes;
let select_mod_dia;
let select_mod_esc_original;
let select_mod_esc_modificado;
let th_periodos_mod = [];
let spans_archivos = [];
let textarea_comentarios_mod;
let botonProgresoBD;

// Eliminar Escenario
let pestanias_eliminar = null;
let lista_ori_eliminar = null;
let lista_mod_eliminar = null;
let lista_ori_eliminar_bd = null;
let lista_mod_eliminar_bd = null;
let lista_ori_bd = null;
let lista_ori_local = null;
let lista_mod_bd = null;
let lista_mod_local = null;
let boton_eliminar_ori_local = null;
let boton_eliminar_mod_local = null;
let boton_eliminar_ori_db = null;
let boton_eliminar_mod_db = null;
let select_eliminar_algoritmo_local = null;
let select_eliminar_anio_local = null;
let select_eliminar_mes_local = null;
let select_eliminar_dia_local = null;
let select_eliminar_algoritmo_db = null;
let select_eliminar_anio_db = null;
let select_eliminar_mes_db = null;
let select_eliminar_dia_db = null;
let div_comentarios_eliminar_local = null;
let div_comentarios_eliminar_db = null;
let botonModTemp;
let botonOriLocalSel = null;
let botonModLocalSel = null;
let botonOriDBSel = null;
let botonModDBSel = null;

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
// sistemas disponibles y cargan elementos en el area de trabajo
body.onload = () => {
    body.style.opacity = '1';
	div_msg_consola.innerHTML = '';
    solicitarSistemas();

	// Configura banner
	bannerIcono.vistaIcono();
	bannerIcono.cargando();
	bannerIcono.ocultarBoton();
	bannerIcono.setMensaje('');
	bannerIcono.ocultarProgreso();

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
	vistaAdmin.funcion = consultarOriginalesTodos;

    // Invoca el evento para leer las paginas de los despliegues
    ipcRenderer.send('paginas:leer');
};

window.onbeforeunload = function(e) {
    body.style.opacity = '0';
};

// Lee los datos de las paginas para los paneles
// ${paginas} es un arreglo con las paginas marcadas con identificador
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
    select_anio_ce_folio = document.getElementById('sel_anio_ce_folio');
    select_mes_ce_folio = document.getElementById('sel_mes_ce_folio');
    select_dia_ce_folio = document.getElementById('sel_dia_ce_folio');
    select_folio_ce = document.getElementById('sel_folio_ce');

	pestanias_ce = Array.from(document.getElementsByClassName('pestania-ce'));
	div_opc_folios_ce = document.getElementById('div_opc_folios_ce');
	form_folios_ce = document.getElementById('form_folios_ce');
	form_exalogic_ce = document.getElementById('form_exalogic_ce');
	boton_cargarEscenarioFolio = document.getElementById('boton_cargarEscenarioFolio');

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

	textarea_comentarios_info = document.getElementById('textarea_comentarios_info');
	spans_archivos = Array.from(document.getElementsByClassName('span-archivo'));

    // Comparacion de resultados
    divs_res = Array.from(document.getElementsByClassName('div-tabla-res'));
    colapsos_res = Array.from(document.getElementsByClassName('celda-header-res'));
    divsScrollRes = Array.from(document.getElementsByClassName('div-scroll-res'));
    folios_mod = Array.from(document.getElementsByClassName('sel-folios-mod'));
    boton_cargarFolios = document.getElementById('boton_cargarFolios');
    vistasContenedor = document.getElementById('vistas_contenedor');
	label_resA = document.getElementById('label_idResA');
	label_resB = document.getElementById('label_idResB');

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

		// Consolas resultados
		consola_resA = new Consola(divsScrollRes[0]);
	    consola_resA.addBoton('cerrar', 'Cerrar', () => {
	        consola_resA.ocultar();
	        consola_resB.ocultar();
	    });

	    consola_resB = new Consola(divsScrollRes[1]);
	    consola_resB.addBoton('cerrar', 'Cerrar', () => {
	        consola_resA.ocultar();
	        consola_resB.ocultar();
	    });
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
	textarea_comentarios_mod = document.getElementById('textarea_comentarios_mod');

	// Eliminar escenarios
	pestanias_eliminar = Array.from(document.getElementsByClassName('pestania-eliminar'));
	divs_eliminar = Array.from(document.getElementsByClassName('div-lista-esc-eliminar'));
	lista_ori_bd = document.getElementById('lista_ori_bd');
	lista_ori_local = document.getElementById('lista_ori_local');
	lista_mod_bd = document.getElementById('lista_mod_bd');
	lista_mod_local = document.getElementById('lista_mod_local');
	boton_eliminar_ori_local = document.getElementById('boton_eliminar_ori_local');
	boton_eliminar_mod_local = document.getElementById('boton_eliminar_mod_local');
	boton_eliminar_ori_db = document.getElementById('boton_eliminar_ori_db');
	boton_eliminar_mod_db = document.getElementById('boton_eliminar_mod_db');
	select_eliminar_algoritmo_local = document.getElementById('select_eliminar_algoritmo_local');
	select_eliminar_anio_local = document.getElementById('select_eliminar_anio_local');
	select_eliminar_mes_local = document.getElementById('select_eliminar_mes_local');
	select_eliminar_dia_local = document.getElementById('select_eliminar_dia_local');
	select_eliminar_algoritmo_db = document.getElementById('select_eliminar_algoritmo_db');
	select_eliminar_anio_db = document.getElementById('select_eliminar_anio_db');
	select_eliminar_mes_db = document.getElementById('select_eliminar_mes_db');
	select_eliminar_dia_db = document.getElementById('select_eliminar_dia_db');
	div_comentarios_eliminar_local = document.getElementById('div_comentarios_eliminar_local');
	div_comentarios_eliminar_db = document.getElementById('div_comentarios_eliminar_db');

	// Eventos a selects de eliminar
	select_eliminar_algoritmo_local.onchange = fun_select_eliminar_algoritmo_local;
	select_eliminar_anio_local.onchange = fun_select_eliminar_anio_local;
	select_eliminar_mes_local.onchange = fun_select_eliminar_mes_local;
	select_eliminar_dia_local.onchange = fun_select_eliminar_dia_local;

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

    // Botones de modifica
	boton_cargaEscenarioMod = document.getElementById('boton_cargaEscenarioMod');
	boton_cargaEscenarioModActual = document.getElementById('boton_cargaEscenarioModActual');
	boton_guardaBDEscenarioMod = document.getElementById('boton_guardaBDEscenarioMod');
	botonProgresoBD = new BotonProgreso(boton_guardaBDEscenarioMod);

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

    select_algoritmo.onchange = () => {
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
    select_algoritmo.onchange();

    // selecciona el primero
    menuCarga.onclick();

	// Sin esta linea, kendo toma formato americano y los valores numéricos negativos
	// Se colocan entre paréntesis
	console.log('Aplicando formato moneda');
	kendo.culture().numberFormat.currency.pattern[0] = "-$n";
}

// Método que se asigna a los combos de compara escenario
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

// Método que permite mandar mensajes a la bitácora en pantalla y el archivo
// ${mensaje} es el texto a enviar
// ${flagArchivo} es una bandera indicando si se manda también al archivo
function mensajeConsola(mensaje, flagArchivo) {
	// Agrega la estampa de tiempo
	let mensaje_consola = `<b>[${moment().format('YYYY-MM-DD HH:mm:ss')}]</b>\t${mensaje}`;

	// Escribe Mensaje a la consola
	if (div_msg_consola.innerHTML === '') {
		div_msg_consola.innerHTML += `${mensaje_consola}`;
	} else {
		div_msg_consola.innerHTML += `<br>${mensaje_consola}`;
	}

    // Baja el scroll del div
	div_msg_consola.scrollTop = div_msg_consola.scrollHeight;

    // Si la bandera es true, se manda a electron para que escriba en el archivo
	if (typeof flagArchivo !== 'undefined' && flagArchivo === true) {
		let mensaje_bitacora = moment().format('YYYY-MM-DD HH:mm:ss') + '\t' + mensaje;

		// Manda mensaje a la bitacora
		ipcRenderer.send('bitacora:escribir', mensaje_bitacora);
	}
}

// Método para cambiar de vista (despliegue)
// ${vistaMostrar} es la vista a desplegar
// ${menu} es la opción del menu que invoca el evento
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

    // Habilita/Deshabilita menus
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

    // Oculta las otras vistas
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

    // Añade la vista al dom
	vistasContenedor.appendChild(vistaMostrar);

	// Muestra la vista con opacidad
	setTimeout(() => {
		vistaMostrar.style.display = 'initial';
		setTimeout(() => {
			vistaMostrar.classList.add('visible');
		}, 310);
	}, 300);
}

// Método asignado al combo algoritmo de eliminar escenarios locales
function fun_select_eliminar_algoritmo_local() {
	// Si no selecciona filtro, muestra todos
	if (select_eliminar_algoritmo_local.value === 'ninguno') {
		lista_ori_local.botones.forEach((boton) => {
			boton.classList.remove('inactivo');
		});

		select_eliminar_anio_local.disabled = true;
		select_eliminar_mes_local.disabled = true;
		select_eliminar_dia_local.disabled = true;
	} else {
		select_eliminar_anio_local.disabled = false;
		select_eliminar_mes_local.disabled = true;
		select_eliminar_dia_local.disabled = true;

		lista_ori_local.botones.forEach((boton) => {
			if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});
	}

	// Llena los anios
	actualizarOptions('anio');
}

// Método asignado al combo año de eliminar escenarios locales
function fun_select_eliminar_anio_local() {
	// Si no selecciona filtro, muestra todos
	if (select_eliminar_anio_local.value === 'ninguno') {
		lista_ori_local.botones.forEach((boton) => {
			if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});

		select_eliminar_mes_local.disabled = true;
		select_eliminar_dia_local.disabled = true;
	} else {
		select_eliminar_mes_local.disabled = false;
		select_eliminar_dia_local.disabled = true;

		lista_ori_local.botones.forEach((boton) => {
			if (boton.obj.anio === parseInt(select_eliminar_anio_local.value) && boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});
	}

	// Llena los anios
	actualizarOptions('mes');
}

// Método asignado al combo mes de eliminar escenarios locales
function fun_select_eliminar_mes_local() {
	// Si no selecciona filtro, muestra todos
	if (select_eliminar_mes_local.value === 'ninguno') {
		lista_ori_local.botones.forEach((boton) => {
			if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value && boton.obj.anio === parseInt(select_eliminar_anio_local.value)) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});

		select_eliminar_dia_local.disabled = true;
	} else {
		select_eliminar_dia_local.disabled = false;
		lista_ori_local.botones.forEach((boton) => {
			// console.log(boton.obj.mes, parseInt(select_eliminar_mes_local.value), boton.obj.anio, parseInt(select_eliminar_anio_local.value), boton.obj.algoritmo, select_eliminar_algoritmo_local.value);
			if (boton.obj.mes === parseInt(select_eliminar_mes_local.value) && boton.obj.anio === parseInt(select_eliminar_anio_local.value) && boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});
	}

	// Llena los anios
	actualizarOptions('dia');
}

// Método asignado al combo dia de eliminar escenarios locales
function fun_select_eliminar_dia_local() {
	// Si no selecciona filtro, muestra todos
	if (select_eliminar_dia_local.value === 'ninguno') {
		lista_ori_local.botones.forEach((boton) => {
			if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value && boton.obj.anio === parseInt(select_eliminar_anio_local.value) && boton.obj.mes === parseInt(select_eliminar_mes_local.value)) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});
	} else {
		lista_ori_local.botones.forEach((boton) => {
			// console.log(boton.obj.dia, select_eliminar_dia_local.value);
			if (boton.obj.dia === parseInt(select_eliminar_dia_local.value) && boton.obj.mes === parseInt(select_eliminar_mes_local.value) && boton.obj.anio === parseInt(select_eliminar_anio_local.value) && boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
				boton.classList.remove('inactivo');
			} else {
				boton.classList.add('inactivo');
			}
		});
	}
}

// Método que actualiza la lista de escenarios locales en eliminación
// ${opcion} opcion con la cual se actualizará
function actualizarOptions(opcion) {
	if (opcion === 'anio') {
		select_eliminar_anio_local.innerHTML = '';
		select_eliminar_anio_local.lista = [];

		// Crea option defecto
		crearOption(select_eliminar_anio_local, 'Sin Filtro', 'ninguno');

		lista_ori_local.botones.forEach((boton) => {
			// Busca solo los visibles
			if (!boton.classList.contains('inactivo')) {
				if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value) {
					// Si no existe, lo agrega
					if (typeof select_eliminar_anio_local.lista.find((anio) => { return anio === boton.obj.anio}) === 'undefined') {
						// Agrega a la lista y crea option
			            select_eliminar_anio_local.lista.push(boton.obj.anio);
			        }
		        }
			}
		});

		// Ordena e inserta
		select_eliminar_anio_local.lista.sort(function(a, b){return a-b});
	    select_eliminar_anio_local.lista.forEach((item) => {
	        crearOption(select_eliminar_anio_local, `${item}`.toUpperCase(), item);
	    });
	} else if (opcion === 'mes') {
		select_eliminar_mes_local.innerHTML = '';
		select_eliminar_mes_local.lista = [];

		// Crea option defecto
		crearOption(select_eliminar_mes_local, 'Sin Filtro', 'ninguno');

		lista_ori_local.botones.forEach((boton) => {
			// Busca solo los visibles
			if (!boton.classList.contains('inactivo')) {
				if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value && boton.obj.anio === parseInt(select_eliminar_anio_local.value)) {
					// Si no existe, lo agrega
					if (typeof select_eliminar_mes_local.lista.find((mes) => { return mes === boton.obj.mes}) === 'undefined') {
						// Agrega a la lista y crea option
			            select_eliminar_mes_local.lista.push(boton.obj.mes);
			        }
		        }
			}
		});

		// Ordena e inserta
		select_eliminar_mes_local.lista.sort(function(a, b){return a-b});
	    select_eliminar_mes_local.lista.forEach((item) => {
	        crearOption(select_eliminar_mes_local, `${item}`.toUpperCase(), item);
	    });
	} else if (opcion === 'dia') {
		select_eliminar_dia_local.innerHTML = '';
		select_eliminar_dia_local.lista = [];

		// Crea option defecto
		crearOption(select_eliminar_dia_local, 'Sin Filtro', 'ninguno');

		lista_ori_local.botones.forEach((boton) => {
			// Busca solo los visibles
			if (!boton.classList.contains('inactivo')) {
				if (boton.obj.algoritmo === select_eliminar_algoritmo_local.value && boton.obj.mes === parseInt(select_eliminar_mes_local.value) && boton.obj.anio === parseInt(select_eliminar_anio_local.value)) {
					// Si no existe, lo agrega
					if (typeof select_eliminar_dia_local.lista.find((dia) => { return dia === boton.obj.dia}) === 'undefined') {
						// Agrega a la lista y crea option
			            select_eliminar_dia_local.lista.push(boton.obj.dia);
			        }
		        }
			}
		});

		// Ordena e inserta
		select_eliminar_dia_local.lista.sort(function(a, b){return a-b});
	    select_eliminar_dia_local.lista.forEach((item) => {
	        crearOption(select_eliminar_dia_local, `${item}`.toUpperCase(), item);
	    });
	}
}

// Método que permite crear una opción de lista
function crearOption(select, texto, valor) {
    let option = document.createElement('option');
    option.value = valor;
    option.innerHTML = texto;
    select.appendChild(option);
}

// Evento que recibe la lectura de un archivo
// ${obj} es un objeto con los datos del archivo leido
ipcRenderer.on('archivo:leido', (event, obj) => {
    if (obj.opc === 'RES_COMPARA') {
        obj.res = obj.res.replace(new RegExp('\n+\s*', 'g'), '<br>')

        // VErifica infactibilidad
        if (obj.res.includes('PROBLEMA INFACTIBLE')) {
            console.log('Verificando infactibilidad');
            obj.res += `<br><font color='red'>Infactibilidad encontrada durante la ejecución</font>`;

            // Resalta en la salida
            obj.res = obj.res.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');

            ipcRenderer.send('algoritmo:diagnosticar', obj.rutaBase, 'RES_COMPARA');
        } else if (obj.res.includes('TERMINACION NORMAL')) {
            // Resalta en la salida
            obj.res = obj.res.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');

            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        let con = null;

        if (obj.rutaBase === objEscA_res.ruta) {
            flag_resOutput_A = true;
            con = consola_resA;
        } else if (obj.rutaBase === objEscB_res.ruta) {
            flag_resOutput_B = true;
            con = consola_resB;
        }

        if (con !== null) {
            con.ocultarBanner();
            con.setTexto(obj.res);
        }
    } else if (obj.opc === 'RES_ORIGINAL') {
        obj.res = obj.res.replace(new RegExp('\n+\s*', 'g'), '<br>')

        // VErifica infactibilidad
        if (obj.res.includes('PROBLEMA INFACTIBLE')) {
            obj.res += `<br><font color='red'>Infactibilidad encontrada durante la ejecución</font>`;

            // Resalta en la salida
            obj.res = obj.res.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');

            console.log('Verificando infactibilidad');
            ipcRenderer.send('algoritmo:diagnosticar', obj.rutaBase, 'RES_ORIGINAL');
        } else if (obj.res.includes('TERMINACION NORMAL')) {
            // Resalta en la salida
            obj.res = obj.res.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');

            obj.res += `<br><font color='lawngreen'>Fin de ejecución del algoritmo; terminación normal</font>`;
        } else {
            obj.res += `<br><font color='red'>Error de ejecución del algoritmo</font>`;
        }

        // banner.promptQuitaEspera();
        consolaExe.ocultarBanner();
        consolaExe.setTexto(obj.res);
    } else if (obj.opc.startsWith('RES_COSTOS_')) {
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));
        let marco = obj.opc.charAt(obj.opc.length - 1);
        let objDatos = marco === 'A' ? objEscA_res : objEscB_res;

        // console.log(datos_costos);
        objDatos.costo_total = '---';
        objDatos.costo_gen = '---';
        objDatos.costo_gen_rd = '---';
        objDatos.costo_gen_rc = '---';
        objDatos.beneficio_social = '---';
        objDatos.costo_arranque = '---';
        objDatos.costo_reservas = '---';
        objDatos.ingreso_total = '---';
        objDatos.ingreso_demanda = '---';
        objDatos.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objDatos.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objDatos.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objDatos.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objDatos.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objDatos.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objDatos.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objDatos.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objDatos.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objDatos.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objDatos.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });

        let colapso = colapsos_res.find((col) => { return col.id === `COLAPSO_${marco}_r_desphora1`; });
        let colapsable = $(`.COLAPSABLE_r_desphora1.${marco}`);
        console.log('costos', colapso, colapsable);

        if (typeof colapso !== 'undefined' && typeof colapsable !== 'undefined') {
            // Busca el icono para mostrarlo
            for (let nodo of colapso.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span') {
                    nodo.classList.remove('invisible');
                }
            }

            // Quita la clase inactivo
            colapso.classList.remove('inactivo');

            // Vacia su contenido
            colapsable.html('');
            // Inserta una nueva tabla
            let nueva_tabla = document.createElement('table');
            nueva_tabla.classList.add('table');
            nueva_tabla.classList.add('table-sm');
            nueva_tabla.classList.add('table-striped');
            nueva_tabla.id = `r_desphora1_${marco}`;
            // Inserta la nueva tabla
            colapsable.append(nueva_tabla);

            let dataSourceObj = {
                schema: {
                    model: {
                        id: nueva_tabla.id,
                        fields: {
                            campo: { type: "string", editable: false, nullable: false },
                            valor: { type: "number", editable: false, nullable: false }
                        },
                    },
                },
                data: [
                    { campo: 'Costo Total', valor: objDatos.costo_total},
                    { campo: 'Costo Generación', valor: objDatos.costo_gen},
                    { campo: 'Costo Generación RD', valor: objDatos.costo_gen_rd},
                    { campo: 'Costo Generación RC', valor: objDatos.costo_gen_rc},
                    { campo: 'Beneficio Social', valor: objDatos.beneficio_social},
                    { campo: 'Costo Arranque', valor: objDatos.costo_arranque},
                    { campo: 'Costo Reservas', valor: objDatos.costo_reservas},
                    { campo: 'Ingreso Total', valor: objDatos.ingreso_total},
                    { campo: 'Ingreso Demanda', valor: objDatos.ingreso_demanda},
                    { campo: 'Ingreso Reservas', valor: objDatos.ingreso_reservas},
                ],
                autoSync: true
            };

            console.log('dataSourceObj', dataSourceObj);
            let dataSource = new kendo.data.DataSource(dataSourceObj);

            $('#' + nueva_tabla.id).kendoGrid({
                dataSource: dataSource,
                columns: [
                    { field: "campo", title: "Concepto", sortable: false, filterable: false},
                    { field: "valor", format: "{0:c2}", title: "Valor", sortable: false, filterable: false}
                ],
                sortable: false,
                filterable: false,
                scrollable: true,
                navigatable: true,
                pageable: false,
                reorderable: false,
                groupable: false,
                resizable: true,
                columnMenu: false,
                editable: false
            });
        }
    } else if (obj.opc === 'INFO_COSTOS') {
        console.log('Procesando INFO_COSTOS');
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos;
        try {
            datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));
        } catch (e) {
            console.log('Error generando costos');
            return;
        }

        // Lo guarda en el objeto original
        objEscOriginal.costo_total = '---';
        objEscOriginal.costo_gen = '---';
        objEscOriginal.costo_gen_rd = '---';
        objEscOriginal.costo_gen_rc = '---';
        objEscOriginal.beneficio_social = '---';
        objEscOriginal.costo_arranque = '---';
        objEscOriginal.costo_reservas = '---';
        objEscOriginal.ingreso_total = '---';
        objEscOriginal.ingreso_demanda = '---';
        objEscOriginal.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objEscOriginal.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objEscOriginal.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objEscOriginal.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objEscOriginal.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objEscOriginal.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objEscOriginal.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objEscOriginal.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objEscOriginal.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objEscOriginal.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objEscOriginal.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });

        let colapso = colapsos.find((col) => { return col.id === 'COLAPSO_r_desphora1'});
        let colapsable = $('#COLAPSABLE_r_desphora1');

        if (typeof colapso !== 'undefined' && typeof colapsable !== 'undefined') {
            // Busca el icono para mostrarlo
            for (let nodo of colapso.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span') {
                    nodo.classList.remove('invisible');
                }
            }

            // Quita la clase inactivo
            colapso.classList.remove('inactivo');

            // Vacia su contenido
            colapsable.html('');
            // Inserta una nueva tabla
            let nueva_tabla = document.createElement('table');
            nueva_tabla.classList.add('table');
            nueva_tabla.classList.add('table-sm');
            nueva_tabla.classList.add('table-striped');
            nueva_tabla.id = 'r_desphora1';
            // Inserta la nueva tabla
            colapsable.append(nueva_tabla);

            let dataSourceObj = {
                schema: {
                    model: {
                        id: "r_desphora1",
                        fields: {
                            campo: { type: "string", editable: false, nullable: false },
                            valor: { type: "number", editable: false, nullable: false }
                        },
                    },
                },
                data: [
                    { campo: 'Costo Total', valor: objEscOriginal.costo_total},
                    { campo: 'Costo Generación', valor: objEscOriginal.costo_gen},
                    { campo: 'Costo Generación RD', valor: objEscOriginal.costo_gen_rd},
                    { campo: 'Costo Generación RC', valor: objEscOriginal.costo_gen_rc},
                    { campo: 'Beneficio Social', valor: objEscOriginal.beneficio_social},
                    { campo: 'Costo Arranque', valor: objEscOriginal.costo_arranque},
                    { campo: 'Costo Reservas', valor: objEscOriginal.costo_reservas},
                    { campo: 'Ingreso Total', valor: objEscOriginal.ingreso_total},
                    { campo: 'Ingreso Demanda', valor: objEscOriginal.ingreso_demanda},
                    { campo: 'Ingreso Reservas', valor: objEscOriginal.ingreso_reservas},
                ],
                autoSync: true
            };

            console.log('dataSourceObj', dataSourceObj);
            let dataSource = new kendo.data.DataSource(dataSourceObj);

            $('#r_desphora1').kendoGrid({
                dataSource: dataSource,
                columns: [
                    { field: "campo", title: "Concepto", sortable: false, filterable: false},
                    { field: "valor", format: "{0:c2}", title: "Valor", sortable: false, filterable: false}
                ],
                sortable: false,
                filterable: false,
                scrollable: true,
                navigatable: true,
                pageable: false,
                reorderable: false,
                groupable: false,
                resizable: true,
                columnMenu: false,
                editable: false
            });
        }
    }  else if (obj.opc === 'MOD_COSTOS') {
        let arg_islas = obj.res.replace(new RegExp('=?', 'g'), '').split('Isla :');
        let datos_costos = arg_islas[arg_islas.length - 1].split('Solucion Final para la Isla')[1].trim().replace(new RegExp('\s*:', 'g'), '').split(new RegExp('\s*\n\s*', 'g'));
        console.log('MOD_COSTOS');
        // Lo guarda en el objeto original
        objEscVistaMod.costo_total = '---';
        objEscVistaMod.costo_gen = '---';
        objEscVistaMod.costo_gen_rd = '---';
        objEscVistaMod.costo_gen_rc = '---';
        objEscVistaMod.beneficio_social = '---';
        objEscVistaMod.costo_arranque = '---';
        objEscVistaMod.costo_reservas = '---';
        objEscVistaMod.ingreso_total = '---';
        objEscVistaMod.ingreso_demanda = '---';
        objEscVistaMod.ingreso_reservas = '---';

        datos_costos.forEach((dato) => {
            let linea = dato.trim();
            if (linea !== '') {
                if (linea.includes('Costo Total') === true) {
                    objEscVistaMod.costo_total = linea.replace('Costo Total', '').trim();
                } else if (linea.includes('Costo Generacion RD') === true) {
                    objEscVistaMod.costo_gen_rd = linea.replace('Costo Generacion RD', '').trim();
                } else if (linea.includes('Costo Generacion RC') === true) {
                    objEscVistaMod.costo_gen_rc = linea.replace('Costo Generacion RC', '').trim();
                } else if (linea.includes('Costo Generacion') === true) {
                    objEscVistaMod.costo_gen = linea.replace('Costo Generacion', '').trim();
                } else if (linea.includes('Beneficio Social') === true) {
                    objEscVistaMod.beneficio_social = linea.replace('Beneficio Social', '').trim();
                } else if (linea.includes('Costo de Arranque') === true) {
                    objEscVistaMod.costo_arranque = linea.replace('Costo de Arranque', '').trim();
                } else if (linea.includes('Costo de Reservas') === true) {
                    objEscVistaMod.costo_reservas = linea.replace('Costo de Reservas', '').trim();
                } else if (linea.includes('Ingreso Total') === true) {
                    objEscVistaMod.ingreso_total = linea.replace('Ingreso Total', '').trim();
                } else if (linea.includes('Ingreso demanda') === true) {
                    objEscVistaMod.ingreso_demanda = linea.replace('Ingreso demanda', '').trim();
                } else if (linea.includes('Ingreso Reservas') === true) {
                    objEscVistaMod.ingreso_reservas = linea.replace('Ingreso Reservas', '').trim();
                }
            }
        });


        let colapso = colapsos_mod.find((col) => { return col.id === 'COLAPSO_MOD_r_desphora1'});
        let colapsable = $('#COLAPSABLE_MOD_r_desphora1');
        console.log('>>>>', colapso, colapsable);
        if (typeof colapso !== 'undefined' && typeof colapsable !== 'undefined') {
            // Busca el icono para mostrarlo
            for (let nodo of colapso.childNodes) {
                if (nodo.nodeName.toLowerCase() === 'span') {
                    nodo.classList.remove('invisible');
                }
            }

            // Quita la clase inactivo
            colapso.classList.remove('inactivo');

            // Vacia su contenido
            colapsable.html('');
            // Inserta una nueva tabla
            let nueva_tabla = document.createElement('table');
            nueva_tabla.classList.add('table');
            nueva_tabla.classList.add('table-sm');
            nueva_tabla.classList.add('table-striped');
            nueva_tabla.id = 'MOD_r_desphora1';
            // Inserta la nueva tabla
            colapsable.append(nueva_tabla);

            let dataSourceObj = {
                schema: {
                    model: {
                        id: "MOD_r_desphora1",
                        fields: {
                            campo: { type: "string", editable: false, nullable: false },
                            valor: { type: "number", editable: false, nullable: false }
                        },
                    },
                },
                data: [
                    { campo: 'Costo Total', valor: objEscVistaMod.costo_total},
                    { campo: 'Costo Generación', valor: objEscVistaMod.costo_gen},
                    { campo: 'Costo Generación RD', valor: objEscVistaMod.costo_gen_rd},
                    { campo: 'Costo Generación RC', valor: objEscVistaMod.costo_gen_rc},
                    { campo: 'Beneficio Social', valor: objEscVistaMod.beneficio_social},
                    { campo: 'Costo Arranque', valor: objEscVistaMod.costo_arranque},
                    { campo: 'Costo Reservas', valor: objEscVistaMod.costo_reservas},
                    { campo: 'Ingreso Total', valor: objEscVistaMod.ingreso_total},
                    { campo: 'Ingreso Demanda', valor: objEscVistaMod.ingreso_demanda},
                    { campo: 'Ingreso Reservas', valor: objEscVistaMod.ingreso_reservas},
                ]
            };

            console.log('dataSourceObj', dataSourceObj);
            let dataSource = new kendo.data.DataSource(dataSourceObj);

            $('#' + nueva_tabla.id).kendoGrid({
                dataSource: dataSource,
                columns: [
                    { field: "campo", title: "Concepto", sortable: false, filterable: false},
                    { field: "valor", format: "{0:c2}", title: "Valor", sortable: false, filterable: false}
                ],
                sortable: false,
                filterable: false,
                scrollable: true,
                navigatable: true,
                pageable: false,
                reorderable: false,
                groupable: false,
                resizable: true,
                columnMenu: false,
                editable: false
            });
        }
    } else if (obj.opc === 'MOD_COMENTARIOS') {
        if (obj.res.startsWith('ERROR')) {
            console.log(obj.res);
        } else {
            textarea_comentarios_mod.value = obj.res;
        }

    } else if (obj.opc === 'FOLIO_COMENTARIOS') {
        if (obj.res.startsWith('ERROR')) {
            console.log(obj.res);
        } else {
            textarea_comentarios_info.value = obj.res;
        }
    }
});
