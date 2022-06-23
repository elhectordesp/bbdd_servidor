'use strict'

var mongoose =  require('mongoose');

var Schema = mongoose.Schema;

var EvaluacionSchema = Schema({
    nota: String,
    cuestionario: mongoose.Types.ObjectId,
    fecha: Date
});

module.exports = mongoose.model('Evaluacion', EvaluacionSchema);