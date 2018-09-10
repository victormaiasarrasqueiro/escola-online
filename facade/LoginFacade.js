/*
* 
* FACADE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/

var Usuario         = require('../models/usuario');

var facade = {};



facade.login = function(objLogin,callback){

	try
	{

		if(objLogin.type == 0){



		}else if(objLogin.type == 1){

			loginGoogle(objLogin.idAuth,function(err,model){
				callback(err,model);
			});

		}else if(objLogin.type == 2){

			loginFacebook(objLogin.idAuth,function(err,model){
				callback(err,model);
			});

		};


	}catch(e){
		console.log(e);
		callback(e,null);
	}
};



function loginGoogle(id,callback){

	try
	{
		Usuario.findOne( { 'ieAtv':true, 'google.id' : id } , function(err, model) {


	      if (err){

	        throw err;

	      }else{

	        if(model){

	            callback(null,model);

	        }else{
	      		
	      	  	callback(null, null);
	    
	        };


	      };


	    });


	}catch(e){
		console.log(e);
		callback(e,null);
	}
	
};


function loginFacebook(id,callback){

	try
	{
		Usuario.findOne( { 'ieAtv':true , 'facebook.id' : id } , function(err, model) {


	      if (err){

	        throw err;

	      }else{

	        if(model){

	            callback(null,model);

	        }else{
	      		
	      	  	callback(null, null);
	    
	        };


	      };


	    });


	}catch(e){
		console.log(e);
		callback(e,null);
	}
	
};








module.exports = facade;