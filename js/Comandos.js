const { execFile } = require('child_process');

class Comandos {
    constructor() {
        this.config = require('./config.js');
        this.path = require('path');
    }

    obtenerUsuario(usuario) {
        let that = this;

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
        let that = this;

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
        let that = this;

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
}

module.exports = Comandos;
