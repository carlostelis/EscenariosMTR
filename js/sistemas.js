const { execFile } = require('child_process');
const dbConfig = require('./dbconfig.js');
const path = require('path');

class Sistemas {
    constructor() {

    }

    obtenerSistemas(to) {
        let that = this;

        return new Promise((resolve, reject) => {
            let ruta = path.join(__dirname, '..', 'jar', 'ObtenerSistemas.jar');
            console.log(ruta);
            const jar = execFile('java', ['-jar', ruta], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error}`);
                    reject({'error': error});
                }

                console.log(`Resultado: ${stdout}`);

                if (stdout.startsWith('ERROR')) {
                    console.log('-reject-');
                    var jsonErr = {
                        mensaje: stdout.split('->')[1],
                        estado: false,
                        sistemas: []
                    };
                    console.log(jsonErr);
                    reject(jsonErr);
                    /*resolve({
                        /*sistemas: [
                            {
                                nombre: 'BCAx',
                                estado: 1
                            },
                            {
                                nombre: 'SINx',
                                estado: 0
                            },
                            {
                                nombre: 'BCSx',
                                estado: 1
                            }
                        ]
                    });*/
                } else {
                    console.log('-envia JSON-');
                    const json = JSON.parse(stdout);
                    json.estado = true;
                    json.mensaje = 'Consulta realizada correctamente';
                    console.log(JSON.stringify(json));
                    resolve(json);
                }
            });
        });
    }
}

module.exports = Sistemas;
