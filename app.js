//Importamos los paquetes yargs y colors
const argv = require('./config/yargs').argv;

const colors = require('colors');

// Importamos el paquete custom porHacer
const porHacer = require('./por-hacer/por-hacer');

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':

        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('========Por hacer========='.green);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('=========================='.green);
        }

        break;

    case 'actualizar':

        let tareaActualizada = porHacer.actualizar(argv.descripcion, argv.completado);

        console.log('Tarea actualizada: ', tareaActualizada);

        break;

    case 'borrar':

        let tareaBorrada = porHacer.borrar(argv.descripcion);

        console.log('Tarea borrada', tareaBorrada);

        break;

    default:
        console.log(`Comando ${ comando} no es reconocido`);
}