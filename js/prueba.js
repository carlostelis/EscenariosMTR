const { spawn } = require('child_process');

try {
  process.chdir('C:\\AppAnalizadorEscenarios\\dersi\\escenario_original\\2017\\10\\16\\201710160001_-07\\');
  console.log(`New directory: ${process.cwd()}`);

  const ls = spawn('DERSI.exe');

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
} catch (err) {
  console.error(`chdir: ${err}`);
}
