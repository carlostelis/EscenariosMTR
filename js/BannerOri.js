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

        // Crea progreso
        this.divProgreso = document.createElement('div');
        this.divProgreso.classList.add('progress');
        this.divProgreso.style.height = '3vh';
        this.divProgreso.style.width = '50%';
        this.divProgreso.style.margin = 'auto';
        this.divBarraProgreso = document.createElement('div');
        this.divBarraProgreso.classList.add('progress-bar');
        this.divBarraProgreso.classList.add('progress-bar-striped');
        this.divBarraProgreso.classList.add('progress-bar-animated');
        this.divBarraProgreso.setAttribute('aria-valuenow', "60");
        this.divBarraProgreso.setAttribute('aria-valuemin', "0");
        this.divBarraProgreso.setAttribute('aria-valuemax', "100");
        this.divBarraProgreso.style.width = '0%';
        this.divBarraProgreso.style.height = '100%';
        this.divBarraProgreso.style.fontSize = '2vh';
        this.divBarraProgreso.style.fontWeight = 'bold';
        this.divBarraProgreso.style.margin = 'auto';
        this.divBarraProgreso.style.paddingTop = '0.5vh';
        this.divBarraProgreso.style.borderRadius = '10px';
        this.divBarraProgreso.style.transition = '0.5s ease-in';

        this.divProgreso.appendChild(this.divBarraProgreso);
        // Por defecto ocultarBoton
        this.divProgreso.style.visibility = 'hidden';

        // Inserta
        this.divDatos.appendChild(this.parrafo);
        this.divDatos.appendChild(this.divProgreso);
        this.divDatos.appendChild(this.boton);
        this.divBanner.appendChild(this.divDatos);
    }

    mostrar() {
        this.contenedor.appendChild(this.divBanner);
        this.divBanner.style.opacity = '1';
    }

    ocultar() {
        this.divBanner.style.opacity = '0';
        setTimeout(() => {
            this.setProgreso(0);
            try {
                this.contenedor.removeChild(this.divBanner);;
            } catch (e) {}
        }, 600);
    }

    cargando(color) {
        this.divIcono.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.remove('banner_actualiza');
        this.divIcono.classList.remove('banner_trabaja');
        this.divIcono.classList.add('banner_loading');
        this.divIcono.style.color = 'slateblue';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
        }
    }

    actualizando(color) {
        this.divIcono.innerHTML = '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>';
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.add('banner_actualiza');
        this.divIcono.classList.remove('banner_trabaja');
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.style.color = 'deepskyblue';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
        }
    }

    trabajando(color) {
        this.divIcono.innerHTML = '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>';
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.remove('banner_actualiza');
        this.divIcono.classList.add('banner_trabaja');
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.style.color = 'brown';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
        }
    }

    error(color) {
        this.divIcono.innerHTML = '<i class="fa fa-times"></i>';
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.add('banner_error');
        this.divIcono.classList.remove('banner_actualiza');
        this.divIcono.classList.remove('banner_trabaja');
        this.divIcono.style.color = 'darkred';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
        }
    }

    alerta(color) {
        this.divIcono.innerHTML = '<i class="fa fa-warning"></i>';
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.classList.remove('banner_ok');
        this.divIcono.classList.add('banner_error');
        this.divIcono.classList.remove('banner_actualiza');
        this.divIcono.classList.remove('banner_trabaja');
        this.divIcono.style.color = 'gold';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
        }
    }

    ok(color) {
        this.divIcono.innerHTML = '<i class="fa fa-check-square"></i>';
        this.divIcono.classList.remove('banner_loading');
        this.divIcono.classList.remove('banner_error');
        this.divIcono.classList.add('banner_ok');
        this.divIcono.classList.remove('banner_actualiza');
        this.divIcono.classList.remove('banner_trabaja');
        this.divIcono.style.color = 'darkgreen';

        if (typeof color === 'string') {
            this.divIcono.style.color = color;
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

    mostrarProgreso(color) {
        this.divProgreso.style.visibility = 'visible';

        if (typeof color !== 'undefined') {
            this.divBarraProgreso.style.backgroundColor = color;
        }
    }

    ocultarProgreso() {
        this.divProgreso.style.visibility = 'hidden';
    }

    setProgreso(progreso) {
        // if (progreso > 1) {
        if (progreso < 100) {
            if (progreso > 0) {
                this.divBarraProgreso.innerHTML = `${progreso.toFixed(0)}%`;
            } else {
                this.divBarraProgreso.innerHTML = '';
            }
        } else {
            this.divBarraProgreso.innerHTML = '<b>Completado</b>';
        }
        // }
        this.divBarraProgreso.style.width = `${progreso}%`;
        // this.spanProgreso.innerHTML = `${progreso.toFixed(2)}%`;
    }
}
