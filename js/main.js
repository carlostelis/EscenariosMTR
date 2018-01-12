const { app, BrowserWindow, Menu, ipcMain, remote, dialog } = require('electron');;

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

const rm = require('rimraf');
const fs = require('fs');
const fse = require('fs-extra');
const moment = require('moment');
const Comandos = require('./Comandos.js');
const crearMenu = require('./menuTemplate.js');
const ListaArchivos = require('./ListaArchivos.js');
const config = require('./config.js');
const path = require('path');
const FTP = require('./FTP.js');
const Escenario = require('./Escenario.js');
const BitacoraUsuario = require('./BitacoraUsuario.js');

const TO_PROC_SIN = 150;
const TO_PROC_BCAS = 20;

// Objetos
const comandos = new Comandos();
const listaArchivos = new ListaArchivos('C:\\AppAnalizadorEscenarios');
const escenario = new Escenario();
const bitacoraUsuario = new BitacoraUsuario();
let ftp = new FTP({
    host: config.exalogic.host,
    user: config.exalogic.user,
    password: config.exalogic.password
}, config.local.escenarios);

let win;
let winAdmin;
let res_eje;
let objEscenario;

let SESION;

// Versión de la aplicacion
// process.env.NODE_ENV = 'production';

// Si es la primera ejecución se cierra (para instalador winstaller)
if (process.env.NODE_ENV === 'production' && !fs.existsSync('first')) {
    fs.appendFile('first', '', 'utf8', (err) => {});
    app.exit();
}

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

    win.on('close', (event) => {
        if (!app.finalizar()) {
            event.preventDefault();
        }
    });

    // Establece path
    let ruta_path;
    if (process.env.NODE_ENV === 'production') {
        ruta_path = path.join(process.cwd(), 'resources', 'app', 'algoritmo', 'chtpc', 'ILOG');
    } else {
        ruta_path = path.join(process.cwd(), 'algoritmo', 'chtpc', 'ILOG');
    }

    if (!process.env.PATH.includes(ruta_path)) {
        process.env.PATH = `${process.env.PATH};${ruta_path}`
    }

    // Carga la página principal
    // Solo se cargará una vez y el contenido se administrará
    // de manera dinamica
    win.loadURL(`file://${__dirname}/../html/index.html`);
    setTimeout(() => {
        win.setTitle(`Analizador de Escenarios del MTR`);
    }, 2000);

    // Inserta Menú de la ventana
    const mainMenu = Menu.buildFromTemplate(crearMenu(app, win, dialog));
    Menu.setApplicationMenu(mainMenu);

    // Verifica los directorios
    listaArchivos.init();

    if (process.env.NODE_ENV !== 'production') {
        win.toggleDevTools();
    }
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

// Bitacora de usuario
ipcMain.on('bitacora:escribir', (event, mensaje) => {
    bitacoraUsuario.escribir(mensaje);
});

// Consulta de sistemas a la base de datos
ipcMain.on('sistemas:solicitar', (event) => {
    console.log(`Login cargado, sistemas solicitados...`);
    win.setTitle(`Analizador de escenarios del MTR - Login`);

    // Ahora los sistemas se toman local
    win.webContents.send('sistemas:obtenidos', {
        sistemas: config.sistemas,
        algoritmos: config.algoritmos,
        exalogic: config.exalogic,
        exalogicPruebas: config.exalogicPruebas
    });
});

