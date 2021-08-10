'use strict';

const mongoose = require('mongoose');

const schema_logins = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    created_at: { type: Date, required: true, unique: false }
});

module.exports = mongoose.model('Login', schema_logins, 'Logins_Juan_Pablo_Rosales');