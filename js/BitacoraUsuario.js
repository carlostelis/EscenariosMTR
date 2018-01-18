// Clase que permite controlar la escritura al archivo de bitacora de un escenario
class BitacoraUsuario {
    // Constructor de la clase
    constructor() {
        this.fs = require('fs');
        this.path = require('path');
        this.inicializado = false;
    }

    // Método para inicializar la bitácora del escenario
    // ${ruta} es la ruta del escenario asociado
    init(ruta) {
        this.ruta_archivo = this.path.join(ruta, 'bitacora.txt');

        // Se asegura de crear la ruta de la bitacora
        let carpetas = this.path.normalize(ruta).split(this.path.sep);

        if (carpetas.length > 0) {
            let rutaTemp = carpetas[0];
            for (let i = 1; i < carpetas.length; i++) {
                rutaTemp = this.path.join(rutaTemp, carpetas[i]);
                if (!this.fs.existsSync(rutaTemp)) {
                    this.fs.mkdirSync(rutaTemp);
                }
            }
        }

        this.inicializado = true;
        this.escribir(` === Inicio de bitácora para escenario: ${carpetas[carpetas.length - 1]} ===`);
    }

    // Método para escribir en la bitácora
    // ${nuevo_mensaje} es el texto a escribir en el archivo.
    escribir(nuevo_mensaje) {
        if (this.inicializado !== true) {
            return;
        }

        // Añade salto de linea
        if (!nuevo_mensaje.endsWith('\n')) {
            nuevo_mensaje += '\n';
        }

        this.fs.appendFile(this.ruta_archivo, nuevo_mensaje, 'utf8', (err) => {
            if (err) {
                console.log('Error escribiendo mensaje de bitacora', err.message);
            }
        });
    }
};

module.exports = BitacoraUsuario;
