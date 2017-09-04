const fs = require('fs');
const path = require('path');

class ListaArchivos {
    constructor(_ruta) {
        this.rutaInit = path.normalize(_ruta);
        this.json = undefined;
    }

    update() {
        var that = this;
        return new Promise((resolve, reject) => {
            that.json = {
                nombre: path.basename(this.rutaInit),
                ruta: this.rutaInit,
                tipo: 'directorio',
                elementos: that.leerDirectorio(this.rutaInit)
            };

            resolve(that.json);
        });
    }

    leerDirectorio(_ruta) {
        var that = this;
        var elementos = [];

        // Llamado sincronizado
        let items = fs.readdirSync(_ruta);

        if (!items) {
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
                    itemObject.elementos = that.leerDirectorio(rutaCompleta);
                    elementos.push(itemObject);
                }
            }
        });

        return elementos;
    }
}

module.exports = ListaArchivos;
