
class VistaArchivos {

    constructor(parent, ipcRenderer) {
        if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
            console.log('Sin init');
            return;
        }

        this.contenedor = parent;
        this.contenedor.classList.add('row');
        this.contenedor.classList.add('align-items-start');
        this.contenedor.classList.add('contenedor_vista-archivos');
        this.banner = new Banner(this.contenedor);
        this.ipcRenderer = ipcRenderer;

        this.ipcRenderer.send('listaHtml:solicita');

        this.ipcRenderer.on('listaHtml:recibe', (event, respuesta) => {
            console.log(respuesta);

            this.html(respuesta).then((code) => {
                this.banner.ocultar();
                this.contenedor.innerHTML = code;
            }, (err) => {
                this.banner.ocultar();
                this.contenedor.innerHTML = err;
            });
        });
    }

    set(parent, ipcRenderer) {
        if (typeof parent === 'undefined' && typeof ipcRenderer === 'undefined') {
            console.log('Sin init');
            return;
        }

        this.contenedor = parent;
        this.contenedor.classList.add('row');
        this.contenedor.classList.add('align-items-start');
        this.contenedor.classList.add('contenedor_vista-archivos');
        this.banner = new Banner(this.contenedor);
        this.ipcRenderer = ipcRenderer;

        console.log('pide archivos');
        this.ipcRenderer.send('listaHtml:solicita');

        this.ipcRenderer.on('listaHtml:recibe', (event, respuesta) => {
            console.log(respuesta);

            this.html(respuesta).then((code) => {
                this.banner.ocultar();
                //this.contenedor.innerHTML = code;
                this.contenedor.appendChild(code);
            }, (err) => {
                this.banner.ocultar();
                this.contenedor.innerHTML = err;
                this.contenedor.appendChild(err);
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
            nodo_i.classList.add('fa-folder-open');
            nodo_i.classList.add('folder');

            // Inserta elemento UL
            nodo_li.appendChild(this.toUL(elemento.elementos, nodo_li.ruta));
        } else {
            nodo_i.classList.add('file');
            nodo_i.classList.add('fa-file-picture-o');
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
