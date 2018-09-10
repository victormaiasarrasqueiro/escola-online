/*
* 
* FACADE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/

var Aula          = require('../models/aula'); 	

var facade 			= {};

facade.listarAula = function(idCurso,callback){

	try
	{

		Aula.find({ ieAtv:true, idCur:idCurso })
     	.sort({ ordem: 1 })
	   	.exec(function (err, list) {

	  		if(err){
	  			throw err;
	  		}
	  		else
	  		{
	  			callback(null,list);
	  		};

	  	});

	}catch(e){
		callback(e,null);
	}
	
};

facade.obterAula = function(idAula,callback){

	try{

	    Aula.findOne({ ieAtv:true, _id: idAula }, function(err, model) {

	        if (err){
	        	throw err;
	        }else{

	        	if(model){

					callback(null,model);

	        	}else{
	        		throw err;
	        	}
	        	
	        };

	    });

	}catch(e){
		callback(e,null);
	}
};

module.exports = facade;