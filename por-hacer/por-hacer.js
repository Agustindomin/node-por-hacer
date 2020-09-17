const fs = require('fs');

let listadoPorHacer = []; // defino e inicializo el array listadoPorHacer

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch {
        listadoPorHacer = [];
    }

};

const guardarDB = () => {

    // convertimos el objeto a string en formato json
    let data = JSON.stringify(listadoPorHacer);

    // grabamos los datos 
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Se ha producido un error al grabar la tarea');
    });

};

const crear = (descripcion) => { // funcion comando crear

    // Primero cargamos la DB con los datos guardados
    cargarDB();

    let porHacer = { // definimos un objeto y lo llenamos con las variables pasadas
        descripcion,
        completado: false
    };

    // Añadimos el registro porHacer al array listado con -push
    listadoPorHacer.push(porHacer);

    // guardamos la tarea en la DB

    guardarDB();

    // devolvemos la tarea porHacer
    return porHacer;

};

const getListado = () => {

    cargarDB();

    return listadoPorHacer;

};

const removeItemFromArray = (index) => {
    index !== -1 && listadoPorHacer.splice(index, 1);
};

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    // encontramos el indice del array que coincide con la descipcion, si ya existe
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion) // callback que recorre el array entero

    if (index >= 0) {
        // actualizamos el campo completado
        listadoPorHacer[index].completado = (completado === 'true');
        // guardamos la DB
        guardarDB();
        return true;
    } else {
        return false;
    }
};

// TAREA
const borrar = (descripcion) => {

    cargarDB();

    // Creamos un nuevo array pero sin el item (.filter())
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion) // callback que recorre el array entero

    if (listadoPorHacer.length !== nuevoListado.length) {
        listadoPorHacer = nuevoListado;
        // guardamos la DB
        guardarDB();
        return true;
    } else {
        return false;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
};