const path = require('path');
const MAX_NIVEL = 2;

class VistaArchivos {

    constructor(parent, ipcRenderer) {
        // Ruta base, para windows
        this.rutaSeleccionada = '';
        this.set(parent, ipcRenderer);
    }

    set(parent, ipcRenderer) {
        if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
            return;
        }

        this.contenedor = parent;
        this.contenedor.classList.add('row');
        // this.contenedor.style.borderStyle = 'dashed';

        this.col = document.createElement('div');
        this.col.classList.add('col');
        this.col.style.height = '100%';

        // Divide contenedor en 3 filas,
        // la primera contiene la ruta base
        this.div_rutaBase = document.createElement('div');
        this.div_rutaBase.classList.add('row');
        this.div_rutaBase.classList.add('align-items-center');
        this.div_rutaBase.style.height = '5%';

        this.label_rutaBase = document.createElement('label');
        this.label_rutaBase.classList.add('label_dato_ce');
        this.label_rutaBase.classList.add('info_ce');
        this.label_rutaBase.appendChild(document.createTextNode('Escenarios locales almacenados en: '));

        this.label_rutaBaseDato = document.createElement('label');
        this.label_rutaBaseDato.classList.add('label_dato_ce');
        this.label_rutaBaseDato.classList.add('dato_ce');
        this.label_rutaBaseDato.appendChild(document.createTextNode('lala'));

        this.div_rutaBase.appendChild(this.label_rutaBase);
        this.div_rutaBase.appendChild(this.label_rutaBaseDato);
        this.col.appendChild(this.div_rutaBase);

        // la segunda contiene el icono de recarga
        this.div_recarga = document.createElement('div');
        this.div_recarga.classList.add('row');
        this.div_recarga.style.height = '0px';

        this.col_recarga = document.createElement('div');
        this.col_recarga.classList.add('col');
        this.col_recarga.classList.add('col_recarga_vista-archivos');

        this.recarga = document.createElement('i');
        this.recarga.classList.add('fa');
        this.recarga.classList.add('fa-refresh');

        this.col_recarga.appendChild(this.recarga);
        this.div_recarga.appendChild(this.col_recarga);

        this.col.appendChild(this.div_recarga);

        // la tercera contiene el arbol
        this.div_arbol = document.createElement('div');
        this.div_arbol.classList.add('row');
        this.div_arbol.style.height = '93%';
        this.div_arbol.classList.add('align-items-start');
        this.div_arbol.classList.add('contenedor_vista-archivos');
        this.col.appendChild(this.div_arbol);

        this.contenedor.appendChild(this.col);

        this.banner = new Banner(this.div_arbol);
        this.banner.mostrar();
        this.banner.cargando();

        this.ipcRenderer = ipcRenderer;

        // Boton de recarga
        this.recarga.onclick = () => {
            // // Solicita lista de archivos
            // this.banner.mostrar();
            // // this.banner.cargando('darkgray');
            // this.banner.trabajando();
            // this.ipcRenderer.send('listaHtml:solicita');
            this.actualizar();
        };

        this.ipcRenderer.send('listaHtml:solicita');

