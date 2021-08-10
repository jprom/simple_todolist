'use strict';

const express = require('express');

const router = express.Router();
const Categoria = require('../models/categorias.model');

//req --> Peticion
//res --> respuesta
router.get('/madmin/listar-categorias', (req, res) => {
    Categoria.find((err, lista_categorias) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los categorias",
                err
            });
        } else {
            res.json({ lista_categorias })
        }
    })
});

router.post('/madmin/registrar-categoria', (req, res) => {
    let nuevo_categoria = new Categoria({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    });
    nuevo_categoria.save((err, categoria_bd) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar el Categoria",
                err
            })
        } else {
            res.json({
                msj: "El categoriase registró exitosamente",
                categoria_bd
            })
        }
    });
});

//Función que permite actualizar varios valores de la reservacion (Tipo 1)
router.put('/madmin/modificar-categoria', (req, res) => {
    Categoria.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
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
                    msj: "La categorias ha sido modificada.",
                    info
                });
            }
        })
});

router.get('/madmin/buscar-categorias', (req, res) => {
    //let correo_ingresa = req.query.correo;
    Categoria.find({ nombre: req.query.nombre }, (err, lista_categorias) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar los categorias",
                err
            });
        } else {
            res.json({ lista_categorias });
        }
    })
});


router.put('/madmin/deshabilitar-categoria', (req, res) => {
    Categoria.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
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

router.put('/madmin/habilitar-categoria', (req, res) => {
    Categoria.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
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


router.delete('/madmin/eliminar-categoria', (req, res) => {
    let _id = req.body._id;
    Categoria.findOneAndRemove({ _id: _id }, (err) => {
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