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
var Homepage      = require('../models/homepage');   
var Categoria     = require('../models/categoria');   
var trim          = require('trim');
var ObjectId 			= require('mongoose').Types.ObjectId; 

var router 				= express.Router();


/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/montarCategorias', function(req, res) {
  

  removerCategorias(function(err){

    if(err){
      res.json(err);
    }
    else
    {

      montarCategoriasNivel1(function(err){

       if(err){
          res.json(err);
        }
        else
        {
          
          montarCategoriasNivel2(function(err){
          

          

              if(err){
                res.json(err);
              }
              else
              {
                res.json('sucesso');
              }


           


          });

        };

      });

    }

  })

});

/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/maisvisitados/:model_id', function(req, res) {

  recuperarMaisVisitadosCategoria(req.params.model_id, function(list){

    var retorno = list;
    
    if(retorno){
      res.json(retorno);
    }else{
      res.json('sem retorno');
    }

  });

});

/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/categoria/:model_id', function(req, res) {

  recuperarCategorias(req.params.model_id, function(list){

    var retorno = list;
    
    if(retorno){
      res.json(retorno);
    }else{
      res.json('sem retorno');
    }

  });

});


function recuperarMaisVisitadosCategoria(idCat,callback){

  Curso.find({ ieAtv:true, idCat:idCat })
  .sort({ views: -1 , dtCad: 1})
  .limit(4)
  .exec(function (err, list) {

      if(err){
        console.log(err);
        callback(null,err);
      }
      else
      {
        callback(list,null);
      };

  });

};

function recuperarCategorias(idPai,callback){

  console.log('Recuperando categorias');
  Categoria.find({ pai:idPai })
    .sort({ordem:1})
    .exec(function (err, list) {

      if(err){
        console.log(err);
        callback(null,err);
      }
      else
      {
        callback(list,null);
      };

    });

};

function removerCategorias(callback){

  console.log('Excluindo Categorias');

  Homepage.find().remove().exec(function (err) {

      if(err){
        console.log(err);
        callback(err);
      }
      else
      {
        console.log('Sucesso');
        callback(null);
      };

    });

};

/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/', function(req, res) {

  Homepage.find({ 'nivel':1 })
  .exec(function (err, listHomePageNivel) {

    if(err){
      console.log(err);
      callback(err);
    }
    else
    {
      
      res.json(listHomePageNivel);

    };

  });

});

function montarCategoriasNivel1(callback){

    console.log('montando nivel 1');

    var id_categoria_pai = '0';

    recuperarCategorias(id_categoria_pai, function(listaCategoriasFilhas,err){

    if(err){
      console.log(err);
      callback(err);
    }else{

      var i = 0;

      while ( i < listaCategoriasFilhas.length ) {
          
          var filha = listaCategoriasFilhas[i];

          var model = new Homepage();

          model.idCat = filha._id;
          model.nivel = 1;

          if(filha.ordem && filha.ordem != null && filha.ordem != ''){
            model.ordem = filha.ordem;
          }else{
            model.ordem = 1;
          }

          if(filha.nm && filha.nm != null && filha.nm != ''){
             model.nmCat = filha.nm;
          }else{
            model.nmCat = 'SEM NOME';
          }

          console.log('incluindo - ' + model.nmCat);

          model.save(function(err) {
              
              if (err){
               console.log(err);
               callback(err);
              }

              console.log('Salvo - ' + model._id);

          });

          if( (i + 1) == listaCategoriasFilhas.length ){

            callback(null);

          }

          i++;

      };

    };

  });

};

function montarCategoriasNivel2(callback){

  console.log('montando nivel 2');

  Homepage.find({nivel:1})
  .exec(function (err, listHomePageNivel) {

    if(err){
      console.log(err);
      callback(err);
    }
    else
    {
      
      console.log(listHomePageNivel.length + ' registros encontrados');

      var i = 0;

      while ( i < listHomePageNivel.length ) {
        

        var id_categoria_pai = listHomePageNivel[j].idCat;

        console.log(listHomePageNivel[j].nmCat);

        if( (i + 1) == listaCategoriasFilhas.length ){

          callback(null);

        }

        i++;



      };

    };

  });

};


module.exports = router;