ipcMain.on('usuario:solicitar', (event, usuario) => {
    console.log(`Solicitando usuario ${usuario}`);

    // Sin red cenace
    /* * * * * * * * * * * */
    /* VERSION TEST URIEL */
    /* * * * * * * * * * * */
    // setTimeout(() => {
    //     console.log('manda');
    //     win.webContents.send('usuario:obtenido', {caracteristicas: 'Usuario offline', sis_acc: 'BCA,BCS,SIN', nombre:'URIEL LEZAMA', perfil: 'Usuario', contrasena:'LEZAMA', estado:true, Mensaje: 'Consulta realizada correctamente'});
    // }, 2000);
    //
    // return;

    setTimeout(() => {
        win.webContents.send('usuario:obtenido', {caracteristicas: 'Usuario offline', sis_acc: 'BCA,BCS,SIN', nombre:'USUARIO TEST', perfil: 'Usuario', contrasena:'test', estado:true, Mensaje: 'Consulta realizada correctamente'});
    }, 1000);

    return;

    // conexión con la BD
    comandos.obtenerUsuario(usuario).then((json) => {
        console.log('Usuario consultado');
        console.log(json);

        // Avisa a la página para notificación
        win.webContents.send('usuario:obtenido', json);
    }, (jsonError) => {
        console.log(`Error obteniendo usuario: ${jsonError.mensaje}`);

        // Avisa a la página para notificación
        win.webContents.send('usuario:obtenido', jsonError);
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

    ruta = path.join(__dirname, '../html/ComparaEscenario.html');
    console.log(ruta);
    paginas.push({
        id: '3',
        data: fs.readFileSync(ruta, 'utf8')
    });

    ruta = path.join(__dirname, '../html/Modificados.html');
    console.log(ruta);
    paginas.push({
        id: '4',
        data: fs.readFileSync(ruta, 'utf8')
    });

    ruta = path.join(__dirname, '../html/EliminarEscenario.html');
    console.log(ruta);
    paginas.push({
        id: '5',
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
    console.log('Solicita lista archivos');
    listaArchivos.update().then((res) => {
        console.log("Envia lista archivos");
        win.webContents.send('listaHtml:recibe', res);
    }, (err) => {
        //console.log(err);
        console.log("Error lista archivos " + err);
        win.webContents.send('listaHtml:recibe', err);
    });
});

ipcMain.on('listaHtml:solicitaDirectorio', (event, directorio) => {
    console.log("Envia lista archivos", directorio);
    win.webContents.send('listaHtml:recibeDirectorio', listaArchivos.leerDirectorio(directorio));
});

ipcMain.on('listaHtml:solicitaBase', () => {
    console.log("Envia lista archivos");
    win.webContents.send('listaHtml:recibeBase', listaArchivos.generarBase());
});

// Lista de archivos de directorio
ipcMain.on('info:sesion', (event, info) => {
    if (typeof info !== 'undefined') {
        SESION = info;
        console.log('Informacion de sesion actualizada en electron');
        console.log(SESION);

        if (SESION.sistema === 'BCS') {
            ftp = new FTP({
                host: config.exalogicPruebas.host,
                user: config.exalogicPruebas.user,
                password: config.exalogicPruebas.password
            }, config.local.escenarios);
        }
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

ipcMain.on('bitacora:inicializa', (event, ruta) => {
    console.log('Inicializando bitácora de escenario:', ruta);
    bitacoraUsuario.init(ruta);
});

ipcMain.on('directorio:descarga', (event, data) => {
    let dirRemoto = data.dirRemoto;
    let replace;

    /* * * * * * * * * * * */
    /* VERSION TEST URIEL */
    /* * * * * * * * * * * */
    if (SESION.sistema === 'BCS') {
        replace = path.join(SESION.config.exalogicPruebas.base, SESION.sistemaCarpeta, data.algoritmo, 'datosh').replace(new RegExp('\\' + path.sep, 'g'), '/');
    } else {
        replace = path.join(SESION.config.exalogic.base, SESION.sistemaCarpeta, data.algoritmo, 'datosh').replace(new RegExp('\\' + path.sep, 'g'), '/');
    }
     //config.local.reemplazo;
    let rutaLocal = path.join(config.local.escenarios, data.pathLocal);

    let listaDir = [];

    let rutaEscenario = path.normalize(dirRemoto.replace(replace, rutaLocal)).trim();
    let archivoDescargado = path.join(rutaEscenario, '.descargado');

    console.log('Descargado: ', archivoDescargado);
    if (fs.existsSync(archivoDescargado)) {
        console.log('Escenario no requiere descarga');
        win.webContents.send('directorio:descargado', {estado:true, rutaLocal:rutaEscenario, flagLocal:true});
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
                            win.webContents.send('directorio:descargado', {estado: true, error: `Descargando escenarios comprimidos<br><font style="color:lightgreen;">${archivoTar}</font>`});

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
                                console.log('interval');
                                let interval = setInterval(() => {
                                    //progresoAnterior = progreso;
                                    progreso = ftp.getProgresoArchivo();
                                    // console.log('dif', progreso, progresoAnterior, (progreso - progresoAnterior));
                                    if ((progreso - progresoAnterior) >= 1 || progresoAnterior === 0) {
                                        // console.log(' > Progreso: ', progreso.toFixed(2));
                                        win.webContents.send('directorio:progreso', {progreso:progreso, mensaje:`Descargando archivo comprimido de escenarios:<br><font style="color:lightgreen;">${archivoTar}</font>`});
                                        progresoAnterior = progreso;
                                    }
                                }, 1000);

                                console.log('Manda descarga');
                                ftp.descargarArchivoFTP(obj).then(() => {
                                    clearInterval(interval);
                                    win.webContents.send('directorio:progreso', {progreso:100, mensaje:`Descargando archivo comprimido de escenarios: <br><font style="color:lightgreen;">${archivoTar}</font>`});

                                    // Espera de 1s para reflejar porcentaje
                                    setTimeout(() => {
                                        console.log('Descomprimiendo');
                                        win.webContents.send('directorio:descargado', {estado:true, error:`Descomprimiendo<br><font style="color:lightgreen;">${archivoTar}</font>`, targz:true});
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

ipcMain.on('algoritmo:descarga', (event, ruta_escenario, algoritmo, evento) => {
    let alg;
    if (algoritmo === 'dersi') {
        alg = 'DERSI';
    } else {
        alg = 'DERS';
    }

    let eje = `${alg}.exe`;
    console.log(ruta_escenario, algoritmo);
    console.log('evento', evento);
    let ruta_algoritmo_local = path.join(ruta_escenario, eje);
    if (fs.existsSync(ruta_algoritmo_local)) {
        console.log('Algoritmo ya existe local');
        win.webContents.send(evento, {estado:true});
        return;
    }

    console.log('No existe el algoritmo local', ruta_algoritmo_local);

    /* * * * * * * * * * * */
    /* VERSION TEST URIEL */
    /* * * * * * * * * * * */
    let carpeta_algoritmo;
    if (SESION.sistema === 'BCS') {
        carpeta_algoritmo = path.join(`${SESION.config.exalogicPruebas.base}`, `${SESION.sistemaCarpeta}`, SESION.config.exalogic.algoritmos, 'WINDOWS', SESION.sistema, alg);
    } else {
        carpeta_algoritmo = path.join(`${SESION.config.exalogic.base}`, `${SESION.sistemaCarpeta}`, SESION.config.exalogic.algoritmos, 'WINDOWS', SESION.sistema, alg);
    }

    console.log('Carpeta algoritmo', carpeta_algoritmo);

    // Obtiene la lista de directorios
    let lista_rangos = [];
    // Obtiene la fecha del escenario
    let id_escenario = path.basename(ruta_escenario);
    let fecha = {
        dia: id_escenario.substr(6, 2),
        mes: id_escenario.substr(4, 2),
        anio: id_escenario.substr(0, 4),
        hora: id_escenario.substr(8, 2),
        int: id_escenario.substr(10, 2)
    };

    if (algoritmo === 'dersi') {
        fecha.min = `${((fecha.int - 1) * 5)}`;
    } else {
        fecha.min = `${((fecha.int - 1) * 15)}`;
    }

    if (fecha.min.length < 2) {
        fecha.min = `0${fecha.min}`;
    }

    let fecha_str = `${fecha.anio}-${fecha.mes}-${fecha.dia}`;
    fecha_str += `T${fecha.hora}:${fecha.min}:00`;
    console.log(fecha);
    console.log(fecha_str);

    ftp.conectar().then(() => {
        ftp.obtenerListaDirectorioSimple(carpeta_algoritmo).then((lista) => {
            lista.forEach((item) => {
                console.log('item algoritmo', item.name);
                let rango = parseFechaAlgoritmo(item.name);
                console.log('Rango', rango);
                // Si cualquier valor viene mal, no era una carpeta valida
                if (typeof rango.inicio !== 'undefined' && rango.inicio !== null && typeof rango.fin !== 'undefined' && rango.fin !== null) {
                    lista_rangos.push(rango);
                }
            });

            // Busca el caso
            let rango_valido = null;
            for (let rango of lista_rangos) {
                let inicio = rango.inicio;
                let fin = rango.fin;
                let inicio_str = `${inicio.anio}-${inicio.mes}-${inicio.dia}`;
                inicio_str += `T${inicio.hora}:${inicio.min}:00`;
                let fin_str = `${fin.anio}-${fin.mes}-${fin.dia}`;
                fin_str += `T${fin.hora}:${fin.min}:00`;

                console.log('>>',inicio_str, fin_str);
                if (moment(fecha_str).isBetween(inicio_str, fin_str)) {
                    rango_valido = rango;
                    break;
                }
            }

            if (rango_valido !== null) {
                // Complementa la ruta
                carpeta_algoritmo = path.join(carpeta_algoritmo, rango_valido.id, eje);
                console.log('Descargando algoritmo: ', carpeta_algoritmo);

                // Descarga el ejecutable DERS/DERSI.exe
                ftp.descargarArchivoFTPSimple(carpeta_algoritmo, ruta_algoritmo_local).then(() => {
                    console.log('Algoritmo descargado correctamente');
                    ftp.desconectar();
                    win.webContents.send(evento, {estado:true});
                }, (err) => {
                    console.log('Error descargando algoritmo', {estado:false, error:err});
                    win.webContents.send(evento,  {estado:false, error:err});
                    ftp.desconectar();
                });
            } else {
                console.log('No se encontro una fecha de algoritmo valida');
                win.webContents.send(evento, {estado:false, error:'No se encuentró un algoritmo para el escenario'});
                ftp.desconectar();
            }
        }, (err) => {
            console.log('Error', err);
            console.log('No se encontro una fecha de algoritmo valida');
            win.webContents.send(evento, {estado:false, error:'No se encuentró un algoritmo para el escenario'});
            ftp.desconectar();
        });
    }, () => {
        console.log('Error conectando');
        console.log('No se encontro una fecha de algoritmo valida');
        win.webContents.send(evento, {estado:false, error:'No se encuentró un algoritmo para el escenario'});
        ftp.desconectar();
    });
});

function parseFechaAlgoritmo(id) {
    let inicio = {};
    let fin = {};

    let [inicio_str, fin_str] = id.split('_');
    console.log('Fecha alg', inicio_str, fin_str);
    if (inicio_str.length >= 12) {
        inicio.dia = inicio_str.substr(0, 2);
        inicio.mes = inicio_str.substr(2, 2);
        inicio.anio = inicio_str.substr(4, 4);
        inicio.hora = inicio_str.substr(8, 2);
        inicio.min = inicio_str.substr(10, 2);
    } else {
        console.log('inicio sin long 12');
        inicio = null;
    }

    if (fin_str.length >= 12) {
        fin.dia = fin_str.substr(0, 2);
        fin.mes = fin_str.substr(2, 2);
        fin.anio = fin_str.substr(4, 4);
        fin.hora = fin_str.substr(8, 2);
        fin.min = fin_str.substr(10, 2);
    } else if (fin_str.length === 4) {
        fin.dia = '01';
        fin.mes = '01';
        fin.anio = fin_str.substr(0, 4);
        fin.hora = '00';
        fin.min = '00';
    } else {
        console.log('Fin sin long 12 ni 14');
        fin = null;
    }

    return {id:id, inicio: inicio, fin: fin};
}

ipcMain.on('escenario_completo:leer', (event, ruta_escenario, algoritmo, folio) => {
    escenario.parseEscenario(ruta_escenario, algoritmo).then((obj) => {
        let objetoEntradas = {
            ruta: obj.ruta,
            algoritmo: obj.algoritmo,
            numArchivos: obj.numArchivos,
            lista: []
        };

        if (typeof folio !== 'undefined') {
            objetoEntradas.folio = folio;
            objetoEntradas.rutaOriginal = ruta_escenario.replace('escenario_modificado', 'escenario_original').split(folio)[0];
        }

        console.log('Manda contenedor archivos de entrada', obj.numArchivos);
        win.webContents.send('escenario_completo:leido', objetoEntradas);

        // Guarda el objeto para modificaciones
        objEscenario = obj;

        // Dosifica el envio
        let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
        for (let i = 0; i < obj.lista.length; i++) {
            let factor_adicional = parseInt(obj.lista[i].filas.length / 1000) * 100;
            setTimeout(() => {
                console.log('Envia archivo', obj.lista[i].archivo, factor_to, factor_adicional);
                win.webContents.send('escenario_completo:archivo_leido', obj.lista[i]);
            }, (i * factor_to) + factor_adicional);
        }
    }, () => {
        console.log('Error leyendo los archivos');
    });
});

ipcMain.on('escenario_resultados:leer', (event, ruta_escenario, algoritmo) => {
    escenario.parseEscenario(ruta_escenario, algoritmo, 'RESULTADOS').then((obj) => {
        let objetoEntradas = {
            ruta: obj.ruta,
            algoritmo: obj.algoritmo,
            numArchivos: obj.numArchivos,
            lista: []
        };
        console.log('Manda contenedor archivos de entrada', obj.numArchivos);
        win.webContents.send('escenario_resultados:leido', objetoEntradas);

        // Dosifica el envio
        let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
        for (let i = 0; i < obj.lista.length; i++) {
            let factor_adicional = parseInt(obj.lista[i].filas.length / 1000) * 100;
            setTimeout(() => {
                console.log('Envia archivo', obj.lista[i].archivo, factor_to, factor_adicional);
                win.webContents.send('escenario_resultados:archivo_leido', obj.lista[i]);
            }, (i * factor_to) + factor_adicional);
        }
    }, () => {
        console.log('Error leyendo los archivos');
    });
});

ipcMain.on('escenario_resultados:leerComparar', (event, ruta_escenario_A, ruta_escenario_B, algoritmo) => {
    // LEe el escenario A
    console.log('--------');
    escenario.parseEscenario(ruta_escenario_A, algoritmo, 'RESULTADOS').then((objA) => {
        // LEe el escenario B
        escenario.parseEscenario(ruta_escenario_B, algoritmo, 'RESULTADOS').then((objB) => {
            // Realiza comparacion
            escenario.compararResultados(objA, objB).then(() => {
                // Manda objetos contenedores
                let objetoA = {
                    ruta: objA.ruta,
                    algoritmo: objA.algoritmo,
                    numArchivos: objA.numArchivos,
                    id: path.basename(objA.ruta),
                    lista: []
                };

                // Manda objeto A
                let objetoB = {
                    ruta: objB.ruta,
                    algoritmo: objB.algoritmo,
                    numArchivos: objB.numArchivos,
                    id: path.basename(objB.ruta),
                    lista: []
                };

                console.log('Manda contenedores archivos de resultados comparados', objA.numArchivos , objB.numArchivos);
                win.webContents.send('escenario_resultados:leidoComparado', objetoA, objetoB);

                // Espera para segurar la recepción del contenedor
                setTimeout(() => {
                    new Promise((res, rej) => {
                        // Dosifica el envio A
                        let promesas = [];
                        let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
                        for (let i = 0; i < objA.lista.length; i++) {
                            let factor_adicional = parseInt(objA.lista[i].filas.length / 1000) * 200;
                            promesas.push(new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log('Envia archivo comparado', objA.lista[i].archivo, factor_to, factor_adicional);
                                    win.webContents.send('escenario_resultados:archivo_leidoComparado', objA.lista[i], 'A');
                                    resolve();
                                }, (i * factor_to) + factor_adicional);
                            }));
                        }

                        Promise.all(promesas).then(() => {
                            res();
                        });
                    }).then(() => {
                        // Si es SIN espera 5 segundos, sino espera solo 1 segundo
                        let to_sistema = (SESION.sistema === 'SIN' ? 3000 : 500);

                        setTimeout(() => {
                            // Dosifica el envio B
                            let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
                            for (let i = 0; i < objB.lista.length; i++) {
                                let factor_adicional = parseInt(objB.lista[i].filas.length / 1000) * 200;
                                // Ya no usa promesas para el escenario B
                                setTimeout(() => {
                                    console.log('Envia archivo comparado', objB.lista[i].archivo, factor_to, factor_adicional);
                                    win.webContents.send('escenario_resultados:archivo_leidoComparado', objB.lista[i], 'B');
                                }, (i * factor_to) + factor_adicional);
                            }
                        }, to_sistema);
                    });
                }, 300);
            }, () => {
                console.log('Error comparando');
            });
        }, () => {
            console.log('Error leyendo los archivosB');
        });
    }, () => {
        console.log('Error leyendo los archivosA');
    });
});

ipcMain.on('escenario_original:copiar', (event, ruta_origen, ruta_destino, nuevo_folio, listaArchivos, flag_copiar, comentarios) => {
    ruta_origen = path.normalize(ruta_origen);
    ruta_destino = path.normalize(ruta_destino);

    let id_escenario = path.basename(ruta_origen);
    let carpetas_nuevo = ruta_destino.split(path.sep);
    let rutaTemp = carpetas_nuevo[0];

    console.log(nuevo_folio);
    console.log(id_escenario);

    // Verifica que las carpetas existan
    for (let i = 1; i < carpetas_nuevo.length; i++) {
        rutaTemp = path.join(rutaTemp, carpetas_nuevo[i]);

        if (!fs.existsSync(rutaTemp)) {
            fs.mkdirSync(rutaTemp);
        }
    }

    console.log('copiando', flag_copiar);
    console.log('De', ruta_origen);
    console.log('A', ruta_destino);

    verificarModificados = () => {
        console.log('Verificando modificados:', listaArchivos.length);
        let promesas = [];
        listaArchivos.forEach((archivo) => {
            let ruta_archivo_mod = path.join(ruta_destino, 'dirdat', archivo.archivo);
            //
            // Actualiza el archivo
            promesas.push(modificarArchivo(ruta_archivo_mod, archivo));
        });

        Promise.all(promesas).then(() => {
            console.log('Respuesta copiado');
            win.webContents.send('escenario_original:copiado', {estado:true, folio:nuevo_folio, ruta:ruta_destino, id:id_escenario});
        }, () => {
            win.webContents.send('escenario_original:copiado', {estado:true, id:id_escenario, folio:nuevo_folio, ruta:ruta_destino, error:'Error de escritura en disco'});
        });
    };

    // Si es un nuevo modificado, copia toda la carpeta
    // de lo contrario, solo modifica los archivos
    if (flag_copiar) {
        let promesas_copiar = [];

        // Copia el directorio completo
        fse.copy(ruta_origen, ruta_destino).then(() => {
            console.log('Directorio copiado correctamente');

            // Actualiza comentarios
            escenario.crearArchivoComentarios(ruta_destino, comentarios);
            // Rmueve si existe un anterior para que no se comprima
            let ruta_bd = path.join(ruta_destino, '.bd');
            if (fs.existsSync(ruta_bd)) {
                console.log('Borrando .bd');
                try {
                    fs.unlinkSync(ruta_bd);
                } catch (e) {
                    console.log('Borrando .bd err: ', e.message);
                }
            }

            // Verifica modificados
            verificarModificados();
        }).catch((err) => {
            console.log('Error al copiar el escenario', err);
            win.webContents.send('escenario_original:copiado', {estado:false, folio:nuevo_folio, ruta:ruta_destino, error:err, id:id_escenario});
        });
    } else {
        // Actualiza comentarios
        escenario.crearArchivoComentarios(ruta_destino, comentarios);

        // Verifica modificados
        verificarModificados();
    }
});

function verificarModificados() {}

function modificarArchivo(ruta, obj) {
    console.log('Modificado: ', ruta);
    return new Promise((resolve, reject) => {
        // Abre
        try {
            let cadena = '';
            // Las filas vienen como campos, no como arreglo -.-
            for (let i = 0; i < obj.filas.length; i++) {
                let fila = obj.filas[`${i}`];
                let linea = '';
                // Recorre las columnas del insumo para seguir el orden
                obj.insumo.columnas.forEach((col) => {
                    // Solo procesa columnas no virtuales, no ocultas
                    if (col.virtual !== true && col.hidden !== true) {
                        if (obj.insumo.modelo.fields[col.field].type === 'string') {
                            linea += `\"${(fila[col.field] === '' ? ' ' : fila[col.field])}\",`;
                        } else if (obj.insumo.modelo.fields[col.field].type === 'number') {
                            linea += `${fila[col.field]},`;
                        }
                    }
                });

                // Quita la ultima coma
                linea = linea.slice(0, linea.length - 1);

                // Agrega a la cadena del archivo con un salto de linea
                cadena += `${linea}\n`;
            };

            // Escribe los datos
            fs.writeFile(ruta, cadena, (err) => {
                // Libera la variable
                cadena = null;

                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });

            // Sin modificaciones
            obj.editado = false;
        } catch (e) {
            console.log(e);
        }

    });
}

ipcMain.on('algoritmo:ejecutar', (event, ruta_escenario, algoritmo) => {
    let archivo_eje;
    if (algoritmo === 'dersi') {
        archivo_eje = 'DERSI.exe'
    } else {
        archivo_eje = 'DERS.exe'
    }

    console.log('ENV', process.env.NODE_ENV);
    console.log('Ejecutando', ruta_escenario, archivo_eje, algoritmo);
    comandos.ejecutarAlgoritmo(ruta_escenario, archivo_eje, win).then((obj) => {
        win.webContents.send('algoritmo:ejecutado', obj);
    }, (obj) => {
        win.webContents.send('algoritmo:ejecutado', obj);
    });
});

ipcMain.on('algoritmo:diagnosticar', (event, ruta_escenario, opc) => {
    // Revisa si existe el programa
    let ruta_diagnostico = path.join(ruta_escenario, 'mens_cplex.exe');
    let promesa_diagnostico;
    if (!fs.existsSync(ruta_diagnostico)) {
        console.log('Ejecutable no existe');
        // Descarga el programa para casos infactibles
        let ruta_exe = path.join(`${SESION.config.exalogic.base}`, `${SESION.sistemaCarpeta}`, SESION.config.exalogic.algoritmos, 'WINDOWS', SESION.sistema, 'mens_cplex.exe');
        ftp.conectar();
        ftp.descargarArchivoFTPSimple(ruta_exe, ruta_diagnostico).then(() => {
            console.log('App Infactible descargado correctamente');
            ftp.desconectar();
            comandos.ejecutarDiagnostico(ruta_escenario, 'mens_cplex.exe').then((obj) => {
                obj.opc = opc;
                obj.rutaBase = ruta_escenario;
                win.webContents.send('algoritmo:diagnosticado', obj);
            }, (obj) => {
                obj.opc = opc;
                obj.rutaBase = ruta_escenario;
                console.log('Reject diagnostico:', obj.mensaje);
                win.webContents.send('algoritmo:diagnosticado', obj);
            });
        }, (err) => {
            console.log('Error descargando app infactible');
            ftp.desconectar();
        });
    } else {
        console.log('Ejecutable existe');
        promesa_diagnostico = comandos.ejecutarDiagnostico(ruta_escenario, 'mens_cplex.exe').then((obj) => {
            obj.opc = opc;
            obj.rutaBase = ruta_escenario;
            win.webContents.send('algoritmo:diagnosticado', obj);
        }, (obj) => {
            obj.opc = opc;
            obj.rutaBase = ruta_escenario;
            console.log('Reject diagnostico:', obj.mensaje);
            win.webContents.send('algoritmo:diagnosticado', obj);
        });
    }
});

ipcMain.on('escenarios_mod:leer', (event, ruta_escenario_mod) => {
    console.log('Folios de', ruta_escenario_mod);
    escenario.leerEscenariosModificados(ruta_escenario_mod).then((lista) => {
        // Filta elementos validos
        lista = lista.filter((item) => {
            return item.length == 12;
        });

        win.webContents.send('escenarios_mod:leidos', {estado:true, lista:lista});
    }, (err) => {
        console.log(err);
        win.webContents.send('escenarios_mod:leidos', {estado:false, error:err});
    });
});

ipcMain.on('archivo:leer', (event, ruta, elementos, opcion) => {
    let ruta_archivo = ruta;

    // Une los elementos en el path
    if (elementos !== undefined) {
        elementos.forEach((e) => {
            ruta_archivo = path.join(ruta_archivo, e);
        });
    }

    console.log('Archivo', ruta_archivo);
    escenario.leerArchivo(ruta_archivo).then((data) => {
        console.log('Leido');
        win.webContents.send('archivo:leido', {rutaBase:ruta, res:data, opc:opcion});
    }, (err) => {
        console.log('Error', err);
        win.webContents.send('archivo:leido', {rutaBase:ruta, res:err, opc:opcion});
    });
});

ipcMain.on('escenarios_mod_anios:leer', (event, algoritmo) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_original');

    escenario.leerDirectorioMod(ruta).then((lista) => {
        win.webContents.send('escenarios_mod_anios:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_mod_anios:leidos', false, null);
    });
});

ipcMain.on('escenarios_mod_meses:leer', (event, algoritmo, anio) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_original', anio);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        win.webContents.send('escenarios_mod_meses:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_mod_meses:leidos', false, null);
    });
});

ipcMain.on('escenarios_mod_dias:leer', (event, algoritmo, anio, mes) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_original', anio, mes);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        win.webContents.send('escenarios_mod_dias:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_mod_dias:leidos', false, null);
    });
});

ipcMain.on('escenarios_mod_originales:leer', (event, algoritmo, anio, mes, dia) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_original', anio, mes, dia);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        win.webContents.send('escenarios_mod_originales:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_mod_originales:leidos', false, null);
    });
});

