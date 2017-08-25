
module.exports = function(app, win, ipcMain) {
    var menuTemplate = [
        {
            label: 'Archivo',
            submenu: [
                {
                    label: 'Cerrar Sesión',
                    accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                    click() {
                        if (!win.webContents.getURL().endsWith('login.html')) {
                            win.webContents.send('sesion:cerrar');
                            setTimeout(() => {
                                win.loadURL(`file://${__dirname}/../login.html`);
                            }, 1500);
                        } else {
                            console.log('Ya estoy en login, STFU...');
                        }
                    }
                },
                {
                    label: 'Salir',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edición',
            submenu: [
                {
                    label: 'Inicio',
                    click() {
                        win.loadURL(`file://${__dirname}/../login.html`);
                    }
                },
                {
                    label: 'Otra',
                    click() {
                        //win.loadURL(`file://${__dirname}/otra.html`);
                    }
                }
            ]
        }
    ];

    // Si es OSX
    // vacío por que OSX secuestra el primer elemento y pone un menú de la app
    if (process.platform === 'darwin') {
        menuTemplate.unshift({});
    }

    // Verifica si la app no está en producción para agregar las herramientas de depuración
    if (process.env.NODE_ENV !== 'production') {
        // 'production'
        // 'development'
        // 'staging'
        // 'test'
        menuTemplate.push({
            label: 'Desarrollador',
            submenu: [
                {
                    label: 'Mostrar DevTools',
                    accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    // Roles pre definidos para hacer más fácil la programación
                    role: 'reload'
                }
            ]
        });
    }

    return menuTemplate;
};
