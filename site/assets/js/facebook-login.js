
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function loginFacebook(response) {

    var id     = response.authResponse.userID;
    var token  = response.authResponse.accessToken;
    var fields = 'email,name,gender,picture';
    
    FB.api('/me?fields=' + fields + '&access_token=' + token, function(res) {

      var profile = res;

      console.info('FACEBOOK - Login on ' );

      var loginObject = new LoginObject(
          constantes.login.types.facebook, 
          profile.id, 
          profile.email,
          'me.facebook',
          profile.name, 
          profile.picture.data.url, 
          'PT'
      );

      store.set(constantes.login.localStorage.facebook.email,loginObject.email);
      store.set(constantes.login.localStorage.facebook.idAuth,loginObject.idAuth);
      store.set(constantes.login.localStorage.facebook.img,loginObject.img);

      loginApp.loginGenerico(loginObject);

    });

  }

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {

    if (response.status === 'connected') {

      loginFacebook(response);

    } else if (response.status === 'not_authorized') {

      alert('Please log into this app.');

    } else {

      console.info('FACEBOOK - Login off ' );

    }
    
  }

  function loginFacebookApp(){

    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,email'});

  };

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  /*
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  */

  window.fbAsyncInit = function() {

    FB.init({
      appId      : '616585798500309',
      cookie     : true,  // enable cookies to allow the server to access 
      xfbml      : true,  // parse social plugins on this page
      oauth      : true,
      status     : true,
      version    : 'v2.7' // use graph api version 2.5
    });

    /* Now that we've initialized the JavaScript SDK, we call FB.getLoginStatus().
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
    */
  
  };

  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));