ipcMain.on('escenarios_mod_modificados:leer', (event, algoritmo, anio, mes, dia, id) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes, dia, id);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        win.webContents.send('escenarios_mod_modificados:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_mod_modificados:leidos', false, null);
    });
});

ipcMain.on('escenarios_mod:leer_todo', (event, algoritmo, anio, mes, dia, id_ori, id_mod) => {
    let ruta_escenario = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes, dia, id_ori, id_mod);

    escenario.parseEscenario(ruta_escenario, algoritmo).then((obj) => {
        let objetoTodos = {
            ruta: obj.ruta,
            algoritmo: obj.algoritmo,
            numArchivos: obj.numArchivos,
            lista: []
        };
        console.log('Manda contenedor archivos (TODOS)', obj.numArchivos);
        win.webContents.send('escenarios_mod:leido_todo', objetoTodos);

        // Dosifica el envio
        let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
        for (let i = 0; i < obj.lista.length; i++) {
            let factor_adicional = parseInt(obj.lista[i].filas.length / 1000) * 100;
            setTimeout(() => {
                console.log('Envia archivo', obj.lista[i].archivo, factor_to, factor_adicional);
                win.webContents.send('escenarios_mod:archivo_leido', obj.lista[i]);
            }, (i * factor_to) + factor_adicional);
        }
    }, () => {
        console.log('Error leyendo los archivos');
    });
});

