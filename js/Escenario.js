
class Escenario {
    constructor () {
        this.path = require('path');
        this.fs = require('fs');
        this.archivosDersi = require('./archivos_dersi.js');
        this.archivosDersmi = require('./archivos_dersmi.js');
        this.archivosAutr = require('./archivos_autr.js');
        this.archivoInsumos = require('./insumos.js');
        this.unidades_ref = [];
        this.unidades_obj = [];
        this.unidades_destino_ref = [];
        this.unidades_destino_obj = [];
    }

    parseEscenario(ruta_escenario, algoritmo, filtro) {
        console.log(ruta_escenario, algoritmo);

        // Selecciona la lista de archivos acorde al algoritmo
        // switch (algoritmo) {
        //     case 'dersi': this.archivoInsumos = this.archivosDersi; break;
        //     case 'dersmi': this.archivoInsumos = this.archivosDersmi; break;
        //     case 'autr': this.archivoInsumos = this.archivosAutr; break;
        // }

        this.unidades_ref = [];
        this.unidades_obj = [];
        this.unidades_destino_ref = [];
        this.unidades_destino_obj = [];
        for (let archivoObj of this.archivoInsumos) {
            if (typeof archivoObj.unidades !== 'undefined' && archivoObj.unidades === true) {
                // Verifica si es archivo de unidades
                this.unidades_ref.push(archivoObj);
            }

            if (typeof archivoObj.origen_unidades !== 'undefined') {
                // Verifica si es archivo de unidades
                this.unidades_destino_ref.push(archivoObj);
            }
        }

        return new Promise((resolve, reject) => {
            let promesas = [];
            // Establece la carpeta dirdat, donde se encuentran los archivos csv
            let ruta_dirdat = this.path.join(ruta_escenario, 'dirdat');
            console.log('parsing:', ruta_dirdat);
            let contador = 0;
            let archivosJSON = {
                ruta: ruta_escenario,
                algoritmo: algoritmo,
                numArchivos: 0,
                lista: []
            };

            let to;

            this.fs.readdir((ruta_dirdat), (err, files) => {
                for (let i = 0; i < files.length; i++) {
                    if (filtro === 'ENTRADAS') {
                        /* *************************************************** */
                        /* Temporal mientras queda el archivo de configuracion */
                        /* *************************************************** */
                        if (files[i].startsWith('DTR') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('DERS_MI_TOTALES_AREA') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('RESUMEN_UNIDADES') || files[i].startsWith('SEMAFOROSDERS')) {
                            // console.log('Ignorando resultado', files[i]);
                            continue;
                        }
                    } else if (filtro === 'RESULTADOS') {
                        if (!files[i].startsWith('DTR') && !files[i].startsWith('DERS_MI_TOTALES_') && !files[i].startsWith('DERS_I_TOTALES_') && !files[i].startsWith('DERS_I_TOTALES_') && !files[i].startsWith('DERS_MI_TOTALES_AREA') && !files[i].startsWith('RESUMEN_UNIDADES') && !files[i].startsWith('SEMAFOROSDERS')) {
                            // console.log('Ignorando entrada', files[i]);
                            continue;
                        }
                    }

                    let resultado = false;
                    to = i * 10;
                    setTimeout(() => {
                        // Marca los resultados
                        if (files[i].startsWith('DTR') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('DERS_MI_TOTALES_AREA') || files[i].startsWith('DERS_I_TOTALES_') || files[i].startsWith('RESUMEN_UNIDADES') || files[i].startsWith('SEMAFOROSDERS')) {
                            resultado = true;
                        }

                        promesas.push(this.parseArchivoCSV(this.path.join(ruta_dirdat, files[i]), archivosJSON, resultado));
                    }, to);
                }

                // Espera creacion de promesas
                setTimeout(() => {
                    Promise.all(promesas).then(() => {
                        console.log('Archivos de unidades:', this.unidades_obj.length);
                        console.log('Archivos de origen unidades:', this.unidades_destino_obj.length);

                        // Busca las referencias de las unidades para asociarlas
                        this.unidades_destino_obj.forEach((datosDestino) => {
                            // Busca sus unidades
                            let datosUnidades = this.unidades_obj.find((datosArchivo) => {
                                return datosArchivo.archivo === datosDestino.unidades;
                            });
                            // console.log('datos unidades', datosUnidades);
                            // Si encontró alguno...
                            if (datosUnidades) {
                                for (let i = 0, j = 0; i < datosDestino.filas.length; i++) {
                                    try {
                                        let objDatoOri;

                                        // Si se incluyen segmentos, se repite cada unidad 11 veces;
                                        // la tabla destino debe tener #UNIDADES * 11 registros
                                        if (typeof datosDestino.num_segmentos !== 'undefined' && datosDestino.num_segmentos > 0) {
                                            objDatoOri = datosUnidades.filas[j][0];
                                            if (i > 0 && ((i + 1) % datosDestino.num_segmentos) === 0) {
                                                j++;
                                            }
                                        } else {
                                            objDatoOri = datosUnidades.filas[i][0];
                                        }

                                        // flag unidadad servira para inhabilitar la edición del valor de la tabla
                                        // Temporal hasta que se consoliden los archivos de configuracion
                                        let objDato = {
                                            valor: objDatoOri.valor,
                                            editado: false,
                                            tipo: objDatoOri.tipo,
                                            flag_unidad: true
                                        };
                                        datosDestino.filas[i].unshift(objDato);
                                        // console.log('Unidad', datosUnidades.filas[i][0].valor);
                                    } catch (e) {}
                                }
                            }
                        });

                        resolve(archivosJSON);
                    }, () => {
                        reject();
                    });
                }, to + 100);
            });
        });
    }

