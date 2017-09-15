var Client = require('ftp');

class FTP {
    constructor (config, base) {
        this.c = new Client();
        this.config = config;
        this.fs = require('fs');
        this.path = require('path');
        this.conectado = false;
        this.interval = null;
        this.progresoLista = 0;
        this.progresoArchivo = 0;
    }

    conectar() {
        return new Promise((resolve, reject) => {
            this.c.connect(this.config);
            this.c.on('ready', () => {
                this.conectado = true;
                this.interval = null;
                console.log('FTP conectado');

                this.c.on('end', () => {
                    this.conectado = false;
                    console.log('FTP desconectado');
                });

                resolve();
            });

            this.c.on('error', (err) => {
                this.conectado = false;
                console.log('**ERROR**', '(conectar)', `Código: ${err.code}`);
                console.log('FTP desconectado');
                reject();
            });
        });
    }

    desconectar() {
        this.c.end();
    }

    obtenerTamanoArchivoFTP(obj) {
        return new Promise((resolve, reject) => {
            obj.rutaRemota = obj.rutaRemota.replace(new RegExp('\\' + this.path.sep, 'g'), '/');

            console.log('Consulta ', obj.rutaRemota);
            this.c.size(obj.rutaRemota, (err, size) => {
                if (err) {
                    console.log('**ERROR**', '(tamaño)', obj.rutaRemota, err.message);
                    obj.tamano = -1;
                    reject();
                } else {
                    obj.tamano = size;
                    console.log('size', obj.tamano);
                    resolve();
                }
            });
        });
    }

    descargarDirectorioFTP(listaDir) {
        return new Promise((resolve, reject) => {
            let promesas = [];

            listaDir.forEach((archivo) => {
                // console.log(`${archivo.rutaRemota}: ${archivo.tamano}`);
                promesas.push(this.descargarArchivoFTP(archivo));
            });

            // Interval para actualizar el progreso de la lista
            if (this.interval === null) {
                console.log('Activando interval progreso');
                this.interval = setInterval(() => {
                    let cont = 0;
                    listaDir.forEach((item) => {
                        if (typeof item.completado !== 'undefined' && item.completado) {
                            cont++;
                        }
                    });

                    this.progresoLista = (cont / listaDir.length * 100.0);
                    if (this.progresoLista >= 100) {
                        clearInterval(this.interval);
                        console.log('desactivando interval progreso');
                        this.interval = null;
                    }
                }, 1000);
            }

            setTimeout(() => {
                Promise.all(promesas).then(() => {
                    resolve();
                }, () => {
                    reject();
                });
            }, 3000);
        });
    }

    getProgresoLista() {
        return this.progresoLista;
    }

    getProgresoArchivo() {
        return this.progresoArchivo;
    }

    descargarArchivoFTP(info) {
        return new Promise((resolve, reject) => {
            if (!this.conectado) {
                console.log('No hay conexion');
                reject();
            }

            if (typeof info.rutaRemota === 'undefined') {
                console.log('No hay ruta remota');
                reject();
            }

            if (typeof info.rutaLocal === 'undefined') {
                console.log('No hay ruta local');
                reject();
            }

            let bytes = 0;

            info.rutaLocal = this.path.normalize(info.rutaLocal);

            // Antes de descargar asegura su directorio
            if (!this.fs.existsSync(info.rutaLocal)) {
                let carpetas = this.path.dirname(this.path.normalize(info.rutaLocal)).split(this.path.sep);
                // console.log(`Carpetas ${carpetas}`);
                let rutaTemp = carpetas[0];
                for (let i = 1; i < carpetas.length; i++) {
                    rutaTemp = this.path.join(rutaTemp, carpetas[i]);
                    console.log(rutaTemp);
                    if (!this.fs.existsSync(rutaTemp)) {
                        // console.log(`Creando carpeta: ${rutaTemp}`);
                        this.fs.mkdirSync(rutaTemp);
                    }
                }
            }

            this.c.get(info.rutaRemota, (err, stream) => {
                if (err) {
                    console.log('**ERROR**', '(descargar archivo)', info.rutaRemota, err);
                    reject(err);
                } else {
                    stream.on('data', (chunk) => {
                        bytes += chunk.length;
                        info.progreso = bytes / info.tamano * 100;
                        this.progresoArchivo = info.progreso;
                        //console.log(`Progreso: ${(bytes / info.tamano * 100).toFixed(2)}%`);
                    });
                    stream.on('close', () => {
                        // Archivo completo
                        if (this.progresoArchivo >= 100) {
                            info.completado = true;
                        }

                        resolve();
                    });
                    stream.pipe(this.fs.createWriteStream(info.rutaLocal));
                }
            });
        });
    }

    obtenerListaDirectorio(ruta, rutaReplace, rutaLocal, listaDir) {
        // forzar separador linux
        ruta = ruta.replace(new RegExp('\\' + this.path.sep, 'g'), '/');

        return new Promise((resolve, reject) => {
            let prom_listaDir = [];

            prom_listaDir.push(new Promise((resolve, reject) => {
                this.c.list(ruta, (err, list) => {
                    if (err) {
                        console.log('**ERROR** ', '(lista directorio)', ruta, err.message);
                        reject(err);
                    };

                    list.forEach((element, index, array) => {
                        if (element.type === 'd') {
                            prom_listaDir.push(this.obtenerListaDirectorio(this.path.join(ruta, element.name), rutaReplace, rutaLocal, listaDir));
                        } else {
                            listaDir.push({
                                rutaRemota: this.path.join(ruta, element.name).replace(new RegExp('\\' + this.path.sep, 'g'), '/'),
                                rutaLocal: this.path.normalize(this.path.join(ruta, element.name).replace(this.path.normalize(rutaReplace), rutaLocal)),
                                nombre: element.name,
                                directorio: ruta,
                                tamano: element.size
                            });
                        }
                    });
                    resolve();
                });
            }));

            // Espera disparo de promesas
            setTimeout(() => {
                Promise.all(prom_listaDir).then(() => {
                    resolve();
                }, () => {
                    reject();
                });
            }, 500);
        });
    }

    obtenerListaArchivosDir(ruta, rutaReplace, rutaLocal, listaDir) {
        // forzar separador linux
        ruta = ruta.replace(new RegExp('\\' + this.path.sep, 'g'), '/');
        return new Promise((resolve, reject) => {
            this.c.list(ruta, (err, list) => {
                if (err) {
                    console.log('**ERROR**', '(lista directorio [archivos])', ruta, err.message);
                    reject(err);
                };

                list.forEach((element, index, array) => {
                    console.log('Elemento', element.name);
                    // Obtiene solo archivos
                    if (element.type !== 'd') {
                        listaDir.push({
                            rutaRemota: this.path.join(ruta, element.name).replace(new RegExp('\\' + this.path.sep, 'g'), '/'),
                            rutaLocal: this.path.normalize(this.path.join(ruta, element.name).replace(this.path.normalize(rutaReplace), rutaLocal)),
                            nombre: element.name,
                            directorio: ruta,
                            tamano: element.size
                        });
                    }
                });
                resolve();
            });
        });
    }
}

module.exports = FTP;
