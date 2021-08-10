'use strict';

const express = require('express');

const router = express.Router();
const Login = require('../models/login.model');

//req --> Peticion
//res --> respuesta
router.get('/listar-logins', (req, res) => {
    Login.find((err, lista_logins) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los logins",
                err
            });
        } else {
            res.json({ lista_logins })
        }
    })
});

router.post('/login', (req, res) => {
    Login.find((err, lista_logins) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los logins",
                err
            });
        } else {
            res.json({ lista_logins })
        }
    })
});

module.exports = router;