// Clase que permite desplegar un banner sobre el componente indicado
// El componente puede contener mensajes, iconos predefinidos y boton de accion.
class Banner {
    // Constructor de la clase
    // ${parent} es el componente padre que será bloqueado por el banner
    // puede ser un objeto o un identificador
    constructor(parent) {
        if (typeof parent !== 'object') {
            this.contenedor = document.querySelector('#' + parent);
        } else {
            this.contenedor = parent;
        }

        // Crea div
        this.divBanner = document.createElement('div');
        this.divBanner.classList.add('banner');
        this.divBanner.classList.add('center');

        // BLur de fondo
        this.divBlur = document.createElement('div');
        this.divBlur.classList.add('blur');

        /* ******************** */
        /* Marco para mensajes  */
        /* ******************** */
        this.divMsg = document.createElement('div');
        this.divMsg.classList.add('caja-banner');
        this.divMsg.classList.add('center');

        // Icono
        this.divIcono = document.createElement('div');
        this.divIcono.classList.add('icono-banner');

        this.divAuxIcono = document.createElement('div');
        this.divAuxIcono.innerHTML = `<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>`;
        this.divIcono.appendChild(this.divAuxIcono);

        this.divMsg.appendChild(this.divIcono);

        // Mensaje
        this.divTexto = document.createElement('div');
        this.divTexto.classList.add('texto-banner');
        this.divAuxTexto = document.createElement('span');
        this.divTexto.appendChild(this.divAuxTexto);
        this.divMsg.appendChild(this.divTexto);

        // Crea progreso
        this.divProgreso = document.createElement('div');
        this.divProgreso.classList.add('progress');
        this.divProgreso.classList.add('progreso-banner');
        this.divBarraProgreso = document.createElement('div');
        this.divBarraProgreso.classList.add('progress-bar');
        this.divBarraProgreso.classList.add('progress-bar-striped');
        this.divBarraProgreso.classList.add('progress-bar-animated');
        this.divBarraProgreso.classList.add('barra-progreso-banner');
        this.divBarraProgreso.setAttribute('aria-valuenow', "60");
        this.divBarraProgreso.setAttribute('aria-valuemin', "0");
        this.divBarraProgreso.setAttribute('aria-valuemax', "100");
        this.divProgreso.appendChild(this.divBarraProgreso);
        this.divMsg.appendChild(this.divProgreso);

        // Botones
        this.divBotones = document.createElement('div');
        this.divBotones.classList.add('botones-banner');
        this.divBotones.classList.add('container');

        this.botonAceptar = document.createElement('button');
        let textoBoton = document.createTextNode('Aceptar');
        this.botonAceptar.appendChild(textoBoton);
        this.botonAceptar.classList.add('button_gral');

        this.divBotones.appendChild(this.botonAceptar);
        this.divMsg.appendChild(this.divBotones);

        this.divBanner.appendChild(this.divBlur);
        this.divBanner.appendChild(this.divMsg);
    }

    // Método para desplegar el banner en modo compacto
    // Recomendable para casos sin barra de progreso
    vistaCompacta() {
        this.divMsg.classList.add('compacto');
        this.divMsg.classList.remove('solo-icono');
        this.divTexto.classList.add('compacto');
        this.botonAceptar.classList.add('compacto');
        this.botonAceptar.classList.remove('icono');
    }

    // Método para desplegar el banner en modo icono
    // Recomendable para casos sin mensajes ni progreso
    vistaIcono() {
        this.divMsg.classList.remove('compacto');
        this.divMsg.classList.add('solo-icono');
        this.botonAceptar.classList.remove('compacto');
        this.botonAceptar.classList.add('icono');
    }

    // Método para desplegar el banner en normal (extendido)
    // Recomendable para casos con barra de progreso
    vistaNormal() {
        this.divMsg.classList.remove('compacto');
        this.divMsg.classList.remove('solo-icono');
        this.divTexto.classList.remove('compacto');
        this.botonAceptar.classList.remove('compacto');
        this.botonAceptar.classList.remove('icono');
    }

    // Método para mostrar el banner sobre el contenedor asociado
    mostrar() {
        // Oculta tooltips, de repente se cuelgan con el banner
        $("[data-toggle='tooltip']").tooltip('hide');

        // Agrega el componente al dom
        this.contenedor.appendChild(this.divBanner);
        // Cambia su opacidad para suavizar el despliegue
        setTimeout(() => {
            try {
                this.divBanner.style.opacity = '1';
            } catch (e) {}
        }, 25);
    }

    // Método para ocultar el banner y despbloquear el contenedor
    ocultar() {
        this.divBanner.style.opacity = '0';
        this.setProgreso(0);
        setTimeout(() => {
            try {
                this.contenedor.removeChild(this.divBanner);;
            } catch (e) {}
        }, 300);
    }

    // Método para cambiar el icono animado a un círculo punteado
    cargando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
    }

    // Método para cambiar el icono animado a una flecha circular
    actualizando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>';
    }

    // Método para cambiar el icono animado a engrane
    trabajando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>';
    }

    // Método para cambiar el icono a una X
    error(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-times error"></i>';
    }

    // Método para cambiar el icono a una alerta
    alerta(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-warning alerta"></i>';
    }

    // Método para cambiar el icono a una palomita
    ok(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-check-square ok"></i>';
    }

    // Método para establecer el texto del mensaje del banner
    setMensaje(mensaje) {
        this.divAuxTexto.innerHTML = mensaje;
    }

    // Método para recuperar el texto del mensaje del banner
    getMensaje() {
        return this.divAuxTexto.innerHTML;
    }

    // Método para mostrar el botón del banner
    mostrarBoton() {
        this.divBotones.style.display = 'block';
    }

    // Método para ocultar el botón del banner
    ocultarBoton() {
        this.divBotones.style.display = 'none';
    }

    // Método para habilitar el botón del banner
    habilitarBoton() {
        this.botonAceptar.disabled = false;
    }

    // Método para deshabilitar el botón del banner
    deshabilitarBoton() {
        this.botonAceptar.disabled = true;
    }

    // Método para establecer el título y acción del botón del banner
    setBoton(mensaje, call) {
        this.botonAceptar.innerHTML = mensaje;

        // establece la acción
        if (call) {
            this.botonAceptar.onclick = call;
        }
    }

    // Método para mostrar la barra de progreso del banner
    mostrarProgreso() {
        this.divProgreso.style.display = 'flex';
    }

    // Método para ocultar la barra de progreso del banner
    ocultarProgreso() {
        this.divProgreso.style.display = 'none';
    }

    // Método para establecer el porcentaje de progreso del banner
    // ${progreso} es el valor del porcentaje
    setProgreso(progreso) {
        if (progreso < 100) {
            if (progreso > 0) {
                this.divBarraProgreso.innerHTML = `${progreso.toFixed(0)}%`;
            } else {
                this.divBarraProgreso.innerHTML = '';
            }
            // Muestra con transicion
            setTimeout(() => {
                this.divProgreso.style.opacity = '1';
            }, 100);
        } else {
            this.divBarraProgreso.innerHTML = '<b>Completado</b>';

            // Oculta con transicion
            setTimeout(() => {
                this.divProgreso.style.opacity = '0';
            }, 100);
        }// }
        this.divBarraProgreso.style.width = `${progreso}%`;
    }
}
