// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

// Escucha instruccion para cerrar sesion,
// carga los componentes de login
ipcRenderer.on('sesion:cerrar', (event) => {
    console.log('sesion cerrar');
    body.style.opacity = '0';

    solicitarSistemas();

    setTimeout(() => {
        var divLogin = document.querySelector('#div-layout');
        divLogin.classList.add('d-none');

        var divLayout = document.querySelector('#div-login');
        divLayout.classList.remove('d-none');
    }, 1500);

    setTimeout(() => {
        body.style.opacity = '1';
        paginaActual = 'login';
    }, 1600);
});

// Lee los datos de las paginas para los paneles
ipcRenderer.on('paginas:envia', (event, paginas) => {
    let vistas = document.getElementsByClassName('opc-vista');
    paginas.forEach((pagina) => {
        Array.from(vistas).forEach((vista) => {
            if (vista.dataset.opc === pagina.id) {
                vista.innerHTML = pagina.data;
            }
        });
    });

    setTimeout(() => {
        cargaComponentes();
    }, 100);
});

function cargaComponentes() {
    let div_archivos = document.getElementById('div_visor-archivos');

    // Carga algoritmos
    // algoritmos
    if (typeof SESION.algoritmos !== 'undefined' && SESION.algoritmos) {
        // Obtiene la lista y la limpia
        const select = document.querySelector("#sel_algoritmo_ce");
        select.innerHTML = "";

        // Crea nodo placeholder
        let opcion = document.createElement("option");
        let texto = document.createTextNode(`Algoritmo`);
        opcion.disabled = true;
        opcion.selected = true;
        opcion.value = 'Algoritmo';

        opcion.appendChild(texto);
        select.appendChild(opcion);

        // Agrega los sistemas disponibles
        SESION.algoritmos.forEach((algoritmo) => {
            opcion = document.createElement("option");
            texto = document.createTextNode(algoritmo.nombre);
            opcion.disabled = false;
            opcion.selected = false;
            opcion.value = algoritmo.nombre;
            opcion.appendChild(texto);
            select.appendChild(opcion);
        });
    }

    // Cargar escenario
    visor_archivos.set(div_archivos, ipcRenderer);

    let max_intervalos;
    let sel_algoritmo_ce = document.querySelector('#sel_algoritmo_ce');
    let sel_intervalo_ce = document.querySelector('#sel_intervalo_ce');
    let intervalos_fun = (event) => {
        SESION.algoritmos.forEach((algoritmo) => {
            if (algoritmo.nombre === sel_algoritmo_ce.value) {
                max_intervalos = algoritmo.intervalos;
            }
        })

        // Ingresa los periodos en el combo
        sel_intervalo_ce.innerHTML = "";

        for (let i = 1; i <= max_intervalos; i++) {
            let nodo_opc = document.createElement('option');
            let nodo_txt = document.createTextNode(`${i}`);

            nodo_opc.appendChild(nodo_txt);
            sel_intervalo_ce.appendChild(nodo_opc);
        }
    }

    sel_algoritmo_ce.onmouseup = intervalos_fun;
    sel_algoritmo_ce.onkeyup = intervalos_fun;

    // selecciona el primero
    document.querySelector('.opc-menu').click();
}
