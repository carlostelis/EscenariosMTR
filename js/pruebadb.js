const ODB = require('./ODB.js');
const bdObj = new ODB();

console.log(' ----> conectando');
bdObj.conectar().then((resultado) => {
    console.log(resultado);

    console.log(' ----> solicitando sistemas');
    bdObj.getSistemas().then((rows) => {
        rows.forEach((row) => {
            console.log(`ID: ${row[0]}, nombre: ${row[1]}, estado: ${row[2]}`);
        });

        console.log(' ----> desconectando');
        bdObj.desconectar().then((resultado) => {
            console.log(resultado);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);

        console.log(' ----> desconectando');
        bdObj.desconectar().then((resultado) => {
            console.log(resultado);
        }).catch((error) => {
            console.log(error);
        });
    });
}).catch((error) => {
    console.log(error);
    process.exit();
});
