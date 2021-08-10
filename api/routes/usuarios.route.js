'use strict';

const express = require('express');

const router = express.Router();
const Usuario = require('../models/usuarios.model');

//req --> Peticion
//res --> respuesta
router.get('/listar-usuarios', (req, res) => {
    Usuario.find((err, lista_usuarios) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_usuarios })
        }
    })
});

router.post('/usuario/crear', (req, res) => {
    let nuevo_usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.nombre,
        fecha_nacimiento: req.body.fecha_nacimiento,
        username: req.body.username,
        password: req.body.password,
        user_type: req.body.user_type
    });

    nuevo_usuario.save((err, usuario_db) => {
        if (err) {
            res.json({
                msj: "No ha sido posible crear un nuevo usuario",
                err
            });
        } else {
            res.json({ usuario_db })
        }
    });
});

module.exports = router;