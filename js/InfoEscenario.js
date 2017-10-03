// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function colapsar(id) {
    var div = document.getElementById(id);
    if (div) {
        if (div.classList.contains('visible')) {
            div.classList.remove('visible');
            div.classList.add('invisible');
            div.style.display = 'none';
        } else {
            div.style.display = 'flex';
            div.classList.remove('invisible');
            div.classList.add('visible');
        }
    }
}

function mostrarContenedor(id, trigger) {
    let contenedores = document.getElementsByClassName('contenedor-info');
    for (let cont of contenedores) {
        if (cont.id === id) {
            cont.style.display = 'block';
        } else {
            cont.style.display = 'none';
        }
    }

    let opciones = document.getElementsByClassName('opcion-menu-info');
    for (let opc of opciones) {
        opc.classList.remove('active');
    }
    trigger.classList.add('active');
}

function leerEscenario(ruta_escenario) {

}

ipcRenderer.on('escenario:leido', (event, obj) => {
    console.log('---- JSON -----');
    console.log(obj);
    console.log('Creando elementos');

    obj.lista.forEach((archivo) => {
        crearTabla(archivo);
    });

    banner.ocultar();
});

function crearTabla(objArchivo) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];
    console.log('tabla', id);
    let tabla = document.getElementById(id);
    if (typeof tabla === 'undefined' || tabla === null) {
        console.log('No existe la tabla', id);
        return;
    }



    let num_header;
    for (let nodo of tabla.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'tbody') {
            tabla.removeChild(nodo);
        }

        if (nodo.nodeName.toLowerCase() === 'thead') {
            if (objArchivo.filas.length === 0) {
                nodo.style.display = 'none';
            } else {
                nodo.style.display = 'table-header-group';
            }
        }
    }

    

    // Crea tbody
    let tbody = document.createElement('tbody');
    tbody.classList.add('tabla-body');

    let num_fila = 1;
    // Crea las filas
    objArchivo.filas.forEach((fila) => {
        // Fila
        let tr = document.createElement('tr');

        // Agrega numero de registro
        let td_fila = document.createElement('td');
        let texto_fila = document.createTextNode(num_fila++);
        td_fila.appendChild(texto_fila);
        tr.appendChild(td_fila);

        // Crea columnas
        fila.forEach((objDato) => {
            let td = document.createElement('td');
            td.data = objDato;

            // Agrega input o no para editable
            if (objArchivo.editable) {
                let input = document.createElement('input');
                input.value = objDato.valor;
                td.appendChild(input);
            } else {
                let texto = document.createTextNode(objDato.valor);
                td.appendChild(texto);
            }

            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);


}
