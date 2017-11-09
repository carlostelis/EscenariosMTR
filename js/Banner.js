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

        /* ******************** */
        /* Marco para Salida  */
        /* ******************** */
        this.divSalida = document.createElement('div');
        this.divSalida.classList.add('caja-banner');
        this.divSalida.classList.add('caja-prompt');
        this.divSalida.classList.add('center');

        this.divTituloSalida = document.createElement('div');
        this.divTituloSalida.classList.add('salida-titulo-banner');
        this.divTituloSalida.innerHTML = "Titulo de salida";
        this.divSalida.appendChild(this.divTituloSalida);

        this.divSalidaTxt = document.createElement('div');
        this.divSalidaTxt.classList.add('salida-txt-banner');
        this.divSalidaTxt.innerHTML = `Texto <br> texto asdasd`;
        this.divSalida.appendChild(this.divSalidaTxt);

    }

    vistaCompacta() {
        this.divMsg.classList.add('compacto');
        this.divMsg.classList.remove('solo-icono');
        this.divTexto.classList.add('compacto');
    }

    vistaIcono() {
        this.divMsg.classList.remove('compacto');
        this.divMsg.classList.add('solo-icono');
    }

    vistaNormal() {
        this.divMsg.classList.remove('compacto');
        this.divMsg.classList.remove('solo-icono');
        this.divTexto.classList.remove('compacto');
    }

    promptEspera() {
        this.divSalidaTxt.innerHTML = `<div class="prompt-espera"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><div>`;
        this.divSalidaTxt.classList.add('espera');
    }

    promptQuitaEspera() {
        this.divSalidaTxt.innerHTML = '';
        this.divSalidaTxt.classList.remove('espera');
    }

    modoPrompt() {
        try {
            // Quita el div mensajes
            this.divBanner.removeChild(this.divMsg);
            // Agrega el div prompt
            this.divBanner.appendChild(this.divSalida);
            this.divSalida.appendChild(this.divBotones);
        } catch (e) {}
    }

    modoNormal() {
        try {
            // Quita el div mensajes
            this.divBanner.removeChild(this.divSalida);
            // Agrega el div prompt
            this.divBanner.appendChild(this.divMsg);
            this.divMsg.appendChild(this.divBotones);
        } catch (e) {}
    }

    mostrar() {
        this.contenedor.appendChild(this.divBanner);
        setTimeout(() => {
            try {
                this.divBanner.style.opacity = '1';
            } catch (e) {}
        }, 25);
    }

    ocultar() {
        this.divBanner.style.opacity = '0';
        this.setProgreso(0);
        setTimeout(() => {
            try {
                this.contenedor.removeChild(this.divBanner);;
            } catch (e) {}
        }, 300);
    }

    cargando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
    }

    actualizando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>';
    }

    trabajando(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>';
    }

    error(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-times error"></i>';
    }

    alerta(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-warning alerta"></i>';
    }

    ok(color) {
        this.divAuxIcono.innerHTML = '<i class="fa fa-check-square ok"></i>';
    }

    setMensaje(mensaje) {
        this.divAuxTexto.innerHTML = mensaje;
    }

    getMensaje() {
        return this.divAuxTexto.innerHTML;
    }

    mostrarBoton() {
        this.divBotones.style.display = 'block';
    }

    ocultarBoton() {
        this.divBotones.style.display = 'none';
    }

    habilitarBoton() {
        this.botonAceptar.disabled = false;
    }

    deshabilitarBoton() {
        this.botonAceptar.disabled = true;
    }

    setBoton(mensaje, call) {
        this.botonAceptar.innerHTML = mensaje;

        if (call) {
            this.botonAceptar.onclick = call;
        }
    }

    mostrarProgreso() {
        this.divProgreso.style.display = 'flex';
    }

    ocultarProgreso() {
        this.divProgreso.style.display = 'none';
    }

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

    setTituloPrompt(titulo) {
        this.divTituloSalida.innerHTML = titulo;
    };

    setTextoPrompt(texto) {
        this.divSalidaTxt.classList.remove('espera');
        this.divSalidaTxt.innerHTML = `${texto}`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }

    appendTextoPrompt(texto) {
        this.divSalidaTxt.innerHTML += `<br>${texto}`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }

    saltoPrompt() {
        this.divSalidaTxt.innerHTML += `<br>`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }
}
