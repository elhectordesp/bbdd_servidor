"use strict";

const respuestaCorrectaCtrl = {};
const RespuestaCorrecta = require("../models/RespuestaCorrecta");
const Cuestionairo = require("../models/Cuestionario");

respuestaCorrectaCtrl.crearRespuestaCorrecta = async (req, res) => {
  const respuestaCorrecta = new RespuestaCorrecta({
    texto: req.body.texto,
    cuestionario: req.body.cuestionario,
    numPregunta: req.body.numPregunta,
  });

  Cuestionairo.findById(req.body.cuestionario, async (err, cuestionari) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "There is an error with the DB" });
    }
    if (cuestionari) {
      try {
        const result = await respuestaCorrecta.save();
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

respuestaCorrectaCtrl.obtenerRespuesta = (req, res) => {
  RespuestaCorrecta.find(
    { cuestionario: req.body.cuestionario },
    (err, respuestasC) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "There is an error with the DB" });
      }
      if (respuestasC) {
        res.status(200).send(respuestasC);
      } else {
        res.status(404).send("Respuestas not found");
      }
    }
  );
};

respuestaCorrectaCtrl.corregirPregunta = (req, res) => {
  let buena = false;
  let comprobante = true;

  RespuestaCorrecta.find(
    { cuestionario: req.body.cuestionario, numPregunta: req.body.numPregunta },
    (err, respuestasCorrectas) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "There is an error with the DB" });
      }
      if (respuestasCorrectas) {
        // aqui hacemos las comprobaciones
        if (respuestasCorrectas.length > 1) {
          // Para la opcion de respuesta con dos opciones o más
          let respuestasString = "";
          respuestasString = req.body.respuestas
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

            if (respuestasString.includes(",")) {
            let auxiliar = respuestasString.split(",");
            for (let i = 0; i < respuestasCorrectas.length; i++) {
                console.log(auxiliar[i].trim().toLocaleLowerCase(), ' y ', respuestasCorrectas[i].texto.trim().toLocaleLowerCase());
              if (auxiliar[i].trim().toLocaleLowerCase() !== respuestasCorrectas[i].texto.trim().toLocaleLowerCase()) {
                comprobante = false;
              }
            }

            if (comprobante) {
              buena = true;
            }
          } else if (respuestasString.includes("->")) {
            let auxiliar = respuestasString.split(";");
            for (let i = 0; i < respuestasCorrectas.length; i++) {
              if (auxiliar[i]?.trim().toLocaleLowerCase() !== respuestasCorrectas[i].texto?.trim().toLocaleLowerCase()) {
                comprobante = false;
              }
            }

            if (comprobante) {
              buena = true;
            }
          } else {
            for (let i = 0; i < respuestasCorrectas.length; i++) {
                console.log(respuestasString.trim().toLowerCase(), ' y ', respuestasCorrectas[i].texto.trim().toLocaleLowerCase());
                if (respuestasString.trim().toLowerCase() === respuestasCorrectas[i].texto.trim().toLocaleLowerCase()) {
                  comprobante = true;
                }
              }
  
              if (comprobante) {
                buena = true;
              }
          }
        } else {
          let res = "";

          res = respuestasCorrectas[0].texto
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          if (res.includes(":")) {
            // Si uncluye : es porque es numerica
            let aux1 = res.split(":");
            let aux2 = Number(aux1[0]) - Number(aux1[1]);
            let aux3 = Number(aux1[0]) + Number(aux1[1]);

            if (
              Number(req.body.respuestas) >= aux2 &&
              Number(req.body.respuestas) <= aux3
            ) {
              buena = true;
            }
          } else if (res === "T") {
            if (
              req.body.respuestas === "T" ||
              req.body.respuestas === "t" ||
              req.body.respuestas === "True" ||
              req.body.respuestas === "TRUE" ||
              req.body.respuestas === "true" ||
              req.body.respuestas === "V" ||
              req.body.respuestas === "v" ||
              req.body.respuestas === "Verdadero" ||
              req.body.respuestas === "VERDADERO" ||
              req.body.respuestas === "verdadero"
            ) {
              buena = true;
            }
          } else if (res === "F") {
            if (
              req.body.respuestas === "F" ||
              req.body.respuestas === "f" ||
              req.body.respuestas === "False" ||
              req.body.respuestas === "FALSE" ||
              req.body.respuestas === "false" ||
              req.body.respuestas === "Falsa" ||
              req.body.respuestas === "FALSA" ||
              req.body.respuestas === "falsa"
            ) {
              buena = true;
            }
          } else {

            req.body.respuestas = req.body.respuestas
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

            if (
              res.toLocaleLowerCase() ===
              req.body.respuestas.toLocaleLowerCase()
            ) {
              buena = true;
            }
          }
        }
        console.log(buena, respuestasCorrectas[0].texto);
        let auxilio = "";

        for (let a of respuestasCorrectas) {
          
          auxilio += respuestasCorrectas.texto;
        }

        res.status(200).send({buena: buena, respuestasCorrectas: auxilio});
      } else {
        res.status(404).send("Respuestas not found");
      }
    }
  );
};

module.exports = respuestaCorrectaCtrl;
