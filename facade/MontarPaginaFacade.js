/*
* 
* FACADE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO VIEWPAGE
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/

var Viewpage         = require('../models/viewpage');

var facade = {};


facade.montarViewPage = function(pais,idCategoriaPai,callback){

	try
	{

		Viewpage.find({ pais:pais, idCatPai: idCategoriaPai }, function(err, lista) {


	      if (err){

	        throw err;

	      }else{


	        if(lista){

	            // Enviando a resposta ao cliente
	            callback(null,lista);


	        }else{
	      		
	      	  throw 'Nao encontrado o registros com o pai: ' + idCategoriaPai;
	    
	        };


	      };


	    });


	}catch(e){

		callback(e,null);

	}
	
};


module.exports = facade;