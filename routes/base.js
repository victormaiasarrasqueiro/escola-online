/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO Categoria
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/

var express 			= require('express');	

var MontarPaginaFacade  = require('../facade/MontarPaginaFacade');
var CursoFacade  		= require('../facade/CursoFacade');
var AulaFacade  		= require('../facade/AulaFacade');
	
var router 				= express.Router();

router.get('/', function(req, res) {

	MontarPaginaFacade.montarViewPage("BR","0",function(err,lista){

		if(err){
			console.log(err);
		}

		res.render('index.ejs', {
      		lista : {'lista':lista,'nivel':1} // get the user out of session and pass to template
	  	});


	});
  
});

router.get('/categoria/:categoria1', function(req, res) {

	MontarPaginaFacade.montarViewPage("BR",req.params.categoria1,function(err,lista){

		if(err){
			
			console.log(err);

		}else if(lista.length > 0){

			res.render('index.ejs', {
	      		lista : {'lista':lista,'nivel':2} // get the user out of session and pass to template
		  	});

		}else{

			res.redirect('/categoria/' + req.params.categoria1 + '/page/1');
		}

	});
  
});

router.get('/categoria/:categoria1/page/:numPage', function(req, res) {

	MontarPaginaFacade.montarViewPage("BR",req.params.categoria1,function(err,lista){

		if(err){
			console.log(err);
		}

		res.render('index.ejs', {
      		lista : {'lista':lista,'nivel':2} // get the user out of session and pass to template
	  	});


	});
  
});

router.get('/newuser', function(req, res) {
  res.render('newUser.ejs');
});


router.get('/curso/:idCurso/aula/:idAula', function(req, res) {

	try{

		var aula = {};

		CursoFacade.obterCurso(req.params.idCurso,function(err,curso){

			if(err){
				throw err;
			}

			AulaFacade.listarAula(curso._id, function(err,aulas){

				if(err){
					throw err;
				}

				if(req.params.idAula && (aulas.length > 0) && (req.params.idAula != 0) && (aulas.length - 1 > req.params.idAula ) ){

					aula = aulas[req.params.idAula - 1];

				}else{
					//retornar para a pagina do curso.
					aula = aulas[0];
				}

				res.render('curso.ejs', {
	      			res : {'curso':curso, 'aulas':aulas, 'aula':aula, 'numAula':req.params.idAula}
		  		});

			});

		});

	}catch(e){

		throw err;

	}

});

router.get('/aula/:idAula', function(req, res) {

	try{

		AulaFacade.obterAula(req.params.idAula, function(err,aula){
			
			if(err){
				throw err;
			}

			CursoFacade.obterCurso( aula.idCur,function(err,curso){

				if(err){
					throw err;
				}

				res.render('curso.ejs', {
	      			res : {'curso':curso, 'aula':aula}
		  		});

			});

		});

	}catch(e){

		throw err;

	}

});


module.exports = router;