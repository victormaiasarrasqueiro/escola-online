// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
	
	{ 

	    nm:    { type: String, required:true, min: 3, max: 20 },  

	    idCur: { type: String, required:true, min: 3, max: 50},

	    corLet: { type: String, required:true, min: 3, max: 10 }, 
	    corFun: { type: String, required:true, min: 3, max: 10 }, 

	    ordem: { type: Number, required:true}, 
	 	
	    ieAtv: { type: Boolean, required: true, select: false },
	    idUsu: { type: String,  required: true, select: false },

	    // criação
	    dtCad: { type: Date,    required: true, select: false }

	}, 
	{ 
		collection: 'modulo' 
	}

);

schema.index({ ieAtv: 1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Modulo', schema);