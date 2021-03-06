// C:\Users\sdkca\Desktop\electron-workspace\build.js
var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: './built_app/Escenarios_MTR-win32-x64',
    // Specify the existing folder where
    outputDirectory: './installers/Escenarios_MTR-win32-x64',
    // The name of the Author of the app (the name of your company)
    authors: 'Yo',
    // The name of the executable of your built
    exe: 'Escenarios_MTR.exe',
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("Instaladores generados correctamente");
}, (e) => {
    console.log(`Error generando instaladores: ${e.message}`)
});
