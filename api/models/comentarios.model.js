'use strict';

const mongoose = require('mongoose');

const schema_comentarios = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    telefono: { type: String, required: true, unique: false },
    correo: { type: String, required: true, unique: false },
    comentario: { type: String, required: true, unique: false },
    fecha: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Comentario', schema_comentarios, 'Comentarios');