ipcMain.on('escenarios_folios:leer', (event, obj) => {
    let ruta_escenario_mod = path.join(config.local.escenarios, SESION.sistema, obj.algoritmo, 'escenario_modificado', obj.anio, obj.mes, obj.dia, obj.id_escenario);
    console.log('Folios de', ruta_escenario_mod);
    escenario.leerEscenariosModificados(ruta_escenario_mod).then((lista) => {
        win.webContents.send('escenarios_folios:leidos', {estado:true, lista:lista});
    }, (err) => {
        console.log(err);
        win.webContents.send('escenarios_folios:leidos', {estado:false, error:err});
    });
});

ipcMain.on('escenarios_folio_anios:leer', (event, algoritmo) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado');

    new Promise((resolve, reject) => {
        escenario.leerDirectorioMod(ruta).then((listaLocal) => {
            resolve(listaLocal);
        }, () => {
            // win.webContents.send('escenarios_folio_anios:leidos', false, null);
            resolve([]);
        });
    }).then((lista) => {
        console.log('Consultando anios BD: ', algoritmo);
        let algoritmoBD = getAlgoritmoBD(algoritmo);
        let {esquema, password, url } = getInfoSistema();

        comandos.obtenerAniosFolios('', url, esquema, password, algoritmoBD, 'MOD').then((res) => {
            // Junta los resultados
            if (typeof res.anio !== 'undefined') {
                res.anio.forEach((anio) => {
                    // Si no encuentra los elementos los agrega
                    let busqueda = lista.find((ele) => { return ele === anio; });
                    if (typeof busqueda === 'undefined') {
                        lista.push(anio);
                    }
                });
            }

            win.webContents.send('escenarios_folio_anios:leidos', true, lista);
        }, (res_err) => {
            win.webContents.send('escenarios_folio_anios:leidos', true, lista);
        });
    });
});

