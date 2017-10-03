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
        host: '10.71.14.73',
        user: 'historicomtr',
        password: 'historicomtr01',
        base: "/pruebas/"
    },
    sistemas: [
        {
            nombre: "BCA",
            carpeta: "mtrbcaems",
            //carpeta: "historicomtr",
            zona: "America/Tijuana"
        },
        {
            nombre: "BCS",
            //carpeta: "mtrbcsems",
            carpeta: "historicomtr",
            zona: "America/Mazatlan"
        },
        {
            nombre: "SIN",
            carpeta: "mtrsinems",
            //carpeta: "historicomtr",
            zona: "America/Mexico_City"
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
    local: {
        escenarios: 'C:/AppAnalizadorEscenarios'
    }
};
