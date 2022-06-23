'use strict'

const enunciadoCtrl = {};
const Enunciado = require('../models/Enunciado');
const Cuestionairo = require('../models/Cuestionario');

enunciadoCtrl.crearEnunciado = async (req, res) => {
    const enunciado = new Enunciado({
        titulo: req.body.titulo,
        cuestionario: req.body.cuestionario,
        numPregunta: req.body.numPregunta
    });

    Cuestionairo.findById(req.body.cuestionario, async (err, cuestionari) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'There is an error with the DB' });
        }
        if (cuestionari) {
            try {
                const result = await enunciado.save();
                //console.log(result);
                res.status(200).send(result);
            } catch (err) {
               console.log(err.message);
                res.status(500).send(err.message);
            }
        } else {
            res.status(404).send("Cuestionario not found");
        }
    });
}

enunciadoCtrl.contarEnunciadosPorCuestionario = (req, res) => {
    Enunciado.find({cuestionario: req.body.cuestionario}, (err, enunc) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'There is an error with the DB' });
        }
        if (enunc) {
            res.status(200).send({contador: enunc.length});
        } else {
            res.status(404).send("Enunciado not found");
        }
    })
}

module.exports = enunciadoCtrl;