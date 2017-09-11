var Client = require('ftp');

class FTP {
    constructor (config, base) {
        this.c = new Client();
        this.config = config;
        this.rutaBase = base;
        this.fs = require('fs');
        this.path = require('path');
    }

    setRutaBase(base) {
        this.rutaBase = base;
    }

    descargarFTP(ruta, nombre) {
        this.ruta = ruta;
        this.promesas = [];
        this.total = 0;
        this.descargados = 0;
        this.raiz = {
            nombre: nombre,
            rutaCompleta: this.ruta,
            directorios: [],
            archivos: []
        };

        this.c.on('ready', () => {
            console.log('FTP conectado');

            setTimeout(() => {
                console.log('promesas: ' + this.promesas.length);
                Promise.all(this.promesas).then(() => {
                    console.log('fin');
                    this.print(this.raiz);

                    this.total = this.contarArchivos(this.raiz);
                    console.log(`Total archivos: ${this.total}`);

                    try {
                        this.fs.mkdirSync(this.rutaBase);
                    } catch (e) {}
                    this.descargar(this.raiz, this.rutaBase);
                });
            }, 3000);

            this.leerDirectorio(this.ruta, this.raiz);
        });

        this.c.connect(this.config);
    }

    leerDirectorio(ruta, objDir) {
        let promesa = new Promise((resolve, reject) => {
            this.c.list(ruta, (err, list) => {
                if (err) {
                    reject();
                };

                list.forEach((element, index, array) => {
                    //Ignore directories
                    if (element.type === 'd') {
                        let newDir = {
                            nombre: element.name,
                            rutaCompleta: ruta + '/' + element.name,
                            directorios: [],
                            archivos: []
                        };

                        objDir.directorios.push(newDir);
                        this.leerDirectorio(newDir.rutaCompleta, newDir);
                    } else {
                        let newFile = {
                            nombre: element.name,
                            rutaCompleta: ruta + '/' + element.name,
                        };
                        objDir.archivos.push(newFile);
                    }
                });
                resolve();
            });
        });

        this.promesas.push(promesa);
    }

    print(dir) {
        console.log(` > ${dir.rutaCompleta}`);
        let i = 1;
        dir.archivos.forEach((archivo) => {
            console.log(` ${i++} >>> ${archivo.nombre}`);
        });

        dir.directorios.forEach((directorio) => {
            this.print(directorio);
        });
    }

    contarArchivos(dir) {
        let contador = dir.archivos.length;
        dir.directorios.forEach((dir) => {
            contador += this.contarArchivos(dir);
        });

        return contador;
    }

    descargar(dir, base) {
        let rutaDir = this.path.join(base, dir.nombre);
        let locales = 0;
        console.log(`Creando directorio: ${rutaDir}`);
        this.fs.mkdirSync(rutaDir);

        new Promise((resolve, reject) => {
            dir.archivos.forEach((archivo) => {
                this.c.get(archivo.rutaCompleta, (err, stream) => {
                    if (err) {
                        console.log(err);
                        reject();
                    }

                    let rutaArchivo = this.path.join(rutaDir, archivo.nombre);
                    console.log(`descargar ${rutaArchivo}`);
                    stream.once('close', () => {
                        this.descargados++;
                        locales++;

                        if (locales === dir.archivos.length) {
                            console.log('Directorio descargado');
                            resolve();
                        }

                        this.verificarProgreso();
                    });
                    stream.pipe(this.fs.createWriteStream(rutaArchivo));
                });
            });
        }).then(() => {
            dir.directorios.forEach((subdir) => {
                this.descargar(subdir, rutaDir)
            });
        });
    }

    getProgreso() {
        return this.descargados / this.total * 100;
    }

    verificarProgreso() {
        console.log(`Descargados: ${this.descargados}/${this.total} -> (${this.getProgreso()}%)`);

        if (this.descargados === this.total) {
            console.log('Fin descarga');
            this.c.end();
        }
    }
}

module.exports = FTP;
