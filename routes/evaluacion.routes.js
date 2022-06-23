'use strict'

var express = require('express');
var EvaluacionController = require('../controllers/evaluacion.controller');

var api = express.Router();

api.post('/crear-evaluacion', EvaluacionController.crearEvaluacion);

module.exports = api;