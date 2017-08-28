const electron = require('electron');
const { ipcRenderer } = electron;

let intervaloCarga;
const body = document.querySelector("body");

body.onload = () => {
    body.style.opacity = '1';
    solicitarSistemas();
};

const banner = new Banner(body);

ipcRenderer.on('bd:sistemas', (event, json) => {
    console.log(JSON.stringify(json));
    console.log(`estado: ${json.estado}`);

    // Elimina intervalo de cadena de carga
    clearInterval(intervaloCarga);

    // Estado = NO
    if (!json.hasOwnProperty('estado') || !json.estado) {
        console.log('Consulta fallida');
        // Mensaje y botón retry
        banner.error();
        banner.setMensaje(json.mensaje);
        banner.mostrarBoton();
        banner.setBoton('Reintentar', () => {
            solicitarSistemas();
        });

        return;
    }

    // Estado = OK, pero no hay sistemas
    if (!json.hasOwnProperty('sistemas')) {
        console.log("No hay sistemas");
        banner.error();
        banner.setMensaje('No se encontraron sistemas disponibles en la base de datos.', () => {
            solicitarSistemas();
        });
        banner.mostrarBoton();
        banner.setBoton('Reintentar');

        return;
    }

    // Obtiene la lista y la limpia
    const select = document.querySelector("select");
    select.innerHTML = "";

    // Crea nodo placeholder
    let opcion = document.createElement("option");
    let texto = document.createTextNode(`\u00A0\u00A0Seleccionar`);
    opcion.disabled = true;
    opcion.selected = true;
    opcion.value = 'Seleccionar';

    opcion.appendChild(texto);
    select.appendChild(opcion);

    // Agrega los sistemas disponibles
    json.sistemas.forEach((sistema) => {
        // sistema disponible, 1 = true, 0 = false
        if (parseInt(sistema.estado) === 1) {
            opcion = document.createElement("option");
            texto = document.createTextNode(`\u00A0\u00A0${sistema.nombre}`);
            opcion.disabled = false;
            opcion.selected = false;
            opcion.value = sistema.nombre;
            opcion.appendChild(texto);
            select.appendChild(opcion);
        }
    });

    // Oculta banner
    setTimeout(() => {
        banner.ocultar();
    }, 1000);
});

function solicitarSistemas() {
    banner.mostrar();
    banner.ocultarBoton();
    banner.setMensaje(' Inicializando ');
    banner.cargando();

    // Solicitud de sistemas
    ipcRenderer.send('sistemas:solicitar');

    intervaloCarga = setInterval(() => {
        if (banner.getMensaje().length >= 30) {
            banner.setMensaje(' Inicializando ');
        }

        banner.setMensaje('.' + banner.getMensaje() + '.');
    }, 500);
}

function onFocusInput(input, label) {
    input.respaldo = input.placeholder;
    input.placeholder = "";

    var label = document.getElementById(label);
    label.style.opacity = "1";
    label.style.visibility = "visible";
}

function lostFocusInput(input, label) {
    input.placeholder = input.respaldo;

    var label = document.getElementById(label);
    label.style.opacity = "0";
    label.style.visibility = "hidden";
}

function solicitarAutenticacion() {
    // Valida nombre
    const inputNombre = document.querySelector('#input_nombre_IS');
    if (inputNombre.value.trim().length === 0) {
        inputNombre.style.borderColor = 'red';
        inputNombre.focus();
        return;
    }
    inputNombre.style.borderColor = 'white';

    // Valida password
    const inputContrasena = document.querySelector('#input_contrasena_IS');
    if (inputContrasena.value.trim().length === 0) {
        inputContrasena.style.borderColor = 'red';
        inputContrasena.focus();
        return;
    }
    inputContrasena.style.borderColor = 'white';

    // Valida select
    const selectSistema = document.querySelector('#select_sistema_IS');
    console.log(selectSistema.value+"-");
    if (selectSistema.value.trim() === 'Seleccionar' || selectSistema.disabled) {
        selectSistema.focus();
        return;
    }

    // Logear
    ipcRenderer.send('sesion:entrar', {
        usuario: inputNombre.value.trim(),
        contrasena: inputContrasena.value.trim(),
        sistema: selectSistema.value.trim()
    });

    body.style.opacity = '0';
}
