// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Espera definicion
while (typeof ipcRenderer === 'undefined') {
    console.log('Espera definicion');
}

// Respuesta de pagina actual para cierre de sesion
ipcRenderer.on('paginaActual:consulta', (event, json) => {
    ipcRenderer.send('paginaActual:respuesta', paginaActual);
});

// Respuesta de ipcMain con los sistemas consultado
ipcRenderer.on('sistemas:obtenidos', (event, json) => {
    console.log(JSON.stringify(json));
    console.log(`estado: ${json.estado}`);

    // Elimina intervalo de cadena de carga
    clearInterval(intervaloCarga);

    // Estado = NO
    if (!json.hasOwnProperty('estado') || !json.estado) {
        console.log('Consulta fallida');
        // Mensaje y botón retry
        banner.error();
        banner.setMensaje(json.mensaje);
        banner.mostrarBoton();
        banner.setBoton('Reintentar', () => {
            solicitarSistemas();
        });

        return;
    }

    // Estado = OK, pero no hay sistemas
    if (!json.hasOwnProperty('sistemas')) {
        console.log("No hay sistemas");
        banner.error();
        banner.setMensaje('No se encontraron sistemas disponibles en la base de datos.', () => {
            solicitarSistemas();
        });
        banner.mostrarBoton();
        banner.setBoton('Reintentar');

        return;
    }

    // Obtiene la lista y la limpia
    const select = document.querySelector("select");
    select.innerHTML = "";

    // Crea nodo placeholder
    let opcion = document.createElement("option");
    let texto = document.createTextNode(`\u00A0\u00A0Seleccionar`);
    opcion.disabled = true;
    opcion.selected = true;
    opcion.value = 'Seleccionar';

    opcion.appendChild(texto);
    select.appendChild(opcion);

    // Agrega los sistemas disponibles
    json.sistemas.forEach((sistema) => {
        // sistema disponible, 1 = true, 0 = false
        if (parseInt(sistema.estado) === 1) {
            opcion = document.createElement("option");
            texto = document.createTextNode(`\u00A0\u00A0${sistema.nombre}`);
            opcion.disabled = false;
            opcion.selected = false;
            opcion.value = sistema.nombre;
            opcion.appendChild(texto);
            select.appendChild(opcion);
        }
    });

    // Icono ok
    banner.ok();
    banner.setMensaje('Hecho');

    // Oculta banner
    setTimeout(() => {
        banner.ocultar();
    }, 1500);
});

// habilitar banner
function solicitarSistemas() {
    banner.mostrar();
    banner.ocultarBoton();
    banner.setMensaje(' Inicializando ');
    banner.cargando();

    // Solicitud de sistemas
    ipcRenderer.send('sistemas:solicitar');

    intervaloCarga = setInterval(() => {
        if (banner.getMensaje().length >= 30) {
            banner.setMensaje(' Inicializando ');
        }

        banner.setMensaje('.' + banner.getMensaje() + '.');
    }, 500);
}

// para validacion de entrada
function onFocusInput(input, label) {
    input.respaldo = input.placeholder;
    input.placeholder = "";

    var label = document.getElementById(label);
    label.style.opacity = "1";
    label.style.visibility = "visible";
}

// para validacion de entrada
function lostFocusInput(input, label) {
    input.placeholder = input.respaldo;

    var label = document.getElementById(label);
    label.style.opacity = "0";
    label.style.visibility = "hidden";
}

// para validacion de entrada y acceso a las funciones
function solicitarAutenticacion() {
    // Valida nombre
    const inputNombre = document.querySelector('#input_nombre_IS');
    if (inputNombre.value.trim().length === 0) {
        inputNombre.style.borderColor = 'red';
        inputNombre.focus();
        return;
    }
    inputNombre.style.borderColor = 'white';

    // Valida password
    const inputContrasena = document.querySelector('#input_contrasena_IS');
    if (inputContrasena.value.trim().length === 0) {
        inputContrasena.style.borderColor = 'red';
        inputContrasena.focus();
        return;
    }
    inputContrasena.style.borderColor = 'white';

    // Valida select
    const selectSistema = document.querySelector('#select_sistema_IS');
    if (selectSistema.value.trim() === 'Seleccionar' || selectSistema.disabled) {
        selectSistema.style.borderColor = 'red';
        selectSistema.focus();
        return;
    }
    selectSistema.style.borderColor = 'white';

    // Logear
    ipcRenderer.send('sesion:entrar', {
        usuario: inputNombre.value.trim(),
        contrasena: inputContrasena.value.trim(),
        sistema: selectSistema.value.trim()
    });

    //Muestra banner y Espera respuesta de main
    banner.mostrar();
    banner.ocultarBoton();
    banner.setMensaje('Autenticando');
    banner.cargando();
}

ipcRenderer.on('sesion:aceptada', (event) => {
    banner.ok();
    banner.setMensaje('Autenticación exitosa');

    setTimeout(() => {
        banner.ocultar();
        body.style.opacity = '0';

        setTimeout(() => {
            var divLogin = document.querySelector('#div-login');
            divLogin.classList.add('d-none');

            var divLayout = document.querySelector('#div-layout');
             divLayout.classList.remove('d-none');
        }, 1500);

        setTimeout(() => {
            body.style.opacity = '1';
            paginaActual = 'layout';
        }, 1600);
    }, 1000);
});

ipcRenderer.on('sesion:rechazada', (event, error) => {
    banner.mostrarBoton();
    banner.setMensaje(`Autenticación fallida: ${error}`);
    banner.error();
    banner.setBoton('Aceptar', () => {
        banner.ocultar();
    });
});
