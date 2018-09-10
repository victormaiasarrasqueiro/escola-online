


  var auth2 = {};

  var helper = (function() {
    
    return {

      clicked:false,

      /**
       * Hides the sign in button and starts the post-authorization operations.
       *
       * @param {Object} authResult An Object which contains the access token and
       *   other authentication information.
       */
      onSignInCallback: function(authResult) {


        if (authResult.isSignedIn.get() && helper.clicked ) {

            helper.login();

        } else {

            if (authResult['error'] || authResult.currentUser.get().getAuthResponse() == null) {
              console.log('Google+: There was an error: ' + authResult['error']);
            }

        }

      },

      /**
       * Calls the OAuth2 endpoint to disconnect the app for the user.
       */
      disconnect: function() {
        // Revoke the access token.
        auth2.disconnect();
      },
      /**
       * Gets and renders the currently signed in user's profile data.
       */
      login: function(){
        
        gapi.client.plus.people.get({
          'userId': 'me'
        }).then(function(res) {
          
          var profile = res.result;

          var loginObject = new LoginObject(
              constantes.login.types.googlePlus, 
              profile.id, 
              profile.emails[0].value,
              'me.google',
              profile.displayName, 
              profile.image.url, 
              profile.language
          );

          store.set(constantes.login.localStorage.googlePlus.email,loginObject.email);
          store.set(constantes.login.localStorage.googlePlus.idAuth,loginObject.idAuth);
          store.set(constantes.login.localStorage.googlePlus.img,loginObject.img);

          loginApp.loginGenerico(loginObject);

        }, function(err) {
          var error = err.result;
          console.log(error.message);
        });
      }
    };
  })();

  /**
   * Handler for when the sign-in state changes.
   *
   * @param {boolean} isSignedIn The new signed in state.
   */
  var updateSignIn = function() {

    /*
    if (auth2.isSignedIn.get()) {
      console.info('GOOGLE+  - Login on');
    }else{
      console.info('GOOGLE+  - Login off');
    }
    */

    helper.onSignInCallback(gapi.auth2.getAuthInstance());

  }

  /**
   * This method sets up the sign-in listener after the client library loads.
   */
  function startLoginGoogleApp() {
    gapi.load('auth2', function() {
      
      gapi.client.load('plus','v1').then(function() {
        
        gapi.auth2.init({fetch_basic_profile: false,
            scope:'https://www.googleapis.com/auth/plus.login'}).then(
              function (){
                auth2 = gapi.auth2.getAuthInstance();
                auth2.isSignedIn.listen(updateSignIn);
                auth2.then(updateSignIn);
              });

      });
    });
  };

  function loginGoogleApp(event) {
    
    helper.clicked = true;
    auth2.signIn();
    updateSignIn();

  }

  function logoutGoogleApp(event) {
    
    auth2.signOut();

  }


  // Load the SDK asynchronously
  (function() {

     var po = document.createElement('script'); 
     po.type = 'text/javascript'; 
     po.async = true;
     po.src = 'https://apis.google.com/js/client:platform.js?onload=startLoginGoogleApp';
     var s = document.getElementsByTagName('script')[0]; 
     s.parentNode.insertBefore(po, s);

   })();