ipcMain.on('escenarios_folio_meses:leer', (event, algoritmo, anio) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio);

    new Promise((resolve, reject) => {
        escenario.leerDirectorioMod(ruta).then((listaLocal) => {
            resolve(listaLocal);
        }, () => {
            resolve([]);
        });
    }).then((lista) => {
        // Lee de BD
        console.log('Consultando meses: ', algoritmo, anio);
        let algoritmoBD = getAlgoritmoBD(algoritmo);
        let {esquema, password, url } = getInfoSistema();

        comandos.obtenerMesesFolios('', url, esquema, password, algoritmoBD, anio, 'MOD').then((res) => {
            // Junta los resultados
            if (typeof res.mes !== 'undefined') {
                res.mes.forEach((mes) => {
                    // Si no encuentra los elementos los agrega
                    let busqueda = lista.find((ele) => { return ele === mes; });
                    if (typeof busqueda === 'undefined') {
                        console.log('Nuevo mes', mes);
                        lista.push(mes);
                    }
                });
            }

            win.webContents.send('escenarios_folio_meses:leidos', true, lista);
        }, (res_err) => {
            win.webContents.send('escenarios_folio_meses:leidos', true, lista);
        });
    });

});

ipcMain.on('escenarios_folio_dias:leer', (event, algoritmo, anio, mes) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes);

    new Promise((resolve, reject) => {
        escenario.leerDirectorioMod(ruta).then((listaLocal) => {
            resolve(listaLocal);
        }, () => {
            resolve([]);
        });
    }).then((lista) => {
        // Consulta en BD
        console.log('Consultando dias: ', algoritmo, anio, mes);
        let algoritmoBD = getAlgoritmoBD(algoritmo);
        let {esquema, password, url } = getInfoSistema();

        comandos.obtenerDiasFolios('', url, esquema, password, algoritmoBD, anio, mes, 'MOD').then((res) => {
            // Junta los resultados
            if (typeof res.dia !== 'undefined') {
                res.dia.forEach((dia) => {
                    // Si no encuentra los elementos los agrega
                    let busqueda = lista.find((ele) => { return ele === dia; });
                    if (typeof busqueda === 'undefined') {
                        console.log('Nuevo dia', dia);
                        lista.push(dia);
                    }
                });
            }

            win.webContents.send('escenarios_folio_dias:leidos', true, lista);
        }, (res_err) => {
            win.webContents.send('escenarios_folio_dias:leidos', true, lista);
        });
    });
});

