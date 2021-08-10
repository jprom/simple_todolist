'use strict';

const mongoose = require('mongoose');

const schema_categorias = new mongoose.Schema({
    nombre: { type: String, required: true, unique: false },
    descripcion: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false },
});

module.exports = mongoose.model('Categoria', schema_categorias, 'Categorias');