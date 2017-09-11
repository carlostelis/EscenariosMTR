const { execFile } = require('child_process');

class Comandos {
    constructor() {
        this.config = require('./config.js');
        this.path = require('path');
    }

    obtenerUsuario(usuario) {
        let that = this;

        return new Promise((resolve, reject) => {
            let ruta = this.path.join(__dirname, '..', 'jar', 'BD_MTR.jar');

            const jar = execFile('java', ['-jar', ruta, `--url=${this.config.exadata.acceso.url}`, `--esq=${this.config.exadata.acceso.bd}`, `--pass=${this.config.exadata.acceso.password}`, '--opc=usuarios', `--usr=${usuario}`], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({
                        mensaje: `No fue posible establecer una conexión con la base de datos; errno = ${error.code}`,
                        estado: false,
                        sistemas: []
                    });
                }

                console.log(`Resultado: ${stdout}<`);

                if (stdout.startsWith('ERROR')) {
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                        sistemas: []
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                } else if (stdout.trim().length === 0) {
                    var jsonErr = {
                        mensaje: 'No fue posible realizar la autenticación de usuario',
                        estado: false,
                        sistemas: []
                    };

                    reject(jsonErr);
                } else {
                    try {
                        console.log('-envia JSON-');
                        const json = JSON.parse(stdout);
                        json.estado = true;
                        json.mensaje = 'Consulta realizada correctamente';
                        console.log(JSON.stringify(json));
                        resolve(json);
                    } catch (e) {
                        reject({error: e});
                    }
                }
            });
        });
    }
}

module.exports = Comandos;