    parseEscenarioNew(ruta_escenario, algoritmo, filtro) {
        console.log(ruta_escenario, algoritmo);

        this.unidades_ref = [];
        this.unidades_obj = [];
        this.unidades_destino_ref = [];
        this.unidades_destino_obj = [];

        for (let archivoObj of this.archivoInsumos) {
            if (typeof archivoObj.unidades !== 'undefined' && archivoObj.unidades === true) {
                // Verifica si es archivo de unidades
                this.unidades_ref.push(archivoObj);
            }

            if (typeof archivoObj.origen_unidades !== 'undefined') {
                // Verifica si es archivo de unidades
                this.unidades_destino_ref.push(archivoObj);
            }
        }

        return new Promise((resolve, reject) => {
            let promesas = [];
            // Establece la carpeta dirdat, donde se encuentran los archivos csv
            let ruta_dirdat = this.path.join(ruta_escenario, 'dirdat');
            console.log('parsing:', ruta_dirdat);
            let contador = 0;
            let archivosJSON = {
                ruta: ruta_escenario,
                algoritmo: algoritmo,
                numArchivos: 0,
                lista: []
            };

            let to;

            this.fs.readdir((ruta_dirdat), (err, files) => {
                for (let i = 0; i < files.length; i++) {
                    if (filtro === 'ENTRADAS') {
                        /* *************************************************** */
                        /* Temporal mientras queda el archivo de configuracion */
                        /* *************************************************** */
                        if (files[i].startsWith('DTR') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('DERS_MI_TOTALES_AREA') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('RESUMEN_UNIDADES') || files[i].startsWith('SEMAFOROSDERS')) {
                            // console.log('Ignorando resultado', files[i]);
                            continue;
                        }
                    } else if (filtro === 'RESULTADOS') {
                        if (!files[i].startsWith('DTR') && !files[i].startsWith('DERS_MI_TOTALES_') && !files[i].startsWith('DERS_I_TOTALES_') && !files[i].startsWith('DERS_I_TOTALES_') && !files[i].startsWith('DERS_MI_TOTALES_AREA') && !files[i].startsWith('RESUMEN_UNIDADES') && !files[i].startsWith('SEMAFOROSDERS')) {
                            // console.log('Ignorando entrada', files[i]);
                            continue;
                        }
                    }

                    let resultado = false;
                    to = i * 10;
                    setTimeout(() => {
                        // Marca los resultados
                        if (files[i].startsWith('DTR') || files[i].startsWith('DERS_MI_TOTALES_') || files[i].startsWith('DERS_MI_TOTALES_AREA') || files[i].startsWith('DERS_I_TOTALES_') || files[i].startsWith('RESUMEN_UNIDADES') || files[i].startsWith('SEMAFOROSDERS')) {
                            resultado = true;
                        }

                        promesas.push(this.parseArchivoCSVNew(this.path.join(ruta_dirdat, files[i]), archivosJSON, algoritmo, resultado));
                    }, to);
                }

                // Espera creacion de promesas
                setTimeout(() => {
                    Promise.all(promesas).then(() => {
                        console.log('Archivos de unidades:', this.unidades_obj.length);
                        console.log('Archivos de origen unidades:', this.unidades_destino_obj.length);

                        // Busca las referencias de las unidades para asociarlas
                        this.unidades_destino_obj.forEach((datosDestino) => {
                            // Busca sus unidades
                            let datosUnidades = this.unidades_obj.find((datosArchivo) => {
                                return datosArchivo.archivo === datosDestino.unidades;
                            });
                            // console.log('datos unidades', datosUnidades);
                            // Si encontró alguno...
                            if (datosUnidades) {
                                for (let i = 0, j = 0; i < datosDestino.filas.length; i++) {
                                    try {
                                        let objDatoOri;

                                        // Si se incluyen segmentos, se repite cada unidad 11 veces;
                                        // la tabla destino debe tener #UNIDADES * 11 registros
                                        if (typeof datosDestino.num_segmentos !== 'undefined' && datosDestino.num_segmentos > 0) {
                                            objDatoOri = datosUnidades.filas[j][0];
                                            if (i > 0 && ((i + 1) % datosDestino.num_segmentos) === 0) {
                                                j++;
                                            }
                                        } else {
                                            objDatoOri = datosUnidades.filas[i][0];
                                        }

                                        // flag unidadad servira para inhabilitar la edición del valor de la tabla
                                        // Temporal hasta que se consoliden los archivos de configuracion
                                        let objDato = {
                                            valor: objDatoOri.valor,
                                            editado: false,
                                            tipo: objDatoOri.tipo,
                                            flag_unidad: true
                                        };
                                        datosDestino.filas[i].unshift(objDato);
                                        // console.log('Unidad', datosUnidades.filas[i][0].valor);
                                    } catch (e) {}
                                }
                            }
                        });

                        resolve(archivosJSON);
                    }, () => {
                        reject();
                    });
                }, to + 100);
            });
        });
    }

