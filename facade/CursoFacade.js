/*
* 
* FACADE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/

var Curso         = require('../models/curso');

var facade = {};


facade.salvarIdVideoNovoCurso = function(idVideo,idCurso,callback){

	try
	{

		Curso.findOne({ _id: idCurso }, function(err, cursoModel) {


	      if (err){

	        throw err;

	      }else{


	        if(cursoModel){

				console.log('curso encontrado');
	          //Se o id do curso estiver como provisório.
	          if( cursoModel.idVid === 'PROV'){

	            cursoModel.idVid = idVideo;

	            // save
	            cursoModel.save(function(err) {
	                
	                if (err){
	                	throw err;
	                }else{
	                	callback(null);
	                };

	            });

	          }else{

	            // Enviando a resposta ao cliente
	            callback(null);

	          };


	        }else{
	      		
	      	  throw 'Nao encontrado o curso com id: ' + idCurso;
	    
	        };


	      };


	    });


	}catch(e){
		console.log(e);
		callback(e);
	}
	
};


facade.obterCurso = function(idCurso,callback){

	try
	{

		Curso.findOne({ _id: idCurso }, function(err, cursoModel) {


      		if (err){
	        	throw err;
			}else{

	        	if(cursoModel){

	        		callback(null,cursoModel);

	        	}else{
	      	  		throw 'Nao encontrado o curso com id: ' + idCurso;
		        };

      		}; // fim do else

	    });

	}catch(e){
		callback(e,null);
	}
	
};

module.exports = facade;