ipcMain.on('escenarios_folio_escenarios:leer', (event, algoritmo, anio, mes, dia) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes, dia);
    let ruta_id;
    let lista_folios = [];
    let id_escenario;
    let promesas_esc = [];

    // Carga los escenarios locales
    let lista = escenario.leerDirectoriosSync(ruta);
    lista.forEach((id) => {
        ruta_id = path.join(ruta, id);
        let carpetas = ruta_id.split(path.sep);
        // id_escenario = carpetas[carpetas.length - 1];
        let hora = id.slice(8, 10);
        let intervalo = id.slice(10, 12);

        let sublista = escenario.leerDirectoriosSync(ruta_id);
        sublista.forEach((elemento) => {
            // Verifica si el elemento fue descargado
            let archivoDescargado = path.join(ruta_id, elemento, '.descargado');
            console.log('Folio escenario:', elemento, id);
            if (fs.existsSync(archivoDescargado)) {
                console.log('Agrega', elemento, id);
                lista_folios.push({
                    ruta:ruta_id,
                    folio:elemento,
                    tipo:'LOCAL',
                    algoritmo: algoritmo,
                    fecha: `${anio}-${(mes + '').length === 1 ? '0' + mes : '' + mes }-${(dia + '').length === 1 ? '0' + dia : '' + dia }`,
                    hora: hora,
                    intervalo: intervalo,
                    id_original:id,
                    usuario: SESION.usuario,
                    rutaOriginal: ruta_id.replace('escenario_modificado', 'escenario_original')
                });
            } else {
                console.log('No existe ', archivoDescargado);
            }
        });
    });

    // Carga los escenarios en BD
    console.log('Consultando folios BD: ', algoritmo, anio, mes, dia);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    console.log('--- Lista');
    console.log(lista_folios.length);
    comandos.obtenerFolios('', url, esquema, password, algoritmoBD, anio, mes, dia, 'MOD').then((res) => {
        // Junta los resultados
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                // Si no encuentra los elementos los agrega
                console.log('esc>', escenario.folio, escenario.id_original);
                let busqueda = lista_folios.find((ele) => { return ele.folio === escenario.folio && ele.id_original === escenario.id_original; });
                if (typeof busqueda === 'undefined') {
                    console.log('Nuevo escenario', escenario.folio);
                    lista_folios.push({
                        ruta:path.join(ruta, escenario.id_original),
                        folio:escenario.folio,
                        comentarios: escenario.comentario,
                        tipo:'BD',
                        algoritmo: algoritmo,
                        fecha: `${anio}-${(mes + '').length === 1 ? '0' + mes : '' + mes }-${(dia + '').length === 1 ? '0' + dia : '' + dia }`,
                        hora: escenario.hora,
                        intervalo: escenario.intervalo,
                        id_original:escenario.id_original,
                        rutaOriginal: path.join(ruta, escenario.id_original).replace('escenario_modificado', 'escenario_original'),
                        usuario: escenario.usuario
                    });
                } else {
                    // Si ya existe, actualiza su tipo solamente
                    if (!busqueda.tipo.includes('BD')) {
                        busqueda.tipo = busqueda.tipo + '/BD';
                    }
                }
            });
        }

        win.webContents.send('escenarios_folio_escenarios:leidos', true, lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_folio_escenarios:leidos', true, lista_folios);
    });
});

ipcMain.on('escenario_bd:comprimir', (event, ruta_escenario, evento) => {
    ruta_escenario = path.normalize(ruta_escenario);
    let ruta_destino = '';
    let ruta_zip_anterior;

    if (ruta_escenario.endsWith(path.sep)) {
        ruta_destino = ruta_escenario.substr(0, ruta_escenario.length - 1) + '.zip';
    } else {
        ruta_destino = ruta_escenario + '.zip';
    }

    let elementos = ruta_destino.split(path.sep);
    let archivoZip = path.basename(ruta_destino);

    if (ruta_escenario.endsWith(path.sep)) {
        ruta_zip_anterior = path.join(ruta_escenario.substr(0, ruta_escenario.length - 1), archivoZip);;
    } else {
        ruta_zip_anterior = path.join(ruta_escenario, archivoZip);;
    }

    console.log(' > Comprimiendo escenario:', ruta_escenario);
    console.log(' > A:', ruta_destino);
    console.log(' > ZIP:', archivoZip);
    console.log(' > Anterior:', ruta_zip_anterior);

    // Rmueve si existe un anterior para que no se comprima
    if (fs.existsSync(ruta_zip_anterior)) {
        console.log('Borrando anterior');
        try {
            fs.unlinkSync(ruta_zip_anterior);
        } catch (e) {
            console.log('Borrando anterior err: ', e.message);
        }
    }

    comandos.comprimirCarpeta(ruta_escenario, ruta_destino).then((json) => {
        // Copia el zip a la carpeta
        fse.copy(ruta_destino, ruta_zip_anterior, (err) => {
            if (err) {
                json.estado = false;
                json.mensaje = 'Error al copiar el archivo zip';
                console.log("Compresión fallida al copiar", json.estado);
                win.webContents.send(evento, json);
            } else {
                // Elimina el zip previo
                try {
                    fs.unlinkSync(ruta_destino);
                } catch (e) {
                    console.log('Borrando primer zip err: ', e.message);
                }

                json.rutaZip = ruta_zip_anterior;

                console.log("Compresión realizada", json.estado);
                win.webContents.send(evento, json);
            }
        });
    }, (json) => {
        console.log("Compresión fallida", json.estado);
        win.webContents.send(evento, json);
    });
});

ipcMain.on('archivo:borrar', (event, ruta) => {
    console.log('Borrando archivo', ruta);
    try {
        fs.unlinkSync(ruta);
    } catch (e) {
        console.log('Error borrado:', e.message);
    }
});

ipcMain.on('escenario_bd:operacion', (event, obj, evento) => {
    console.log('operacion en BD', evento);
    console.log(obj);

    comandos.operacionEnBaseDatos(obj, enviarProgresoBD).then((objres) => {
        console.log('Hecho');
        if (evento === 'escenario:guardarBD') {
            listaArchivos.marcarDescargadoBD(obj.ruta);
        }

        win.webContents.send(evento, objres);
    }, (objres) => {
        console.log('BD con error');
        win.webContents.send(evento, objres);
    });
});

function enviarProgresoBD(valor, estado) {
    win.webContents.send('escenario_bd:progreso', {progreso:valor, estado:estado});
}

