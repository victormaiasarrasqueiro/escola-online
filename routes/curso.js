/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Curso         = require('../models/curso'); 		
var trim          = require('trim');
var ObjectId 			= require('mongoose').Types.ObjectId; 

var router 				= express.Router();


/*
* Constructor
* Responsável por construir o modelo com os parâmetros passados pelo request
*/
function constructor(model,req){

	try{

		if( req.body.nm ){
			model.nm = req.body.nm;
		}

		if( req.body.ds ){
			model.ds = req.body.ds;
		}

		if( req.body.idCat1 ){
			model.idCat1 = req.body.idCat1;
		}

    if( req.body.idCat2 ){
      model.idCat2 = req.body.idCat2;
    }

    if( req.body.idCat3 ){
      model.idCat3 = req.body.idCat3;
    }

    if( req.body.idVid ){
      model.idVid = req.body.idVid;
    }

		return model;

	}catch(e){
		console.log(e);
	}
	
};

/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/', function(req, res) {

  	Curso.find({ ieAtv:true })
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
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/usuario/:model_id', function(req, res) {

  	Curso.find({ ieAtv:true, idUsu:req.params.model_id })
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
* http.getAll
* Responsável por recuperar uma lista de cursos de uma respctiva categoria.
*/
router.get('/categoria/:model_id', function(req, res) {

  	Curso.find({ieAtv:true, idCat:req.params.model_id })
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
* Responsável por inserir um modelo
*/
router.post('/', function(req, res) {

	var model = new Curso();

	// Construindo objeto com parâmetros vindos da requisição.
	model = constructor(model,req);

	model.idUsu = 'PROV';
  model.idVid = 'PROV';
	model.ieAtv = true;
	model.dtCad = new Date();

	// save
	model.save(function(err) {
	    
	    if (err){
        console.log(err);
	    	err.success = false;
        res.send(err);
	    }
	    else
	    {
	    	// Enviando a resposta ao cliente
	    	res.json({id:model._id,success:true});
	    };

	});

});

/*
* http.delete
* Responsável por excluir um modelo
*/
router.delete('/:model_id', function(req, res) {
    
	//var idEmp = req.decoded.idEmp;
	
    Curso.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

        		// Setando parâmetros basicos
    				model.ieAtv = false;
    				model.dtExc = new Date();

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
* http.put
* Responsável por atualizar um modelo
*/
router.put('/:model_id', function(req, res) {

	//var idEmp = req.decoded.idEmp;

     Curso.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

				// Construindo objeto com parâmetros vindos da requisição.
				model = constructor(model,req);

		        // save
		        model.save(function(err) {
		            
		            if (err){
		            	err.success = false;
		                res.send(err);
		            }else{
		            	res.json({id:model._id,success:true});
		            };

		        });

        	}else{
        		res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
        	}
        	
        };

    });

});

/*
* http.put
* Responsável por atualizar um modelo
*/
router.put('/alterarIdVideo/:model_id', function(req, res) {

  //var idEmp = req.decoded.idEmp;

     Curso.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
          err.success = false;
            res.send(err);
        }else{

          if(model){

            // Construindo objeto com parâmetros vindos da requisição.
            model.idVid = req.body.idVid;

            // save
            model.save(function(err) {
                
                if (err){
                  err.success = false;
                  res.send(err);
                }else{
                  res.json({id:model._id,success:true});
                };

            });

          }else{
            res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
          }
          
        };

    });

});

/*
* http.getOne
* Responsável por recuperar somente um modelo
*/
router.get('/:model_id', function(req, res) {
    
	//var idEmp = req.decoded.idEmp;

    Curso.findOne({ _id: req.params.model_id })
    .populate({ path: 'ltAls'})
    .exec( function(err, model) {
       
        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){
        		res.json({model:model,success:true});
        	}else{
        		res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
        	};
        	
        };

    });

});

module.exports = router;
