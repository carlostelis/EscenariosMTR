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

    objArchivos = obj;

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

    // Obtiene el numero de periodos por algoritmo
    let periodos = 0;
    SESION.config.algoritmos.forEach((algoritmo) => {
        if (algoritmo.carpeta === SESION.algoritmo) {
            periodos = algoritmo.periodos;
        }
    });
    console.log('>>> Periodos:', periodos);

    // Verifica si las columnas dependen de periodos por algoritmo

    // Borra los nodos anteriores
    let th_periodos = document.getElementsByClassName('th-periodo');

    // Se asegura de borrar todos los th-periodo
    // No se borran todos a la primer pasada
    do {
        console.log('periodos a borrar', th_periodos.length);
        for (let thp of th_periodos) {
            if (thp.nodeName.toLowerCase() === 'th') {
                thp.parentNode.removeChild(thp);
            }
        }

        th_periodos = document.getElementsByClassName('th-periodo');
    } while (th_periodos.length > 0);

    // Tablas de Periodos 1-N
    let tablas_periodo = document.getElementsByClassName('alg-dep');

    for (let tabla of tablas_periodo) {
        for (let nodoA of tabla.childNodes) {
            if (nodoA.nodeName.toLowerCase() === 'tr') {
                // Agrega las cabeceras de los periodos
                for (let i = 1; i <= periodos; i++) {
                    let th = document.createElement('th');
                    th.classList.add('th-periodo');
                    let texto = document.createTextNode(`Periodo ${i}`);
                    // console.log('Agrega',texto);
                    th.appendChild(texto);
                    nodoA.appendChild(th);
                }
                break;
            }
        }
    }

    // Tablas de de intervalos min y max 1-N
    tablas_periodo = document.getElementsByClassName('alg-dep-i');

    for (let tabla of tablas_periodo) {
        for (let nodoA of tabla.childNodes) {
            if (nodoA.nodeName.toLowerCase() === 'tr') {
                // Agrega las cabeceras de los periodos
                for (let i = 1; i <= periodos; i++) {
                    let thmin = document.createElement('th');
                    let thmax = document.createElement('th');

                    thmin.classList.add('th-periodo');
                    thmax.classList.add('th-periodo');

                    let texto_min = document.createTextNode(`Flujo mínimo en I_${i}`);
                    let texto_max = document.createTextNode(`Flujo máximo en I_${i}`);

                    thmin.appendChild(texto_min);
                    thmax.appendChild(texto_max);

                    nodoA.appendChild(thmin);
                    nodoA.appendChild(thmax);
                }
                break;
            }
        }
    }

    // Crea la tabla de cada archivo
    objArchivos.lista.forEach((archivo) => {
        crearTabla(archivo);
    });

    banner.ocultar();
});

function crearTabla(objArchivo) {
    let id = objArchivo.archivo.toUpperCase().split('.CSV')[0];
    // console.log('tabla', id);
    let tabla = document.getElementById(id);
    if (typeof tabla === 'undefined' || tabla === null) {
        console.log('No existe la tabla', id);
        return;
    }

    // Borra el tbody anterior
    for (let nodo of tabla.childNodes) {
        if (nodo.nodeName.toLowerCase() === 'tbody') {
            tabla.removeChild(nodo);
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
                        if (objDato.tipo === 'number') {
                            if (isNaN(input.value)) {
                                objDato.valor = input.value;
                                alert(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                mensajeConsola(`Error en el valor "${input.value}": se requiere un valor numérico en la columna ${input.columna}`);
                                input.classList.add('input-error');
                                setTimeout(() => {
                                    input.focus();
                                }, 100);
                            } else {
                                objDato.valor = input.value;
                                mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${input.original}" a "${input.value}" (${id}.csv)`);
                                input.classList.remove('input-error');
                            }
                        } else {
                            objDato.valor = input.value;
                            mensajeConsola(`Edición de ${(objDato.tipo === 'number' ? 'número' : 'cadena')} en (${input.fila}, ${input.columna}) de "${input.original}" a "${input.value}" (${id}.csv)`);
                            input.classList.remove('input-error');
                        }
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
