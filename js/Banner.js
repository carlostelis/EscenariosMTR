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

        // Para icono
        this.divIcono = document.createElement('div');
        this.divBanner.appendChild(this.divIcono);
        this.divIcono.innerHTML = "";
        this.divIcono.classList.add('banner_icon');

        // crea parrafo
        this.divDatos = document.createElement('div');
        this.divDatos.innerHTML = "";
        this.divDatos.classList.add('banner_datos');
        // parrafo
        this.parrafo = document.createElement('p');

        // crea boton
        this.boton = document.createElement('button');
        this.boton.classList.add('button_gral');
        this.boton.style.display = 'none';
        this.boton.style.width = '10%';
        this.boton.style.fontSize = '1.2vw';
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
        this.divIcono.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.add('banner_loading');
    }

    error() {
        this.divIcono.innerHTML = '<i class="fa fa-warning"></i>';
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.add('banner_error');
    }

    ok() {
        this.divIcono.innerHTML = '<i class="fa fa-check-square"></i>';
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.add('banner_ok');
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
        this.boton.focus();
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
