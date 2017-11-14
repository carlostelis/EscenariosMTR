const { spawn, execFile } = require('child_process');

// process.env.PATH = `${process.env.PATH};C:\\chtpc______\\ILOG`
// const child = execFile('DERS.exe', (error, stdout, stderr) => {
//     if (error) {
//         console.log(error);
//         console.error('stderr', stderr);
//         return;
//         // throw error;
//     }
//     console.log('stdout', stdout);
// });



process.env.PATH = `${process.env.PATH};C:\\chtpc______\\ILOG`
const exe = spawn('DERS.exe');

exe.stdout.on('data', (data) => {
    console.log(data);
});

exe.stderr.on('data', (data) => {
    console.log(data);
});

exe.on('close', (code) => {
    console.log(`Finaliza ejecución, código: ${code}`);
});
