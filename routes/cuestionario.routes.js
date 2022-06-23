'use strict'

var express = require('express');
var CuestionarioController = require('../controllers/cuestionario.controller');

var api = express.Router();

api.post('/crear-cuestionario', CuestionarioController.crearCuestionario);
api.get('/obtener-cuestionario/:nombre', CuestionarioController.obtenerCuestionarioPorNombre);

module.exports = api;