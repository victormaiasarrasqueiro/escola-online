// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
	
	{ 

	    nm:    { type: String, required:true, min: 3, max: 20 },  

	    pai:   { type: String, required:true, max: 50 },

	    ordem: { type: Number },
	 	
	    ieAtv: { type: String, required: true},

	    // criação
	    dtCad: { type: Date,    required: true, select: false }

	}, 
	{ 
		collection: 'categoria' 
	}

);

schema.index({ ieAtv: 1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Categoria', schema);