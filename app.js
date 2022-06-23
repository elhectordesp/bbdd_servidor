'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
const cuestionario_routes = require('./routes/cuestionario.routes');
const enunciado_routes = require('./routes/enunciado.routes');
const respuestaCorrecta_routes = require('./routes/respuestaCorrecta.routes');
const evaluacion_routes = require('./routes/evaluacion.routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras http

// Rutas base

app.use('/api/cuestionario', cuestionario_routes);
app.use('/api/enunciado', enunciado_routes);
app.use('/api/respuestaCorrecta', respuestaCorrecta_routes); 
app.use('/api/evaluacion', evaluacion_routes); 

module.exports = app;