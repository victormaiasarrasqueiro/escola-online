


var loginApp = {

	try:false,
	isAuth:false,

	loginGenerico: function(loginObject){

		var reqParams = loginApp.montarReqParam(loginObject);;

		if( reqParams && !loginApp.try ){


			loginApp.try = true;

			console.info('via: ' + loginObject.type);

			var resp = ajax.POST('/api/authenticate',reqParams);

			resp.done(function(data) {

				if(data.status == 0){
				//Sucesso

					alert('Sucesso!!!!');
				
				}else if (data.status == 3){
					
					//Nao Cadastrado
					
          			store.set(constantes.login.localStorage.newUser.nm, loginObject.name);
          			store.set(constantes.login.localStorage.newUser.email, loginObject.email);
          			store.set(constantes.login.localStorage.newUser.type, loginObject.type);

					window.location.href = constantes.url.main + 'newUser';

				}


	  		});


		}

	},

	montarReqParam:function(objectLogin){

		return { type:objectLogin.type, idAuth:objectLogin.idAuth , email:objectLogin.email , password:objectLogin.password  };

	}




}
