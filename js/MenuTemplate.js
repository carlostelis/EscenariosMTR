// Función que devuelve un template para el menú de la ventana
// ${app} es el objeto app de electron
// ${win} es un objeto BrowserWindow
// ${dialog} es un objeto dialog
module.exports = function(app, win, dialog) {
    var menuTemplate = [
        {
            label: 'Aplicación',
            submenu: [
                {
                    label: 'Cerrar Sesión',
                    accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
                    click() {
                        console.log('cerrar sesion');
                        win.webContents.send('paginaActual:consulta');
                    }
                },
                {
                    label: 'Salir',
                    accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.finalizar();
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
                {role: 'paste', label: 'Pegar'}
            ]
        },
        {
            label: 'Vista',
            submenu: [
                {type: 'separator'},
                {role: 'togglefullscreen', label: 'Pantalla completa'},
                {role: 'minimize', label: 'Minimizar'}
            ]
        },
        // {
        //     role: 'help',
        //     label: "Ayuda",
        //     submenu: [
        //         {
        //             label: 'Acerca de...',
        //             click () {
        //
        //             }
        //         }
        //     ]
        // }
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
                {role: 'reload', label: 'Recargar'},
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
