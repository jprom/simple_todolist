'use strict';

const mongoose = require('mongoose');

const schema_usuarios = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    apellidos: { type: String, required: true, unique: false },
    fecha_nacimiento: { type: Date, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    user_type: { type: String, required: true, unique: false }
});

module.exports = mongoose.model('Usuario', schema_usuarios, 'Usuarios');