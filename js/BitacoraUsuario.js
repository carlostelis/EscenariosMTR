class BitacoraUsuario {
    constructor() {
        this.fs = require('fs');
        this.path = require('path');
        this.inicializado = false;
    }

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
