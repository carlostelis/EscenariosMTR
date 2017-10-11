class BDLocal {
    constructor(json, win, id) {
        this.json = json;
        const SQL = require('./sql.js');
        this.db = new SQL.Database();
        this.path = require('path');
        this.win = win;
        this.id = id;
        this.cont = 0;
        this.tablasValidas = 0;
    }

    set(json, win, id) {
        this.json = json;
        this.win = win;
        this.id = id;
    }

    init() {
        return new Promise((resolve, reject) => {
            let promesas = [];
            this.cont = 0;
            this.tablasValidas = 0;

            // Cuenta las tablas a crear
            this.json.forEach((tabla) => {
                if (typeof tabla.campos !== 'undefined' && tabla.campos.length > 0) {
                    this.tablasValidas++;
                }
            });

            console.log('Tablas a crear:', this.tablasValidas);

            let to = 50;
            this.json.forEach((tabla) => {
                to += 25;
                setTimeout(() => {
                    if (typeof tabla.campos !== 'undefined' && tabla.campos.length > 0) {
                        promesas.push(this.crearTabla(tabla));
                    }
                }, to);
            });

            setTimeout(() => {
                Promise.all(promesas).then(() => {
                    resolve();
                    console.log('TABLAS CREADAS');
                }, () => {
                    reject();
                });
            }, to);
        });
    }

    crearTabla(tabla) {
        return new Promise((resolve, reject) => {
            let nombre_tabla = this.path.basename(tabla.nombre, '.csv');
            let sqlstr = `DROP TABLE IF EXISTS ${nombre_tabla};
            CREATE TABLE ${nombre_tabla} (`;

            tabla.campos.forEach((campo) => {
                sqlstr += `${campo.nombre} ${campo.tipo}, `;
            });

            // Quita el {ultimo ,
            if (sqlstr.endsWith(', ')) {
                sqlstr = sqlstr.substr(0, sqlstr.length - 2);
            }
            sqlstr += '); ';

            // Crea la tabla
            try {
                this.db.run(sqlstr);
                console.log('Tabla creada:', nombre_tabla);
                this.cont++;
                this.win.webContents.send(`bd_${this.id}:progreso`, (this.cont / this.tablasValidas * 100));
            } catch (e) {
                console.log(e.message);
                reject();
            }

            resolve();
        });
    }
};

module.exports = BDLocal;
