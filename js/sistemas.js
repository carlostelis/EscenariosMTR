const { execFile } = require('child_process');
const db = require('./dbconfig.js');
const path = require('path');

class Sistemas {
    constructor() {

    }

    obtenerSistemas(to) {
        let that = this;

        return new Promise((resolve, reject) => {
            let ruta = path.join(__dirname, '..', 'jar', 'BD_MTR.jar');
            console.log(ruta);
            const jar = execFile('java', ['-jar', ruta, `--url=${db.url}`, `--esq=${db.bd}`, `--pass=${db.password}`, '--opc=sistemas'], (error, stdout, stderr) => {
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
                        mensaje: 'No fue posible establecer una conexión con la base de datos; falla de ejecución',
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

module.exports = Sistemas;
