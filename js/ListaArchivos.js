const fs = require('fs');
const path = require('path');

class ListaArchivos {
    constructor(_ruta) {
        this.rutaInit = path.normalize(_ruta);
        this.json = undefined;
    }

    update() {
        // Verifica que exista la carpeta original
        if (!fs.existsSync(this.rutaInit)) {
            console.log(`Generando directorio local ${this.rutaInit}: ${fs.mkdirSync(this.rutaInit)}`);
        }

        return new Promise((resolve, reject) => {
            let elementos_dir = this.leerDirectorio(this.rutaInit);

            this.json = {
                nombre: path.basename(this.rutaInit),
                rutaBase: this.rutaInit,
                tipo: 'directorio',
                elementos: elementos_dir
            };

            resolve(this.json);
        });
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
                    itemObject.elementos = this.leerDirectorio(rutaCompleta);
                    elementos.push(itemObject);
                }
            }
        });

        return elementos;
    }
}

module.exports = ListaArchivos;
