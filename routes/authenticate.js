var express    = require('express');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var constants  = require('../constants'); // get our config file
var router     = express.Router();

//var pass       = require('../util/passwordGenerator');  

var Usuario    = require('../models/usuario');   

var LoginFacade    = require('../facade/LoginFacade'); 

var nodemailer = require('nodemailer');

// Vamos criar a conta que irá mandar os e-mails
var conta = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'victormaiasarrasqueiro@gmail.com', // Seu usuário no Gmail
        pass: 'et4sdA123' // A senha da sua conta no Gmail :-)
    }
});

// Route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {

  try{

    console.log('req '+req.body.idAuth);

    LoginFacade.login(req.body,function(err,model){


      if(err){
        console.log(err);
        throw err;

      }else{

        if(model){

          console.log(model);
          
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


        }else{

          //Nao Cadastrado
          console.log('nao encontrou');

          res.json({
            
            tp:req.body.type,
            status:3,
            success: false,
            token: null
            
          });



        }

      }

    });

  }catch(e){
    console.log("Ocorreu um erro ao gerar o token.");
    throw e;
  }

});

/*
* http.post
* Responsável por inserir um modelo
*/
router.post('/passwordresend/:model_id', function(req, res) {
console.log("sssssss");
  var password = pass.newPass();

  conta.sendMail({
              from: 'Suporte ClinicaPerfeita.com <contato@clinicaperfeita.com>', 
              to:  'victor.sarrasqueiro@gmail.com',
              subject: 'Envio de Senha', // O assunto
              html: '<strong>Olá!</strong><p> A sua nova senha de acesso é ' + password + '</p>', // O HTMl do nosso e-mail
          }, function(err){
              if(err)
                  throw err;

              console.log('E-mail enviado!');
          });

  Usuario.findOne({ _id: req.params.model_id })
  .exec( function(err, model) {
     
      if (err){
        err.success = false;
        res.send(err);
      }else{

        if(model){

          conta.sendMail({
              from: 'Suporte ClinicaPerfeita.com <contato@clinicaperfeita.com>', 
              to:  'victor.sarrasqueiro@gmail.com',
              subject: 'Envio de Senha', // O assunto
              html: '<strong>Olá!</strong><pA sua nova senha de acesso é ' + password + '</p>', // O HTMl do nosso e-mail
          }, function(err){
              if(err)
                  throw err;

              console.log('E-mail enviado!');
          });

          res.json({success:true});

        }else{
          res.json({success:false, errors:[{cod:6580, message:"Registro não encontrado." }] });
        };
        
      };

  });





console.log("entrei");
  


});

module.exports = router;
