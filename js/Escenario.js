
class Escenario {
    constructor () {
        this.path = require('path');
        this.fs = require('fs');
        this.archivosDersi = require('./archivos_dersi.js');
        this.archivosDersmi = require('./archivos_dersmi.js');
        this.archivosAutr = require('./archivos_autr.js');

        // Lista de insumos JSON
        this.insumos = require('./insumos.js');
        // Entradas
        this.insumosEntradas = this.insumos.filter((archivo) => {
            return archivo.archivoResultados !== true;
        });
        // Resultados
        this.insumosResultados = this.insumos.filter((archivo) => {
            return archivo.archivoResultados === true;
        });
        // Unidades
        this.insumosUnidades = this.insumos.filter((archivo) => {
            return archivo.unidades === true;
        });

        this.listaObjUnidades = [];

        console.log('Entradas', this.insumosEntradas.length);
        console.log('Resultados', this.insumosResultados.length);
        console.log('Unidades', this.insumosUnidades.length);

        this.unidades_ref = [];
        this.unidades_obj = [];
        this.unidades_destino_ref = [];
        this.unidades_destino_obj = [];
    }

    parseEscenario(ruta_escenario, algoritmo, filtro) {
        console.log(ruta_escenario, algoritmo);

        // Selecciona la lista de archivos acorde al algoritmo
        // switch (algoritmo) {
        //     case 'dersi': this.insumos = this.archivosDersi; break;
        //     case 'dersmi': this.insumos = this.archivosDersmi; break;
        //     case 'autr': this.insumos = this.archivosAutr; break;
        // }

        this.unidades_ref = [];
        this.unidades_obj = [];
        this.unidades_destino_ref = [];
        this.unidades_destino_obj = [];
        // this.insumos = require('./insumos.js');
        for (let archivoObj of this.insumos) {
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

        for (let archivoObj of this.insumos) {
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
                    // Filtra por entradas o resultados
                    if (filtro === 'ENTRADAS') {
                        if (!this.insumosEntradas.find((archivo) => {
                            return archivo.nombre === files[i];
                        })) {
                            continue;
                        }
                    } else if (filtro === 'RESULTADOS') {
                        if (!this.insumosResultados.find((archivo) => {
                            return archivo.nombre === files[i];
                        })) {
                            continue;
                        }
                    }

                    to = i * 10;
                    setTimeout(() => {
                        promesas.push(this.parseArchivoCSVNew(this.path.join(ruta_dirdat, files[i]), archivosJSON, algoritmo));
                    }, to);
                }

                // Espera creacion de promesas
                setTimeout(() => {
                    Promise.all(promesas).then(() => {
                        console.log('Archivos: ', archivosJSON.lista.length);
                        console.log('Verificando unidades');

                        // Verifica si requiere unidades
                        // Se hace al final porque no se sabe el orden enq ue se leen los archivos
                        archivosJSON.lista.forEach((datosArchivo) => {
                            this.asociarUnidades(datosArchivo);
                        });

                        // Verifica si requiere zonas de reserva
                        archivosJSON.lista.forEach((datosArchivo) => {
                            this.asociarZonasReserva(datosArchivo);
                        });

                        // Verifica si requiere subsistemas
                        archivosJSON.lista.forEach((datosArchivo) => {
                            this.asociarSubsistemas(datosArchivo);
                        });

                        resolve(archivosJSON);
                    }, () => {
                        console.log('>>>> FALLA');
                        reject();
                    });
                }, ruta_escenario.includes('SIN') ? to + 3000 : to + 100);
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
                for (let archivoObj of this.insumos) {
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

    parseArchivoCSVNew(ruta_archivo, objJSON, algoritmo) {
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

                // Buscar en json
                let objInsumo;
                for (let archivoObj of this.insumos) {
                    // Verifica si el archivo será editable
                    if (archivoObj.nombre === datosArchivo.archivo) {
                        datosArchivo.editable = archivoObj.editable;
                        // Genera una copia del objeto de insumo
                        datosArchivo.insumo = JSON.parse(JSON.stringify(archivoObj));

                        break;
                    }
                }

                if (typeof datosArchivo.insumo === 'undefined' || typeof datosArchivo.insumo.modelo === 'undefined') {
                    console.log('No hay insumo para', datosArchivo.archivo);
                    resolve();
                } else {
                    // Leer datos
                    this.fs.readFile(ruta_archivo, 'utf8', (err, data) => {
                        if (err) {
                            console.log('No fue posible leer', ruta_archivo, err.message);
                            reject();
                        } else {
                            console.log('Leyendo', datosArchivo.archivo);

                            datosArchivo.filas = this.parseDataNew(data, datosArchivo.insumo);
                            datosArchivo.numFilas = datosArchivo.filas.length;

                            // Si es DERS_MI_TOTALES_AREA devuelve el último ciclo
                            if (datosArchivo.archivo === 'DERS_MI_TOTALES_AREA.csv') {
                                this.validarDERS_MI_TOTALES_AREAS(datosArchivo);
                            }
                        }
                    });

                    // AGrega el archivo a la lista
                    objJSON.lista.push(datosArchivo);
                    objJSON.numArchivos++;

                    // Verifica si es de unidades
                    if (this.insumosUnidades.find((archivo) => {
                        return archivo.nombre === datosArchivo.insumo.nombre;
                    })) {
                        this.listaObjUnidades.push(datosArchivo);
                    }

                    resolve();
                }
            }
        });
    }

