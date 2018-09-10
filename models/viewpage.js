// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(

	{ 	
		pais:     { type: String, required:true},

	    idCat:    { type: String, required:true},
	    idCatPai: { type: String, required:true},
	    nmCat:    { type: String, required:true, trim: true},
	    ordem: 	  { type: Number, required:true},
	    _class:   { type: String, select:false},
	    nivel:    { type: Number, required:true},

	    content:  { 

	    	cursos: []

	    },

	    // criação
	    dtCad:   { type: Date, required: true, select: false, default: Date.now }

	}, 
	{ 
		collection: 'viewpage'
	}

);

schema.index({ pais:1, nivel:1, idCatPai:1 ,ordem:1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Viewpage', schema);