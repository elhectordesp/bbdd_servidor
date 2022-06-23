'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT | 3999;

mongoose.connect('mongodb://localhost:27017/tfg-hector', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('La conexion a la base de datos esta corriendo.');

        app.listen(port, () => {
            console.log('Servidor corriendo');
        })
    }
});