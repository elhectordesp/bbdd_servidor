"use strict";

const evaluacionCtrl = {};
const Evaluacion = require("../models/Evaluacion");
const Cuestionario = require("../models/Cuestionario");

evaluacionCtrl.crearEvaluacion = async (req, res) => {
  const evaluacion = new Evaluacion({
    nota: req.body.nota,
    cuestionario: req.body.cuestionario,
    fecha: req.body.fecha,
  });

  Cuestionario.findById(req.body.cuestionario, async (err, cuestionari) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "There is an error with the DB" });
    }
    if (cuestionari) {
      try {
        const result = await evaluacion.save();
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
};

module.exports = evaluacionCtrl;
