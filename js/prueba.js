var path = require('path');
var ListaArchivos = require('./ListaArchivos.js');
var lista = new ListaArchivos('');
var ruta = 'C:\\Users\\Carlos\\Documents\\';

lista.marcarDescargado(ruta);

console.log(lista.isDescargado(ruta));