ipcMain.on('escenario_original_local:leertodos', (event) => {
    let ruta_base = path.join(config.local.escenarios, SESION.sistema);
    console.log('Ruta base', ruta_base);
    let lista_id = [];
    let promesas_ids = [];

    let lista1 = escenario.leerDirectoriosSync(ruta_base);
    lista1.forEach((dir1) => {
        let ruta_alg_ori = path.join(ruta_base, dir1, 'escenario_original');
        let lista2 = escenario.leerDirectoriosSync(ruta_alg_ori);
        // Lee los años
        lista2.forEach((dir2) => {
            let ruta_alg_ori_anio = path.join(ruta_alg_ori, dir2);
            let lista3 = escenario.leerDirectoriosSync(ruta_alg_ori_anio);
            // Lee los meses
            lista3.forEach((dir3) => {
                let ruta_alg_ori_anio_mes = path.join(ruta_alg_ori_anio, dir3);
                let lista4 = escenario.leerDirectoriosSync(ruta_alg_ori_anio_mes);
                // Lee los dias
                lista4.forEach((dir4) => {
                    let ruta_alg_ori_anio_mes_dia = path.join(ruta_alg_ori_anio_mes, dir4);
                    let lista5 = escenario.leerDirectoriosSync(ruta_alg_ori_anio_mes_dia);
                    // Lee los id
                    lista5.forEach((dir5) => {
                        if (dir5.length == 16) {
                            let ruta_alg_ori_anio_mes_dia_id = path.join(ruta_alg_ori_anio_mes_dia, dir5);

                            let anio = dir5.slice(0, 4);
                            let mes = dir5.slice(4, 6);
                            let dia = dir5.slice(6, 8);
                            let hora = dir5.slice(8, 10);
                            let int = dir5.slice(10, 12);
                            let gmt = dir5.slice(13, 16);
                            lista_id.push({
                                id: dir5,
                                ruta: ruta_alg_ori_anio_mes_dia_id,
                                anio: parseInt(anio),
                                mes: parseInt(mes),
                                dia: parseInt(dia),
                                hora: parseInt(hora),
                                int: parseInt(int),
                                gmt: parseInt(gmt),
                                algoritmo:dir1
                            });

                            console.log('>',dir5);
                        }
                    });
                });
            });
        });
    });

    // Envia la lista
    win.webContents.send('escenario_original_local:leidotodos', lista_id);
});

ipcMain.on('escenario_modificado_local:leerLista', (event, obj) => {
    let listaObj = [];
    console.log('Leyendo modificados del original', obj.id);
    escenario.leerDirectorioMod(obj.ruta.replace('escenario_original', 'escenario_modificado')).then((lista) => {
        // Crea nuevos objetos de informacion de modificados a partir del original
        lista.filter((elem) => { return elem.length === 12 }).forEach((dir) => {
            let newObj = JSON.parse(JSON.stringify(obj));
            newObj.infoMod = {
                folio: dir,
                ruta: path.join(obj.ruta.replace('escenario_original', 'escenario_modificado'), dir),
                anio: dir.slice(0, 4),
                mes: dir.slice(4, 6),
                dia: dir.slice(6, 8),
                hora: dir.slice(8, 10),
                min: dir.slice(10, 12)
            }
            listaObj.push(newObj);
        });

        win.webContents.send('escenario_modificado_local:leidaLista', listaObj);
    }, () => {
        win.webContents.send('escenario_modificado_local:leidaLista', listaObj);
    });
});

ipcMain.on('escenario_modificado_local:leer_comentarios', (event, obj) => {
    let ruta_archivo = path.join(obj.infoMod.ruta, 'comentarios.txt');

    console.log('Archivo comentarios', ruta_archivo);
    escenario.leerArchivo(ruta_archivo).then((data) => {
        console.log('Leido');
        win.webContents.send('escenario_modificado_local:leido_comentarios', {estado: true, res:data});
    }, (err) => {
        console.log('Error', err);
        win.webContents.send('escenario_modificado_local:leido_comentarios', {estado: false, res:err});
    });
});

ipcMain.on('escenario_original_local:borrar', (event, ruta) => {
    let ruta_modificados = ruta.replace('escenario_original', 'escenario_modificado');

    console.log('Borrando escenarios modificados', ruta_modificados);
    rm(ruta_modificados, (err) => {
        if (err) {
            console.log('Error:', err.message);
            win.webContents.send('escenario_original_local:borrado', {estado:false, mensaje:err.message});
        } else {
            console.log('Borrando escenario original', ruta);
            rm(ruta, (err) => {
                if (err) {
                    console.log('Error:', err.message);
                    win.webContents.send('escenario_original_local:borrado', {estado:false, mensaje:err.message});
                } else {
                    win.webContents.send('escenario_original_local:borrado', {estado:true});
                }
            });
        }
    });
});

ipcMain.on('escenario_modificado_local:borrar', (event, ruta) => {
    console.log('Borrando escenario modificado', ruta);
    rm(ruta, (err) => {
        if (err) {
            console.log('Error:', err.message);
            win.webContents.send('escenario_modificado_local:borrado', {estado:false, mensaje:err.message});
        } else {
            win.webContents.send('escenario_modificado_local:borrado', {estado:true});
        }
    });
});

ipcMain.on('escenario_bd:descargar', (event, obj_info) => {
    console.log('Descargando escenarios de BD: ', obj_info.usuario, obj_info.algoritmo, obj_info.folio);
    let algoritmoBD = getAlgoritmoBD(obj_info.algoritmo);
    let {esquema, password, url} = getInfoSistema();
    let obj = {
        url:url,
        esq:esquema,
        pass:password,
        alg:algoritmoBD,
        folio:obj_info.folio,
        id:obj_info.id_original,
        usr:obj_info.usuario,
        destMod:obj_info.ruta,
        destOri:obj_info.rutaOriginal.replace(obj_info.id_original, '')
    };

    console.log(obj);

    console.log('Descargando modificado');
    comandos.descargarEscenarioModBD(obj).then((json_mod) => {
        console.log("Hecho", json_mod);

        // Borra si existe archivo .bd
        try {
            let ruta_bdf = path.join(obj.ruta, obj.folio);
            console.log('Intentando borrar .bd', ruta_bdf);
            fs.unlinkSync(ruta_bdf);
        } catch (e) {
            console.log('Error borrado:', e.message);
        }

        console.log('Descargando original');
        comandos.descargarEscenarioOriBD(obj).then((json_ori) => {
            console.log("Hecho", json_ori);
            win.webContents.send('algoritmo_folio:descargado', json_ori);
        }, (json_err) => {
            console.log("Error: " + json_err.mensaje);
            win.webContents.send('escenario_bd:descargado', json_err);
        });
    }, (json_err) => {
        console.log("Error: " + json_err.mensaje);
        win.webContents.send('escenario_bd:descargado', json_err);
    });
});

function getInfoSistema() {
    switch (SESION.sistema) {
        case 'BCA':
            return {
                esquema: config.exadata.bca.bd,
                password: config.exadata.bca.password,
                url: config.exadata.bca.url
            }
            break;
        case 'SIN':
            return {
                esquema: config.exadata.sin.bd,
                password: config.exadata.sin.password,
                url: config.exadata.sin.url
            }

            break;
        case 'BCS':
            return {
                esquema: config.exadata.bcs.bd,
                password: config.exadata.bcs.password,
                url: config.exadata.bcs.url
            }

            break;
    }
}

function getAlgoritmoBD(algoritmo) {
    switch (algoritmo) {
        case "dersi": return 'DERS_I'; break;
        case "dersmi": return 'DERS_MI'; break;
        case "autr": return 'AUTR'; break;
        default: return '';
    }
}

