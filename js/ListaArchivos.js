// objetos de los modulos file system y path
const fs = require('fs');
const path = require('path');

// Clase que controla la lectura de archivos para el árbol de archivos de la aplicación
class ListaArchivos {
    // Constructor de la clase
    // ${_ruta} es la ruta base de la carpeta de trabajo de la app
    constructor(_ruta) {
        this.rutaInit = path.normalize(_ruta);
        this.json = undefined;
        this.config = require('./config.js');
    }

    // Método para inicializar la clase y verificar estructuras de carpetas
    init() {
        // Verifica que exista la carpeta original
        if (!fs.existsSync(this.rutaInit)) {
            console.log(`Generando directorio local ${this.rutaInit}: ${fs.mkdirSync(this.rutaInit)}`);
        }

        let ruta;
        // Crea las carpetas en base a los sistemas
        this.config.sistemas.forEach((sistema) => {
            ruta = path.join(this.rutaInit, sistema.nombre);
            console.log('>>>>', ruta);
            if (!fs.existsSync(ruta)) {
                console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta)}`);
            }

            this.verificarSubcarpetas(ruta);
        });
    }

    // Método para verificar las subcarpetas de cada carpeta de sistema
    // ${ruta} es la ruta de la carpeta a verificar
    verificarSubcarpetas(ruta) {
        let ruta_nueva = path.join(ruta, 'dersi');
        if (!fs.existsSync(ruta_nueva)) {
            console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta_nueva)}`);
        }
        this.verificarSubcarpetasEscenarios(ruta_nueva);

        ruta_nueva = path.join(ruta, 'dersmi');
        if (!fs.existsSync(ruta_nueva)) {
            console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta_nueva)}`);
        }
        this.verificarSubcarpetasEscenarios(ruta_nueva);

        ruta_nueva = path.join(ruta, 'autr');
        if (!fs.existsSync(ruta_nueva)) {
            console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta_nueva)}`);
        }
        this.verificarSubcarpetasEscenarios(ruta_nueva);
    }

    // Método para verificar las carpetas de cada algoritmo
    // ${ruta} es la ruta de la carpeta
    verificarSubcarpetasEscenarios(ruta) {
        let subruta = path.join(ruta, 'escenario_original');
        if (!fs.existsSync(subruta)) {
            console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        }
        subruta = path.join(ruta, 'escenario_modificado');
        if (!fs.existsSync(subruta)) {
            console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        }
    }

    // Método que genera un JSON con la información base del árbol de archivos
    generarBase() {
        return {
            nombre: path.basename(this.rutaInit),
            ruta: this.rutaInit,
            tipo: 'directorio',
            elementos: []
        };
    }

    // Método para leer un directorio local
    // ${_ruta} es la ruta del directorio a leer
    leerDirectorio(_ruta) {
        var elementos = [];

        // Llamado sincronizado
        let items = fs.readdirSync(_ruta);

        if (!items) {
            console.log('No hay items en el directorio');
            return elementos;
        }

        items.forEach((item) => {
            let rutaCompleta = path.join(_ruta, item);
            // Llamado sincronizado
            let stats = fs.statSync(rutaCompleta);

            if (stats) {
                let itemObject = {
                    nombre: item,
                    ruta: rutaCompleta
                }

                // Tipo de elemento, si no es archivo ni directorio no lo procesa
                if (stats.isFile()) {
                    itemObject.tipo = 'archivo';
                    elementos.push(itemObject);
                } else if (stats.isDirectory()) {
                    itemObject.tipo = 'directorio';
                    // itemObject.elementos = this.leerDirectorio(rutaCompleta);
                    itemObject.elementos = [];
                    elementos.push(itemObject);
                }
            }
        });

        return elementos;
    }

    // Método para marcar un escenario y escribir un archivo de comentarios vacio
    // ${ruta} es la ruta del escenario a marcar
    marcarDescargado(ruta) {
        fs.writeFileSync(path.join(ruta, '.descargado'), `Descargado ${ruta}`);
        // Crea también el archivo de comentarios
        fs.writeFileSync(path.join(ruta, 'comentarios.txt'), '');
    }

    // Método para marcar un esnceario guardado en BD
    // ${ruta} es la ruta del escenario a marcar
    marcarDescargadoBD(ruta) {
        fs.writeFileSync(path.join(ruta, '.bd'), `Descargado BD ${ruta}`);
    }

    // Método para consultar si un escenario ha sido descargado
    // ${ruta} es la ruta del escenario a consultar
    isDescargado(ruta) {
        return fs.existsSync(path.join(ruta, '.descargado'));
    }
}

module.exports = ListaArchivos;
