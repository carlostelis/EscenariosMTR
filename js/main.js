const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const Sistemas = require('./sistemas.js');
const sistemas = new Sistemas();
const crearMenu = require('./menuTemplate.js');
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
        minWidth: 1440,
        minHeight: 900,
        webPreferences: {
            devTools: true
        }
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.on('close', () => {
        app.quit();
    });

    win.on('unload', () => {
        app.quit();
    });

    // Carga la página principal
    win.loadURL(`file://${__dirname}/../login.html`);
    setTimeout(() => {
        win.setTitle(`Analizador de escenarios del MTR - Login`);
    }, 2000);

    // Inserta Menú de la ventana
    const mainMenu = Menu.buildFromTemplate(crearMenu(app, win, ipcMain));
    Menu.setApplicationMenu(mainMenu);
});

app.on('will-quit', () => {
    app.exit(0);
    app.quit();
});

// Consulta de sistemas a la base de datos
ipcMain.on('sistemas:solicitar', (event, mensaje) => {
    console.log(`Login cargado, sistemas solicitados...`);

    // conexión con la BD
    sistemas.obtenerSistemas().then((json) => {
        console.log('Sistemas obtenidos');
        console.log(json);

        // Avisa a la página para notificación
        win.webContents.send('bd:sistemas', json);
    }, (jsonError) => {
        console.log(`Error obteniendo los sistemas: ${jsonError.mensaje}`);

        // Avisa a la página para notificación
        win.webContents.send('bd:sistemas', jsonError);
    });
});

ipcMain.on('sesion:entrar', (event, params) => {
    console.log("Cargando pagina");
    setTimeout(() => {
        win.loadURL(`file://${__dirname}/../layout.html`);

        setTimeout(() => {
            win.setTitle(`Analizador de escenarios del MTR - ${params.usuario} / ${params.sistema}`);
        }, 2000);
    }, 1000);
});