ipcMain.on('escenarios_eliminar_folio_anios:leer', (event, algoritmo) => {
    console.log('Consultando eliminar anios BD: ', SESION.usuario, algoritmo);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    let lista = [];
    let lista_folios = [];

    // Lista de anios en BD
    comandos.obtenerAniosFolios(SESION.usuario, url, esquema, password, algoritmoBD, 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.anio !== 'undefined') {
            res.anio.forEach((anio) => {
                lista.push(parseInt(anio));
            });
        }

        win.webContents.send('escenarios_eliminar_folio_anios:leidos', lista);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio_anios:leidos', lista);
    });

    console.log('Consultando folios');

    // REgistros en BD
    comandos.obtenerFolios(SESION.usuario, url, esquema, password, algoritmoBD, '', '', '', 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                generarObjInfoOriginalBD(escenario, algoritmo, lista_folios);
            });
        }

        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    });
});

ipcMain.on('escenarios_eliminar_folio_meses:leer', (event, algoritmo, anio) => {
    // Lee de BD
    console.log('Consultando meses (eliminar): ', SESION.sistema, algoritmo, anio);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    let lista = [];
    let lista_folios = [];

    comandos.obtenerMesesFolios(SESION.usuario, url, esquema, password, algoritmoBD, anio, 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.mes !== 'undefined') {
            res.mes.forEach((mes) => {
                lista.push(parseInt(mes));
            });
        }

        win.webContents.send('escenarios_eliminar_folio_meses:leidos', lista);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio_meses:leidos', lista);
    });

    console.log('Consultando folios');

    // REgistros en BD
    comandos.obtenerFolios(SESION.usuario, url, esquema, password, algoritmoBD, anio, '', '', 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                generarObjInfoOriginalBD(escenario, algoritmo, lista_folios);
            });
        }

        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    });
});

ipcMain.on('escenarios_eliminar_folio_dias:leer', (event, algoritmo, anio, mes) => {
    // Consulta en BD
    console.log('Consultando dias (eliminar): ', SESION.sistema, algoritmo, anio, mes);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    let lista = [];
    let lista_folios = [];

    comandos.obtenerDiasFolios(SESION.usuario, url, esquema, password, algoritmoBD, anio, mes, 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.dia !== 'undefined') {
            res.dia.forEach((dia) => {
                lista.push(parseInt(dia));
            });
        }

        win.webContents.send('escenarios_eliminar_folio_dias:leidos', lista);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio_dias:leidos', lista);
    });

    // REgistros en BD
    comandos.obtenerFolios(SESION.usuario, url, esquema, password, algoritmoBD, anio, mes, '', 'ORI').then((res) => {
        // Junta los resultados
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                generarObjInfoOriginalBD(escenario, algoritmo, lista_folios);
            });
        }

        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    });
});

ipcMain.on('escenarios_eliminar_folio:leer', (event, algoritmo, anio, mes, dia) => {
    console.log('Consultando eliminar algoritmos BD: ', SESION.usuario);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    let lista = [];
    let lista_folios = [];

    // Lista de anios en BD
    comandos.obtenerAlgoritmosOriBD(SESION.usuario, url, esquema, password).then((res) => {
        // Junta los resultados
        if (typeof res.algoritmo !== 'undefined') {
            res.algoritmo.forEach((anio) => {
                lista.push(anio);
            });
        }

        win.webContents.send('escenarios_eliminar_folio_algoritmos:leidos', lista);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio_algoritmos:leidos', lista);
    });

    console.log('Consultando folios: ', SESION.usuario, algoritmo, anio, mes, dia);


    comandos.obtenerFolios(SESION.usuario, url, esquema, password, algoritmoBD, anio, mes, dia, 'ORI').then((res) => {
        // Junta los resultados
        console.log('Sale de la consulta');
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                generarObjInfoOriginalBD(escenario, algoritmo, lista_folios);
            });
        }

        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio:leidos', lista_folios);
    });
});

ipcMain.on('escenarios_eliminar_folio_mod:leer', (event, algoritmo, id_original) => {
    console.log('Consultando folios modificados por ID: ', SESION.usuario, algoritmo, id_original);
    let algoritmoBD = getAlgoritmoBD(algoritmo);
    let {esquema, password, url } = getInfoSistema();
    let lista_folios = [];

    comandos.obtenerFoliosPorID(SESION.usuario, url, esquema, password, algoritmoBD,id_original).then((res) => {
        if (typeof res.escenario !== 'undefined') {
            res.escenario.forEach((escenario) => {
                let anio = escenario.folio.slice(0, 4);
                let mes = escenario.folio.slice(4, 6);
                let dia = escenario.folio.slice(6, 8);
                let hora = escenario.folio.slice(8, 10);
                let min = escenario.folio.slice(10, 12);
                let int = escenario.intervalo;
                let gmt = escenario.folio.slice(13, 16);
                console.log('>>>',escenario, anio, mes, dia, hora, int, gmt);
                let ruta_mod = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes, dia, id_original, escenario.folio);
                console.log('Ruta Modificado:', ruta_mod);
                lista_folios.push({
                    anio:anio,
                    mes:mes,
                    dia:dia,
                    int:int,
                    gmt:gmt,
                    ruta:ruta_mod,
                    algoritmo: algoritmo,
                    comentarios: escenario.comentario,
                    fecha: `${anio}-${(mes + '').length === 1 ? '0' + mes : '' + mes }-${(dia + '').length === 1 ? '0' + dia : '' + dia }`,
                    hora: hora,
                    min: min,
                    folio: escenario.folio,
                    intervalo: escenario.intervalo,
                    id_original: id_original,
                    usuario: SESION.usuario
                });
            });
        }

        win.webContents.send('escenarios_eliminar_folio_mod:leidos', lista_folios);
    }, (res_err) => {
        win.webContents.send('escenarios_eliminar_folio_mod:leidos', lista_folios);
    });
});

ipcMain.on('archivo_bd:verificar', (event, ruta_escenario) => {
    let ruta_archivo = path.join(ruta_escenario, '.bd');;

    let flag_existe = fs.existsSync(ruta_archivo);
    console.log('Verificar archivo', ruta_archivo, flag_existe);
    win.webContents.send('archivo_bd:verificado', {existe:flag_existe});
});

function generarObjInfoOriginalBD(escenario, algoritmo, lista_folios) {
    let anio = escenario.folio.slice(0, 4);
    let mes = escenario.folio.slice(4, 6);
    let dia = escenario.folio.slice(6, 8);
    let hora = escenario.hora;
    let int = escenario.intervalo;
    let gmt = escenario.folio.slice(13, 16);
    console.log('>>>',escenario, anio, mes, dia, hora, int, gmt);
    let ruta_original = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_original', anio, mes, dia, escenario.folio);
    console.log('Ruta original:', ruta_original);
    lista_folios.push({
        anio:anio,
        mes:mes,
        dia:dia,
        int:int,
        gmt:gmt,
        ruta:ruta_original,
        algoritmo: escenario.algoritmo,
        fecha: `${anio}-${(mes + '').length === 1 ? '0' + mes : '' + mes }-${(dia + '').length === 1 ? '0' + dia : '' + dia }`,
        hora: escenario.hora,
        intervalo: escenario.intervalo,
        id_original:escenario.folio,
        usuario: SESION.usuario
    });
}