        this.ipcRenderer.on('listaHtml:recibe', (event, respuesta) => {
            this.html(respuesta).then((code) => {
                setTimeout(() => {
                    this.div_arbol.innerHTML = "";
                    this.div_arbol.appendChild(code);

                    this.label_rutaBaseDato.innerHTML = this.rutaBase;

                    this.banner.ocultar();
                }, 1000);
            }, (err) => {
                setTimeout(() => {
                    this.div_arbol.innerHTML = err;
                    this.banner.ocultar();
                }, 1000);
            });
        });
    }

    html(json) {
        return new Promise((resolve, reject) => {
            let nodo_ul = document.createElement('ul');
            nodo_ul.style.paddingLeft = '1vw';

            nodo_ul.appendChild(this.toLI(json, '', 0));

            resolve(nodo_ul);
        });
    }

    toUL(dir, ruta, nivel) {
        if (typeof ruta === 'undefined' || ruta === undefined) {
            ruta = '';
        }

        let nodo_ul = document.createElement('ul');

        try {
            dir.forEach((elemento) => {
                let nodo_li = this.toLI(elemento, ruta, nivel);

                nodo_ul.appendChild(nodo_li);
            });
        } catch (e) {
            console.log(e);
        }

        return nodo_ul;
    }

    toLI(elemento, rutaDir, nivel) {
        // console.log(elemento);
        // crea elemento li
        let nodo_li = document.createElement('li');
        nodo_li.classList.add('li_vista-archivos');
        // crea icono
        let nodo_i = document.createElement('i');
        nodo_i.classList.add('fa');
        nodo_li.appendChild(nodo_i);
        // crea etiqueta
        let nodo_label = document.createElement('label');
        let nodo_texto = document.createTextNode(elemento.nombre);
        nodo_label.appendChild(nodo_texto);
        nodo_label.seleccionado = false;
        nodo_li.appendChild(nodo_label);
        // atributos extra
        nodo_label.nombre = elemento.nombre;

        if (typeof elemento.rutaBase === 'string') {
            this.rutaBase = elemento.rutaBase;
            nodo_label.ruta = this.rutaBase;
        } else {
            nodo_label.ruta = path.join(rutaDir, elemento.nombre);
        }

        // metodo click
        nodo_label.onclick = () => {
            // quita seleccion de otros elementos
            this.quitarSeleccion();
            // selecciona a si mismo
            nodo_label.classList.add('seleccionado');
            nodo_label.seleccionado = true;
            console.log(`Seleccionado ${nodo_label.ruta}`);
            this.rutaSeleccionada = nodo_label.ruta;
        };

        if (elemento.tipo === 'directorio') {
            if (nivel < MAX_NIVEL) {
                // folder abierto
                nodo_i.classList.add('fa-folder-open');
            } else {
                // folder cerradp
                nodo_i.classList.add('fa-folder');
            }

            nodo_i.classList.add('folder');

            // Crea icono +/-
            let nodo_signo = document.createElement('i');
            nodo_signo.classList.add('fa');
            nodo_signo.style.marginLeft = '-1vw';

            if (nivel < MAX_NIVEL) {
                // +
                nodo_signo.classList.add('fa-minus-square-o');
            } else {
                // -
                nodo_signo.classList.add('fa-plus-square-o');
            }

            nodo_signo.style.fontSize = '1vw';
            nodo_li.insertBefore(nodo_signo, nodo_i);

            // Inserta elemento UL lista
            let nodo_ul = this.toUL(elemento.elementos, nodo_label.ruta, nivel + 1);

            if (nivel < MAX_NIVEL) {
                // visible
                nodo_ul.oculto = false;
                nodo_ul.style.display = 'block';
            } else {
                // oculto
                nodo_ul.oculto = true;
                nodo_ul.style.display = 'none';
            }

            nodo_li.appendChild(nodo_ul);
            // doble click
            // nodo_label.ondblclick = () => {
            nodo_signo.onclick = () => {
                if (nodo_ul.oculto) {
                    nodo_ul.style.display = 'block';
                    nodo_ul.oculto = false;

                    // cambia icono de folder
                    nodo_i.classList.add('fa-folder-open');
                    nodo_i.classList.remove('fa-folder');
                    // cambia icono +/-
                    nodo_signo.classList.remove('fa-plus-square-o');
                    nodo_signo.classList.add('fa-minus-square-o');
                } else {
                    nodo_ul.style.display = 'none';
                    nodo_ul.oculto = true;

                    // cambia icono de folder
                    nodo_i.classList.remove('fa-folder-open');
                    nodo_i.classList.add('fa-folder');
                    // cambia icono +/-
                    nodo_signo.classList.add('fa-plus-square-o');
                    nodo_signo.classList.remove('fa-minus-square-o');
                }
            };
        } else {
            nodo_i.classList.add('file');
            nodo_i.classList.add('fa-file-text');
        }

        return nodo_li;
    }

    quitarSeleccion(elemento) {
        if (elemento) {
            if (elemento.hasOwnProperty('seleccionado')) {
                elemento.classList.remove('seleccionado');
                elemento.seleccionado = false;
            }

            // Si tiene hijos los procesa
            Array.from(elemento.childNodes).forEach((e) => {
                this.quitarSeleccion(e);
            });
        } else {
            Array.from(this.div_arbol.childNodes).forEach((e) => {
                this.quitarSeleccion(e)
            });
        }
    }

    actualizar() {
        this.banner.trabajando();
        this.banner.mostrar();
        return new Promise((resolve, reject) => {
            ipcRenderer.send('listaHtml:solicita');
        });
    }

    getRutaBase() {
        return this.rutaBase;
    }

    getRutaSeleccionada() {
        return this.rutaSeleccionada;
    }
}
