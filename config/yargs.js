// TAREA

// Config para yargs
const descripcion = { // parametros después del comando que puede recibir y los customizamos
    demand: true, // el parametro descripcion es obligatorio
    alias: 'd', // alias para el parametro descripcion
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true, // completado no es obligatorio y por defecto es true
    desc: 'Marca como completado o pendiente la tarea por hacer'
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('listar', 'Listado de tareas por hacer')
    .command('borrar', 'Borrado de tareas por hacer', { descripcion })
    .help() // ayuda proporcionada por yargs
    .argv;

// exportamos argv para poder usarlo fuera de este script
module.exports = {
    argv
}