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

    // Cargar escenario
    visor_archivos.set(div_archivos, ipcRenderer);

    let max_periodos;
    let sel_algoritmo_ce = document.querySelector('#sel_algoritmo_ce');
    let sel_periodo_ce = document.querySelector('#sel_periodo_ce');
    let periodos_fun = (event) => {
        SESION.algoritmos.forEach((algoritmo) => {
            if (algoritmo.nombre === sel_algoritmo_ce.value) {
                max_periodos = algoritmo.periodos;
            }
        })

        // Ingresa los periodos en el combo
        sel_periodo_ce.innerHTML = "";

        for (let i = 1; i <= max_periodos; i++) {
            let nodo_opc = document.createElement('option');
            let nodo_txt = document.createTextNode(`${i}`);

            nodo_opc.appendChild(nodo_txt);
            sel_periodo_ce.appendChild(nodo_opc);
        }
    }

    sel_algoritmo_ce.onmouseup = periodos_fun;
    sel_algoritmo_ce.onkeyup = periodos_fun;

    // selecciona el primero
    document.querySelector('.opc-menu').click();
}
