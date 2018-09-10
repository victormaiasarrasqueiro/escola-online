/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO Categoria
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Categoria         	= require('../models/categoria'); 		
var trim          		= require('trim');
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

		return model;

	}catch(e){
		console.log(e);
	}
	
};

/*
* http.getAll
* Responsável por recuperar uma lista de Categorias.
*/
router.get('/', function(req, res) {

  	Categoria.find({ ieAtv:true })
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
router.get('/curso/:model_id', function(req, res) {

  	Categoria.find({ ieAtv:true, idCur:req.params.model_id })
	   .exec(function (err, list) {

  		if(err){
  			err.success = false;
  			res.send(err);
  		}
  		else
  		{
  			res.json({list:list,success:true});
  		};

  	});

});

/*
* http.post
* Responsável por inserir um modelo
*/
router.post('/', function(req, res) {

	var model = new Categoria();

	// Construindo objeto com parâmetros vindos da requisição.
	model = constructor(model,req);

	model.idUsu = 'PROV';
	model.ieAtv = true;
	model.dtCad = new Date();

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
    
	//var idEmp = req.decoded.idEmp;
	
    Categoria.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

        		// Setando parâmetros basicos
    			model.ieAtv = false;

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

     Categoria.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

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
* http.getOne
* Responsável por recuperar somente um modelo
*/
router.get('/:model_id', function(req, res) {
    
	//var idEmp = req.decoded.idEmp;

    Categoria.findOne({ _id: req.params.model_id })
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
