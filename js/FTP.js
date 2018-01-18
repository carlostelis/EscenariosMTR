// Clase del módulo ftp
var Client = require('ftp');

// Clase que permite administrar las conexiones FTP
class FTP {
    // constructor de la clase
    // ${config} es un objeto con datos de la conexión
    // ${base} es la referencia a la configuración local
    constructor (config, base) {
        this.config = config;
        this.fs = require('fs');
        this.path = require('path');
        this.interval = null;
        this.timeout = null;
        this.progresoLista = 0;
        this.progresoArchivo = 0;
        this.c = null;
    }

    // Método que permite conectar con los parámetros establecidos en config
    conectar() {
        return new Promise((resolve, reject) => {
            if (this.c !== null) {
                this.desconectar();
            }
            this.c = new Client();
            this.c.connect(this.config);
            this.c.on('ready', () => {
                this.interval = null;
                console.log('FTP conectado');

                this.c.on('end', () => {
                    console.log('FTP desconectado');
                });

                resolve();
            });

            this.c.on('error', (err) => {
                console.log('**ERROR**', '(conectar)', `Código: ${err.code}`);
                console.log('FTP desconectado');
                reject();
            });
        });
    }

    // Método para finalizar la conexión
    desconectar() {
        this.c.end();
        this.c = null;
        this.progresoLista = 0;
        this.progresoArchivo = 0;
    }

    // Método para obtener el tamaño de un archivo
    // ${obj} es el objeto con la información del archivo
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

    // Método para descargar un directorio
    // ${listaDir} es la lista de archivos del directorio
    descargarDirectorioFTP(listaDir) {
        return new Promise((resolve, reject) => {
            let promesas = [];

            listaDir.forEach((archivo) => {
                // console.log(`${archivo.rutaRemota}: ${archivo.tamano}`);
                promesas.push(this.descargarArchivoFTP(archivo));
            });

            this.verificarProgresoDescarga(listaDir);

            setTimeout(() => {
                Promise.all(promesas).then(() => {
                    resolve();
                }, () => {
                    reject();
                });
            }, 3000);
        });
    }

    // Método para verificar y establecer el progreso de una descarga
    verificarProgresoDescarga(listaDir) {
        setTimeout(() => {
            let cont = 0;
            listaDir.forEach((item) => {
                if (typeof item.completado !== 'undefined' && item.completado) {
                    cont++;
                }
            });

            this.progresoLista = (cont / listaDir.length * 100.0);
            if (this.progresoLista >= 100) {
                console.log('desactivando timeout progreso');
            } else {
                this.verificarProgresoDescarga(listaDir);
            }
        }, 1000);
    }

    // Método para obtener el prgreso de la descarga de un directorio
    getProgresoLista() {
        return this.progresoLista;
    }

    // Método para obtener el prgreso de la descarga de un archivo
    getProgresoArchivo() {
        return this.progresoArchivo;
    }

    // Método para descargar un archivo
    // ${info} es un objeto con la información del archivo
    descargarArchivoFTP(info) {
        return new Promise((resolve, reject) => {
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
                    //console.log(rutaTemp);
                    if (!this.fs.existsSync(rutaTemp)) {
                        // console.log(`Creando carpeta: ${rutaTemp}`);
                        this.fs.mkdirSync(rutaTemp);
                    }
                }
            }

            // console.log('FTP Descargar', info.rutaRemota, 'a', info.rutaLocal);
            this.c.get(info.rutaRemota, (err, stream) => {
                if (err) {
                    console.log('**ERROR**', '(descargar archivo)', info.rutaRemota, err.message);
                    reject(err);
                } else {
                    stream.on('data', (chunk) => {
                        bytes += chunk.length;
                        info.progreso = bytes / info.tamano * 100;
                        this.progresoArchivo = info.progreso;
                        // console.log(`Progreso: ${this.progresoArchivo.toFixed(2)}%`);
                    });
                    stream.on('close', () => {
                        // Archivo completo
                        if (this.progresoArchivo >= 100) {
                            info.completado = true;
                        } else {
                            info.completado = false;
                        }

                        resolve();
                    });
                    stream.pipe(this.fs.createWriteStream(info.rutaLocal));
                }
            });
        });
    }

    // Método para descargar un archivo sin cálculo de progreso
    // ${rutaRemota} es la ruta del archivo a descargar
    // ${rutaLocal} es la ruta destino del archivo
    descargarArchivoFTPSimple(rutaRemota, rutaLocal) {
        return new Promise((resolve, reject) => {
            if (typeof rutaRemota === 'undefined') {
                console.log('No hay ruta remota');
                reject();
            }

            if (typeof rutaLocal === 'undefined') {
                console.log('No hay ruta local');
                reject();
            }

            rutaRemota = rutaRemota.replace(new RegExp('\\' + this.path.sep, 'g'), '/');
            console.log('Busca', rutaRemota);
            this.c.get(rutaRemota, (err, stream) => {
                if (err) {
                    console.log('**ERROR**', '(descargar archivo simple)', rutaRemota, err.message);
                    reject(err);
                } else {
                    stream.on('close', () => {
                        resolve();
                    });
                    console.log('Sin error');
                    stream.pipe(this.fs.createWriteStream(rutaLocal));
                }
            });
        });
    }

    // Método para obtener la lista de directorios de un directorio
    // ${ruta} es la ruta del directorio remoto
    // ${rutaReplace} es una ruta remota a sustituir en la ruta local
    // ${rutaLocal} es la ruta local sustituta
    // ${listaDir} es la lista de directorios
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

                    if (typeof list === 'undefined') {
                        console.log('**ERROR**', '(lista directorio indefinida)');
                        reject();
                        return;
                    } else {
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
                    }
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

    // Método para obtener la lista de archivos de un directorio
    // ${ruta} es la ruta del directorio
    obtenerListaDirectorioSimple(ruta) {
        // forzar separador linux
        ruta = ruta.replace(new RegExp('\\' + this.path.sep, 'g'), '/');

        return new Promise((resolve, reject) => {
            this.c.list(ruta, (err, list) => {
                if (err) {
                    console.log('**ERROR** ', '(lista directorio)', ruta, err.message);
                    reject(err);
                };

                resolve(list);
            });
        });
    }

    // Método para obtener la lista de archivos de un directorio
    // ${ruta} es la ruta del directorio remoto
    // ${rutaReplace} es una ruta remota a sustituir en la ruta local
    // ${rutaLocal} es la ruta local sustituta
    // ${listaDir} es la lista de directorios
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
                    //console.log('Elemento', element.name);
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
