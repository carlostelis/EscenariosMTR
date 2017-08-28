const electron = require('electron');
const { ipcRenderer } = electron;

let intervaloCarga;
const body = document.querySelector("body");

body.onload = () => {
    body.style.opacity = '1';
};

window.onbeforeunload = function(e) {
    body.style.opacity = '0';
};

const banner = new Banner(body);

ipcRenderer.on('sesion:cerrar', (event) => {
    body.style.opacity = '0';
});

function cargarPanel(elem) {
    // Si está deshabilitado no hace nada
    if (elem.classList.contains('disabled')) {
        return;
    }

    let arrLi = document.getElementsByClassName('elemento_mainenu');
    let arrPanel = document.getElementsByClassName('div_innerPanel');
    let divAnterior;
    console.log(arrPanel);

    // arr es una colección, no un arreglo

    // Oculta panel
    Array.prototype.forEach.call(arrPanel, (div) => {
        if (div.classList.contains('activo')) {
            divAnterior = div;
            div.classList.remove('activo');
            setTimeout(() => {
                div.classList.add('oculto');
            }, 500);
        }
    });

    // Muestra nuevo panel
    setTimeout(() => {
        Array.prototype.forEach.call(arrPanel, (div) => {
            console.log(div.getAttribute("value") + " " + elem.value);
            if (parseInt(div.getAttribute("value")) === elem.value) {
                div.classList.remove('oculto');
                setTimeout(() => {
                    div.classList.add('activo');
                }, 100);
                console.log("pone activo");
            }
        });
    }, (divAnterior ? 550 : 1));


    Array.prototype.forEach.call(arrLi, (li) => {
        // console.log(`Value: ${li.value}`);
        if (li.value === elem.value) {
            elem.disabled = true;
            elem.classList.add('disabled');
        } else {
            li.disabled = false;
            li.classList.remove('disabled');
        }
    });

    console.log(`Elem opcion: ${elem.value}`);
    // Selecciona opcion
    switch (elem.value) {
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        default:
    }
}
