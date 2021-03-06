// Al ser la misma página, los objetos se
// comparten entre scripts
// electron, ipcRenderer y body definidos en general

// Escucha instruccion para cerrar sesion,
// carga los componentes de login
ipcRenderer.on('sesion:cerrar', (event) => {
    console.log('sesion cerrar');
    body.style.opacity = '0';

    // Deshabilita boton ejecutar
    boton_ejecutarEscenario.disabled = true;

    // Borra valores de etiquetas
    usuario_labels.forEach(label => label.innerhtml = '---');
    sistema_labels.forEach(label => label.innerhtml = '---');
    algoritmo_labels.forEach(label => label.innerhtml = '---');
    fecha_labels.forEach(label => label.innerhtml = '---');
    hora_labels.forEach(label => label.innerhtml = '---');
    intervalo_labels.forEach(label => label.innerhtml = '---');
    folio_labels.forEach(label => label.innerhtml = '---');

    // Elinina objetos de escenarios
    objEscOriginal = null;
    objEscModificado = null;

    // Cierra banner
    banner.ocultar();

    setTimeout(() => {
        divLogin.classList.remove('d-none');
        divLayout.classList.add('d-none');
    }, 1000);

    setTimeout(() => {
        body.style.opacity = '1';
        paginaActual = 'login';

        // Habilita los menus
        menuInfo.classList.add('deshabilitado');
        menuCompara.classList.add('deshabilitado');
        menuModifica.classList.add('deshabilitado');

        // Regresa al menu de carga escenario
        menuCarga.onclick();
    }, 1100);
});

// Respuesta de pagina actual para cierre de sesion
ipcRenderer.on('paginaActual:consulta', (event, json) => {
    ipcRenderer.send('paginaActual:respuesta', paginaActual);
});

// Respuesta de ipcMain con los sistemas consultado
ipcRenderer.on('sistemas:obtenidos', (event, json) => {
    console.log(JSON.stringify(json));

    // Elimina intervalo de cadena de carga
    clearInterval(intervaloCarga);

    // Estado = NO
    if (!json.hasOwnProperty('sistemas') || typeof json.sistemas === 'undefined') {
        console.log('Consulta fallida');
        // Mensaje y botón retry

        banner.error();
        banner.setMensaje('No se encontraron en la configuración de la aplicación');
        banner.mostrarBoton();
        banner.setBoton('Reintentar', () => {
            solicitarSistemas();
        });

        return;
    }

    // Obtiene la lista y la limpia
    const select = document.querySelector("#select_sistema_IS");
    select.innerHTML = "";

    // Crea nodo placeholder
    let opcion = document.createElement("option");
    let texto = document.createTextNode(`Sistema`);
    opcion.disabled = true;
    opcion.selected = true;
    opcion.value = 'Sistema';

    opcion.appendChild(texto);
    select.appendChild(opcion);

    // Agrega los sistemas disponibles
    json.sistemas.forEach((sistema) => {
        opcion = document.createElement("option");
        texto = document.createTextNode(sistema.nombre);
        opcion.disabled = false;
        opcion.selected = false;
        opcion.value = sistema.nombre;
        opcion.appendChild(texto);
        select.appendChild(opcion);
    });

    SESION.config = json;

    // Icono ok
    banner.ok();
    banner.setMensaje('Carga completa');

    mensajeConsola('Inicialización completa');

    // Oculta banner
    setTimeout(() => {
        banner.ocultar();
    }, 1000);
});

// Función para solicitar la lista de sistemas del archivo de configuración
function solicitarSistemas() {
    if (primeraVez) {
        banner.mostrar();
        banner.ocultarBoton();
        banner.ocultarProgreso();
        banner.vistaCompacta(); //

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
        primeraVez = false;
    }
}

// Función para los inputs del login (focus)
function onFocusInput(input, icono) {
    var icono = document.getElementById(icono);
    icono.style.color = "darkblue";
    icono.style.fontWeight = "bold";
}

// Función para los inputs del login (blur)
function lostFocusInput(input, icono) {
    var icono = document.getElementById(icono);
    icono.style.color = "#464a4c";
    icono.style.fontWeight = "normal";
}

