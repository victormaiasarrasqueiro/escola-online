/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO AULA
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Aula          = require('../models/aula'); 	
var CursoFacade   = require('../facade/CursoFacade');	
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

		if( req.nm ){
			model.nm = trim(req.nm);
		}

		if( req.idVid ){
			model.idVid = trim(req.idVid);
		}

		if( req.ds ){

      var text = trim(req.ds);

      if(text.length <200){

        model.ds = text;

      }else{

        model.ds = text.substr(0, 195) + '...' ;
  

      }
			

		}

		if ( req.idCur){
			model.idCur = req.idCur;
		}

    if ( req.idCat){
      model.idCat = req.idCat;
    }

		if( req.tags && req.tags.length > 0 ){
			model.tags = req.tags;
		}else{
			model.tags = [];
		}

		if( req.dsExt){
			model.dsExt = req.dsExt;
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

  Aula.find({ ieAtv:true })
  .sort({ ordem: 1 })
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
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/usuario/:model_id', function(req, res) {

  Aula.find({ ieAtv:true, idUsu:req.params.model_id })
  .sort({ ordem: 1 })
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
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/curso/:model_id', function(req, res) {

  	Aula.find({ ieAtv:true, idCur:req.params.model_id })
     .sort({ ordem: 1 })
	   .exec(function (err, list) {

  		if(err){
        console.log(err);
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
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/usuario/:model_id_1/curso/:model_id_2', function(req, res) {

  Aula.find({ ieAtv:true, idUsu:req.params.model_id_1, objCur:req.params.model_id_2 })
  .sort({ ordem: 1 })
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
* http.getAll
* Responsável por recuperar uma lista de cursos de uma respctiva categoria.
*/
router.get('/categoria/:model_id', function(req, res) {

  Aula.find({ieAtv:true, idCat:req.params.model_id })
  .sort({ ordem: 1 })
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

  // Inserindo a aula.
  var model = new Aula();

  // Construindo objeto com parâmetros vindos da requisição.
  model = constructor(model,req.body);

  model.idUsu = 'PROV';
  model.ieAtv = true;
  model.dtCad = new Date();
  model.views = 0;
  model.idCat = "TESTE";

  // save
  model.save(function(err) {
      
      if (err){
        err.success = false;
        res.send(err);
      }
      else
      {

        Curso.findOne({ ieAtv:true, _id: model.idCur }, function(err, cursoModel) {

          if (err){
            err.success = false;
            res.send(err);
          }else{

            if(cursoModel){

              //Lista de Aulas
              if( cursoModel.idVid === 'PROV'){

                cursoModel.idVid = model.idVid;

                // save
                cursoModel.save(function(err) {
                    
                    if (err){
                      res.send(err);
                    }else{
                      res.json({id:model._id,success:true});
                    };

                });

              }else{

                // Enviando a resposta ao cliente
                res.json({id:model._id,success:true});

              };

            }else{
              res.json({success:false, errors:[{cod:6580, message:"Curso não encontrado." }] });
            };

          };

        });

      };

  });



});

/*
* http.post
* Responsável por inserir um modelo
*/
router.post('/insertAll', function(req, res) {

  Aula.find({ ieAtv:true, idCur:req.body.idCurso })
     .sort({ ordem: 1 })
     .exec(function (err, listAulasCurso) {

      if(err){
        console.log(err);
        err.success = false;
        res.send(err);
      }
      else
      {
       
        var sizeListaAulaCurso = listAulasCurso.length;


        var listModel = [];

        var model = null;

        for(var i = 0; i<req.body.lista.length ; i++){

          model = new Aula();
          model = constructor(model,req.body.lista[i]);

          model.idUsu = 'PROV';
          model.ieAtv = true;
          model.dtCad = new Date();
          model.views = 0;
          model.idCat = "TESTE";
          model.idCur = req.body.idCurso;

          sizeListaAulaCurso++;
          model.ordem = sizeListaAulaCurso;

          if(model.ds == null || model.ds == ''){
            model.ds = 'No Content';
          }

          listModel.push(model);

        };

        for( var i = 0; i < listModel.length ; i++ ){

          if(i == 0){

            console.log('Salvando o video');

            CursoFacade.salvarIdVideoNovoCurso(listModel[i].idVid,req.body.idCurso,function(err){
              
              if(err){
                console.log(err);
              }

              return null;

            });
              

          };


          listModel[i].save(function(err){

            if (err){

                console.log(err);
            
            };

            
          });  

        };

        res.json({success:true});

      };

  });


});

/*
* http.delete
* Responsável por excluir um modelo
*/
router.delete('/:model_id', function(req, res) {
    
	//var idEmp = req.decoded.idEmp;
	
    Aula.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

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

     Aula.findOne({ ieAtv:true, _id: req.params.model_id }, function(err, model) {

        if (err){
        	err.success = false;
            res.send(err);
        }else{

        	if(model){

				// Construindo objeto com parâmetros vindos da requisição.
				model = constructor(model,req.body);

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
router.post('/saveOrder', function(req, res) {
  
  console.log('entrando kk');

  var lst = req.body;
  console.log(lst.length );

  for(var i = 0 ; i < lst.length ; i++){

    var obj = lst[i];

    gdhgdhe(obj);

  };

  res.json({success:true});
  

});

function gdhgdhe(obj){

  console.log('ordem: ' + obj.ordem);
  console.log('ordem: ' + obj._id);

  Aula.findOne({ ieAtv:true, _id: obj._id }, function(err, model) {

    if (err){

      console.log(err);

    }else{

      if(model){

        model.ordem = obj.ordem;

        // save
        model.save(function(err) {
            
            if (err){
             
                console.log(err);

            };

        });

      };

    };

  });

};

/*
* http.getOne
* Responsável por recuperar somente um modelo
*/
router.get('/:model_id', function(req, res) {
    
	//var idEmp = req.decoded.idEmp;

    Aula.findOne({ _id: req.params.model_id })
    //.populate({ path: 'ltAls'})
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
