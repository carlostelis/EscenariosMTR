const electron = require('electron');
const{ app, BrowserWindow, Menu, ipcMain } = electron;
const Sistemas = require('./sistemas.js');
const sistemas = new Sistemas();
const crearMenu = require('./menuTemplate.js');
const TO_BD = 2000;
let win;



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



app.on('ready', () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            devTools: true
        }
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    win.loadURL(`file://${__dirname}/../login.html`);
    win.on('close', () => {
        console.log("cerrando");
        app.quit();
    });

    win.on('unload', () => {
        console.log('beforeunload');
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(crearMenu(app, win));
    Menu.setApplicationMenu(mainMenu);
});

app.on('will-quit', () => {
    console.log('Finalizando aplicación');

    app.exit(0);
    app.quit();
    console.log('Debería terminar');
});

ipcMain.on('body:load', (event, mensaje) => {
    console.log(`Login cargado, sistemas solicitados...`);

    pedirSistemas();
});

function pedirSistemas() {
    // conexión con la BD
    sistemas.obtenerSistemas().then((json) => {
        console.log(json);

        // Avisa a la página para notificación
        win.webContents.send('bd:sistemas', {
            estado: true,
            sistemas: json.sistemas
        });
    }, (error) => {
        console.log(`Error obteniendo los sistemas: ${error.mensaje}`);

        // Avisa a la página para notificación
        win.webContents.send('bd:sistemas', {
            estado: false,
            mensaje: error
        });
    });
}
