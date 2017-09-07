const electron = require('electron');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain, remote, dialog } = electron;
const Sistemas = require('./sistemas.js');
const sistemas = new Sistemas();
const crearMenu = require('./menuTemplate.js');
const ListaArchivos = require('./ListaArchivos.js');
const listaArchivos = new ListaArchivos('C:\\AppAnalizadorEscenarios');

const TO_BD = 2000;
let win;


/////////          Para la generacion del instalador             //////////////

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');
    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus
            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};

////////////////////////////////////////////////////////////////////////////////

/***********************/
/*       IPC MAIN      */
/***********************/

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1440,
        height: 900,
        // minWidth: 1440,
        // minHeight: 900,
        webPreferences: {
            devTools: true
        }
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('close', (event) => {
        if (!app.finalizar()) {
            event.preventDefault();
        }
    });

    // Carga la página principal
    // Solo se cargará una vez y el contenido se administrará
    // de manera dinamica
    win.loadURL(`file://${__dirname}/../html/index.html`);
    setTimeout(() => {
        win.setTitle(`Analizador de escenarios del MTR - Login`);
    }, 2000);

    // Inserta Menú de la ventana
    const mainMenu = Menu.buildFromTemplate(crearMenu(app, win, dialog));
    Menu.setApplicationMenu(mainMenu);

    // listaArchivos.html().then((res) => {
    //     //console.log(JSON.stringify(res));
    //     console.log(res);
    // }, (err) => {
    //     //console.log(JSON.stringify(err));
    //     console.log(err);
    // });
});

// Función para finalizar, se invoca al cerrar la ventana y al cerrar sesion
// desde el menu
app.finalizar = function () {
    var confirmacion = dialog.showMessageBox(win, {
            type: 'question',
            buttons: ['Aceptar', 'Cancelar'],
            title: 'Salir de la aplicación',
            message: '¿Confirma que desea Salir?'
        }
    );
    console.log(`confirmacion ${confirmacion}`);

    if (confirmacion === 0) {
        app.exit();
    }

    return false;
}

app.on('will-quit', () => {
    app.exit(0);
    app.quit();
});

// Consulta de sistemas a la base de datos
ipcMain.on('sistemas:solicitar', (event, mensaje) => {
    console.log(`Login cargado, sistemas solicitados...`);
    win.setTitle(`Analizador de escenarios del MTR - Login`);

    // Sin red cenace
    // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    // return;



    // conexión con la BD
    sistemas.obtenerSistemas().then((json) => {
        console.log('Sistemas obtenidos');
        console.log(json);

        // Avisa a la página para notificación
        win.webContents.send('sistemas:obtenidos', json);
        // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    }, (jsonError) => {
        console.log(`Error obteniendo los sistemas: ${jsonError.mensaje}`);

        // Avisa a la página para notificación
        win.webContents.send('sistemas:obtenidos', jsonError);
        // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    });
});

// Leer de disco los docs html para las funciones
ipcMain.on('paginas:leer', (event) => {
    let paginas = [];

    paginas.push({
        id: '1',
        data: fs.readFileSync('./html/CargaEscenario.html', 'utf8')
    });

    win.webContents.send('paginas:envia', paginas);
});

// Iniciar sesion
ipcMain.on('sesion:entrar', (event, params) => {
    // Verifica credenciales
    console.log('Inicio de sesion');
    console.log(params);
    if (params.usuario === 'carlos' && params.contrasena === 'asd') {
        console.log("Credenciales válidas");

        setTimeout(() => {
            win.webContents.send('sesion:aceptada');
            win.setTitle(`Analizador de escenarios del MTR - ${params.usuario} / ${params.sistema}`);
        }, 1000);
    } else {
        setTimeout(() => {
            console.log('rechazada');
            win.webContents.send('sesion:rechazada', 'Credenciales inválidas');
        }, 3000);
    }
});

// Consultar si es login o layout para cierre de sesion
ipcMain.on('paginaActual:respuesta', (event, pagina) => {
    // ya esta en login
    if (pagina === 'login') {
        // nada
        console.log('Ya estoy en login, STFU...');
    } else {
        var confirmacion = dialog.showMessageBox(win, {
                type: 'question',
                buttons: ['Aceptar', 'Cancelar'],
                title: 'Cerrar sesión',
                message: '¿Confirma que desea cerrar sesión?'
            }
        );
        console.log(`confirmacion ${confirmacion}`);

        if (confirmacion === 0) {
            win.webContents.send('sesion:cerrar');
        }
    }
});

// Lista de archivos de directorio
ipcMain.on('listaHtml:solicita', () => {
    listaArchivos.update().then((res) => {
        console.log("Envia lista archivos");
        win.webContents.send('listaHtml:recibe', res);
    }, (err) => {
        //console.log(err);
        console.log("Error lista archivos " + err);
        win.webContents.send('listaHtml:recibe', err);
    });
});
