// Clase que permite administrar un botón con una barra de progreso en su contenido
class BotonProgreso {
    // Constructor def la clase
    // boton es el componente botón al cual se asociará
    constructor (boton) {
        this.boton = boton;
        this.contenidoOriginal = boton.innerHTML;
        // Estilos
        this.boton.style.padding = '0.5vh 0.3vw 0.3vh 0.6vw';

        // div progreso
        this.divProgreso = document.createElement('div');
        this.divProgreso.classList.add('progress');
        this.divProgreso.classList.add('progreso-boton');

        // div barra progreso
        this.divBarraProgreso = document.createElement('div');
        this.divBarraProgreso.classList.add('progress-bar');
        this.divBarraProgreso.classList.add('progress-bar-striped');
        this.divBarraProgreso.classList.add('bg-danger');
        this.divBarraProgreso.classList.add('progress-bar-animated');
        this.divBarraProgreso.classList.add('barra-progreso-boton');

        // Se agrega
        this.divProgreso.appendChild(this.divBarraProgreso);

        // Establece progreso en 0
        this.setProgreso(0);
    }

    // Habilita el despliegue de la barra de progreso y oculta el titulo del botón
    modoProgreso() {
        this.boton.disabled = true;
        this.boton.innerHTML = '';

        this.boton.appendChild(this.divProgreso);
        this.divProgreso.style.opacity = '1';
    }

    // Establece la barra en modo preparación o espera de información
    prepararProgreso() {
        this.divBarraProgreso.classList.remove('bg-danger');
        this.divBarraProgreso.classList.add('bg-info');
        this.divBarraProgreso.classList.add('preparacion');
        this.divBarraProgreso.style.width = '100%';
        this.divBarraProgreso.innerHTML = '<span>Preparando</span>';
    }

    // Cancela el modo preparación
    quitarPreparacion() {
        this.divBarraProgreso.classList.add('bg-warning');
        this.divBarraProgreso.classList.remove('prepacion');
    }

    // Establece el progreso de la barra
    // ${valor} es el porcentaje de avance de la barra
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

    // Oculta la barra de progreso y despliega el titulo del botón
    modoNormal() {
        this.boton.disabled = false;
        this.boton.innerHTML = this.contenidoOriginal;
    }
};
