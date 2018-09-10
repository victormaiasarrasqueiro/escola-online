// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Curso = require('../models/aula'); 

var Schema = mongoose.Schema;

var schema = new Schema(
	
	{ 

	    nm:     { type: String, required:true, min: 3, max: 25 },  
	 	ds:     { type: String, required:true, min: 3, max: 100},
	    
	    idCat1: { type: String, required:true},
	    idCat2: { type: String, required:true},
	    idCat3: { type: String, required:true},



	    // Imagem
	    idVid:  { type: String, required:true, min: 3, max: 50 },   // Usando para pegar o thumb
	   

		views:  { type: Number, required:true, default:0}, //Visualizacoes curso geral
		nuAtz:  { type: Number, required:true, default:0}, //Visualizacoes curso geral

	    // basico
	    idUsu: { type: String,  required: true, select: false },
	    ieAtv: { type: Boolean, required: true, select: false },

	    // criação
	    dtCad: { type: Date,    required: true, select: false },

	    // remoção
	    dtExc: { type: Date,    required: false, select: false }


	}, 
	{ 
		collection: 'curso' 
	}

);

schema.index({ ieAtv: 1, idCat1:1, idCat2:1, idCat3:1, idUsu: 1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Curso', schema);