// Función que solicita la información de un usuario para autenticar
function solicitarAutenticacion() {
    // Valida nombre
    if (inputNombre.value.trim().length === 0) {
        inputNombre.classList.remove('input-normal');
        inputNombre.classList.add('input-error');
        inputNombre.focus();
        return;
    }
    inputNombre.classList.remove('input-error');
    inputNombre.classList.add('input-normal');

    // Valida password
    if (inputContrasena.value.trim().length === 0) {
        inputContrasena.classList.remove('input-normal');
        inputContrasena.classList.add('input-error');
        inputContrasena.focus();
        return;
    }
    inputContrasena.classList.remove('input-error');
    inputContrasena.classList.add('input-normal');

    // Valida select
    if (selectSistema.value.trim() === 'Sistema' || selectSistema.disabled) {
        selectSistema.classList.remove('input-normal');
        selectSistema.classList.add('input-error');
        selectSistema.focus();
        return;
    }
    selectSistema.classList.remove('input-error');
    selectSistema.classList.add('input-normal');

    // Logear
    ipcRenderer.send('usuario:solicitar', inputNombre.value.trim());

    // Guarda datos de sesion
    SESION.usuario = inputNombre.value.trim();
    SESION.contrasena = inputContrasena.value.trim();
    SESION.sistema = selectSistema.value.trim();

    setTimeout(() => {
        //Muestra banner y Espera respuesta de main
        banner.vistaCompacta(); //
        banner.mostrar();
        banner.ocultarBoton();
        banner.setMensaje('Autenticando');
        banner.cargando();
    }, 50);
}

// Evento que recibe la información del usuario y valida los datos
// ${json} contiene los datos del usuario
ipcRenderer.on('usuario:obtenido', (event, json) => {
    console.log('usuario obtenido');
    console.log(json);
    if (json.estado === true) {
        // Verifica si tiene acceso a los sistemas
        let sis_arr = json.sis_acc.split(',');
        let sis_ok = false;
        sis_arr.forEach((sis) => {
            if (sis.trim() === SESION.sistema) {
                sis_ok = true;
            }
        });

        if (sis_ok === true) {
            if (json.contrasena === SESION.contrasena) {
                banner.ok();
                banner.setMensaje('Autenticación exitosa');
                mensajeConsola(`Usuario Autenticado exitosamente: ${json.nombre} en ${SESION.sistema}`);
                // Guarda el resto de los datos
                SESION.nombre = json.nombre;
                SESION.perfil = json.perfil;

                // Obtiene la carpeta del sistema
                let sistemaObj;
                SESION.config.sistemas.forEach((sistema) => {
                    if (sistema.nombre === SESION.sistema) {
                        SESION.sistemaCarpeta = sistema.carpeta;
                        SESION.sistemaZona = sistema.zona;
                    }
                });

                // Envia a electron la informacion de sesion
                ipcRenderer.send('info:sesion', SESION);

                // Elementos con informacion de sesion
                for (let label of usuario_labels) {
                    label.innerHTML = `Usuario: <b>${SESION.nombre}</b>`;
                }

                for (let label of sistema_labels) {
                    label.innerHTML = `Sistema: <b>${SESION.sistema}</b>`;
                }

                // Deshabilita botones
                boton_ejecutarEscenario.disabled = true;
            	boton_actualizarEscenario.disabled = true;
            	boton_nuevoFolio.disabled = true;
            	boton_resultadoOriginal.disabled = true;
                boton_cargarFolios.disabled = true;

                // Resetea y oculta las tablas
                ocultarTodasMod();
                ocultarTodasInfo();
                ocultarTodasResultados();

                // Escenarios locales en eliminar
                pestanias_eliminar[0].onclick();

                // DEsactiva botones
                boton_cargaEscenarioModActual.disabled = true;
                boton_cargaEscenarioMod.disabled = true;
                boton_guardaBDEscenarioMod.disabled = true;

                // Deshabilita selects de compara escenario
                folios_mod.forEach((folio) => {
                    folio.disabled = true;
                });

                // OCulta colapsos
                colapsos.forEach((colapso) => {
                    colapso.classList.add('inactivo');
                });
                colapsos_res.forEach((colapso) => {
                    colapso.classList.add('inactivo');
                });

                setTimeout(() => {
                    banner.ocultar();
                    body.style.opacity = '0';

                    // Actualiza vista archivos
                    visor_archivos.actualizar();

                    setTimeout(() => {
                        divLogin.classList.add('d-none');
                        divLayout.classList.remove('d-none');
                    }, 1000);

                    setTimeout(() => {
                        body.style.opacity = '1';
                        paginaActual = 'layout';
                    }, 1100);
                }, 1000);

                return;
            } else {
                banner.setMensaje(`Autenticación fallida: contraseña incorrecta para usuario <b>${SESION.usuario}</b>`);
            }
        } else {
            banner.setMensaje(`Autenticación fallida: usuario sin acceso al sistema <b>${SESION.sistema}</b>`);
        }
    } else {
        banner.setMensaje(`Autenticación fallida: ${json.mensaje}`);
    }

    banner.error();
    setTimeout(() => {
        banner.ocultar();
    }, 3000);

    // Reset datos de sesion
    SESION.usuario = '';
    SESION.sistema = '';
    SESION.contrasena = '';
});
