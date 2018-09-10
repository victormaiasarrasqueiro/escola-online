// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema(
	
	{ 

	    per:    { type: String, required:true, min: 3, max: 100 },  

	  
	    rsp1:   { type: String, required:true, min: 3, max: 100 }, 
	    rsp2:   { type: String, required:true, min: 3, max: 100 }, 
	    rsp3:   { type: String, required:true, min: 3, max: 100 }, 
	    rsp4:   { type: String, required:true, min: 3, max: 100 }, 
	   

	    idCur:  { type: String, required:true, min: 3, max: 50},
	 	
	    ieAtv: { type: Boolean, required: true, select: false },
	    idUsu: { type: String,  required: true, select: false },

	    // criação
	    dtCad: { type: Date,    required: true, select: false }

	}, 
	{ 
		collection: 'enquete' 
	}

);

schema.index({ ieAtv: 1 , idCur:1 , idUsu:1 }); // schema level

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Enquete', schema);