var functions = {

	incNewUser:function(){

		var nm      = $('#nm').val();
		var email   = $('#email').val();
		var img     = store.get(constantes.login.localStorage.googlePlus.img);
		var type    = store.get(constantes.login.localStorage.newUser.type);
		var idAuth  = store.get(constantes.login.localStorage.googlePlus.idAuth);

		var reqParams = {

			'nm':nm,
			'email':email,
			'img':img,
			'type':type,
			'idAuth':idAuth

		}

		console.log('RERERERE' + reqParams);

		var resp = ajax.POST('/api/usuario',reqParams);

		resp.done(function(data) {

			
			alert('inseriu');
			alert(data.token);


	  	});

	}














}