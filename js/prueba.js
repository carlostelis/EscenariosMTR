var path = require('path');

var ruta = "/pruebas/historicomtr/dersmi/datosh/2017/02/27/201702270001_-06";
console.log(ruta);
console.log(path.dirname(path.dirname(ruta)));

// var Client = require('ftp');
//   var fs = require('fs');
//
//   var c = new Client();
//   c.on('ready', function() {
//     c.get('/pruebas/mtrsinems/.bashrc', function(err, stream) {
//       if (err) throw err;
//       stream.once('close', function() { c.end(); });
//       stream.pipe(fs.createWriteStream('bashrc.txt'));
//     });
//   });
//
//   // connect to localhost:21 as anonymous
//   c.connect({
//       host: '10.71.14.73',
//       user: 'historicomtr',
//       password: 'historicomtr01'
//   });
