
class VistaArchivos {

    constructor(parent, ipcRenderer) {
        this.contenedor = parent;
        this.banner = new Banner(this.contenedor);
        this.ipcRenderer = ipcRenderer;

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

    html(json) {
        var that = this;
        return new Promise((resolve, reject) => {
            resolve(`<ul>${that.toLI(json)}</ul>`);
        });
    }

    toUI(dir) {
        var that = this;
        let html = '<ul>';

        try {
            dir.forEach((elemento) => {
                html += that.toLI(elemento);
            });
        } catch (e) {
            console.log(e);
        }

        html += '</ul>'

        return html;
    }

    toLI(elemento) {
        // console.log(">>>>");
        // console.log(elemento);
        if (elemento.tipo === 'directorio' && elemento.elementos.length > 0) {
            return `<li class='vista-archivos carpeta'>${elemento.nombre}${this.toUI(elemento.elementos)}</li>`;
        } else {
            return `<li class='vista-archivos archivo '>${elemento.nombre}</li>`;
        }
    }

    actualizar() {
        var that = this;
        this.banner.cargando();
        this.banner.mostrar();
        return new Promise((resolve, reject) => {
            console.log("manda");
            ipcRenderer.send('listaHtml:solicita');
        });
    }
}
