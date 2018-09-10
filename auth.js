
var GoogleStrategy  = require('passport-google-oauth').OAuth2Strategy;
var Usuario         = require('./models/usuario');


var oAuth = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '553562464654-3fvabbuv00f0h20q7epo27eclau6et52.apps.googleusercontent.com',
        'clientSecret'  : 'EdZf0Qo8QL_feiSdLj0pf9EV',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      return next();
    }
        
    // if they aren't redirect them to the home page
    res.redirect('/errando');
}

// expose this function to our app using module.exports
module.exports = function(app, passport) {


    // =========================================================================
    // passport routes setup  ==================================================
    // =========================================================================
    /*
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log('sssss');
        res.render('index.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    */

    app.get('/profile', function(req, res) {
        res.render('index.ejs', {
            user : 'sssss' // get the user out of session and pass to template
        });
    });

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
      passport.authenticate('google', {
              successRedirect : '/profile',
              failureRedirect : '/'
    }));







    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {

        done(null, user._id);

    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {

        console.log('entrada marota');

        Usuario.findById(id, function(err, user) {
            done(err, user);
        });

    });


    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================

    passport.use(new GoogleStrategy({
        clientID: '553562464654-3fvabbuv00f0h20q7epo27eclau6et52.apps.googleusercontent.com',
        clientSecret: 'EdZf0Qo8QL_feiSdLj0pf9EV',
        callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
      },
      function(accessToken, refreshToken, profile, done) {

        process.nextTick(function() {
            
            // try to find the user based on their google id
            Usuario.findOne({ 'google.id' : profile.id }, function(err, user) {

                if (err){
                  return done(err);
                }
                    

                if (user) {

                    return done(null, user);
                    
                } else {
                    // if the user isnt in our database, create a new user

                    var newUser          = new Usuario();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                            return done(null, newUser);
                    });
                }
            });

        });

      }

    ));

};
