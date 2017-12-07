class BotonProgreso {
    constructor (boton) {
        this.boton = boton;
        this.contenidoOriginal = boton.innerHTML;
        this.boton.style.padding = '0.5vh 0.3vw 0.3vh 0.6vw';

        this.divProgreso = document.createElement('div');
        this.divProgreso.classList.add('progress');
        this.divProgreso.classList.add('progreso-boton');

        this.divBarraProgreso = document.createElement('div');
        this.divBarraProgreso.classList.add('progress-bar');
        this.divBarraProgreso.classList.add('progress-bar-striped');
        this.divBarraProgreso.classList.add('bg-danger');
        this.divBarraProgreso.classList.add('progress-bar-animated');
        this.divBarraProgreso.classList.add('barra-progreso-boton');

        this.divProgreso.appendChild(this.divBarraProgreso);

        this.setProgreso(0);
    }

    modoProgreso() {
        this.boton.disabled = true;
        this.boton.innerHTML = '';

        this.boton.appendChild(this.divProgreso);
        this.divProgreso.style.opacity = '1';
    }

    prepararProgreso() {
        this.divBarraProgreso.classList.remove('bg-danger');
        this.divBarraProgreso.classList.add('bg-info');
        this.divBarraProgreso.classList.add('preparacion');
        this.divBarraProgreso.style.width = '100%';
        this.divBarraProgreso.innerHTML = '<span>Preparando</span>';
    }

    quitarPreparacion() {
        this.divBarraProgreso.classList.add('bg-warning');
        this.divBarraProgreso.classList.remove('prepacion');
    }

    setProgreso(valor) {
        if (valor < 0 || valor > 100) {
            return;
        }

        this.divBarraProgreso.style.width = `${valor.toFixed(0)}%`;

        if (valor === 100) {
            this.divBarraProgreso.innerHTML = '<span>Completado</span>';

            setTimeout(() => {
                this.divProgreso.style.opacity = '0';
            }, 2500);

            // Devuelve a estado normal
            setTimeout(() => {
                this.divBarraProgreso.style.width = `0%`;
                this.modoNormal();
            }, 3000);
        } else if (valor > 10) {
            this.divBarraProgreso.innerHTML = `<span>${valor.toFixed(0)}%</span>`;
        } else {
            this.divBarraProgreso.innerHTML = '';
        }
    }

    modoNormal() {
        this.boton.disabled = false;
        this.boton.innerHTML = this.contenidoOriginal;
    }
};
