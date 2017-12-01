const { execFile, exec, spawn } = require('child_process');

class Comandos {
    constructor() {
        this.config = require('./config.js');
        this.path = require('path');
        const {TextDecoder} = require('text-encoding');
        this.decoder = new TextDecoder();
        this.fs = require('fs');
        this.resultado = '';
        this.flag_fin_exe = false;
    }

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

    descomprimir(archivoTar, dia, id_escenario, carpeta, eliminar) {
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

    comprimirCarpeta(rutaOrigen, rutaDestino) {
        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            // Borra el archivo primero
            if (!this.fs.existsSync(rutaDestino)) {
                try {
                    this.fs.unlinkSync(rutaDestino);
                } catch (e) {
                    console.log('Compresion err: ', e.message);
                }
            }

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

    guardarEnBaseDatos(data, cb_progreso) {
        return new Promise((resolve, reject) => {
            try {
                console.log('Ruta actual: ', process.cwd());
                let rutaJar = this.path.join(__dirname, '..', 'jar', 'DataBaseModuleJar.jar');
                let rutaExe = `java -jar ${rutaJar} ${data.opc} ${data.folio} ${data.usuario} ${data.id} ${data.algoritmo} ${data.estado} ${data.ruta + this.path.sep} ${data.sistema}`;
                console.log('Ejecuta: ', rutaExe);

                let codigo;
                let mensaje;
                let aux;
                let porcentaje;
                let flag_error = false;

                const exe = spawn('java', ['-jar', rutaJar, data.opc, data.folio, data.usuario, data.id, data.algoritmo, data.estado, data.ruta + this.path.sep, data.sistema]);

                exe.stdout.on('data', (data) => {
                    aux = this.decoder.decode(data);
                    console.log(aux);

                    if (aux.startsWith('Registro')) {
                        let words = aux.split(' ');
                        if (words.length === 4) {
                            let porcentaje = parseInt(words[1]) / parseInt(words[3]) * 100;
                            cb_progreso(porcentaje, true);
                        }
                    }

                    // VErifica error
                    if (aux.startsWith('ERROR FATAL')) {
                        flag_error = true;
                        mensaje = '';
                    }
                });

                exe.stderr.on('data', (data) => {
                    aux = this.decoder.decode(data);
                    // console.log('err>', aux);

                    if (aux.startsWith('Registro')) {
                        let words = aux.split(' ');
                        if (words.length === 4) {
                            let porcentaje = parseInt(words[1]) / parseInt(words[3]) * 100;
                            cb_progreso(porcentaje, true);
                        }
                    }

                    // VErifica error
                    if (aux.startsWith('ERROR FATAL')) {
                        flag_error = true;
                        mensaje = '';
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
}

module.exports = Comandos;
