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
let intervaloCarga;
const body = document.querySelector("body");
const banner = new Banner(body);
const visor_archivos = new VistaArchivos();
const SESION = {
	usuario: '',
	sistema: ''
}

// Al cargar la pagina es inicio de sesion, se consultan
// sistemas disponibles y cargan documentos en el area de trabajo
body.onload = () => {
    body.style.opacity = '1';

    solicitarSistemas();

    let menus = document.getElementsByClassName('opc-menu');

    Array.from(menus).forEach((menu) => {
        menu.onclick = () => {
            if (menu.classList.contains('deshabilitado')) {
                console.log('nada');
                return;
            }

            // Habilita todos
            Array.from(menus).forEach((menu) => {
                menu.classList.remove('deshabilitado');
            });

            let vistas = document.getElementsByClassName('opc-vista');
            //console.log(vistas);
            for (let vista of vistas) {
                if (vista.dataset.opc === menu.dataset.opc) {
                    // Aca está opaco aun
                    setTimeout(() => {
                        vista.style.display = 'initial';
                        setTimeout(() => {
                            vista.classList.add('visible');
                        }, 310);
                    }, 300);

                    // deshabilita el correcto
                    menu.classList.add('deshabilitado');
                } else {
                    //vista.style.display = 'none';
                    vista.classList.remove('visible');
                    setTimeout(() => {
                        vista.style.display = 'none';
                    }, 300);
                }
            }
        };
    });

    ipcRenderer.send('paginas:leer');
};

window.onbeforeunload = function(e) {
    body.style.opacity = '0';
};
