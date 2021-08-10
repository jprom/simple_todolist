'use strict';

const express = require('express');

const router = express.Router();
const Comentario = require('../models/comentarios.model');

//req --> Peticion
//res --> respuesta
router.get('/listar-comentarios', (req, res) => {
    Comentario.find((err, lista_comentarios) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_comentarios })
        }
    })
});

router.post('/registrar-comentario', (req, res) => {
    let nuevo_comentario = new Comentario({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        correo: req.body.correo,
        comentario: req.body.comentario,
        fecha: new Date()
    });
    nuevo_comentario.save((err, comentario_bd) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el comentario",
                err
            })
        } else {
            res.json({
                msj: "El comentario se registró exitosamente",
                comentario_bd
            })
        }
    });
});

router.get('/buscar-comentarios-correo', (req, res) => {
    //let correo_ingresa = req.query.correo;
    Comentario.find({ correo: req.query.correo }, (err, lista_comentarios) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los comentarios",
                err
            });
        } else {
            res.json({ lista_comentarios });
        }
    })
});

module.exports = router;