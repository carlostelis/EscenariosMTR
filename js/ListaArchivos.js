const fs = require('fs');
const path = require('path');

class ListaArchivos {
    constructor(_ruta) {
        this.rutaInit = path.normalize(_ruta);
        this.json = undefined;
        this.config = require('./config.js');
    }

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


        //
        // // crea sub carpetas
        // let ruta = path.join(this.rutaInit, 'dersi');
        // if (!fs.existsSync(ruta)) {
        //     console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta)}`);
        // }
        // let subruta = path.join(ruta, 'escenario_original');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }
        // subruta = path.join(ruta, 'escenario_modificado');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }
        // ruta = path.join(this.rutaInit, 'dersmi');
        // if (!fs.existsSync(ruta)) {
        //     console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta)}`);
        // }
        // subruta = path.join(ruta, 'escenario_original');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }
        // subruta = path.join(ruta, 'escenario_modificado');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }
        // ruta = path.join(this.rutaInit, 'autr');
        // if (!fs.existsSync(ruta)) {
        //     console.log(`Generando subdirectorio local ${ruta}: ${fs.mkdirSync(ruta)}`);
        // }
        // subruta = path.join(ruta, 'escenario_original');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }
        // subruta = path.join(ruta, 'escenario_modificado');
        // if (!fs.existsSync(subruta)) {
        //     console.log(`Generando subdirectorio local ${subruta}: ${fs.mkdirSync(subruta)}`);
        // }

        // return new Promise((resolve, reject) => {
        //     let elementos_dir = this.leerDirectorio(this.rutaInit);
        //
        //     this.json = {
        //         nombre: path.basename(this.rutaInit),
        //         rutaBase: this.rutaInit,
        //         tipo: 'directorio',
        //         elementos: elementos_dir
        //     };
        //
        //     resolve(this.json);
        // });
    }

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

    generarBase() {
        return {
            nombre: path.basename(this.rutaInit),
            ruta: this.rutaInit,
            tipo: 'directorio',
            elementos: []
        };
    }

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

    marcarDescargado(ruta) {
        fs.writeFileSync(path.join(ruta, '.descargado'), `Descargado ${ruta}`);
    }

    isDescargado(ruta) {
        return fs.existsSync(path.join(ruta, '.descargado'));
    }
}

module.exports = ListaArchivos;
