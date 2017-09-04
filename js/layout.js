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
});
