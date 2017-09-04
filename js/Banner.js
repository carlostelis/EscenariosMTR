class Banner {
    constructor(parent) {
        if (typeof parent !== 'object') {
            this.contenedor = document.querySelector('#' + parent);
        } else {
            this.contenedor = parent;
        }

        // Crea div
        this.divBanner = document.createElement('div');
        this.divBanner.classList.add('banner');

        // crea parrafo
        this.divDatos = document.createElement('div');
        this.divDatos.innerHTML = "";
        // parrafo
        this.parrafo = document.createElement('p');

        // crea boton
        this.boton = document.createElement('button');
        this.boton.classList.add('button_gral');
        this.boton.style.display = 'none';
        this.boton.value = 'Botón';

        // Inserta
        this.divDatos.appendChild(this.parrafo);
        this.divDatos.appendChild(this.boton);
        this.divBanner.appendChild(this.divDatos);
        this.divBanner.style.opacity = '0';
        // No lo agrega hasta indicar show()
        //this.contenedor.appendChild(divBanner);
    }

    mostrar() {
        this.contenedor.appendChild(this.divBanner);
        // setTimeout(() => {
            this.divBanner.style.opacity = '0.8';
        // }, 500);
    }

    ocultar() {
        var that = this;
        // setTimeout(() => {
            that.divBanner.style.opacity = '0';
            setTimeout(() => {
                try {
                    that.contenedor.removeChild(that.divBanner);;
                } catch (e) {}
            }, 600);
        // }, 500);
    }

    cargando() {
        if (!this.divBanner.classList.contains('banner_loading')) {
            this.divBanner.classList.add('banner_loading');

            this.divBanner.classList.remove('banner_error');
        }
    }

    error() {
        if (!this.divBanner.classList.contains('banner_error')) {
            this.divBanner.classList.add('banner_error');

            this.divBanner.classList.remove('banner_loading');
        }
    }

    setMensaje(mensaje) {
        var that = this;
        this.parrafo.classList.remove('parrafo_invisible');
        this.parrafo.innerHTML = mensaje;

        setTimeout(() => {
            that.parrafo.classList.add('parrafo_visible');
        }, 1000);
    }

    getMensaje() {
        return this.parrafo.innerHTML;
    }

    mostrarBoton() {
        this.boton.style.display = 'initial';
    }

    ocultarBoton() {
        this.boton.style.display = 'none';
    }

    setBoton(mensaje, call) {
        this.boton.innerHTML = mensaje;

        if (call) {
            this.boton.onclick = call;
        }
    }
}
