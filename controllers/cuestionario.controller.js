'use strict'

const cuestionarioCtrl = {};
const Cuestionario = require('../models/Cuestionario');

cuestionarioCtrl.crearCuestionario = (req, res) => {
    let cuestionario = new Cuestionario();

    let params = req.body;
    cuestionario.nombre = params.nombre;

    cuestionario.save((err, cuestionarioCreado) => {
        if (err) {
            res.status(500).send({message: 'Error al crear el cuestionario'});
        } else {
            if (!cuestionarioCreado) {
                res.status(404).send({message: 'Error al guardar el cuestionario'});
            } else {
                res.status(200).send({ cuestionario: cuestionarioCreado});
            }
        }
    });
}

cuestionarioCtrl.obtenerCuestionarioPorNombre = (req, res) => {
    console.log('entramos aqui');
    Cuestionario.find({nombre: req.params.nombre}, (err, cuest) => {
        if (err) {
            res.status(500).send({message: 'Error al crear el cuestionario'});
        } else {
            if (!cuest) {
                res.status(404).send({message: 'Error al guardar el cuestionario'});
            } else {
                res.status(200).send({ cuestionario: cuest});
            }
        }
    });
}

module.exports = cuestionarioCtrl;