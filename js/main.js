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
const ftp = new FTP({
    host: config.exalogic.host,
    user: config.exalogic.user,
    password: config.exalogic.password
}, config.local.escenarios);

let win;
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
    let replace = path.join(SESION.config.exalogic.base, SESION.sistemaCarpeta, data.algoritmo, 'datosh').replace(new RegExp('\\' + path.sep, 'g'), '/'); //config.local.reemplazo;
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
                                    console.log('listo');
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

    let carpeta_algoritmo = path.join(`${SESION.config.exalogic.base}`, `${SESION.sistemaCarpeta}`, SESION.config.exalogic.algoritmos, 'WINDOWS', SESION.sistema, alg);
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
        });
    }, () => {
        console.log('Error conectando');
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

ipcMain.on('escenario_entradas:leer', (event, ruta_escenario, algoritmo) => {
    escenario.parseEscenario(ruta_escenario, algoritmo, 'ENTRADAS').then((obj) => {
        let objetoEntradas = {
            ruta: obj.ruta,
            algoritmo: obj.algoritmo,
            numArchivos: obj.numArchivos,
            lista: []
        };
        console.log('Manda contenedor archivos de entrada', obj.numArchivos);
        win.webContents.send('escenario_entradas:leido', objetoEntradas);

        // Guarda el objeto para modificaciones
        objEscenario = obj;

        // Dosifica el envio
        let factor_to = (SESION.sistema === 'SIN' ? TO_PROC_SIN : TO_PROC_BCAS)
        for (let i = 0; i < obj.lista.length; i++) {
            let factor_adicional = parseInt(obj.lista[i].filas.length / 1000) * 100;
            setTimeout(() => {
                console.log('Envia archivo', obj.lista[i].archivo, factor_to, factor_adicional);
                win.webContents.send('escenario_entradas:archivo_leido', obj.lista[i]);
            }, (i * factor_to) + factor_adicional);
        }
    }, () => {
        console.log('Error leyendo los archivos');
    });
});

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
                                    console.log('Envia archivo', objA.lista[i].archivo, factor_to, factor_adicional);
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
                                    console.log('Envia archivo', objB.lista[i].archivo, factor_to, factor_adicional);
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
            obj.filas.forEach((fila) => {
                let linea = '';
                for (let i = 0; i < fila.length; i++) {
                    let columna = fila[i];

                    // Columna de unidades se ignora
                    if (typeof columna.flag_unidad !== 'undefined' && columna.flag_unidad === true) {
                        continue;
                    }
                    // Si es string agrega comillas
                    if (columna.tipo === 'string') {
                        linea += `\"${(columna.valor === '' ? ' ' : columna.valor)}\"`;
                    } else {
                        linea += `${columna.valor}`;
                    }

                    // coma
                    if (i < (fila.length - 1)) {
                        linea += ',';
                    }
                }
                cadena += `${linea}\n`;
            });

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

    escenario.leerDirectorioMod(ruta).then((lista) => {
            /* FALTA CONSULTAR LOS DE BD */
            win.webContents.send('escenarios_folio_anios:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_folio_anios:leidos', false, null);
    });
});

ipcMain.on('escenarios_folio_meses:leer', (event, algoritmo, anio) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        /* FALTA CONSULTAR LOS DE BD */
        win.webContents.send('escenarios_folio_meses:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_folio_meses:leidos', false, null);
    });
});

ipcMain.on('escenarios_folio_dias:leer', (event, algoritmo, anio, mes) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes);

    escenario.leerDirectorioMod(ruta).then((lista) => {
        /* FALTA CONSULTAR LOS DE BD */
        win.webContents.send('escenarios_folio_dias:leidos', true, lista);
    }, () => {
        win.webContents.send('escenarios_folio_dias:leidos', false, null);
    });
});

ipcMain.on('escenarios_folio_escenarios:leer', (event, algoritmo, anio, mes, dia) => {
    let ruta = path.join(config.local.escenarios, SESION.sistema, algoritmo, 'escenario_modificado', anio, mes, dia);
    let ruta_id;
    let lista_folios = [];
    let id_escenario;
    let promesas = [];
    // Primero lee el directorio local y obtiene los id originales
    escenario.leerDirectorioMod(ruta).then((lista) => {
        lista.forEach((id) => {
            ruta_id = path.join(ruta, id);
            let carpetas = ruta_id.split(path.sep);
            // id_escenario = carpetas[carpetas.length - 1];
            let hora = id.slice(8, 10);
            let intervalo = id.slice(10, 12);
            console.log('Ruta id:', ruta_id, 'id', id);
            console.log('hora:', hora, 'intervalo', intervalo);
            promesas.push(escenario.leerDirectorioMod(ruta_id).then((sublista) => {
                sublista.forEach((elemento) => {
                    // Verifica si el elemento fue descargado
                    let archivoDescargado = path.join(ruta_id, elemento, '.descargado');
                    if (fs.existsSync(archivoDescargado)) {
                        lista_folios.push({
                            ruta:ruta_id,
                            folio:elemento,
                            tipo:'LOCAL',
                            algoritmo: algoritmo,
                            fecha: `${anio}-${(mes + '').length === 1 ? '0' + mes : '' + mes }-${(dia + '').length === 1 ? '0' + dia : '' + dia }`,
                            hora: hora,
                            intervalo: intervalo,
                            id_original:id,
                            rutaOriginal: ruta_id.replace('escenario_modificado', 'escenario_original')
                        });
                    }
                });
            }, () => {
                // win.webContents.send('escenarios_folio_dias:leidos', false, null);
            }));

            Promise.all(promesas).then(() => {
                win.webContents.send('escenarios_folio_escenarios:leidos', true, lista_folios);
            });
        });
    }, () => {
        win.webContents.send('escenarios_folio_escenarios:leidos', false, null);
    });
});

ipcMain.on('escenario_bd:comprimir', (event, ruta_escenario, evento) => {
    let elementos = ruta_escenario.split(path.sep);
    let ruta_destino;
    if (ruta_escenario.endsWith(path.sep)) {
        ruta_destino = path.join(ruta_escenario, `${elementos[elementos.length - 2]}.zip`);
    } else {
        ruta_destino = path.join(ruta_escenario, `${elementos[elementos.length - 1]}.zip`);
    }

    console.log(' > Comprimiendo escenario:', ruta_escenario);
    console.log(' > A:', ruta_destino);

    comandos.comprimirCarpeta(ruta_escenario, ruta_destino).then((json) => {
        console.log("Compresión realizada", json.estado);
        win.webContents.send(evento, json);
    }, (json) => {
        console.log("Compresión fallida", json.estado);
        win.webContents.send(evento, json);
    });
});

ipcMain.on('escenario_bd:guardar', (event, obj) => {
    console.log('Guarda en BD');
    console.log(obj);
    comandos.guardarEnBaseDatos(obj, enviarProgresoBD).then((obj) => {
        console.log('Hecho');
        win.webContents.send('escenario_bd:progreso', obj);
    }, () => {
        win.webContents.send('escenario_bd:progreso', obj);
    });
});

function enviarProgresoBD(valor, estado) {
    win.webContents.send('escenario_bd:progreso', {progreso:valor, estado:estado});
}
