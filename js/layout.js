const electron = require('electron');
const { ipcRenderer } = electron;

let intervaloCarga;
const body = document.querySelector("body");

body.onload = () => {
    body.style.opacity = '1';
};

window.onbeforeunload = function(e) {
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    body.style.opacity = '0';
};

const banner = new Banner(body);

ipcRenderer.on('sesion:cerrar', (event) => {
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    body.style.opacity = '0';
});
