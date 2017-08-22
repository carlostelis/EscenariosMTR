const electron = require('electron');
const { ipcRenderer } = electron;

const body = document.querySelector("body");

body.onload = () => {
    // espera 1 seg para que el cambio sea más suave
    setTimeout(() => {
        ipcRenderer.send('body:load', 'Conectar');
    }, 1000);
};

const mensaje = document.querySelector("#p_banner_IS");
console.log(`Actual: ${mensaje.innerHTML}`);

ipcRenderer.on('bd:sistems', (event, resultado) => {
    console.log(resultado);

    if (resultado.estado === true) {
        mensaje.innerHTML = `${resultado.mensaje}<br>Consultando sistemas disponibles`;
    } else {
        mensaje.innerHTML = `${resultado.mensaje}`;
    }
});

ipcRenderer.on('bd:sistemas', (event, json) => {
    console.log(json.estado);

    if (parseInt(json.estado) === 0) {
        const mensaje = document.querySelector("#p_banner_IS");
        mensaje.innerHTML = `${json.mensaje}`;
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

function botonEntrar() {
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
