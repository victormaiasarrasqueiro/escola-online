// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(

	{ 	

	    nm:     { type: String, required:true, min: 3, max: 50 }, 

	    idVid:  { type: String, required:true, min: 3, max: 50 },   

	    ds:     { type: String, required:true, min: 3, max: 300},

	    idCur:  { type: String, required:true, min: 3, max: 50},
	   
	    idCat:  { type: String, required:true},

	    tags:   [ { type: String, required:true, min: 1, max: 15} ], // Aonde será realizado a busca


	    dsExt:  {type: String, required:false, max: 3500},


	 	views:  { type: Number, required:true },

	 	ordem:  { type: Number },


	    // basico
	    idUsu:  { type: String,  required: true, select: false },
	    ieAtv:  { type: Boolean, required: true, select: false },

	    // criação
	    dtCad:  { type: Date,    required: true, select: false },

	    // remoção
	    dtExc: { type: Date,    required: false, select: false }

	}, 
	{ 
		collection: 'aula'
	}

);

schema.index({ ieAtv: 1, idCur:1, tags:1, idUsu:1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Aula', schema);