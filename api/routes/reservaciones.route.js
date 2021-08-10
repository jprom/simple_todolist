'use strict';

const express = require('express');

const router = express.Router();
const Reservacion = require('../models/reservaciones.model');

/*Función para listar todas las reservaciones existentes*/
router.get('/listar-reservaciones', (req, res) => {
    Reservacion.find((err, lista_reservaciones) => {
        if (err) {
            res.json({
                msj: "No se pudieron mostrar las reservaciones",
                err
            });
        } else {
            res.json({ lista_reservaciones })
        }
    })
});

/*Función para registrar una reservación*/
router.post('/registrar-reservacion', (req, res) => {
    let nueva_reserva = new Reservacion({
        fecha_reserva: req.body.fecha_reserva,
        salon: req.body.salon,
        cant_personas: req.body.cant_personas,
        estado: 'Pendiente',
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        fecha_creacion: new Date(),
        foto_factura: req.body.foto_factura
    });

    nueva_reserva.save((err, reserva_db) => {
        if (err) {
            res.json({
                msj: "No se pudo registrar la reservación",
                err
            });
        } else {
            res.json({
                msj: "La reservación se guardó exitosamente",
                reserva_db
            });
        }
    });
})

/*Función que permite realizar una búsqueda por a[proximación de nombre o apellido usando expresiones regulares*/
router.get('/buscar-reservacion-cliente', (req, res) => {
    let valor = req.query.valor;
    let regExp_contener = new RegExp('.*' + valor + '');

    Reservacion.find({
            $or: [{ nombre: { $regex: regExp_contener, $options: 'i' } },
                { apellidos: { $regex: regExp_contener, $options: 'i' } }
            ]
        },
        (err, lista_reservaciones) => {
            if (err) {
                res.json({
                    msj: "No se pudieron mostrar las reservaciones",
                    err
                });
            } else {
                res.json({ lista_reservaciones })
            }
        })
});

//Función que permite actualizar el estado de una reserva a Aceptada
router.put('/aceptar-reserva', (req, res) => {
    Reservacion.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                estado: "Aceptada"
            }
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo modificar el estado de la reservación",
                    err
                });
            } else {
                res.json({
                    msj: "La reservación ha sido aceptada.",
                    info
                });
            }
        })
});

//Función que permite actualizar el estado de una reserva a Rechaza
router.put('/rechazar-reserva', (req, res) => {
    Reservacion.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                estado: "Rechazada"
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

//Función que permite actualizar varios valores de la reservacion (Tipo 1)
router.put('/modificar-reserva', (req, res) => {
    Reservacion.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: {
                fecha_reserva: req.body.fecha_reserva,
                salon: req.body.salon,
                cant_personas: req.body.cant_personas,
                direccion: req.body.direccion,
                telefono: req.body.telefono
            }
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo modificar la reservación",
                    err
                });
            } else {
                res.json({
                    msj: "La reservación ha sido modificada.",
                    info
                });
            }
        })
});

//Función que permite actualizar varios valores de la reservacion (Tipo 2)
router.put('/modificar-reserva-tipo2', (req, res) => {
    Reservacion.updateOne({ _id: req.body._id }, //Primer par de corchetes: campo para buscar
        { //Segundo par de corchetes: que vamos a actualizar
            $set: req.body
        },
        (err, info) => {
            if (err) {
                res.json({
                    msj: "No se pudo modificar la reservación",
                    err
                });
            } else {
                res.json({
                    msj: "La reservación ha sido modificada.",
                    info
                });
            }
        })
});

router.delete('/eliminar-reserva', (req, res) => {
    let _id = req.body._id;
    Reservacion.findOneAndRemove({ _id: _id }, (err) => {
        if (err) {
            res.json({
                msj: 'No se pudo eliminar la reservación',
                err
            });
        } else {
            res.json({
                msj: 'La reservación se eliminó correctamente'
            });
        }
    });
});

module.exports = router;