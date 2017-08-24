const electron = require('electron');
const { ipcRenderer } = electron;

const body = document.querySelector("body");
let intervaloCarga;

body.onload = () => {
    console.log(__dirname);
    // espera 1 seg para que el cambio sea más suave
    solicitarSistemas();
};

const banner = document.querySelector("#p_banner_IS");
const div_banner_IS = document.querySelector("#div_banner_IS");

ipcRenderer.on('bd:sistemas', (event, json) => {
    console.log(JSON.stringify(json));
    console.log(`estado: ${json.estado}`);

    // Elimina intervalo de cadena de carga
    clearInterval(intervaloCarga);

    if (!json.hasOwnProperty('estado') || !json.estado) {
        console.log('Consulta fallida');
        // Mensaje y botón retry
        banner.innerHTML = json.mensaje + '<br><button class="button_login_IS" style="margin-top:3%; width:200px; height:70px;" onclick="solicitarSistemas();">Intentar otra vez</button>';
        // Cambia imagen
        //div_banner_IS.classList.toggle('div_banner_IS_error');
        if (div_banner_IS.classList.contains('div_banner_IS_loading')) {
            div_banner_IS.classList.remove('div_banner_IS_loading');
        }
        div_banner_IS.classList.add('div_banner_IS_error');

        return;
    }

    // Obtiene la lista y la limpia
    const select = document.querySelector("select");
    select.innerHTML = "";

    // Crea nodo placeholder
    let opcion = document.createElement("option");
    let texto = document.createTextNode(`\u00A0\u00A0- Selecciona -`);
    opcion.disabled = true;
    opcion.selected = true;

    opcion.appendChild(texto);
    select.appendChild(opcion);

    if (!json.hasOwnProperty('sistemas')) {
        console.log("No hay sistemas");
        return;
    }

    // Agrega los sistemas disponibles
    json.sistemas.forEach((sistema) => {
        // sistema disponible, 1 = true, 0 = false
        if (parseInt(sistema.estado) === 1) {
            opcion = document.createElement("option");
            texto = document.createTextNode(`\u00A0\u00A0${sistema.nombre}`);

            opcion.disabled = false;
            opcion.selected = false;
            opcion.appendChild(texto);
            select.appendChild(opcion);
        }
    });

    // Oculta banner
    setTimeout(() => {
        const banner = document.querySelector("#div_banner_IS");
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 1000);
    }, 1000);
});

function solicitarSistemas() {
    //div_banner_IS.classList.toggle('div_banner_IS_loading');
    if (div_banner_IS.classList.contains('div_banner_IS_error')) {
        div_banner_IS.classList.remove('div_banner_IS_error');
    }

    div_banner_IS.classList.add('div_banner_IS_loading');
    banner.innerHTML = "";

    // Muestra parrafo
    const parrafo = document.querySelector("#p_banner_IS");
    parrafo.classList.remove('p_invisible');
    parrafo.classList.add('p_visible');
    console.log('visible');

    setTimeout(() => {
        banner.innerHTML = " Inicializando ";
        ipcRenderer.send('body:load', 'Conectar');

        intervaloCarga = setInterval(() => {
            if (banner.innerHTML.length >= 30) {
                banner.innerHTML = " Inicializando ";
            }

            banner.innerHTML = '. ' + banner.innerHTML + ' .';
        }, 1000);
    }, 1000);
}

function onFocusInput(input, label) {
    input.respaldo = input.placeholder;
    input.placeholder = "";
    input.style.marginTop = "0%";

    var label = document.getElementById(label);
    label.style.opacity = "1";
    label.style.visibility = "visible";

    var select = document.getElementById("select_sistema_IS");
    select.style.marginBottom = "0%";

    var boton = document.getElementById("button_entrar_IS");
    boton.style.marginTop = "3%";
}

function lostFocusInput(input, label) {
    input.placeholder = input.respaldo;
    input.style.marginTop = "-10%";

    var label = document.getElementById(label);
    label.style.opacity = "0";
    label.style.visibility = "hidden";

    var select = document.getElementById("select_sistema_IS");
    select.style.marginBottom = "10%";

    var boton = document.getElementById("button_entrar_IS");
    boton.style.marginTop = "13%";
}

function solicitarAutenticacion() {
    const inputNombre = document.querySelector('#input_nombre_IS');

    if (inputNombre.value.trim().length === 0) {
        inputNombre.style.borderColor = 'red';
        inputNombre.focus();
        return;
    }
    inputNombre.style.borderColor = 'white';

    const inputContrasena = document.querySelector('#input_contrasena_IS');

    if (inputContrasena.value.trim().length === 0) {
        inputContrasena.style.borderColor = 'red';
        inputContrasena.focus();
        return;
    }
    inputContrasena.style.borderColor = 'white';

    const selectSistema = document.querySelector('#select_sistema_IS');
    // Logear
    alert(`${inputNombre.value}//${inputContrasena.value}//${selectSistema.value}`);
}
