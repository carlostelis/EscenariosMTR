const MAX_ROWS = 20;
const MAX_ROWS_MED = 100;
const MAX_ROWS_BIG = 200;
const LIM_INF_SIZE = 1000;
const LIM_MED_SIZE = 2000;

class Paginacion {
    constructor (tabla, flagPar) {
        this.tabla = tabla;
        this.tbody;
        this.tfoot = null;
        this.totalRows = 0;
        this.totalPaginas = 0;
        this.totalColumnas = 0;
        this.limite = 0;
        this.filas = [];
        this.lis = [];
        this.flagPar = flagPar;
        this.flagRebote = false;
        this.liPrimero = null;
        this.liAnterior = null;
        this.liSiguiente = null;
        this.liUltimo = null;
        this.liBusqueda = null;
        this.inputBusqueda = null;
        this.residuo = 0;
        this.paginaActual = 0;
        this.labelPaginas = null;
        this.margenPagina = '-30%';
        this.nav = null;
        this.init();
    }

    init() {
        this.tfoot = null;
        this.labelPaginas = null;
        this.liAnterior = null;
        this.liSiguiente = null;
        this.liUltimo = null;
        this.liBusqueda = null;
        this.inputBusqueda = null;
        this.nav = null;
        this.totalRows = 0;
        this.totalPaginas = 0;
        this.totalColumnas = 0;
        this.limite = 0;
        this.filas = [];
        this.lis = [];
        this.paginaActual = 0;

        if (typeof this.tabla === 'undefined') {
            return;
        }

        // Inicializa
        for (let nodo of this.tabla.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'tbody') {
                this.tbody = nodo;
                this.totalRows = this.tabla.filas.length;

                // Cuenta las filas
                // this.totalRows = 0;
                // for (let nodoA of this.tbody.childNodes) {
                //     if (nodoA.nodeName.toLowerCase() === 'tr') {
                //         // Guarda la referencia de la fila
                //         this.filas.push(nodoA);
                //         this.totalRows++;
                //     }
                // }
            }

            if (nodo.nodeName.toLowerCase() === 'thead') {
                for (let nodoA of nodo.childNodes) {
                    if (nodoA.nodeName.toLowerCase() === 'tr') {
                        this.totalColumnas = 0;
                        for (let nodoB of nodoA.childNodes) {
                            if (nodoB.nodeName.toLowerCase() === 'th') {
                                this.totalColumnas++;
                            }
                        }
                    }
                }
            }

            if (nodo.nodeName.toLowerCase() === 'tfoot') {
                this.tfoot = nodo;
            }
        }

        // Si no existe footer lo crea
        if (this.tfoot === null || typeof this.tfoot === 'undefined') {
            this.tfoot = document.createElement('tfoot');
            this.tabla.appendChild(this.tfoot);
        }

        // Borra su contenido
        this.tfoot.innerHTML = "";

        this.limite = MAX_ROWS;

        // 50 filas por pagina
        this.totalPaginas = Math.floor(this.totalRows / this.limite);
        this.residuo = this.totalRows % this.limite;
        // Si hay residuo agrega otra pagina
        if (this.residuo > 0) {
            this.totalPaginas++;
        }

        console.log('>>> Paginacion', this.tabla.id, ' filas: ', this.totalRows, ', cols: ', this.totalColumnas, ', paginas: ', this.totalPaginas);

        // Construye el paginado
        // <nav>
        this.nav = document.createElement('nav');

        // <ul>
        let ul = document.createElement('ul');
        ul.classList.add('pagination');
        ul.classList.add('justify-content-center');

        // <tr>
        let tr = document.createElement('tr');
        // <td>
        let td = document.createElement('td');
        td.setAttribute('colspan', `${this.totalColumnas}`);

