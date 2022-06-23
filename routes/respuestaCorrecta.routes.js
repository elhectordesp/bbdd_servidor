'use strict'

var express = require('express');
var RespuestaCorrectaController = require('../controllers/respuestaCorrecta.controller');

var api = express.Router();

api.post('/crear-respuesta-correcta', RespuestaCorrectaController.crearRespuestaCorrecta);
api.post('/obtener-respuestas', RespuestaCorrectaController.obtenerRespuesta);
api.post('/corregir-pregunta', RespuestaCorrectaController.corregirPregunta);

module.exports = api;