const path = require('path');
const MAX_NIVEL = 0;

class VistaArchivos {

    constructor(parent, ipcRenderer) {
        // Ruta base, para windows
        this.rutaSeleccionada = '';
        this.set(parent, ipcRenderer);
        this.seleccionAnterior = undefined;
        this.arbol = null;
        this.folderListener = null;
    }

    set(parent, ipcRenderer) {
        if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
            return;
        }

        this.contenedor = parent;
        this.contenedor.classList.add('row');

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

        this.banner = new Banner(this.col);
        this.banner.vistaIcono(); //
        this.banner.ocultarBoton();
        this.banner.ocultarProgreso();
        this.banner.mostrar();
        this.banner.cargando();

        this.ipcRenderer = ipcRenderer;

        // Boton de recarga
        this.recarga.onclick = () => {
            this.actualizar();
        };

        this.ipcRenderer.on('listaHtml:recibeBase', (event, respuesta) => {
            this.arbol = respuesta;
            this.html(respuesta).then((code) => {
                setTimeout(() => {
                    this.div_arbol.innerHTML = "";
                    this.div_arbol.appendChild(code);

                    this.label_rutaBaseDato.innerHTML = respuesta.ruta;

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

            nodo_ul.appendChild(this.toLI(json, ''));
            resolve(nodo_ul);
        });
    }

    toLI(elemento, nivel) {
        let promesas = [];
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
            nodo_label.ruta = path.join(elemento.ruta, elemento.nombre);
        }

        // metodo click
        nodo_label.onclick = () => {
            // quita seleccion de otros elementos
            // selecciona a si mismo
            if (typeof this.seleccionAnterior !== 'undefined') {
                this.seleccionAnterior.classList.remove('seleccionado');
                this.seleccionAnterior.seleccionado = false;
            }

            nodo_label.classList.add('seleccionado');
            nodo_label.seleccionado = true;
            console.log(`Seleccionado ${nodo_label.ruta}`);
            this.rutaSeleccionada = nodo_label.ruta;

            // Nuevo seleccionado
            this.seleccionAnterior = nodo_label;
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
            nodo_signo.cargado = false;
            nodo_signo.visible = false;
            nodo_signo.elementos = elemento.elementos;

            nodo_li.ul = document.createElement('ul');
            nodo_li.ul.style.display = 'none';
            nodo_li.ul.classList.add('borde-izquierdo');
            nodo_li.appendChild(nodo_li.ul);
            // Cuando de click en el signo se cargaran y crearán sus hijos
            nodo_signo.onclick = () => {
                new Promise((resolve, reject) => {
                    if (!nodo_signo.cargado) {
                        ipcRenderer.send('listaHtml:solicitaDirectorio', elemento.ruta);

                        // Remueve el anterior listener
                        if (this.folderListener !== null) {
                            this.ipcRenderer.removeListener('listaHtml:recibeDirectorio', this.folderListener);
                        }

                        this.folderListener = (event, elementos) => {
                            console.log('Cargando', elemento.ruta, elementos);
                            nodo_signo.elementos = elementos;
                            nodo_signo.elementos.forEach((elemento) => {
                                // console.log('elemento', elemento.nombre);
                                nodo_li.ul.appendChild(this.toLI(elemento));
                            });
                            nodo_signo.cargado = true;
                            resolve();
                        };
                        this.ipcRenderer.on('listaHtml:recibeDirectorio', this.folderListener);
                    } else {
                        resolve();
                    }
                }).then(() => {
                    if (!nodo_signo.visible) {
                        nodo_li.ul.style.display = 'block';
                        nodo_signo.visible = true;

                        // cambia icono de folder
                        nodo_i.classList.add('fa-folder-open');
                        nodo_i.classList.remove('fa-folder');
                        // cambia icono +/-
                        nodo_signo.classList.remove('fa-plus-square-o');
                        nodo_signo.classList.add('fa-minus-square-o');
                    } else {
                        nodo_li.ul.style.display = 'none';
                        nodo_signo.visible = false;

                        // cambia icono de folder
                        nodo_i.classList.remove('fa-folder-open');
                        nodo_i.classList.add('fa-folder');
                        // cambia icono +/-
                        nodo_signo.classList.add('fa-plus-square-o');
                        nodo_signo.classList.remove('fa-minus-square-o');
                    }
                });
            };

        } else {
            nodo_i.classList.add('file');
            nodo_i.classList.add('fa-file-text');
        }

        return nodo_li;
    }

    actualizar() {
        this.banner.trabajando();
        this.banner.mostrar();
        this.div_arbol.innerHTML = "";

        setTimeout(() => {
            ipcRenderer.send('listaHtml:solicitaBase');
        }, 500);
    }

    getRutaBase() {
        return this.rutaBase;
    }

    getRutaSeleccionada() {
        return this.rutaSeleccionada;
    }
}
