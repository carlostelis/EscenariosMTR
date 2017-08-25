const { execFile } = require('child_process');
const db = require('./dbconfig.js');
const path = require('path');

let ruta = path.join(__dirname, '..', 'jar', 'BD_MTR.jar');
console.log(ruta);
const jar = execFile('java', ['-jar', ruta, `--url=${db.url}`, `--esq=${db.bd}`, `--pass=${db.password}`, '--opc=sistemas'], (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error}`);
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
    } else {
        console.log('-envia JSON-');
        const json = JSON.parse(stdout);
        json.estado = true;
        json.mensaje = 'Consulta realizada correctamente';
        console.log(JSON.stringify(json));
    }
});



// const ODB = require('./ODB.js');
// const bdObj = new ODB();
//
// console.log(' ----> conectando');
// bdObj.conectar().then((resultado) => {
//     console.log(resultado);
//
//     console.log(' ----> solicitando sistemas');
//     bdObj.getSistemas().then((rows) => {
//         rows.forEach((row) => {
//             console.log(`ID: ${row[0]}, nombre: ${row[1]}, estado: ${row[2]}`);
//         });
//
//         console.log(' ----> desconectando');
//         bdObj.desconectar().then((resultado) => {
//             console.log(resultado);
//         }).catch((error) => {
//             console.log(error);
//         });
//     }).catch((error) => {
//         console.log(error);
//
//         console.log(' ----> desconectando');
//         bdObj.desconectar().then((resultado) => {
//             console.log(resultado);
//         }).catch((error) => {
//             console.log(error);
//         });
//     });
// }).catch((error) => {
//     console.log(error);
//     process.exit();
// });
