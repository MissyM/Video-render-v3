// build script
// Se importa la librería shell 
const shell = require('shelljs')
//Sale de la carpeta de electron
shell.cd('..')
//Entra en la carpeta admin-app
shell.cd('admin-app')
//el metodo .exec ejecuta un comando npm y cp copia el contenido de build a student-app-compiled
shell.exec('npm run build', () => {
  shell.cp('-Rf', 'build/*', '../electron/admin-app-compiled')
})
