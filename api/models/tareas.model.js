'use strict';

const mongoose = require('mongoose');

const schema_tareas = new mongoose.Schema({
    fecha: { type: Date, required: true, unique: false },
    nombre: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    prioridad: { type: String, required: true, unique: false },
    encargado: { type: String, required: true, unique: false },
    imagen: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Tarea', schema_tareas, 'Tareas');