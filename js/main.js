const electron = require('electron');
const fs = require('fs');
const { app, BrowserWindow, Menu, ipcMain, remote, dialog } = electron;
const Comandos = require('./Comandos.js');
const comandos = new Comandos();
const crearMenu = require('./menuTemplate.js');
const ListaArchivos = require('./ListaArchivos.js');
const listaArchivos = new ListaArchivos('C:\\AppAnalizadorEscenarios');
const config = require('./config.js');
const path = require('path');
const FTP = require('./FTP.js');
const targz = require('tar.gz');
const Escenario = require('./Escenario.js');
const escenario = new Escenario();

const TO_BD = 2000;
let win;

let ftp = new FTP({
    host: config.exalogic.host,
    user: config.exalogic.user,
    password: config.exalogic.password
}, config.local.escenarios);

let SESION;


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
});

// Función para finalizar, se invoca al cerrar la ventana y al cerrar sesion
// desde el menu
app.finalizar = function () {
    var confirmacion = dialog.showMessageBox(win, {
            type: 'question',
            buttons: ['Aceptar', 'Cancelar'],
            title: 'Salir de la aplicación',
            message: '¿Confirma que desea Salir?',
            cancelId: 1
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
ipcMain.on('sistemas:solicitar', (event) => {
    console.log(`Login cargado, sistemas solicitados...`);
    win.setTitle(`Analizador de escenarios del MTR - Login`);

    // Sin red cenace
    // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    // return;

    // Ahora los sistemas se toman local
    win.webContents.send('sistemas:obtenidos', {
        sistemas: config.sistemas,
        algoritmos: config.algoritmos,
        exalogic: config.exalogic
    });
});

ipcMain.on('usuario:solicitar', (event, usuario) => {
    console.log(`Solicitando usuario ${usuario}`);

    // Sin red cenace
    // win.webContents.send('usuario:obtenido', {caracteristicas: 'Usuario offline', sis_acc: 'BCA,BCS,SIN', nombre:'Carlos Telis', perfil: 'Super Usuario', contrasena:'asdasd', estado:true, Mensaje: 'Consulta realizada correctamente'});
    // return;

    // conexión con la BD
    comandos.obtenerUsuario(usuario).then((json) => {
        console.log('Usuario consultado');
        console.log(json);

        // Avisa a la página para notificación
        win.webContents.send('usuario:obtenido', json);
        // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    }, (jsonError) => {
        console.log(`Error obteniendo usuario: ${jsonError.mensaje}`);

        // Avisa a la página para notificación
        win.webContents.send('usuario:obtenido', jsonError);
        // win.webContents.send('sistemas:obtenidos', {estado:true, sistemas:[{nombre:'BCA', estado:1}]});
    });
});

// Leer de disco los docs html para las funciones
ipcMain.on('paginas:leer', (event) => {
    let paginas = [];
    let ruta = path.join(__dirname, '../html/CargaEscenario.html');
    console.log(ruta);
    paginas.push({
        id: '1',
        data: fs.readFileSync(ruta, 'utf8')
    });

    ruta = path.join(__dirname, '../html/InfoEscenario.html');
    console.log(ruta);
    paginas.push({
        id: '2',
        data: fs.readFileSync(ruta, 'utf8')
    });

    win.webContents.send('paginas:envia', paginas);
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
                message: '¿Confirma que desea cerrar sesión?',
                cancelId: 1
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

// Lista de archivos de directorio
ipcMain.on('info:sesion', (event, info) => {
    if (typeof info !== 'undefined') {
        SESION = info;
        console.log('Informacion de sesion actualizada en electron');
        console.log(SESION);
    }
});

// Consulta de UTC
ipcMain.on('utc:consulta', (event, fecha, zona) => {
    console.log(fecha, zona);
    comandos.obtenerUTC(fecha, zona).then((json) => {
        console.log("UTC obtenido", json.utc);
        win.webContents.send('utc:respuesta', json);
    }, (json) => {
        console.log("Error obteniendo UTC", json.mensaje);
        win.webContents.send('utc:respuesta', json);
    });
});

ipcMain.on('directorio:descarga', (event, data) => {
    let dirRemoto = data.dirRemoto;
    let replace = path.join(SESION.config.exalogic.base, SESION.sistemaCarpeta, data.algoritmo, 'datosh').replace(new RegExp('\\' + path.sep, 'g'), '/'); //config.local.reemplazo;
    let rutaLocal = path.join(config.local.escenarios, data.pathLocal);

    let listaDir = [];

    let rutaEscenario = path.normalize(dirRemoto.replace(replace, rutaLocal)).trim();
    let archivoDescargado = path.join(rutaEscenario, '.descargado');

    console.log('Descargado: ', archivoDescargado);
    if (fs.existsSync(archivoDescargado)) {
        console.log('Escenario no requiere descarga');
        win.webContents.send('directorio:descargado', {estado:true, rutaLocal:rutaEscenario});
        return;
    }

    console.log('Descarga: ', dirRemoto, replace, rutaLocal);
    dirRemoto = dirRemoto.trim();
    ftp.conectar().then(() => {
        ftp.obtenerListaDirectorio(dirRemoto, replace, rutaLocal, listaDir).then(() => {
            if (listaDir.length === 0) {
                console.log(`El directorio no existe o esta vacio`);
                win.webContents.send('directorio:descargado', {estado: true, error: `El escenario <b>${path.basename(dirRemoto)}</b> no existe en carpeta, buscando tar.gz...`});

                let dia = data.dia;
                let anio = data.anio;
                let mes = data.mes;
                let id_escenario = data.id_escenario;

                // buscar tar.gz
                let dirRemotoAlt = path.dirname(path.dirname(dirRemoto)); //dirRemoto.slice(0, dirRemoto.length - 20);
                console.log('Buscar en: ', dirRemotoAlt, 'dia', dia);

                let listaAlt = [];
                let archivoTar = '';

                try {
                    ftp.obtenerListaArchivosDir(dirRemotoAlt, replace, rutaLocal, listaAlt).then(() => {
                        listaAlt.forEach((item) => {
                            let rango = item.nombre.slice(0, item.nombre.indexOf('_')).split('-');
                            let limInf = parseInt(rango[0], 10);
                            let limSup = parseInt(rango[1], 10);
                            console.log(' + ', item.nombre, ' de ', limInf, 'a', limSup);

                            if (dia >= limInf && dia <= limSup) {
                                archivoTar = item.nombre;
                                console.log('ArchivoTAR', archivoTar);
                            }
                        });

                        if (archivoTar !== '') {
                            console.log('Descargar: ', archivoTar);
                            win.webContents.send('directorio:descargado', {estado: true, error: `Descargando escenarios comprimidos <b>${archivoTar}</b>`});

                            // Descarga tar
                            let obj = {
                                rutaRemota: path.join(dirRemotoAlt, archivoTar),
                                rutaLocal: path.normalize(path.join(rutaLocal, anio, mes, archivoTar))
                            };
                            console.log('>>>>', obj.rutaRemota, obj.rutaLocal);
                            ftp.obtenerTamanoArchivoFTP(obj).then(() => {
                                console.log(obj);

                                let progresoAnterior = 0;
                                let progreso = 0;
                                let interval = setInterval(() => {
                                    progresoAnterior = progreso;
                                    progreso = ftp.getProgresoArchivo();

                                    if ((progreso - progresoAnterior) >= 1) {
                                        console.log(' > Progreso: ', progreso.toFixed(2));
                                        win.webContents.send('directorio:progreso', {progreso:progreso, mensaje:`Descargando archivo comprimido de escenarios <b>${archivoTar}</b>`});
                                    }
                                }, 1000);

                                ftp.descargarArchivoFTP(obj).then(() => {
                                    console.log('listo');
                                    clearInterval(interval);
                                    win.webContents.send('directorio:progreso', {progreso:100, mensaje:`Descargando archivo comprimido de escenarios <b>${archivoTar}</b>`});

                                    // Espera de 1s para reflejar porcentaje
                                    setTimeout(() => {
                                        console.log('Descomprimiendo');
                                        win.webContents.send('directorio:descargado', {estado:true, error:`Descomprimiendo <b>${archivoTar}</b>`, targz:true});
                                        let carpeta = path.dirname(obj.rutaLocal);
                                        console.log('archivo', obj.rutaLocal, 'carpeta', carpeta);
                                        try {
                                            // descompresión a través de Java

                                            console.log('+++++', obj.rutaLocal, dia, id_escenario);
                                            comandos.descomprimir(obj.rutaLocal, dia, id_escenario, carpeta).then((res) => {
                                                console.log('res', res);
                                                if (res.estado) {
                                                    console.log(res.mensaje);
                                                    // Marca el escenario como descargado
                                                    listaArchivos.marcarDescargado(res.rutaLocal);
                                                } else {
                                                    console.log('Error al descomprimir archivo');
                                                }
                                                // Elimina el archivo comprimido
                                                try {
                                                    fs.unlink(obj.rutaLocal, () => {
                                                        console.log(`Archivo ${obj.rutaLocal} eliminado correctamente`);
                                                    });
                                                } catch (err) {
                                                    console.log('Error borrando archivo', err.message);
                                                }

                                                // Envia respuesta
                                                win.webContents.send('directorio:descargado', res);
                                                ftp.desconectar();
                                            });
                                        } catch (err) {
                                            console.log("cacha descomprime ", err);
                                        }
                                    }, 1000);
                                }, (err) => {
                                    console.log('**Error**: ', err);
                                    clearInterval(interval);
                                    ftp.desconectar();
                                });
                            }, (err) => {
                                console.log('**Error**', '(tamaño archivo tar)', err.message);
                                ftp.desconectar();
                            });
                        } else {
                            win.webContents.send('directorio:descargado', {estado:false, error: 'Escenario no encontrado'});
                            ftp.desconectar();
                        }
                    }, () => {
                        console.log('**Error**', '(tamaño archivo tar)', err.message);
                        win.webContents.send('directorio:descargado', {estado:false, error: 'Error durante la conexión con el servidor FTP'});

                        ftp.desconectar();
                    });
                } catch (err) {
                    console.log('cachado', err);
                }
            } else {
                let interval = setInterval(() => {
                    let progreso = ftp.getProgresoLista();
                    console.log(' > Progreso: ', progreso.toFixed(2));
                    win.webContents.send('directorio:progreso', {progreso:progreso, mensaje:'Descargando directorio de escenario'});
                }, 1000);

                ftp.descargarDirectorioFTP(listaDir).then(() => {
                    console.log('Archivos descargados correctamente', rutaEscenario);
                    clearInterval(interval);
                    ftp.desconectar();

                    // Marca el escenario como descargado
                    listaArchivos.marcarDescargado(rutaEscenario);

                    win.webContents.send('directorio:descargado', {estado:true, rutaLocal:rutaEscenario});
                }, () => {
                    console.log('error descargando archivos');
                    clearInterval(interval);
                    ftp.desconectar();
                    win.webContents.send('directorio:descargado', {estado: false, error: 'Error en la conexión durante la descarga de los archivos del escenario.'});
                });
            }
        }, () => {
            console.log('error obteniendo lista');
            ftp.desconectar();
            win.webContents.send('directorio:descargado', {estado: false, error: 'Error en la conexión durante la consulta del escenario por directorio.'});
        });
    }, () => {
        win.webContents.send('directorio:descargado', {estado: false, error: 'No fue posible conectar con el servidor FTP'});
        console.log('Error conectando');
    });
});

ipcMain.on('escenario:leer', (event, ruta_escenario, algoritmo) => {
    escenario.parseEscenario(ruta_escenario, algoritmo).then((obj) => {
        win.webContents.send('escenario:leido', obj);
    }, () => {
        console.log('Error leyendo los archivos');
    });
});
