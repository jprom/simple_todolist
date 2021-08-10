'use strict';

const mongoose = require('mongoose');

const schema_reservaciones = new mongoose.Schema({
    fecha_reserva: { type: Date, required: true, unique: false },
    salon: { type: String, required: true, unique: false },
    cant_personas: { type: String, required: true, unique: false },
    estado: { type: String, required: true, unique: false },
    nombre: { type: String, required: true, unique: false },
    apellidos: { type: String, required: true, unique: false },
    direccion: { type: String, required: false, unique: false },
    telefono: { type: String, required: true, unique: false },
    fecha_creacion: { type: Date, required: true, unique: false },
    foto_factura: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Reservacion', schema_reservaciones, 'Reservaciones');