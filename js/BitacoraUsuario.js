class BitacoraUsuario {
    constructor(ruta) {
        this.fs = require('fs');
        this.path = require('path');
        this.ruta_archivo = this.path.join(ruta, 'bitacora.txt');
    }

    escribir(nuevo_mensaje) {
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
