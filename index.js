'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3999;

// Importar variables de entorno locales
require('dotenv').config({ path: 'variables.env'});
console.log(process.env.DB_URL);

mongoose.connect(process.env.DB_URL, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('La conexion a la base de datos esta corriendo.');

        // Leer localhost de variables
        const host = process.env.HOST || '0.0.0.0';
        app.listen(port, host, () => {
            console.log('Servidor corriendo');
        })
    }
});