        // <<
        this.liPrimero = this.crearLi('<span><i class="demo-icon icon-to-start"></span>');
        this.liPrimero.onclick = () => {
            this.paginaActual = 0;

            // Establece limites
            let lim_inf = 0;
            let lim_sup = this.limite;

            if (lim_sup >= this.totalRows) {
                lim_sup = this.totalRows;
            }

            this.filtrarFilas(lim_inf, lim_sup);

            // Pagina
            this.inputBusqueda.value = (this.paginaActual + 1);

            // Si tiene tabla par, da click también en su paginacion
            this.clickTablaPar();
        };
        ul.appendChild(this.liPrimero);

        // <
        this.liAnterior = this.crearLi('<span><i class="demo-icon icon-left-dir"></span>');
        this.liAnterior.onclick = () => {
            this.paginaActual = (this.paginaActual > 0 ? this.paginaActual - 1 : 0);

            // Establece limites
            let lim_inf = this.paginaActual * this.limite;
            let lim_sup = (this.paginaActual + 1) * this.limite;

            if (lim_sup >= this.totalRows) {
                lim_sup = this.totalRows;
            }

            this.filtrarFilas(lim_inf, lim_sup);

            // Pagina
            this.inputBusqueda.value = (this.paginaActual + 1);

            // Si tiene tabla par, da click también en su paginacion
            this.clickTablaPar();
        };
        ul.appendChild(this.liAnterior);

        // Input
        this.inputBusqueda = document.createElement('input');
        this.inputBusqueda.placeholder = '#';
        this.inputBusqueda.classList.add('page-item-input');
        this.inputBusqueda.onkeyup = (event) => {
            if ((typeof event !== 'undefined' && event !== null && event.keyCode === 13)) {
                if (this.cambiarPagina(this.inputBusqueda.value) === false) {
                    this.inputBusqueda.value = this.paginaActual + 1;
                }
            }
        };

        ul.appendChild(this.inputBusqueda);

        // >
        this.liSiguiente = this.crearLi('<span><i class="demo-icon icon-right-dir"></span>');
        this.liSiguiente.onclick = () => {
            this.paginaActual = (this.paginaActual < (this.totalPaginas - 1) ? this.paginaActual + 1 : this.paginaActual);

            // Establece limites
            let lim_inf = this.paginaActual * this.limite;
            let lim_sup = (this.paginaActual + 1) * this.limite;

            if (lim_sup >= this.totalRows) {
                lim_sup = this.totalRows;
            }

            this.filtrarFilas(lim_inf, lim_sup);

            // Pagina
            this.inputBusqueda.value = (this.paginaActual + 1);

            // Si tiene tabla par, da click también en su paginacion
            this.clickTablaPar();
        };
        ul.appendChild(this.liSiguiente);

        // >>
        this.liUltimo = this.crearLi('<span><i class="demo-icon icon-to-end"></span>');
        this.liUltimo.onclick = () => {
            this.paginaActual = (this.totalPaginas - 1);

            // Establece limites
            let lim_inf = this.totalRows - this.residuo;
            let lim_sup = this.totalRows;

            this.filtrarFilas(lim_inf, lim_sup);

            // Pagina
            this.inputBusqueda.value = (this.paginaActual + 1);

            // Si tiene tabla par, da click también en su paginacion
            this.clickTablaPar();
        };
        ul.appendChild(this.liUltimo);

        this.nav.appendChild(ul);
        td.appendChild(this.nav);

        this.labelPaginas = document.createElement('label');
        this.labelPaginas.innerHTML = `<b>${this.totalRows}</b> registros en <b>${this.totalPaginas}</b> página(s)`;
        this.labelPaginas.classList.add('pagina-label');

        td.appendChild(this.labelPaginas);
        tr.appendChild(td);
        this.tfoot.appendChild(tr);

