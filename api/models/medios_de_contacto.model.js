'use strict';

const mongoose = require('mongoose');

const schema_medios_de_contacto = new mongoose.Schema({
    tipo: { type: String, required: true, unique: false },
    valor: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    usuario: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Medios_de_contacto', schema_medios_de_contacto, 'Medio_de_contacto');