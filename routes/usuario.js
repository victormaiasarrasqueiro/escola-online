/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO AULA
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express 			= require('express');
var Usuario       = require('../models/usuario'); 		
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var constants  = require('../constants'); // get our config file
var router 				= express.Router();


/*
* http.getAll
* Responsável por recuperar uma lista de cursos.
*/
router.get('/', function(req, res) {

  Usuario.find()
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
router.post('/', function(req, res) {

  console.log(req.body);





  if(req.body.type){

    var model = new Usuario();


    if(req.body.type == 1){
      //googlePlus

      model.google.id = req.body.idAuth;
      model.google.img = req.body.img;
      model.google.email = req.body.email;

    }else if(req.body.type == 2){
      //facebook

      model.facebook.id = req.body.idAuth;
      model.facebook.img = req.body.img;
      model.facebook.email = req.body.email;

    }

    model.nm = req.body.nm;
    model.img = req.body.img;
    model.email = req.body.email;
    model.tpUsu = 1; // 1 - SIMPLE USER / 2-PROFESSOR
    model.ieAtv = true;

    // save
    model.save(function(err) {
        
        if (err){
          err.success = false;
          res.json(err);
        }
        else
        {

          var user = {
              
              'dtAuth':new Date(),
              'ip':'127.0.0.1',

              'id':model._id,
              'nm':model.nm,
              'email':model.email,
              'tpUsu':model.tpUsu
              
          };

          // sign with RSA SHA256
          var key = constants.privateKey;          // get private key
          var token = jwt.sign(user, key, {
            expiresIn: '1d'                      
          });

          // return the information including token as JSON
          res.json({
            tp:req.body.type,
            status:0,
            success: true,
            token: token
          });

        };

    });


  }else{
    res.json('Type not found');
  }


});

module.exports = router;
