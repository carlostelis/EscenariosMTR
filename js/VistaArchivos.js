
class VistaArchivos {

    constructor(parent, ipcRenderer) {
        this.set(parent, ipcRenderer);
        // if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
        //     console.log('Sin init');
        //     return;
        // }
        //
        // this.contenedor = parent;
        // this.contenedor.classList.add('row');
        //
        // this.col = document.createElement('div');
        // this.col.classList.add('col');
        // this.col.style.height = '100%';
        //
        // // Divide contenedor en 2 filas,
        // // la primera contiene el icono de recarga
        // // la segunda contiene el arbol
        // this.div_recarga = document.createElement('div');
        // this.div_recarga.classList.add('row');
        // this.div_recarga.style.height = '0px';
        //
        // this.col_recarga = document.createElement('div');
        // this.col_recarga.classList.add('col');
        // this.col_recarga.classList.add('col_recarca_vista-archivos');
        //
        // this.recarga = document.createElement('i');
        // this.recarga.classList.add('fa');
        // this.recarga.classList.add('fa-refresh');
        // this.recarga.onclick = () => {
        //     // Solicita lista de archivos
        //     this.ipcRenderer.send('listaHtml:solicita');
        // };
        //
        // this.col_recarga.appendChild(this.recarga);
        // this.div_recarga.appendChild(this.col_recarga);
        //
        // this.col.appendChild(this.div_recarga);
        //
        // this.div_arbol = document.createElement('div');
        // this.div_arbol.classList.add('row');
        // this.div_arbol.style.height = '93%';
        // this.div_arbol.classList.add('align-items-start');
        // this.div_arbol.classList.add('contenedor_vista-archivos');
        // this.col.appendChild(this.div_arbol);
        //
        // this.contenedor.appendChild(this.col);
        //
        // this.banner = new Banner(this.contenedor);
        // this.ipcRenderer = ipcRenderer;
        //
        // console.log('pide archivos');
        // this.ipcRenderer.send('listaHtml:solicita');
        //
        // this.ipcRenderer.on('listaHtml:recibe', (event, respuesta) => {
        //     console.log(respuesta);
        //
        //     this.html(respuesta).then((code) => {
        //         this.banner.ocultar();
        //
        //         this.div_arbol.innerHTML = "";
        //         this.div_arbol.appendChild(code);
        //     }, (err) => {
        //         this.div_arbol.innerHTML = err;
        //     });
        // });
    }

    set(parent, ipcRenderer) {
        if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
            console.log('Sin init');
            return;
        }

        this.contenedor = parent;
        this.contenedor.classList.add('row');
        this.contenedor.style.borderStyle = 'dashed';

        this.col = document.createElement('div');
        this.col.classList.add('col');
        this.col.style.height = '100%';

        // Divide contenedor en 2 filas,
        // la primera contiene el icono de recarga
        // la segunda contiene el arbol
        this.div_recarga = document.createElement('div');
        this.div_recarga.classList.add('row');
        this.div_recarga.style.height = '0px';

        this.col_recarga = document.createElement('div');
        this.col_recarga.classList.add('col');
        this.col_recarga.classList.add('col_recarca_vista-archivos');

        this.recarga = document.createElement('i');
        this.recarga.classList.add('fa');
        this.recarga.classList.add('fa-refresh');

        this.col_recarga.appendChild(this.recarga);
        this.div_recarga.appendChild(this.col_recarga);

        this.col.appendChild(this.div_recarga);

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
            // Solicita lista de archivos
            this.banner.mostrar();
            this.banner.cargando();
            this.ipcRenderer.send('listaHtml:solicita');
        };

        console.log('pide archivos');
        this.ipcRenderer.send('listaHtml:solicita');

        this.ipcRenderer.on('listaHtml:recibe', (event, respuesta) => {
            console.log(respuesta);

            this.html(respuesta).then((code) => {
                setTimeout(() => {
                    this.div_arbol.innerHTML = "";
                    this.div_arbol.appendChild(code);
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

            nodo_ul.appendChild(this.toLI(json, 'C:/'));
            nodo_ul.onclick = () => {
                console.log('ul');
            };

            resolve(nodo_ul);
        });
    }

    toUL(dir, ruta) {
        if (typeof ruta === 'undefined' || ruta === undefined) {
            ruta = '';
        }

        let nodo_ul = document.createElement('ul');

        try {
            dir.forEach((elemento) => {
                let nodo_li = this.toLI(elemento, ruta);

                nodo_ul.appendChild(nodo_li);
            });
        } catch (e) {
            console.log(e);
        }

        return nodo_ul;
    }

    toLI(elemento, rutaDir) {
        let nodo_li = document.createElement('li');
        nodo_li.classList.add('li_vista-archivos');
        let nodo_i = document.createElement('i');
        nodo_i.classList.add('fa');
        nodo_li.appendChild(nodo_i);
        let nodo_label = document.createElement('label');
        let nodo_texto = document.createTextNode(elemento.nombre);
        nodo_label.appendChild(nodo_texto);
        nodo_label.seleccionado = false;

        nodo_li.appendChild(nodo_label);
        nodo_li.nombre = elemento.nombre;
        nodo_li.ruta = rutaDir + '/' + elemento.nombre;
        nodo_label.onclick = () => {
            if (nodo_label.seleccionado) {
                nodo_label.classList.remove('seleccionado');
                nodo_label.seleccionado = false;
            } else {
                nodo_label.classList.add('seleccionado');
                nodo_label.seleccionado = true;
            }
            console.log('label');
        };

        if (elemento.tipo === 'directorio' && elemento.elementos.length > 0) {
            // folder abierto
            nodo_i.classList.add('fa-folder-open');
            nodo_i.classList.add('folder');
            nodo_label.style.textDecoration = 'underline';

            // Inserta elemento UL
            let nodo_ul = this.toUL(elemento.elementos, nodo_li.ruta);
            nodo_ul.oculto = false;
            nodo_li.appendChild(nodo_ul);
            nodo_label.ondblclick = () => {
                if (nodo_ul.oculto) {
                    nodo_ul.style.display = 'block';
                    nodo_ul.oculto = false;

                    nodo_i.classList.add('fa-folder-open');
                    nodo_i.classList.remove('fa-folder');
                } else {
                    nodo_ul.style.display = 'none';
                    nodo_ul.oculto = true;

                    nodo_i.classList.remove('fa-folder-open');
                    nodo_i.classList.add('fa-folder');
                }
            };
        } else {
            nodo_i.classList.add('file');
            nodo_i.classList.add('fa-file-text');
        }

        return nodo_li;
    }

    actualizar() {
        this.banner.cargando();
        this.banner.mostrar();
        return new Promise((resolve, reject) => {
            console.log("manda");
            ipcRenderer.send('listaHtml:solicita');
        });
    }
}
