class Banner {
    constructor(parent) {
        console.log(parent);
        if (typeof parent !== 'object') {
            this.contenedor = document.querySelector('#' + parent);
        } else {
            this.contenedor = parent;
        }
        console.log(this.contenedor);
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

        // No lo agrega hasta indicar show()
        //this.contenedor.appendChild(divBanner);
    }

    mostrar() {
        this.contenedor.appendChild(this.divBanner);
        console.log('muestra');
    }

    ocultar() {
        setTimeout(() => {
            this.divBanner.style.opacity = '0';
            console.log('opaca');
            setTimeout(() => {
                this.contenedor.removeChild(this.divBanner);;
                console.log('quita');
            }, 1000);
        }, 1000);
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
        this.parrafo.classList.remove('parrafo_invisible');
        this.parrafo.innerHTML = mensaje;

        setTimeout(() => {
            this.parrafo.classList.add('parrafo_visible');
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