    parseArchivoCSV(ruta_archivo, objJSON, resultado) {
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

                if (typeof resultado !== 'undefined') {
                    datosArchivo.isResultado = resultado;
                }

                console.log(datosArchivo.archivo);
                // Buscar en json
                for (let archivoObj of this.archivoInsumos) {
                    // Verifica si el archivo será editable
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

                        // Si es DERS_MI_TOTALES_AREA devuelve el último ciclo
                        if (datosArchivo.archivo === 'DERS_MI_TOTALES_AREA.csv') {
                            let cont_ciclos = 0;
                            let ultimo_ciclo = -1;
                            let n = 0;
                            datosArchivo.filas.forEach((fila) => {
                                if (fila[0].valor.trim() === 'Intervalo') {
                                    // Incrementa contador
                                    cont_ciclos++;
                                    // Guarda la fila
                                    ultimo_ciclo = n;
                                }

                                n++;
                            });

                            // Si hay más de 1 ciclo, conserva el último
                            console.log('>>>>> Eliminando', ultimo_ciclo, 'registros, hay', datosArchivo.numFilas);
                            if (cont_ciclos > 1) {
                                for (let i = 0; i < ultimo_ciclo; i++) {
                                    datosArchivo.filas.shift();
                                }

                                // IGuala el numero de filas
                                datosArchivo.numFilas = datosArchivo.filas.length;
                                console.log('Quedaron', datosArchivo.numFilas);
                            }
                        }
                    }
                });

                // Verifica si es de unidades
                for (let ref of this.unidades_ref) {
                    if (datosArchivo.archivo === ref.nombre) {
                        this.unidades_obj.push(datosArchivo);
                        console.log('>> Unidades');
                    }
                }

                // Verifica si es de unidades
                for (let ref of this.unidades_destino_ref) {
                    if (datosArchivo.archivo === ref.nombre) {
                        datosArchivo.unidades = ref.origen_unidades;

                        // Verifica si se incluyen registros por segmentos
                        if (typeof ref.segmentos_unidades !== 'undefined') {
                            datosArchivo.num_segmentos = parseInt(ref.segmentos_unidades);
                        }

                        this.unidades_destino_obj.push(datosArchivo);
                        console.log('>> Destinos:', datosArchivo.unidades);
                    }
                }

                objJSON.lista.push(datosArchivo);
                objJSON.numArchivos++;

                resolve();
            }
        });
    }

    parseArchivoCSVNew(ruta_archivo, objJSON, algoritmo, resultado) {
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
                    algoritmo: algoritmo,
                    filas: []
                };

                if (typeof resultado !== 'undefined') {
                    datosArchivo.isResultado = resultado;
                }

                console.log(datosArchivo.archivo);
                // Buscar en json
                let objInsumo;
                for (let archivoObj of this.archivoInsumos) {
                    // Verifica si el archivo será editable
                    if (archivoObj.nombre === datosArchivo.archivo) {
                        datosArchivo.editable = archivoObj.editable;
                        datosArchivo.insumo = archivoObj;

                        break;
                    }
                }

                // Leer datos
                this.fs.readFile(ruta_archivo, 'utf8', (err, data) => {
                    if (err) {
                        console.log('No fue posible leer', ruta_archivo, err.message);
                        reject();
                    } else {
                        console.log(">>>>>>", datosArchivo.insumo.modelo.id);
                        datosArchivo.filas = this.parseDataNew(data, datosArchivo.insumo);
                        datosArchivo.numFilas = datosArchivo.filas.length;

                        // Si es DERS_MI_TOTALES_AREA devuelve el último ciclo
                        // if (datosArchivo.archivo === 'DERS_MI_TOTALES_AREA.csv') {
                        //     let cont_ciclos = 0;
                        //     let ultimo_ciclo = -1;
                        //     let n = 0;
                        //     datosArchivo.filas.forEach((fila) => {
                        //         if (fila[0].valor.trim() === 'Intervalo') {
                        //             // Incrementa contador
                        //             cont_ciclos++;
                        //             // Guarda la fila
                        //             ultimo_ciclo = n;
                        //         }
                        //
                        //         n++;
                        //     });
                        //
                        //     // Si hay más de 1 ciclo, conserva el último
                        //     console.log('>>>>> Eliminando', ultimo_ciclo, 'registros, hay', datosArchivo.numFilas);
                        //     if (cont_ciclos > 1) {
                        //         for (let i = 0; i < ultimo_ciclo; i++) {
                        //             datosArchivo.filas.shift();
                        //         }
                        //
                        //         // IGuala el numero de filas
                        //         datosArchivo.numFilas = datosArchivo.filas.length;
                        //         console.log('Quedaron', datosArchivo.numFilas);
                        //     }
                        // }
                    }
                });

                // Verifica si es de unidades
                for (let ref of this.unidades_ref) {
                    if (datosArchivo.archivo === ref.nombre) {
                        this.unidades_obj.push(datosArchivo);
                        console.log('>> Unidades');
                    }
                }

                // Verifica si es de unidades
                for (let ref of this.unidades_destino_ref) {
                    if (datosArchivo.archivo === ref.nombre) {
                        datosArchivo.unidades = ref.origen_unidades;

                        // Verifica si se incluyen registros por segmentos
                        if (typeof ref.segmentos_unidades !== 'undefined') {
                            datosArchivo.num_segmentos = parseInt(ref.segmentos_unidades);
                        }

                        this.unidades_destino_obj.push(datosArchivo);
                        console.log('>> Destinos:', datosArchivo.unidades);
                    }
                }

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
                                    fila[i] = `${fila[i]},${fila[i + 1]}`;
                                    fila[i + 1] = 'IGNORAR';
                                }
                            }
                        }
                    }

                    fila.forEach((valor) => {
                        if (valor !== 'IGNORAR') {
                            let dato = {
                                valor: valor.replace(new RegExp('\\"' , 'g'), '').trim(),
                                editado: false,
                                tipo: ((valor.startsWith('"') && valor.endsWith('"')) ? 'string' : 'number')
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

    parseDataNew(data, objInsumo) {
        let lineas = data.split('\n');
        //console.log('lineas:', lineas.length);

        let filas = [];
        let contador = 1;

        if (lineas.length > 1) {
            lineas.forEach((linea) => {
                if (linea.trim().length > 0) {
                    let filaObj = [];
                    // Arreglo de valores
                    let fila = linea.trim().split(',');

                    // Busca cadenas
                    for (let i = 0; i < fila.length; i++) {
                        if (fila[i].startsWith('"') && !fila[i].endsWith('"')) {
                            if (i < (fila.length - 1)) {
                                if (fila[i + 1].endsWith('"')) {
                                    console.log('Uniendo', fila[i], fila[i + 1]);
                                    fila[i] = `${fila[i]},${fila[i + 1]}`;
                                    fila[i + 1] = 'IGNORAR';
                                }
                            }
                        }
                    }

                    // Numero de fila
                    filaObj.push({
                        valor: contador++,
                        editado: false,
                        tipo: 'number'
                    });

                    fila.forEach((valor) => {
                        if (valor !== 'IGNORAR') {
                            let dato = {
                                valor: valor.replace(new RegExp('\\"' , 'g'), '').trim(),
                                editado: false,
                                tipo: ((valor.startsWith('"') && valor.endsWith('"')) ? 'string' : 'number')
                            };

                            // Si es número, verifica que tenga correcto formato para JSON
                            if (!isNaN(dato.valor)) {
                                if (dato.valor.startsWith('.')) {
                                    dato.valor = '0' + dato.valor;
                                } else if (dato.valor.startsWith('-.')) {
                                    dato.valor = dato.valor.replace('-.', '-0.');
                                    dato.tipo = "string";
                                }

                            }

                            filaObj.push(dato);
                        }
                    });

                    // VAlores del registro depurados en filaObj
                    // Se crea json de valores
                    console.log('Columnas: ', objInsumo.columnas.length);
                    console.log('Datos: ', filaObj.length);
                    let cadenaJSON = '{';
                    for (let i = 0; i < objInsumo.columnas.length; i++) {
                        let columna = objInsumo.columnas[i];

                        // Verifica que no haya más datos debidos en la fila
                        if (i < filaObj.length) {
                            let tipo = objInsumo.modelo.fields[columna.field].type;

                            cadenaJSON += `"${columna.field}": ${tipo === 'string' ? `"${filaObj[i].valor}"`: filaObj[i].valor} `;
                            // Si es el ultimo valor no agrega coma
                            if (i < (objInsumo.columnas.length - 1) && i < (filaObj.length - 1)) {
                                cadenaJSON += ',';
                            }
                        }
                    }
                    cadenaJSON += '}';
                    console.log('JSON > ', cadenaJSON);
                    filas.push(JSON.parse(cadenaJSON));
                }
            });
        }

        // console.log('FILAS > ');
        // console.log(filas);

        return filas;
    }

    leerEscenariosModificados(ruta_escenario_mod) {
        return new Promise((resolve, reject) => {
            this.fs.readdir(ruta_escenario_mod, (err, files) => {
                if (err) {
                    console.log('Error leyendo escenarios modificados');
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    compararResultados(resultados_A, resultados_B) {
        console.log('Comparando escenarios...');
        return new Promise((resolve, reject) => {
            resultados_A.lista.forEach((archivoA) => {
                let archivoB = resultados_B.lista.find((f) => {
                    // Busca su recíproco del escenario
                    return f.archivo === archivoA.archivo;
                });

                if (archivoB) {
                    console.log('Comparando archivo', archivoB.archivo);
                    if (archivoA.filas.length === archivoB.filas.length) {
                        for (let i = 0; i < archivoA.filas.length; i++) {
                            for (let j = 0; j < archivoB.filas[i].length; j++) {
                                try {
                                    let objDatoA = archivoA.filas[i][j];
                                    let objDatoB = archivoB.filas[i][j];
                                    // SI hay diferencia en el dato correspondiente, se marca como diferente en B
                                    if (objDatoA.valor !== objDatoB.valor) {
                                        objDatoB.diferencia = true;
                                        objDatoA.diferencia = true;
                                        // console.log('Diferencia', archivoA.archivo, objDatoA.valor, "->", objDatoB.valor);
                                    } else {
                                        archivoB.filas[i][j].diferencia = false;
                                    }
                                } catch (e) {}
                            }
                        }
                    } else {
                        console.log(archivoA.archivo, archivoB.archivo, 'tienen diferente numero de filas');
                    }
                }
            });

            resolve();
        });
    }

    leerArchivo(ruta_archivo) {
        return new Promise((resolve, reject) => {
            // Leer datos
            this.fs.readFile(ruta_archivo, 'utf8', (err, data) => {
                if (err) {
                    console.log('No fue posible leer', ruta_archivo, err.message);
                    reject(`ERROR: ${err.message}`);
                } else {
                    // resolve(data.replace(new RegExp('\n+\s*', 'g'), '<br>'));
                    resolve(data);
                }
            });
        });
    }

    leerDirectorioMod(ruta) {
        return new Promise((resolve, reject) => {
            // Lee el directorio
            this.fs.readdir(ruta, (err, files) => {
                if (err) {
                    console.log('Error leyendo directorio', ruta);
                    reject(err);
                } else {
                    // Filtra solo directorios
                    let lista = [];
                    files.forEach((file) => {
                        // console.log('Dir elemento', file);
                        let stats = this.fs.statSync(this.path.join(ruta, file));
                        if (stats.isDirectory() === true) {
                            lista.push(file);
                        }
                    });
                    console.log('Dir leido');
                    resolve(lista);
                }
            });
        });
    }

    leerDirectoriosSync(ruta) {
        // Lee el directorio
        let lista = [];
        try {
            let files = this.fs.readdirSync(ruta);
            // Filtra solo directorios
            files.forEach((file) => {
                // console.log('Dir elemento', file);
                let stats = this.fs.statSync(this.path.join(ruta, file));
                if (stats.isDirectory() === true) {
                    lista.push(file);
                }
            });
        } catch (e) {
            console.log('Error leerDirectoriosSync', e.message);
        }

        return lista;
    }

    crearArchivoComentarios(ruta, contenido) {
        this.fs.writeFile(this.path.join(ruta, 'comentarios.txt'), contenido, 'utf8', (err) => {
            if (err) {
                console.log('Error escribiendo archivo de comentarios', err.message);
            }
        });
    }
}

module.exports = Escenario;
