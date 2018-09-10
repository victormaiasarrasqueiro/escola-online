/*
module.exports = function(app, passport) {

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
    }));

};
*/

/*
* 
* ROUTE
* 
* CLASSE ROUTE COM OPERCOES BASICAS PARA O MODELO Categoria
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
var express             = require('express');     
var passport            = require('passport');

var router              = express.Router();

router.get('/profile', function(req, res) {
  res.render('logado.ejs'); // load the index.ejs file
});

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/google', function(req, res) {
    

    console.log('dedede');
    res.json('foi');
    //passport = req._passport.instance;

    //console.log(passport);

    //passport.authenticate('google',{ scope : ['profile', 'email'] } );

});




// the callback after google has authenticated the user
router.get('/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));



module.exports = router;


