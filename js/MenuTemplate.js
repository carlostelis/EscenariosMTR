
module.exports = function(app, win, dialog) {
    var menuTemplate = [
        {
            label: 'Archivo',
            submenu: [
                {
                    label: 'Cerrar Sesión',
                    accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                    click() {
                        if (!win.webContents.getURL().endsWith('login.html')) {
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
                                setTimeout(() => {
                                    win.loadURL(`file://${__dirname}/../html/login.html`);
                                }, 1500);
                            }
                        } else {
                            console.log('Ya estoy en login, STFU...');
                        }
                    }
                },
                {
                    label: 'Salir',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        var confirmacion = dialog.showMessageBox(win, {
                                type: 'question',
                                buttons: ['Aceptar', 'Cancelar'],
                                title: 'Salir de la aplicación',
                                message: '¿Confirma que desea Salir?'
                            }
                        );
                        console.log(`confirmacion ${confirmacion}`);

                        if (confirmacion === 0) {
                            app.quit();
                        }
                    }
                }
            ]
        },
        {
            label: 'Edición',
            submenu: [
                {role: 'undo', label: 'Deshacer'},
                {role: 'redo', label: 'Rehacer'},
                {type: 'separator'},
                {role: 'cut', label: 'Cortar'},
                {role: 'copy', label: 'Cortar'},
                {role: 'paste', label: 'Pegar'},
                {role: 'selectall', label: 'Seleccionar'}
            ]
        },
        {
            label: 'Vista',
            submenu: [
                {role: 'reload', label: 'Recargar'},
                {role: 'toggledevtools', label: 'Deshacer'},
                {type: 'separator'},
                {role: 'resetzoom', label: 'Zoom original'},
                {role: 'zoomin', label: 'Acercar'},
                {role: 'zoomout', label: 'Alejar'},
                {type: 'separator'},
                {role: 'togglefullscreen', label: 'Pantalla completa'}
            ]
        },
        {
            role: 'window',
            label: 'Ventana',
            submenu: [
                {role: 'minimize', label: 'Minimizar'}
            ]
        },
        {
            role: 'help',
            label: "Ayuda",
            submenu: [
                {
                    label: 'Acerca de...',
                    click () {

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

    //Verifica si la app no está en producción para agregar las herramientas de depuración
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
