class Consola {
    constructor(parent) {
        if (typeof parent !== 'object') {
            this.contenedor = document.querySelector('#' + parent);
        } else {
            this.contenedor = parent;
        }

        // Crea div
        this.divConsola = document.createElement('div');
        this.divConsola.classList.add('banner');
        this.divConsola.classList.add('center');

        // BLur de fondo
        this.divBlur = document.createElement('div');
        this.divBlur.classList.add('blur');

        /* ******************** */
        /* Marco para Salida  */
        /* ******************** */
        this.divSalida = document.createElement('div');
        this.divSalida.classList.add('caja-banner');
        this.divSalida.classList.add('caja-prompt');
        this.divSalida.classList.add('center');
        this.divSalida.classList.add('lalala');
        this.divSalida.id = 'divSalida';

        this.divTituloSalida = document.createElement('div');
        this.divTituloSalida.classList.add('salida-titulo-banner');
        this.divTituloSalida.innerHTML = "Titulo de salida";
        this.divSalida.appendChild(this.divTituloSalida);

        this.divSalidaAux = document.createElement('div');
        this.divSalidaAux.classList.add('salida-aux-banner');
        this.divSalidaAux.innerHTML = '';
        this.divSalidaAux.id = 'divSalidaAux';
        this.divSalida.appendChild(this.divSalidaAux);

        this.divSalidaTxt = document.createElement('div');
        this.divSalidaTxt.classList.add('salida-txt-banner');
        this.divSalidaTxt.innerHTML = '';
        this.divSalidaTxt.id = 'divSalidaTxt';
        this.divSalidaAux.appendChild(this.divSalidaTxt);

        this.divBotones = document.createElement('div');
        this.divBotones.classList.add('container');
        this.divSalida.appendChild(this.divBotones);

        this.divConsola.appendChild(this.divBlur);
        this.divConsola.appendChild(this.divSalida);

        this.divBotonesRow = document.createElement('div');
        this.divBotonesRow.classList.add('row');
        this.divBotonesRow.classList.add('justify-content-center');
        this.divBotonesRow.style.padding = '0';
        this.divBotones.appendChild(this.divBotonesRow);

        this.divBanner = document.createElement('div');
        this.divBanner.classList.add('consola-banner');

        this.divBannerIcono = document.createElement('div');
        this.divBannerIcono.classList.add('consola-banner-icono');
        this.divBannerIcono.innerHTML = `<span><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></span>`;
        this.divBanner.appendChild(this.divBannerIcono);

        this.botones = [];
    }

    mostrar() {
        this.contenedor.appendChild(this.divConsola);
        setTimeout(() => {
            try {
                this.divConsola.style.opacity = '1';
                this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
            } catch (e) {}
        }, 25);
    }

    ocultar() {
        this.divConsola.style.opacity = '0';
        setTimeout(() => {
            try {
                this.contenedor.removeChild(this.divConsola);;
            } catch (e) {}
        }, 300);
    }

    addBoton(id, contenido, callback) {
        let boton;
        let divCol;

        boton = this.botones.find((boton) => {
            return boton.id === `boton_consola_${id}`;
        });

        if (typeof boton === 'undefined') {
            boton = document.createElement('button');
            this.botones.push(boton);

            divCol = document.createElement('div');
            divCol.classList.add('col-3');
        } else {
            divCol = boton.div;
        }

        boton.id = `boton_consola_${id}`;
        boton.innerHTML = contenido;
        boton.onclick = callback;
        boton.div = divCol;
        boton.classList.add('button_gral');
        boton.classList.add('boton_consola');

        divCol.appendChild(boton);
        this.divBotonesRow.appendChild(divCol);
    }

    ocultarBoton(id) {
        this.botones.forEach((boton) => {
            if (boton.id === `boton_consola_${id}`) {
                this.divBotonesRow.removeChild(boton.div);
            }
        });
    }

    mostrarBoton(id) {
        this.botones.forEach((boton) => {
            if (boton.id === `boton_consola_${id}`) {
                this.divBotonesRow.appendChild(boton.div);
            }
        });
    }

    habilitarBoton(id, flag) {
        this.botones.forEach((boton) => {
            if (boton.id === `boton_consola_${id}`) {
                if (typeof flag === 'boolean') {
                    boton.disabled = !flag;
                } else {
                    boton.disabled = false;
                }
            }
        });
    }

    getBoton(id) {
        let b;
        this.botones.forEach((boton) => {
            if (boton.id === `boton_consola_${id}`) {
                b = boton;
            }
        });

        return b;
    }

    setTitulo(titulo) {
        this.divTituloSalida.innerHTML = titulo;
    }

    setTexto(texto) {
        this.divSalidaTxt.classList.remove('espera');
        this.divSalidaTxt.innerHTML = `${texto}`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }

    appendTexto(texto) {
        this.divSalidaTxt.innerHTML = `${this.divSalidaTxt.innerHTML}<br>${texto}`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }

    salto() {
        this.divSalidaTxt.innerHTML += `<br>`;
        this.divSalidaTxt.scrollTop = this.divSalidaTxt.scrollHeight;
    }

    getSalida() {
        return this.divSalidaTxt.innerHTML;
    }

    mostrarBanner() {
        this.divSalidaTxt.classList.add('salida-banneo');
    }

    ocultarBanner() {
        this.divSalidaTxt.classList.remove('salida-banneo');
    }
}