    validarDERS_MI_TOTALES_AREAS(objDatos) {
        let cont_ciclos = 0;
        let ultimo_ciclo = -1;
        let n = 0;

        console.log('Validando DERS_MI_TOTALES_AREA');
        objDatos.filas.forEach((fila) => {
            // Si la fila incluye cabecera indica un nuevo ciclo
            if (fila.Intervalo.trim() === 'Intervalo') {
                // Incrementa contador
                cont_ciclos++;
                // Guarda la fila
                ultimo_ciclo = n;
            }

            n++;
        });

        // Si hay más de 1 ciclo, conserva el último
        console.log('>>>>> Eliminando', ultimo_ciclo, 'registros, hay', objDatos.numFilas);
        if (cont_ciclos >= 1) {
            for (let i = 0; i <= ultimo_ciclo; i++) {
                objDatos.filas.shift();
            }

            let num_fila = 1;
            // Arregla los # fila
            objDatos.filas.forEach((fila) => {
                fila.numFila = num_fila++;
            });

            // IGuala el numero de filas
            objDatos.numFilas = objDatos.filas.length;
            console.log('Quedaron', objDatos.numFilas);
        }
    }

    asociarUnidades(objDatos) {
        if (typeof objDatos.insumo.origen_unidades !== 'string') {
            return;
        }

        // Busca Unidades
        let insumoOrigen = this.insumosUnidades.find((archivo) => {
            return archivo.nombre === objDatos.insumo.origen_unidades;
        });
        let objDatosUnidades = this.listaObjUnidades.find((archivo) => {
            return archivo.insumo.nombre === insumoOrigen.nombre;
        });

        if (typeof insumoOrigen !== 'undefined' && typeof objDatosUnidades !== 'undefined') {
            // Agrega campo al modelo
            objDatos.insumo.modelo.fields['nombreUnidad'] = {
                editable: false,
                type: "string",
                nullable: false
            };

            // Agrega la columna
            objDatos.insumo.columnas.splice(1, 0, {
                field: 'nombreUnidad',
                title: 'Nombre Unidad',
                sortable: true,
                filterable: true,
                width: "10vw",
                virtual: true
            });

            // Agrega los datos
            // Si es archivo de segmentos, repite la unidad acorde al campo
            if (typeof objDatos.insumo.segmentos === 'number' && objDatos.insumo.segmentos > 0) {
                // Verifica la proporcion de filas y segmentos
                if (objDatos.filas.length % objDatos.insumo.segmentos === 0 && objDatos.filas.length / objDatos.insumo.segmentos === objDatosUnidades.filas.length) {
                    console.log('U> Validando segmentos', objDatos.insumo.nombre);
                    for (let i = 0, u = 0; i < objDatos.filas.length; i+=objDatos.insumo.segmentos, u++) {
                        for (let j = 0; j < objDatos.insumo.segmentos; j++) {
                            objDatos.filas[i + j].nombreUnidad = objDatosUnidades.filas[u].nombreUnidad;
                        }
                    }
                }
            } else {
                console.log('U> Validando unidades', objDatos.insumo.nombre);

                try {
                    for (let i = 0; i < objDatos.filas.length; i++) {
                        objDatos.filas[i].nombreUnidad = objDatosUnidades.filas[i].nombreUnidad;
                    }
                } catch (e) {
                    console.log(e);
                }

            }

        }
    }

