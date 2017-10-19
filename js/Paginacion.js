const MAX_ROWS = 50;
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
        this.init();
    }

    init() {
        this.tfoot = null;
        this.totalRows = 0;
        this.totalPaginas = 0;
        this.totalColumnas = 0;
        this.limite = 0;
        this.filas = [];
        this.lis = [];

        if (typeof this.tabla === 'undefined') {
            return;
        }

        // Inicializa
        for (let nodo of this.tabla.childNodes) {
            if (nodo.nodeName.toLowerCase() === 'tbody') {
                this.tbody = nodo;

                // Cuenta las filas
                this.totalRows = 0;
                for (let nodoA of this.tbody.childNodes) {
                    if (nodoA.nodeName.toLowerCase() === 'tr') {
                        // Guarda la referencia de la fila
                        this.filas.push(nodoA);
                        this.totalRows++;
                    }
                }
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

        // Determina el limite en funcion del numero de filas para evitar overflow de paginado
        if (this.totalRows < LIM_INF_SIZE) {
            this.limite = MAX_ROWS;
        } else if (this.totalRows >= LIM_INF_SIZE && this.totalRows < LIM_MED_SIZE) {
            this.limite = MAX_ROWS_MED;
        } else {
            this.limite = MAX_ROWS_BIG;
        }

        // 50 filas por pagina
        this.totalPaginas = Math.floor(this.totalRows / this.limite);
        // Si hay residuo agrega otra pagina
        if ((this.totalRows % this.limite) > 0) {
            this.totalPaginas++;
        }

        console.log('>>> Paginacion', this.tabla.id, ' filas: ', this.totalRows, ', cols: ', this.totalColumnas, ', paginas: ', this.totalPaginas);

        // Construye el paginado
        // <nav>
        let nav = document.createElement('nav');
        // <ul>
        let ul = document.createElement('ul');
        ul.classList.add('pagination');
        ul.classList.add('justify-content-end');

        // <tr>
        let tr = document.createElement('tr');
        // <td>
        let td = document.createElement('td');
        td.setAttribute('colspan', `${this.totalColumnas}`);

        for (let i = 1; i <= this.totalPaginas; i++) {
            // <li>
            let li = document.createElement('li');
            li.classList.add('page-item');
            li.classList.add('li-pagina');
            // <a>
            let a = document.createElement('a');
            a.classList.add('page-link');
            // Texto
            let texto = document.createTextNode(`${i}`);

            // Agrega el evento al li
            li.onclick = () => {
                // console.log('Muestro', i, this.tabla);
                if (li.classList.contains('disabled')) {
                    return;
                }
                // console.log(this.tabla.id, ' pagina ', i);

                // Establece limites
                let lim_inf = (i - 1) * this.limite;
                let lim_sup = i * this.limite;

                if (lim_sup >= this.totalRows) {
                    lim_sup = this.totalRows;
                }

                // Recorre y filtra las filas
                for (let fila = 0; fila < this.totalRows; fila++) {
                    // Si esta en el rango, la deja visible
                    if (fila >= lim_inf && fila < lim_sup) {
                        this.filas[fila].style.display = 'table-row';
                    } else {
                        this.filas[fila].style.display = 'none';
                    }
                }

                this.lis.forEach((li) => {
                    li.classList.remove('disabled');
                });
                // Se desactiva
                li.classList.add('disabled');

                // Si tiene tabla par, da click también en su paginacion
                if (typeof this.flagPar !== 'undefined' && this.flagPar && !this.flagRebote) {
                    if (this.tabla.tabla_par) {
                        if (this.tabla.tabla_par.paginacion) {
                            this.tabla.tabla_par.paginacion.click(i);
                        }
                    }
                }

            };

            a.appendChild(texto);
            li.appendChild(a);
            ul.appendChild(li);

            // Agrega el li a una lista
            this.lis.push(li);
        }

        nav.appendChild(ul);
        td.appendChild(nav);
        tr.appendChild(td);
        this.tfoot.appendChild(tr);

        // Activa el primero de la lista
        this.lis[0].onclick();
    }

    click(pagina) {
        if (pagina < 1 || pagina > this.lis.length) {
            return;
        }

        setTimeout(() => {
            this.flagRebote = true;
            this.lis[pagina - 1].onclick();
            this.flagRebote = false;
        }, 100);
    }
}
