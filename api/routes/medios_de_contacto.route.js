'use strict';

const express = require('express');

const router = express.Router();
const MedioDeContacto = require('../models/medios_de_contacto.model');

//req --> Peticion
//res --> respuesta
router.get('/listar-medios-contacto', (req, res) => {
    MedioDeContacto.find((err, lista_medios_de_contacto) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los usuarios",
                err
            });
        } else {
            res.json({ lista_medios_de_contacto })
        }
    })
});

router.post('/medios-de-contacto/crear', (req, res) => {
    let nuevo_medio_de_contacto = new MedioDeContacto({
        tipo: req.body.tipo,
        valor: req.body.valor,
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });

    nuevo_medio_de_contacto.save((err, medio_de_contacto_db) => {
        if (err) {
            res.json({
                msj: "No ha sido posible crear un nuevo medio de contacto",
                err
            });
        } else {
            res.json({ medio_de_contacto_db })
        }
    });
});

module.exports = router;