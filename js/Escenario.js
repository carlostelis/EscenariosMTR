
class Escenario {
    constructor () {
        this.path = require('path');
        this.fs = require('fs');

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
    }

    parseEscenario(ruta_escenario, algoritmo, filtro) {
        console.log(ruta_escenario, algoritmo);

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
                        promesas.push(this.parseArchivoCSV(this.path.join(ruta_dirdat, files[i]), archivosJSON, algoritmo));
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

                        // Procesa los archivos 'especiales'
                        archivosJSON.lista.forEach((datosArchivo) => {
                            // Si es DERS_MI_TOTALES_AREA devuelve el último ciclo
                            if (datosArchivo.archivo === 'DERS_MI_TOTALES_AREA.csv' || datosArchivo.archivo === 'DERS_I_TOTALES_AREA.csv') {
                                this.validarDERS_MI_TOTALES_AREAS(datosArchivo);
                            } else if (datosArchivo.archivo === 'RESUMEN_UNIDADES.csv') {
                                this.validarRESUMEN_UNIDADES(datosArchivo, archivosJSON.lista);
                            }
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

    parseArchivoCSV(ruta_archivo, objJSON, algoritmo) {
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


                        if (datosArchivo.archivo.startsWith('ARRARC_DERS')) {
                            console.log('Validacion ARRARC_DERS');
                            datosArchivo.insumo.modelo.fields.potSinc.validation = {
                                required: true,
                                potsincvalidation: function (input) {
                                    console.log('validando', input.val());
                                    return input.val() >= 0 && input.val() <= 24;
                                }
                            }
                        }


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

                            datosArchivo.filas = this.parseData(data, datosArchivo.insumo);
                            datosArchivo.numFilas = datosArchivo.filas.length;
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
        console.log('DERS_MI_TOTALES_AREA, fila inicio ciclo:', objDatos.insumo.modelo.inicio_ciclo);
        if (typeof objDatos.insumo.modelo.inicio_ciclo === 'number' && objDatos.insumo.modelo.inicio_ciclo > 0) {
            let primeraFila = -1;
            for (let i = 0; i < objDatos.filas.length; i++) {
                console.log(objDatos.filas[i].numFila);
                if (objDatos.filas[i].numFila === objDatos.insumo.modelo.inicio_ciclo) {
                    primeraFila = i;
                    break;
                }
            }

            console.log('Primera fila: ', primeraFila);
            for (let i = 0; i < primeraFila; i++) {
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

    validarRESUMEN_UNIDADES(objDatos, listaObjetos) {
        console.log('Validando RESUMEN UNIDADES');

        // Busca POTVERC_DERS y PREVERC_DERS, solo es para unidades RC
        let objPotverc = listaObjetos.find((obj) => {
            return obj.archivo === 'POTVERC_DERS.csv';
        });
        let objPreverc = listaObjetos.find((obj) => {
            return obj.archivo === 'PREVERC_DERS.csv';
        });

        objDatos.filas.forEach((fila) => {
            // Margen para subir
            fila.MARGEN_SUBIR = parseFloat((fila.LIM_SUP - (fila.POTENCIA + fila.REG + fila.RR10 + fila.RRS + fila.RNR10 + fila.RNRS)).toFixed(3));
            // Margen para bajar
            if (fila.POTENCIA !== 0) {
                fila.MARGEN_BAJAR = parseFloat(((fila.POTENCIA - fila.REG) - fila.LIM_INF).toFixed(3));
            } else {
                fila.MARGEN_BAJAR = 0;
            }

            // Precio de segmento
            fila.PRECIO_SEGMENTO = 0;

            let segmento;
            let filaSegmento;
            let potenciaAcumulada;

            if (objPotverc) {
                // RANGO CONTINUO
                if (fila.TIPO === 'RC') {
                    // Ubica la primer fila de la unidad
                    let i;
                    for (i = 0; i < objPotverc.filas.length; i++) {
                        if (objPotverc.filas[i].nombreUnidad === fila.UNIDAD) {
                            break;
                        }
                    }

                    segmento = -1;
                    potenciaAcumulada = 0;
                    // Recorre los segmentos
                    for (let j = 0; j < 11; j++, i++) {
                        if (typeof objPotverc.filas[i] !== 'undefined') {
                            if (potenciaAcumulada === 0) {
                                potenciaAcumulada = fila.LIM_INF + objPotverc.filas[i].potVentaP1;
                            } else {
                                potenciaAcumulada += objPotverc.filas[i].potVentaP1;
                            }

                            // REgistra la fila
                            filaSegmento = objPotverc.filas[i].numFila;

                            // console.log(fila.UNIDAD, fila.POTENCIA, ' <-> ', potenciaAcumulada);
                            if (potenciaAcumulada >= fila.POTENCIA) {
                                segmento = j + 1;
                                break;
                            }
                        }
                    }

                    if (segmento === -1) {
                        segmento = 11;
                    }

                    console.log(fila.UNIDAD, 'segmento', segmento, 'fila', filaSegmento);

                    // Obtiene el precio de venta con la fila asociada
                    let filaPreverc = objPreverc.filas.find((f) => {
                        return f.numFila === filaSegmento;
                    });

                    if (filaPreverc) {
                        fila.PRECIO_SEGMENTO = filaPreverc.preVentaP1;
                        console.log('Precio:', filaPreverc.preVentaP1);
                    }
                }
            }
        });
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
                console.log(objDatos.filas.length, objDatosUnidades.filas.length);
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

    parseData(data, objInsumo) {
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
                        // Si se incluye la bandera de ignorar cabecera, no se procesa la primera fila
                        if (objInsumo.ignorarCabecera === true) {
                            objInsumo.ignorarCabecera = false;
                            contador--;
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
                                            cadenaJSON += `"${columna.field}": ${tipo === 'string' ? `"${filaObj[i].valor}"`: filaObj[i].valor},`;
                                            // Si es el ultimo valor no agrega coma
                                            // if (i < (objInsumo.columnas.length - 1) && i < (filaObj.length - 1)) {
                                            //     cadenaJSON += ', ';
                                            // }
                                        }

                                    } catch (e) {
                                        console.log('Excepcion agregando datos',columna.field, e);
                                        console.log(objInsumo.modelo.fields);
                                        console.log('----------------------------------');
                                    }
                                }
                            }

                            if (cadenaJSON.endsWith(',')) {
                                cadenaJSON = cadenaJSON.slice(0, cadenaJSON.length - 1) + '}';
                            } else {
                                cadenaJSON += '}';
                            }

                            try {
                                // Verifica los ciclos y la fila del encabezado
                                if (objInsumo.modelo.id === 'DERS_MI_TOTALES_AREA') {
                                    // Si encuentra el inicio de la cabecera se descarta
                                    if (cadenaJSON.includes('"Intervalo": Intervalo')) {
                                        console.log('Ignora cabecera DERS_MI_TOTALES_AREA');
                                        objInsumo.modelo.inicio_ciclo = contador;
                                        // Finaliza el método y no intenta agregarla
                                        return;
                                    }
                                }

                                let obj_json = JSON.parse(cadenaJSON);
                                if (obj_json) {
                                    filas.push(obj_json);
                                }
                            } catch (e) {
                                // Si cae una excepción, ignora la fila (aplica para )
                                console.log('Excepcion JSON > ', cadenaJSON, e);
                            }
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

            // Ingresa contenedores
            resultados_A.lista.forEach((archivoA) => {
                let archivoB = resultados_B.lista.find((f) => {
                    // Busca su recíproco del escenario
                    return f.archivo === archivoA.archivo;
                });

                archivoA.listaDiferencias = [];
                archivoB.listaDiferencias = [];

                if (archivoB) {
                    console.log('Comparando archivo', archivoB.archivo);
                    if (archivoA.filas.length === archivoB.filas.length) {
                        for (let i = 0; i < archivoA.filas.length; i++) {
                            // Referencias a la fila de cada archivo
                            let objFilaA = archivoA.filas[i];
                            let objFilaB = archivoB.filas[i];

                            // Marca sin diferencias
                            objFilaB.hayDiferencia = false;
                            objFilaA.hayDiferencia = false;

                            archivoA.insumo.columnas.forEach((col) => {
                                // SI hay diferencia en el dato correspondiente, se marca como diferente en B
                                if (objFilaA[col.field] !== objFilaB[col.field]) {
                                    // console.log('Diferencia', archivoA.archivo, objFilaA[col.field], "->", objFilaB[col.field]);

                                    // Marca diferencias
                                    objFilaB.hayDiferencia = true;
                                    objFilaA.hayDiferencia = true;

                                    // Marca en las filas las columnas editadas
                                    archivoA.listaDiferencias.push({ numFila: objFilaA['numFila'], columna: col.field });
                                    archivoB.listaDiferencias.push({ numFila: objFilaB['numFila'], columna: col.field });
                                }
                            });
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
