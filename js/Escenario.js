
class Escenario {
    constructor () {
        this.path = require('path');
        this.fs = require('fs');
        this.archivosDersi = require('./archivos_dersi.js');
        this.archivosDersmi = require('./archivos_dersmi.js');
        this.archivosAutr = require('./archivos_autr.js');
        this.archivosPtr;
    }

    parseEscenario(ruta_escenario, algoritmo) {
        console.log(ruta_escenario, algoritmo);

        // Selecciona la lista de archivos acorde al algoritmo
        switch (algoritmo) {
            case 'dersi': this.archivosPtr = this.archivosDersi; break;
            case 'dersmi': this.archivosPtr = this.archivosDersmi; break;
            case 'autr': this.archivosPtr = this.archivosAutr; break;
        }

        return new Promise((resolve, reject) => {
            let promesas = [];
            // Establece la carpeta dirdat, donde se encuentran los archivos csv
            let ruta_dirdat = this.path.join(ruta_escenario, 'dirdat');
            console.log('parsing:', ruta_dirdat);
            let contador = 0;
            let archivosJSON = {
                numArchivos: 0,
                lista: []
            };

            this.fs.readdir((ruta_dirdat), (err, files) => {
                files.forEach((file) => {
                    //console.log('>>', file);
                    if (contador < 10) {
                        promesas.push(this.parseArchivoCSV(this.path.join(ruta_dirdat, file), archivosJSON));
                    }
                });
            });

            // Espera creacion de promesas
            setTimeout(() => {
                Promise.all(promesas).then(() => {
                    resolve(archivosJSON);
                }, () => {
                    reject();
                });
            }, 1000);
        });
    }

    parseArchivoCSV(ruta_archivo, objJSON) {
        return new Promise((resolve, reject) => {
            let extension = this.path.extname(ruta_archivo).toLowerCase();
            if (extension !== '.csv') {
                console.log('No es CSV', ruta_archivo, extension);
                // No es CSV, tampoco es error
                resolve();
            } else {
                let datosArchivo = {
                    archivo: this.path.basename(ruta_archivo),
                    numFilas: 0,
                    numColumnas: 0,
                    editable: false,
                    filas: []
                };

                console.log(datosArchivo.archivo);
                // Buscar en json
                for (let archivoObj of this.archivosPtr) {
                    if (archivoObj.nombre === datosArchivo.archivo) {
                        datosArchivo.editable = archivoObj.editable;
                        break;
                    }
                }

                // Leer datos
                this.fs.readFile(ruta_archivo, 'utf8', (err, data) => {
                    if (err) {
                        console.log('No fue posible leer', ruta_archivo, err.message);
                        reject();
                    } else {
                        //console.log(data);
                        datosArchivo.filas = this.parseData(data);
                        datosArchivo.numFilas = datosArchivo.filas.length;
                    }
                });

                objJSON.lista.push(datosArchivo);
                objJSON.numArchivos++;

                resolve();
            }
        });
    }

    parseData(data) {
        let lineas = data.split('\n');
        //console.log('lineas:', lineas.length);

        let filas = [];

        if (lineas.length > 1) {
            lineas.forEach((linea) => {
                if (linea.trim().length > 0) {
                    let filaObj = [];
                    let fila = linea.trim().split(',');

                    // Busca cadenas
                    for (let i = 0; i < fila.length; i++) {
                        if (fila[i].startsWith('"') && !fila[i].endsWith('"')) {
                            if (i < (fila.length - 1)) {
                                if (fila[i + 1].endsWith('"')) {
                                    console.log('Uniendo', fila[i], fila[i + 1]);
                                    fila[i] = fila[i] + fila[i + 1];
                                    fila[i + 1] = 'IGNORAR';
                                }
                            }
                        }
                    }

                    fila.forEach((valor) => {
                        if (valor !== 'IGNORAR') {
                            let dato = {
                                valor: valor.replace(new RegExp('\\"' , 'g'), ''),
                                editado: false
                            };
                            filaObj.push(dato);
                        }
                    });

                    filas.push(filaObj);
                }
            });
        }

        return filas;
    }
}

module.exports = Escenario;
