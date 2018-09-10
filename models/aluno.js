// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(

	{ 	

	    idCur:  { type: String, required:true, min: 3, max: 50},

	    alunos: [ { type: String, required:true, min: 1, max: 50} ], // Aonde será realizado a busca

	    // basico
	    idUsu:  { type: String,  required: true, select: false },
	    ieAtv:  { type: Boolean, required: true, select: false },

	    // criação
	    dtCad:  { type: Date,    required: true, select: false },

	    // remoção
	    dtExc: { type: Date,    required: false, select: false }

	}, 
	{ 
		collection: 'aluno'
	}

);

schema.index({ ieAtv: 1, idCur:1, idUsu:1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Aluno', schema);