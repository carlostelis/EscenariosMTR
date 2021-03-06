// funciones del módulo child_process
const { execFile, exec, spawn } = require('child_process');

// Clase que permite ejecutar llamadas a aplicativos fuera de node
class Comandos {
    // Constructor de la clase
    constructor() {
        this.config = require('./config.js');
        this.path = require('path');
        const {TextDecoder} = require('text-encoding');
        this.decoder = new TextDecoder('windows-1252');
        this.fs = require('fs');
        this.resultado = '';
        this.flag_fin_exe = false;
    }

    // Método para obtener la información de un usuario dado
    // ${usuario} es el usuario a consultar
    obtenerUsuario(usuario) {
        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            const jar = execFile('java', ['-jar', ruta, `--url=${this.config.exadata.acceso.url}`, `--esq=${this.config.exadata.acceso.bd}`, `--pass=${this.config.exadata.acceso.password}`, '--opc=usuarios', `--usr=${usuario}`], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        mensaje: `No fue posible establecer una conexión con la base de datos; errno = ${error.code}`,
                        estado: false,
                        sistemas: []
                    });
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                        sistemas: []
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                } else if (stdout.trim().length === 0) {
                    var jsonErr = {
                        mensaje: 'No fue posible realizar la autenticación de usuario',
                        estado: false,
                        sistemas: []
                    };

                    reject(jsonErr);
                } else {
                    try {
                        console.log('-envia JSON-');
                        const json = JSON.parse(stdout);
                        json.estado = true;
                        json.mensaje = 'Consulta realizada correctamente';
                        console.log(JSON.stringify(json));
                        resolve(json);
                    } catch (e) {
                        reject({error: e});
                    }
                }
            });
        });
    }

    // Método para descomprimir un archivo tar a través de Java
    // ${archivoTar} ruta del archivo tar
    // ${dia} es el dia a buscar
    // ${id_escenario} es el identificador del escenario a descomprimir
    // ${carpeta} es la carpeta destino del escenario descomprimido
    descomprimir(archivoTar, dia, id_escenario, carpeta) {
        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            const jar = execFile('java', ['-jar', ruta, '--opc=tar', `--archivo=${archivoTar}`, `--escenario=${id_escenario}`, `--dia=${dia}`, `--carpeta=${carpeta}`], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        mensaje: `No fue posible invocar descompresor; errno = ${error.code}`,
                        estado: false
                    });
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                } else if (stdout.trim().length === 0) {
                    var jsonErr = {
                        mensaje: 'No fue posible realizar la descompresión del escenario',
                        estado: false,
                    };

                    reject(jsonErr);
                } else {
                    try {
                        console.log('-envia JSON-');
                        const json = JSON.parse(stdout);
                        if (json.estado) {
                            json.mensaje = 'Extracción realizada correctamente';
                            if (typeof json.rutaLocal === 'string') {
                                json.rutaLocal = this.path.normalize(json.rutaLocal).trim();
                            }
                        } else {
                            json.error = `Escenario ${id_escenario} no encontrado en ${this.path.basename(archivoTar)}`;
                        }

                        console.log(JSON.stringify(json));
                        resolve(json);
                    } catch (e) {
                        reject({error: e});
                    }
                }
            });
        });
    }

    // Método para obtener el UTC de una fecha y zona a través de Java
    // ${fecha} es la fecha a consultar
    // %{zona} es la zona horaria a consultar
    obtenerUTC(fecha, zona) {
        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            const jar = execFile('java', ['-jar', ruta, '--opc=utc', `--fecha=${fecha}`, `--zona=${zona}`], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        mensaje: `No fue posible consultar UTC; errno = ${error.code}`,
                        estado: false
                    });
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                } else  {
                    try {
                        console.log('-envia JSON-');
                        const json = {
                            estado: true,
                            utc: stdout.trim(),
                            mensaje: 'Extracción realizada correctamente'
                        };

                        console.log(JSON.stringify(json));
                        resolve(json);
                    } catch (e) {
                        reject({error: e});
                    }
                }
            });
        });
    }

    // Método que permite ejecutar el algoritmo de un escenario
    // ${ruta_escenario} es la ruta del escenario
    // ${archivo_exe} es el nombre del ejecutable del algoritmo
    // ${win} es la referencia a webContents de un objeto ipcMain
    ejecutarAlgoritmo(ruta_escenario, archivo_exe, win) {
        return new Promise((resolve, reject) => {
            try {
                let ruta_actual = process.cwd();
                process.chdir(ruta_escenario);
                console.log(`Moviendo a escenario: ${process.cwd()}`);

                this.resultado = '';
                let codigo;
                let mensaje;
                let exito = false;
                let infactible = false;
                this.flag_fin_exe = false;

                const exe = spawn(archivo_exe);
                console.log('Ejecutando', archivo_exe);

                // Activa el método para enviar por lotes
                this.enviarSalida(win);

                exe.stdout.on('data', (data) => {
                    let salida = this.decoder.decode(data).replace(new RegExp('\n+\s*', 'g'), '<br>');

                    if (salida.includes('TERMINACION NORMAL')) {
                        exito = true;
                        salida = salida.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');
                    }

                    if (salida.includes('PROBLEMA INFACTIBLE')) {
                        infactible = true;
                        salida = salida.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');
                    }

                    this.resultado += salida;
                });

                exe.stderr.on('data', (data) => {
                    let salida = this.decoder.decode(data).replace(new RegExp('\n+\s*', 'g'), '<br>');

                    if (salida.includes('TERMINACION NORMAL')) {
                        exito = true;
                        salida = salida.replace('TERMINACION NORMAL', '<font style="color:green; font-weight:bold; text-decoration:underline;">TERMINACION NORMAL</font>');
                    }

                    if (salida.includes('PROBLEMA INFACTIBLE')) {
                        infactible = true;
                        salida = salida.replace('PROBLEMA INFACTIBLE', '<font style="color:red; font-weight:bold; text-decoration:underline;">PROBLEMA INFACTIBLE</font>');
                    }

                    this.resultado += salida;
                });

                exe.on('close', (code) => {
                    console.log(`Finaliza ejecución, código: ${code}`);
                    this.flag_fin_exe = true;
                    codigo = code;
                    mensaje = '';

                    // Regresa a la ubicación
                    process.chdir(ruta_actual);

                    resolve({codigo:codigo, mensaje:mensaje, cadena:this.resultado, exito: exito, infactible:infactible});
                });
            } catch (e) {
                codigo = -12345;
                mensaje = `Error de ejecución ${e.message}`;

                // Regresa a la ubicación
                process.chdir(ruta_actual);

                reject({codigo:codigo, mensaje:mensaje, cadena:this.resultado, exito: exito, infactible:infactible});
            }
        });
    }

    // Método que permite enviar una salida parcial del algoritmo a un proceso renderer
    // ${win} es una referencia a un objeto webContents
    enviarSalida(win) {
        // Envia datos cada 3 segundos
        setTimeout(() => {
            if (this.flag_fin_exe === false) {
                console.log('Envia resultado parcial');
                win.webContents.send('algoritmo:ejecucionParcial', this.resultado);
                this.resultado = '';
                this.enviarSalida(win);
            }
        }, 1000);
    }

    // Método que permite ejecutar un diagnóstico de un escenario infactible
    // ${ruta_escenario} es la ruta del escenario
    // ${archivo_exe} es el nombre del ejecutable
    ejecutarDiagnostico(ruta_escenario, archivo_exe) {
        return new Promise((resolve, reject) => {
            try {
                let ruta_actual = process.cwd();
                process.chdir(ruta_escenario);
                console.log(`Moviendo a escenario: ${process.cwd()}`);

                let resultado = '';
                let codigo;
                let mensaje;

                const exe = spawn(archivo_exe);

                exe.stdout.on('data', (data) => {
                    resultado += this.decoder.decode(data).replace(new RegExp('\n+\s*', 'g'), '<br>');
                });

                exe.stderr.on('data', (data) => {
                    resultado += this.decoder.decode(data).replace(new RegExp('\n+\s*', 'g'), '<br>');
                });

                exe.on('close', (code) => {
                    console.log(`Finaliza ejecución, código: ${code}`);

                    codigo = code;
                    mensaje = '';

                    // Regresa a la ubicación
                    process.chdir(ruta_actual);

                    resolve({codigo:codigo, mensaje:mensaje, cadena:resultado});
                });
            } catch (e) {
                codigo = -12345;
                mensaje = `Error de ejecución ${e.message}`;

                // Regresa a la ubicación
                process.chdir(ruta_actual);

                reject({codigo:codigo, mensaje:mensaje, cadena:resultado});
            }
        });
    }

    // Método para comprimir una carpeta a través de Java
    // ${rutaOrigen} es la ruta de la carpeta origen
    // ${rutaDestino} es la tua del archivo zip destino
    comprimirCarpeta(rutaOrigen, rutaDestino) {
        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            // Borra el archivo primero
            // if (!this.fs.existsSync(rutaDestino)) {
            //     try {
            //         this.fs.unlinkSync(rutaDestino);
            //     } catch (e) {
            //         console.log('Compresion err: ', e.message);
            //     }
            // }

            console.log('ejecuta jar', ruta, rutaOrigen, rutaDestino);
            const jar = execFile('java', ['-jar', ruta, '--opc=zip', `--zipSource=${rutaOrigen}`, `--zipDestino=${rutaDestino}`], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        mensaje: `No fue posible consultar UTC; errno = ${error.code}`,
                        estado: false
                    });
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                } else  {
                    try {
                        console.log('-envia JSON-');
                        const json = {
                            estado: true,
                            mensaje: 'Compresion realizada correctamente'
                        };

                        console.log(JSON.stringify(json));
                        resolve(json);
                    } catch (e) {
                        reject({error: e});
                    }
                }
            });
        });
    }

    // Método para obtener los anios de los escenarios modificados en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    // ${algoritmo} es el algoritmo del escenario
    // ${tipo} indica si es original o modificado ORI|MOD
    obtenerAniosFolios(usuario, url, esquema, password, algoritmo, tipo) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=folios_anios', `--usr=${usuario}`, `--algoritmo=${algoritmo}`, `--tipo=${tipo}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para obtener los meses de los escenarios modificados en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    // ${algoritmo} es el algoritmo del escenario
    // ${anio} es el anio a filtrar en la consulta
    // ${tipo} indica si es original o modificado ORI|MOD
    obtenerMesesFolios(usuario, url, esquema, password, algoritmo, anio, tipo) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=folios_meses', `--usr=${usuario}`, `--algoritmo=${algoritmo}`, `--anio=${anio}`, `--tipo=${tipo}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para obtener los dias de los escenarios modificados en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    // ${algoritmo} es el algoritmo del escenario
    // ${anio} es el anio a filtrar en la consulta
    // ${mes} es el mes a filtrar en la consulta
    // ${tipo} indica si es original o modificado ORI|MOD
    obtenerDiasFolios(usuario, url, esquema, password, algoritmo, anio, mes, tipo) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=folios_dias', `--usr=${usuario}`, `--algoritmo=${algoritmo}`, `--anio=${anio}`, `--mes=${mes}`, `--tipo=${tipo}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para obtener los folios de los escenarios modificados en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    // ${algoritmo} es el algoritmo del escenario
    // ${anio} es el anio a filtrar en la consulta
    // ${mes} es el mes a filtrar en la consulta
    // ${mes} es el dia a filtrar en la consulta
    // ${tipo} indica si es original o modificado ORI|MOD
    obtenerFolios(usuario, url, esquema, password, algoritmo, anio, mes, dia, tipo) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=folios_folios', `--usr=${usuario}`, `--algoritmo=${algoritmo}`, `--anio=${anio}`, `--mes=${mes}`, `--dia=${dia}`, `--tipo=${tipo}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para obtener los folios de los escenarios modificados en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    // ${algoritmo} es el algoritmo del escenario
    // ${id} es el identificador del escenario original a filtrar
    obtenerFoliosPorID(usuario, url, esquema, password, algoritmo, id) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=foliosMod_ID', `--usr=${usuario}`, `--algoritmo=${algoritmo}`, `--id=${id}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para obtener los escenarios originales en BD a través de Java
    // {usuario} es el nombre de usuario de los escenarios
    // ${url} es la url de la BD
    // ${esquema} es el esquema de la BD
    // ${password} es la contraseña del esquema
    obtenerAlgoritmosOriBD(usuario, url, esquema, password) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${url}`, `--esq=${esquema}`, `--pass=${password}`, '--opc=folios_algoritmos', `--usr=${usuario}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR');
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para descargar un escenario modificado desde BD a través de Java
    // {data} es el objeto con la información del escenario:
    // url, esquema, password, usuario, algoritmo, folio y carpeta destino
    descargarEscenarioModBD(data) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${data.url}`, `--esq=${data.esq}`, `--pass=${data.pass}`, '--opc=bajarBD_Mod_Zip', `--usr=${data.usr}`, `--algoritmo=${data.alg}`, `--folio=${data.folio}`, `--carpeta=${data.destMod}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR', json_err);
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para descargar un escenario original desde BD a través de Java
    // {data} es el objeto con la información del escenario:
    // url, esquema, password, usuario, algoritmo, folio y carpeta destino
    descargarEscenarioOriBD(data) {
        return new Promise((resolve, reject) => {
            try {
                let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

                let res_obj = this.ejecutarExecFile('java', ['-jar', ruta, `--url=${data.url}`, `--esq=${data.esq}`, `--pass=${data.pass}`, '--opc=bajarBD_Ori_Zip', `--algoritmo=${data.alg}`, `--folio=${data.id}`, `--carpeta=${data.destOri}`]).then((json) => {
                    console.log('OK');
                    resolve(json);
                }, (json_err) => {
                    console.log('ERROR', json_err);
                    reject(json_err);
                });
            } catch (e) {
                console.log('Excepcion', e.message);
                reject({estado:false, mensaje:e.message});
            }
        });
    }

    // Método para ejecutar un comando genérico
    // ${comando} es el comando a ejecutar
    // ${params} es la lista de parámetros del comando
    ejecutarExecFile(comando, params) {
        return new Promise((resolve, reject) => {
            const jar = execFile(comando, params, {timeout: 10000}, (error, stdout, stderr) => {
                if (error) {
                    reject({estado:false, data:error.message});
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    reject({estado:false, data:stdout.split('->')[1]});
                } else if (stdout.trim().length === 0) {
                    reject({estado:false, data:'No fue posible realizar la autenticación de usuario'});
                } else {
                    try {
                        console.log('-envia JSON-', stdout.trim());
                        const json = JSON.parse(stdout.trim());
                        json.estado = true;
                        json.mensaje = 'Consulta realizada correctamente';
                        resolve(json);
                    } catch (e) {
                        console.log(e);
                        reject({estado:false, data:e.message});
                    }
                }
            });
        });
    }

    // Método para realizar una operación en base de datos (alta, baja, modificadión) de escenarios mediante Java
    // {data} es el objeto con la información del escenario:
    // opcion, folio, usuario, id del escenario, algoritmo, estado, ruta local, sistema
    operacionEnBaseDatos(data, cb_progreso) {
        return new Promise((resolve, reject) => {
            try {
                console.log('Ruta actual: ', process.cwd());
                let rutaJar = this.path.join(__dirname, '..', 'jar', 'DataBaseModuleJar.jar');
                let rutaExe = `java -jar ${rutaJar} ${data.opc} ${data.folio} ${data.usuario} ${data.id} ${data.algoritmo.toUpperCase()} ${data.estado} ${data.ruta + this.path.sep} ${data.sistema}`;
                console.log('Ejecuta: ', rutaExe);

                let codigo;
                let mensaje;
                let aux;
                let porcentaje;
                let flag_error = false;

                const exe = spawn('java', ['-jar', rutaJar, data.opc, data.folio, data.usuario, data.id, data.algoritmo.toUpperCase(), data.estado, data.ruta + this.path.sep, data.sistema]);

                exe.stdout.on('data', (data) => {
                    aux = this.decoder.decode(data);
                    console.log(aux);

                    if (aux.startsWith('Registro')) {
                        let words = aux.split(' ');
                        if (words.length >= 4) {
                            // El progreso se calcula sobre 85, el 15% se obtuvo de la compresion
                            let porcentaje = 15 + (parseInt(words[1]) / parseInt(words[3]) * 85);
                            if (!isNaN(porcentaje)) {
                                cb_progreso(porcentaje, true);
                            }
                        }
                    }

                    // VErifica error
                    if (aux.includes('ERROR')) {
                        flag_error = true;
                        mensaje = aux.split('ERROR')[1];
                    }
                });

                exe.stderr.on('data', (data) => {
                    aux = this.decoder.decode(data);
                    console.log('err>', aux);

                    if (aux.startsWith('Registro')) {
                        let words = aux.split(' ');
                        if (words.length === 4) {
                            let porcentaje = parseInt(words[1]) / parseInt(words[3]) * 100;
                            if (!isNaN(porcentaje)) {
                                cb_progreso(porcentaje, true);
                            }
                        }
                    }

                    // VErifica error
                    if (aux.includes('ERROR')) {
                        flag_error = true;
                        mensaje = aux.split('ERROR')[1];
                    }
                });

                exe.on('close', (code) => {
                    console.log(`Finaliza ejecución BD, código: ${code}`);

                    if (flag_error === true) {
                        reject({estado:false, mensaje:mensaje});
                    } else {
                        resolve({estado:true, progreso: 100, mensaje:''});
                    }
                });
            } catch (e) {
                codigo = -12345;
                mensaje = `Error de ejecución ${e.message}`;

                reject({estado:!flag_error, mensaje:mensaje});
            }
        });
    }

    abrirExploradorEscenario(ruta, tipo) {
        let ruta_real = this.path.normalize(ruta);

        if (tipo !== 'directorio') {
            ruta_real = this.path.dirname(ruta_real);
        }

        console.log('Abriendo ', ruta_real);
        exec(`start ${ruta_real}`);
    }
}

module.exports = Comandos;
