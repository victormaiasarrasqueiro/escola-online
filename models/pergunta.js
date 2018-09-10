// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Curso = require('../models/aula'); 

var Schema = mongoose.Schema;

var schema = new Schema(
	
	{ 

	    ask:      { type: String, required:true, min: 3, max: 50 },  
	 	answer:   { type: String, required:true, min: 3, max: 500},
	    
	    idAul:    { type: String, required:false},
	    idCur:    { type: String, required:true},
	    idUsu:    { type: String, required:true},

	    idUsuAsk: { type: String, required:true},
	    dtAsk:    { type: Date,   required:true},

	    // basico
	    ieAtv: { type: Boolean, required: true, select: false },

	    // remoção
	    dtExc: { type: Date,    required: false, select: false }


	}, 
	{ 
		collection: 'pergunta' 
	}

);

schema.index({ ieAtv: 1, idUsu:1, idCur:1, idAul:1, dtAsk: 1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Curso', schema);