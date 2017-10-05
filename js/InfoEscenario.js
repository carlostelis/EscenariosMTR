// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

function colapsar(trigger, id) {
    // Si esta inactivo no hace nada
    if (trigger.classList.contains('inactivo')) {
        return;
    }

    let div = document.getElementById(id);
    let iconoAbajo;
    if (div) {
        if (div.classList.contains('visible')) {
            div.classList.remove('visible');
            div.classList.add('invisible');
            div.style.display = 'none';
            iconoAbajo = true;
        } else {
            div.style.display = 'flex';
            div.classList.remove('invisible');
            div.classList.add('visible');
            iconoAbajo = false;
        }
    }

    // Cambia el icono
    for (let nodoA of trigger.childNodes) {
        // div hijo
        if (nodoA.nodeName.toLowerCase() === 'div') {
            for (let nodoB of nodoA.childNodes) {
                if (nodoB.nodeName.toLowerCase() === 'span') {
                    for (let nodoC of nodoB.childNodes) {
                        if (nodoC.nodeName.toLowerCase() === 'i') {
                            if (iconoAbajo) {
                                nodoC.classList.add('fa-caret-square-o-down');
                                nodoC.classList.remove('fa-caret-square-o-up');
                            } else {
                                nodoC.classList.remove('fa-caret-square-o-down');
                                nodoC.classList.add('fa-caret-square-o-up');
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            break;
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

    // Obtiene los colpase de las tablas
    let colapsos = document.getElementsByClassName('celda-header-info');
    for (let col of colapsos) {
        // Los deshabilita
        col.classList.add('inactivo');

        // Cambia el icono a flecha hacia abajo
        for (let nodoA of col.childNodes) {
            // div hijo
            if (nodoA.nodeName.toLowerCase() === 'div') {
                for (let nodoB of nodoA.childNodes) {
                    if (nodoB.nodeName.toLowerCase() === 'span') {
                        for (let nodoC of nodoB.childNodes) {
                            if (nodoC.nodeName.toLowerCase() === 'i') {
                                nodoC.classList.add('fa-caret-square-o-down');
                                nodoC.classList.remove('fa-caret-square-o-up');
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }

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
        let texto_fila = document.createTextNode(num_fila);
        td_fila.appendChild(texto_fila);
        tr.appendChild(td_fila);

        // Crea columnas
        let num_col = 1;
        fila.forEach((objDato) => {
            let td = document.createElement('td');
            td.data = objDato;

            // Agrega input o no para editable
            if (objArchivo.editable) {
                let input = document.createElement('input');
                input.value = objDato.valor;
                input.fila = num_fila;
                input.columna = num_col;

                // Respaldo
                input.original = objDato.valor;
                input.onblur = () => {
                    // Si hubo cambio, se notifica
                    if (input.value != input.original) {
                        objDato.valor = input.value;
                        mensajeConsola(`Modificación de ${id}.csv en (${input.fila}, ${input.columna}) de "${input.original}" a "${input.value}"`);
                    }
                };

                td.appendChild(input);
                num_col++;
            } else {
                let texto = document.createTextNode(objDato.valor);
                td.appendChild(texto);
            }

            tr.appendChild(td);
        });

        num_fila++;
        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);

    // Habilita su colapso si hubo datos
    if (objArchivo.numFilas > 0) {
        let colapso = document.getElementById(tabla.dataset.colapso);
        if (colapso) {
            colapso.classList.remove('inactivo');
        }
    }
}
