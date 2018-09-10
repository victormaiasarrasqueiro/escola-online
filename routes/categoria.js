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

		if( req.body.pai){
			model.pai = req.body.pai;
		}

		if( req.body.ordem){
			model.ordem = req.body.ordem;
		}else{
			model.ordem = '0';
		}

		if( req.body.ieAtv){
			model.ieAtv = req.body.ieAtv;
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

  	Categoria.find({ pai:'0' })
  	.sort({ordem:1})
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
* Responsável por recuperar uma lista de Categorias.
*/
router.get('/pai/:model_id', function(req, res) {

  	Categoria.find({ pai:req.params.model_id })
  	.sort({ordem:1})
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

	var model = new Categoria();

	// Construindo objeto com parâmetros vindos da requisição.
	model = constructor(model,req);

	model.ieAtv = 'true';
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
	
    Categoria.findOne({ ieAtv:'true', _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

        		// Setando parâmetros basicos
    			model.ieAtv = 'false';

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

     Categoria.findOne({ _id: req.params.model_id }, function(err, model) {

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


module.exports = router;