    asociarZonasReserva(objDatos) {
        if (typeof objDatos.insumo.origen_zonas !== 'string') {
            return;
        }

        // Busca el insumo de zonas de reserva
        let insumoOrigen = this.insumosUnidades.find((archivo) => {
            return archivo.nombre === objDatos.insumo.origen_zonas;
        });
        let objDatosUnidades = this.listaObjUnidades.find((archivo) => {
            return archivo.insumo.nombre === insumoOrigen.nombre;
        });

        if (typeof insumoOrigen !== 'undefined' && typeof objDatosUnidades !== 'undefined') {
            // Agrega campo al modelo
            objDatos.insumo.modelo.fields['nombreZona'] = {
                editable: false,
                type: "string",
                nullable: false
            };

            // Agrega la columna
            objDatos.insumo.columnas.splice(1, 0, {
                field: 'nombreZona',
                title: 'Nombre Zona',
                sortable: true,
                filterable: true,
                width: "10vw",
                virtual: true
            });

            // Agrega los datos de las zonas
            // El archivo debe contener el valor de segmentos
            if (typeof objDatos.insumo.segmentos !== 'number' || objDatos.insumo.segmentos <= 0) {
                objDatos.insumo.segmentos = 1;
            }

            // Verifica la proporcion de filas y segmentos
            if (objDatos.filas.length % objDatos.insumo.segmentos === 0 && objDatos.filas.length / objDatos.insumo.segmentos === objDatosUnidades.filas.length) {
                console.log('Z> Validando segmentos', objDatos.insumo.nombre);
                for (let i = 0, u = 0; i < objDatos.filas.length; i+=objDatos.insumo.segmentos, u++) {
                    for (let j = 0; j < objDatos.insumo.segmentos; j++) {
                        objDatos.filas[i + j].nombreZona = objDatosUnidades.filas[u].nombreZona;
                    }
                }
            }
        }
    }

    asociarSubsistemas(objDatos) {
        if (typeof objDatos.insumo.origen_subsistemas !== 'string') {
            return;
        }

        // Busca el insumo de subsistemas
        let insumoOrigen = this.insumosUnidades.find((archivo) => {
            return archivo.nombre === objDatos.insumo.origen_subsistemas;
        });
        let objDatosUnidades = this.listaObjUnidades.find((archivo) => {
            return archivo.insumo.nombre === insumoOrigen.nombre;
        });

        if (typeof insumoOrigen !== 'undefined' && typeof objDatosUnidades !== 'undefined') {
            // Agrega campo al modelo
            objDatos.insumo.modelo.fields['nombreSubsistema'] = {
                editable: false,
                type: "string",
                nullable: false
            };

            // Agrega la columna
            objDatos.insumo.columnas.splice(1, 0, {
                field: 'nombreSubsistema',
                title: 'Nombre Subsistema',
                sortable: true,
                filterable: true,
                width: "10vw",
                virtual: true
            });

            // Agrega los datos de las zonas
            // El archivo debe contener el valor de segmentos
            if (typeof objDatos.insumo.segmentos !== 'number' || objDatos.insumo.segmentos <= 0) {
                objDatos.insumo.segmentos = 1;
            }

            // Verifica la proporcion de filas y segmentos
            if (objDatos.filas.length % objDatos.insumo.segmentos === 0 && objDatos.filas.length / objDatos.insumo.segmentos === objDatosUnidades.filas.length) {
                console.log('S> Validando segmentos', objDatos.insumo.nombre);
                for (let i = 0, u = 0; i < objDatos.filas.length; i+=objDatos.insumo.segmentos, u++) {
                    for (let j = 0; j < objDatos.insumo.segmentos; j++) {
                        objDatos.filas[i + j].nombreSubsistema = objDatosUnidades.filas[u].nombreSubsistema;
                    }
                }
            }
        }
    }

