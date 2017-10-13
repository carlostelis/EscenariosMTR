let moment = require('moment');
let val = moment('2099-10-19T08:00:00').isBetween('2010-10-19T05:00:00', '2099-10-19T07:00:00');
console.log(val);

// let inicio = {};
// let fin = {};
//
// let [inicio_str, fin_str] = '111020171430_2099'.split('_');
//
// if (inicio_str.length >= 12) {
//     inicio.dia = inicio_str.substr(0, 2);
//     inicio.mes = inicio_str.substr(2, 2);
//     inicio.anio = inicio_str.substr(4, 4);
//     inicio.hora = inicio_str.substr(8, 2);
//     inicio.min = inicio_str.substr(10, 2);
// } else {
//     console.log('inicio sin long 12');
// }
//
// if (fin_str.length >= 12) {
//     fin.dia = fin_str.substr(0, 2);
//     fin.mes = fin_str.substr(2, 2);
//     fin.anio = fin_str.substr(4, 4);
//     fin.hora = fin_str.substr(8, 2);
//     fin.min = fin_str.substr(10, 2);
// } else if (fin_str.length === 4) {
//     fin.dia = 1;
//     fin.mes = 1;
//     fin.anio = fin_str.substr(0, 4);
//     fin.hora = 0;
//     fin.min = 0;
// } else {
//     console.log('Fin sin long 12 ni 4');
// }
//
// console.log(inicio);
// console.log(fin);
