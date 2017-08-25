const electron = require('electron');
const { ipcRenderer } = electron;

let intervaloCarga;
const body = document.querySelector("body");

body.onload = () => {
    body.style.opacity = '1';
    solicitarSistemas();
};

const banner = new Banner(body);

ipcRenderer.on('sesion:cerrar', (event) => {
    body.style.opacity = '0';
});
