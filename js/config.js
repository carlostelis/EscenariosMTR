module.exports = {
    exadata: {
        sin: {
            bd            : "BD_ESCEN_SIN",
            password      : "wOhm6PzNoq",
            url           : "//mer-scan.cenace.com:1521/PRUEBAS",
        },
        acceso: {
            bd            : "BD_ESCEN_ACCESO",
            password      : "X12YlAqEpa",
            url           : "//mer-scan.cenace.com:1521/PRUEBAS",
        }
    },
    exalogic: {
        direccion: '10.71.14.73',
        base: "/pruebas"
    },
    sistemas: [
        {
            nombre: "BCA",
            carpeta: "mtrbcaems"
        },
        {
            nombre: "BCS",
            carpeta: "mtrbcsems"
        },
        {
            nombre: "SIN",
            carpeta: "mtrsinems"
        }
    ],
    algoritmos: [
        {
            nombre: "DERS-I",
            periodos: 1,
            intervalos: 12,
            carpeta: 'dersi'
        },
        {
            nombre: "DERS-MI",
            periodos: 4,
            intervalos: 4,
            carpeta: 'dersmi'
        },
        {
            nombre: "AUTR",
            periodos: 8,
            intervalos: 1,
            carpeta: 'autr'
        }
    ],
};
