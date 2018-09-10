/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO CURSO
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Curso               = require('../models/curso'); 		
var trim                = require('trim');
var ObjectId 			= require('mongoose').Types.ObjectId; 

var router 				= express.Router();


/*
* Constructor
* Responsável por construir o modelo com os parâmetros passados pelo request
*/
function constructor(model,req){

	try{

		if( req.body.nm ){
			model.nm = trim(req.body.nm);
		}

		if( req.body.ds ){
			model.ds = trim(req.body.ds);
		}
		
		if( req.body.ltAls && req.body.ltAls.length > 0 ){
			model.ltAls = req.body.ltAls;
		}else{
			model.ltAls = null;
		}

		return model;

	}catch(e){
		console.log(e);
	}
	
};

/*
* http.getAll
* Responsável por recuperar uma lista de cursos
*/
router.get('/categoria/:model_id', function(req, res) {

  	Curso.find({ieAtv:true})
	.populate({ path: 'ltEsp'})
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

	var model = new Profissional();

	// Setando parâmetros basicos
	model = constructModel.setBasicInfoInsert(model,req);

	// Construindo objeto com parâmetros vindos da requisição.
	model = constructor(model,req);

	// save
	model.save(function(err) {
	    
	    if (err){
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
    
	var idEmp = req.decoded.idEmp;
	
    Profissional.findOne({ idEmp:idEmp, ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

        		// Setando parâmetros basicos
				model = constructModel.setBasicInfoDelete(model,req);

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

	var idEmp = req.decoded.idEmp;

    Profissional.findOne({ idEmp:idEmp, ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

        		// Setando parâmetros basicos
				model = constructModel.setBasicInfoUpdate(model,req);

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
* http.getOne
* Responsável por recuperar somente um modelo
*/
router.get('/:model_id', function(req, res) {
    
	var idEmp = req.decoded.idEmp;

    Profissional.findOne({ _id: req.params.model_id })
    .populate({ path: 'ltEsp'})
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

/*
* http.getAll
* Responsável por recuperar uma lista de modelos
*/
router.get('/listbyesp/:model_id', function(req, res) {

	var idEmp = req.decoded.idEmp;
	
  	Profissional.find({ idEmp:idEmp, ieAtv:true, ltEsp: { $in: [new ObjectId(req.params.model_id)] }  }, 'nm', function(err, list) {

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


module.exports = router;
