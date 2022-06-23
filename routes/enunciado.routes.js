'use strict'

var express = require('express');
var EnunciadoController = require('../controllers/enunciado.controller');

var api = express.Router();

api.post('/crear-enunciado', EnunciadoController.crearEnunciado);
api.post('/contar-enunciados', EnunciadoController.contarEnunciadosPorCuestionario);

module.exports = api;