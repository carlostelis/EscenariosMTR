module.exports = {
    bd: {
        sin: {
            bd            : "BD_ESCEN_SIN",
            password      : "wOhm6PzNoq",
            url           : "//mer-scan.cenace.com:1521/PRUEBAS",
        },
        acceso: {
            bd            : "BD_ESCEN_ACCESO",
            password      : "X12YlAqEpa",
            url           : "//mer-scan.cenace.com:1521/PRUEBAS",
        },
        query: {
            sistemasString: "SELECT * FROM ESC_SISTEMAS"
        }
    },
    sistemas: [
        { nombre: "BCA" },
        { nombre: "BCS" },
        { nombre: "SIN" }
    ],
    algoritmos: [
        {
            nombre: "DERS-I",
            periodos: 1,
            intervalos: 12
        },
        {
            nombre: "DERS-MI",
            periodos: 4,
            intervalos: 4
        },
        {
            nombre: "AUTR",
            periodos: 8,
            intervalos: 1
        }
    ]
};
