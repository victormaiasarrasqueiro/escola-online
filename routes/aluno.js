/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Aluno         = require('../models/aluno'); 		
var trim          = require('trim');
var ObjectId 			= require('mongoose').Types.ObjectId; 

var router 				= express.Router();

/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/curso/:model_id', function(req, res) {

	Aluno.find({ ieAtv:true, idCur:req.params.model_id})
   .exec(function (err, list) {

		if(err){
			err.success = false;
			res.send(err);
		}
		else
		{
			// Enviando a resposta ao cliente
			res.json({list:list,success:true});
		};

	});

});

/*
* http.post
* Responsável por inserir um aluno
*/
router.post('/', function(req, res) {

  Aluno.findOne({ ieAtv:true, idCur:req.body.idCur }, function(err, model) {

    if (err){
      err.success = false;
      res.send(err);
    }else{


      if(model){

        model.aulas.push(req.body.idAluno);

        // save
        model.save(function(err) {
            
            if (err){
                res.send(err);
            }else{
              res.json({id:model._id,success:true});
            };

        });

      }else{
        res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
      };


    };

  });

});

/*
* http.delete
* Responsável por excluir um modelo
*/
router.delete('/', function(req, res) {
    

  Aluno.findOne({ ieAtv:true, idCur:req.body.idCur }, function(err, model) {

    if (err){
    	err.success = false;
      res.send(err);
    }else{

    	if(model){

    		var indice = model.aulas.indexOf(req.body.idAluno); 

        if (indice > -1) {
            model.aulas.splice(indice, 1);
        }

      	// save
        model.save(function(err) {
            
            if (err){
                res.send(err);
            }else{
            	res.json({id:model._id,success:true});
            };

        });


    	}else{
    		res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
    	};

    };

  });

});

module.exports = router;
