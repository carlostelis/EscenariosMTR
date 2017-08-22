var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

class ODB {
    constructor() {
        this.dots = '';
    }

    conectar(to) {
        let that = this;

        return new Promise((resolve, reject) => {
            // establece timeout
            if (typeof to === 'number') {
                setTimeout(() => {
                    reject(`Tiempo de conexión vencido, intentando nuevamente<br>${this.mueveCarga()}`);
                }, to);
            }

            oracledb.getConnection( {
                    user          : dbConfig.user,
                    password      : dbConfig.password,
                    connectString : dbConfig.connectString
                },
                function(err, connection) {
                    that.conexion = connection;
                    if (err) {
                        reject(`Error conectando a ${dbConfig.connectString}: ${err.message}`);
                        console.log(' ---------> No se pudo conectar');
                    } else {
                        resolve(`Conexión a ${dbConfig.connectString} establecida`);
                    }
                }
            );
        });
    }

    mueveCarga() {
        this.dots += '.';

        if (this.dots.length >= 6) {
            this.dots = '';
        }

        return this.dots;
    }

    desconectar() {
        let that = this;

        return new Promise((resolve, reject) => {
            if (that.conexion === null || typeof that.conexion === 'undefined') {
                reject(`No se ha establecido una conexión`);
            }

            that.conexion.close(function(err) {
                if (err) {
                    reject(`Error al desconectar de ${dbConfig.connectString}: ${err.message}`);
                } else {
                    resolve(`Desconexión de ${dbConfig.connectString} correctamente`);
                }
            });
        });
    }

    getSistemas() {
        return new Promise((resolve, reject) => {
            let that = this;

            if (that.conexion === null || typeof that.conexion === 'undefined') {
                reject(`No se ha establecido una conexión`);
            }

            that.conexion.execute(dbConfig.sistemasString, function(err, result) {
                if (err) {
                    reject([]);
                } else {
                    console.log('Retirando datos');

                    //resolve(`Sistemas solicitados correctamente`);
                    resolve(result.rows);
                }
            });
        });
    }
}

module.exports = ODB;