        // Activa el primero de la lista
        this.liPrimero.onclick();
        // Si la tabla tiene scroll en el div, con esto se ajustará
    }

    validarFilas() {
        this.totalRows = this.tabla.filasFiltro.length;
        this.totalPaginas = Math.floor(this.totalRows / this.limite);
        this.residuo = this.totalRows % this.limite;
        // Si hay residuo agrega otra pagina
        if (this.residuo > 0) {
            this.totalPaginas++;
        }

        console.log('>>> Validando', this.tabla.id, ' filas: ', this.totalRows, ', cols: ', this.totalColumnas, ', paginas: ', this.totalPaginas);

        this.labelPaginas.innerHTML = `<b>${this.totalRows}</b> registros en <b>${this.totalPaginas}</b> página(s)`;
    }

    clickTablaPar() {
        if (typeof this.flagPar !== 'undefined' && this.flagPar && !this.flagRebote) {
            if (this.tabla.tabla_par) {
                if (this.tabla.tabla_par.paginacion) {
                    // this.tabla.tabla_par.paginacion.cambiarPagina(this.paginaActual + 1);
                    this.tabla.tabla_par.paginacion.click(this.paginaActual);
                }
            }
        }
    }

    filtrarFilas(lim_inf, lim_sup) {
        this.tbody.innerHTML = '';
        // Para header auxiliar
        // Si es la fila proxima al header de la tabla
        // la marca para que no se muestre
        let flag_top = true;

        // Recorre y filtra las filas
        for (let fila = 0; fila < this.totalRows; fila++) {
            // Si esta en el rango, la deja visible
            if (fila >= lim_inf && fila < lim_sup) {
                // this.filas[fila].flagTop = flag_top;
                this.tabla.filasFiltro[fila].flagTop = flag_top;
                if (flag_top === true) {
                    flag_top = false;
                }
                this.tbody.appendChild(this.tabla.filasFiltro[fila]);
            }
        }

        if (this.paginaActual === 0) {
            this.liAnterior.classList.add('disabled');
            this.liPrimero.classList.add('disabled');
        }

        if (this.paginaActual < this.totalPaginas) {
            this.liSiguiente.classList.remove('disabled');
            this.liUltimo.classList.remove('disabled');
        }

        if (this.paginaActual === (this.totalPaginas - 1)) {
            this.liSiguiente.classList.add('disabled');
            this.liUltimo.classList.add('disabled');
        }

        if (this.paginaActual > 0) {
            this.liAnterior.classList.remove('disabled');
            this.liPrimero.classList.remove('disabled');
        }
    }

    crearLi(texto) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        li.classList.add('li-pagina');

        if (texto !== null) {
            let a = document.createElement('a');
            a.classList.add('page-link');
            // texto = document.createTextNode(texto);
            // a.appendChild(texto);
            a.innerHTML = texto;
            li.appendChild(a);
        }

        return li;
    }

    cambiarPagina(valor_pagina) {
        if (!isNaN(valor_pagina)) {
            let numero = parseInt(valor_pagina);
            if (numero > 0 && numero <= this.totalPaginas) {
                this.paginaActual = numero - 1;

                let lim_inf = this.paginaActual * this.limite;
                let lim_sup = (this.paginaActual + 1) * this.limite;

                if (lim_sup >= this.totalRows) {
                    lim_sup = this.totalRows;
                }

                this.filtrarFilas(lim_inf, lim_sup);

                this.inputBusqueda.value = this.paginaActual + 1;

                // Si tiene tabla par, da click también en su paginacion
                if (typeof this.flagPar !== 'undefined' && this.flagPar && !this.flagRebote) {
                    if (this.tabla.tabla_par) {
                        if (this.tabla.tabla_par.paginacion) {
                            this.tabla.tabla_par.paginacion.click(this.paginaActual);
                        }
                    }
                }

                this.clickTablaPar();

                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    desplazarPaginacion(valor) {
        if (!isNaN(valor)) {
            this.nav.style.marginLeft = `calc(${this.margenPagina} + ${valor}px)`;
            this.labelPaginas.style.marginLeft = `calc(${this.margenPagina} + ${valor}px)`;
        }
    }

    click(pagina) {
        setTimeout(() => {
            this.flagRebote = true;
            this.cambiarPagina(pagina + 1);
            this.flagRebote = false;
        }, 50);
    }
}