    parseData(data) {
        let lineas = data.split('\n');
        console.log('lineas:', lineas.length);

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
                                // Remueve comillas, nulos y retrocesos
                                valor: valor.replace(new RegExp('\\"', 'g'), '')
                                            .replace(new RegExp("\u0000", 'g'), '')
                                            .replace(new RegExp("\\u0000", 'g'), '').trim(),
                                editado: false,
                            };

                            // Si es número, verifica que tenga correcto formato para JSON
                            if (!isNaN(dato.valor)) {
                                if (dato.valor.startsWith('.')) {
                                    dato.valor = '0' + dato.valor;
                                } else if (dato.valor.startsWith('-.')) {
                                    dato.valor = dato.valor.replace('-.', '-0.');
                                }

                            }

                            filaObj.push(dato);
                        }
                    });

                    // Si no contiene columnas, las define de la primer fila
                    if (typeof objInsumo.columnas === 'undefined') {
                        // Si no tiene define columnas las toma de la primera fila del archivo (RESULTADOS)
                		// Define el arreglo de columnas
                		objInsumo.columnas = [];
                		// Define los campos del dataSource
                		objInsumo.modelo.fields = {};

                        // Saca el numero de fila
                        filaObj.shift();

                        // Filtra columnas no vacias
                        filaObj = filaObj.filter((col) => {
                            return col.valor.trim() !== '';
                        });

                		console.log('Define columas', objInsumo.modelo.id);

                        // Define la columna del #fila
                        objInsumo.columnas.push({
                            field: 'numFila',
                            title: '#',
                            sortable: true,
                            filterable: false,
                            width: "3vw",
                            virtual: true
                        });

                        objInsumo.modelo.fields['numFila'] = {
                            type: "number",
                            editable: false,
                            nullable: false
                        };

                		filaObj.forEach((col) => {
                            // Si el titulo contiene paréntesis causará error en la librería
                            if (col.valor.includes('(')) {
                                col.valor = col.valor.split('(')[0];
                            }
                            // Si el titulo contiene paréntesis causará error en la librería
                            if (col.valor.includes(' ')) {
                                col.valor = col.valor.replace(' ','');
                            }

                            objInsumo.columnas.push({
                                field: col.valor,
                                sortable: true,
                                filterable: true,
                                width: "10vw"
                            });

                            objInsumo.modelo.fields[col.valor] = {
                                editable: false,
                                type: "string",
                                nullable: false
                            };
                		});

                        // Decrementa el contador
                        contador--;

                		// console.log('Columnas', objInsumo.columnas);
                        // console.log('Fields', objInsumo.modelo.fields);
                    } else {
                        // Valores del registro depurados en filaObj
                        // Se crea json de valores
                        let cadenaJSON = '{';
                        for (let i = 0; i < objInsumo.columnas.length; i++) {
                            let columna = objInsumo.columnas[i];

                            // Verifica que no haya más datos debidos en la fila
                            if (i < filaObj.length && typeof objInsumo !== 'undefined' && typeof objInsumo.modelo !== 'undefined') {
                                try {
                                    // console.log(filaObj);
                                    let tipo = objInsumo.modelo.fields[columna.field].type;
                                    // console.log('filaObj[i].valor:', filaObj[i].valor, filaObj[i].valor.length, filaObj[i].valor.charCodeAt(0), '<');

                                    // Si es número y el campo no trae nada, se omite
                                    if (tipo === 'number' && filaObj[i].valor === '') {
                                        // El campo no se incluye
                                    } else {
                                        cadenaJSON += `"${columna.field}": ${tipo === 'string' ? `"${filaObj[i].valor}"`: filaObj[i].valor} `;
                                        // Si es el ultimo valor no agrega coma
                                        if (i < (objInsumo.columnas.length - 1) && i < (filaObj.length - 1)) {
                                            cadenaJSON += ',';
                                        }
                                    }

                                } catch (e) {
                                    console.log('Excepcion agregando datos',columna.field, e);
                                    console.log(objInsumo.modelo.fields);
                                    console.log('----------------------------------');
                                }
                            }
                        }
                        cadenaJSON += '}';
                        try {
                            filas.push(JSON.parse(cadenaJSON));
                        } catch (e) {
                            console.log('Excepcion JSON > ', cadenaJSON, e);
                            throw e;
                        }

                    }
                }
            });
        }

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
