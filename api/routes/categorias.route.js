'use strict';

const express = require('express');

const router = express.Router();
const Tarea = require('../models/tareas.model');

//req --> Peticion
//res --> respuesta
router.get('/listar-tareas', (req, res) => {
    Tarea.find((err, lista_tareas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los tareas",
                err
            });
        } else {
            res.json({ lista_tareas })
        }
    })
});

router.post('/registrar-categoria', (req, res) => {
    let nuevo_categoria = new Tarea({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    });
    nuevo_categoria.save((err, categoria_bd) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el Tarea",
                err
            })
        } else {
            res.json({
                msj: "El tarease registró exitosamente",
                categoria_bd
            })
        }
    });
});

//Función que permite actualizar varios valores de la reservacion (Tipo 1)
router.put('/modificar-categoria', (req, res) => {
    Tarea.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            }
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo modificar la categoria",
                    err
                });
            } else {
                res.json({
                    msj: "La tareas ha sido modificada.",
                    info
                });
            }
        })
});

router.get('/buscar-tareas', (req, res) => {
    //let correo_ingresa = req.query.correo;
    Tarea.find({ nombre: req.query.nombre }, (err, lista_tareas) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los tareas",
                err
            });
        } else {
            res.json({ lista_tareas });
        }
    })
});


router.put('/deshabilitar-categoria', (req, res) => {
    Tarea.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                estado: "Deshabilitado"
            }
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo rechazar la reservación",
                    err
                });
            } else {
                res.json({
                    msj: "La reservación ha sido rechazada.",
                    info
                });
            }
        })
});

router.put('/habilitar-categoria', (req, res) => {
    Tarea.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                estado: "Activo"
            }
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo rechazar la reservación",
                    err
                });
            } else {
                res.json({
                    msj: "La reservación ha sido rechazada.",
                    info
                });
            }
        })
});


router.delete('/eliminar-categoria', (req, res) => {
    let _id = req.body._id;
    Tarea.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la categoria',
                err
            });
        } else {
            res.json({
                msj: 'La categoria se eliminó correctamente'
            });
        }
    });
});





module.exports = router;