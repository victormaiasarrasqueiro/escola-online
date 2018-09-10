(function() {
    'use strict';

    angular.module('app.aula').controller('IncluirEditarAulaController', IncluirEditarAulaController);

	IncluirEditarAulaController.$inject = ['$scope','$state','CRUDService','$localStorage','ValidateService','aula','YoutubeService' ];

    function IncluirEditarAulaController($scope,$state,CRUDService,$localStorage,ValidateService,aula,YoutubeService) {
        
		var vm = this;
		vm.incAlt = incAlt;
		vm.del = del;
		vm.verificarLink = verificarLink;
		vm.inserirTags = inserirTags;
		vm.redirecionarParaListagem = redirecionarParaListagem;

		vm.idOpe = 1;

		vm.obj = {};
		vm.obj.nm = '';
		vm.obj.idVid = '';

		vm.tagsObject = [];
		vm.tagsPlaceholder = "( Digite a palavra e aperte a tecla ENTER )";

		vm.customMenu = [
            ['bold', 'italic', 'underline'],
            ['font'],
            ['font-size'],
            ['font-color', 'hilite-color'],
            ['remove-format'],
            ['ordered-list', 'unordered-list', 'outdent', 'indent'],
            ['left-justify', 'center-justify', 'right-justify'],
            ['paragraph'],
            ['link', 'image']
        ];


		/*
		* Função Inicio.
		*/
		function activate() {

			if(angular.isObject(aula)){
				vm.obj = angular.copy(aula);
				vm.tagsObject = angular.copy(vm.obj.tags);
				vm.idOpe = 2;
				vm.obj.idVidT = angular.copy(vm.obj.idVid);
			}

    	};


    	function del(){

    		return CRUDService.aula().remover(vm.obj._id).then(function(data) {

    			alert('excluiido com sucesso!!!')

    		});

    	}

    	function incAlt(){
    		
    		vm.obj.tags  = vm.tagsObject.map(function(tag) { return tag.text; });
    		vm.obj.idCur = $localStorage.idCurso;

			var errors = validate();

			if(errors.length === 0){

				
				if(vm.idOpe === 1){


					return CRUDService.aula().inserir(vm.obj).then(function(data) {

						if(data.success){

							redirecionarParaListagem();

							//AlertService.sweetSucesso(1,"O usuário", redirecionarParaListagem);
							//AlertService.toastrSucesso('E-mail Enviado','Foi enviado um e-mail para o usuário com sua senha de acesso.');

						}else{
							
							//exibirErro(data.errors);

						};

						return data;

					});

				}else{

					return CRUDService.aula().atualizar(vm.obj).then(function(data) {

						if(data.success){

							redirecionarParaListagem();

							//AlertService.sweetSucesso(1,"O usuário", redirecionarParaListagem);
							//AlertService.toastrSucesso('E-mail Enviado','Foi enviado um e-mail para o usuário com sua senha de acesso.');

						}else{
							
							//exibirErro(data.errors);

						};

						return data;

					});



				}

			}else{
				//exibirErro(errors);
			}

    	};

    	function verificarLink(){

    		if(vm.obj.idVidT){

	    		var start = null;
	    		var end   = null;

	    		//https://youtu.be/   yWU5bm_pZzY   ?list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR
	    		//https://www.youtube.com/watch?v=    yWU5bm_pZzY   &index=5&list=PLHz_AreHm4dkI2ZdjTwZA4mPMxWTfNSpR
	    		//https://www.youtube.com/watch?v=GSXEdNHWMvU
	    		//https://www.youtube.com/watch?v=LnORjqZUMIQ&list=PLGxZ4Rq3BOBq0KXHsp5J3PxyFaBIXVs3r

	    		if(vm.obj.idVidT.indexOf("https://youtu.be/") != -1 && m.obj.idVidT.indexOf("?list=") != -1 ){
	    			
	    			start = vm.obj.idVidT.indexOf("u.be/") + 5;
	    			end   = vm.obj.idVidT.indexOf("?list=");

	    			vm.obj.idVid = angular.copy(vm.obj.idVidT.substring(start, end)); 
	    			vm.obj.idVidT = angular.copy(vm.obj.idVid);


	    		}else if(vm.obj.idVidT.indexOf("https://www.youtube.com/watch?v=") != -1 && vm.obj.idVidT.indexOf("&index=") != -1 ){

	    			start = vm.obj.idVidT.indexOf("ch?v=") + 5;
	    			end   = vm.obj.idVidT.indexOf("&index=");

	    			vm.obj.idVid = angular.copy(vm.obj.idVidT.substring(start, end)); 
	    			vm.obj.idVidT = angular.copy(vm.obj.idVid);

	    		}else if(vm.obj.idVidT.indexOf("https://www.youtube.com/watch?v=") != -1 && vm.obj.idVidT.indexOf("&list=") != -1 ){

	    			start = vm.obj.idVidT.indexOf("ch?v=") + 5;
	    			end   = vm.obj.idVidT.indexOf("&list=");

	    			vm.obj.idVid = angular.copy(vm.obj.idVidT.substring(start, end)); 
	    			vm.obj.idVidT = angular.copy(vm.obj.idVid);

	    		}else if(vm.obj.idVidT.indexOf("https://www.youtube.com/watch?v=") != -1){

	    			start = vm.obj.idVidT.indexOf("ch?v=") + 5;

	    			console.log(vm.obj.idVidT.substring(start));

	    			vm.obj.idVid = angular.copy(vm.obj.idVidT.substring(start)); 
	    			vm.obj.idVidT = angular.copy(vm.obj.idVid);

	    		}else{

	    			vm.obj.idVid = angular.copy(vm.obj.idVidT); 



	    		}


	    		getVideo(vm.obj.idVid);

	    	}


    	};

    	function inserirTags(){

    		var badwords = ['curso','aprenda', 'professor', 'aula','aprender','para','como','listado','simulando'];

    		if(vm.obj){

    			var result = [];
    			
    			var arrayTags   =  [] ;
    			var arrayTitle  =  [] ;

    			if(vm.videoLoaded.snippet && vm.videoLoaded.snippet.tags && vm.videoLoaded.snippet.tags.length > 0){
    				arrayTags = vm.videoLoaded.snippet.tags;
    			}

    			if(vm.obj.nm && vm.obj.nm.length > 0){
    				arrayTitle = vm.obj.nm.split(" ");
    			}

    			var partes = arrayTags.concat(arrayTitle);

    			for(var i = 0 ; i<partes.length ; i++){

    				var x = partes[i];

    				if(isNaN(x)){

    					if(x.split(" ").length > 1){
	    					x = x.split(" ")[0];
	    				}

    					x = removerAcentos(x);
	    				x = removerPontuacoes(x);
	    				x = x.toLowerCase(); 

	    				if(x.length > 2 && !buscar(x,badwords) && !buscar(x,result) && !buscar(x,vm.tagsObject)){

	    					result.push(x);

	    				}

    				}

    			}

    			console.log(result.map(function(word) { return {text:word }    }));

    			if(result.length > 0){
    				vm.tagsObject = result.map(function(word) { return {text:word }    });
    			}
    			
    		}

    	}

    	function buscar(search, list){

    		for(var i = 0; i<list.length ; i++){

    			var p = list[i];

    			if(p.toUpperCase() === search.toUpperCase()){
    				return true;
    			}

    		}

    		return false;

    	}

    	function getVideo(id){

    		return YoutubeService.getVideo(id).then(function(res){
    			var result = res.data;

    			if(result.pageInfo.totalResults > 0){
    				vm.videoLoaded = result.items[0];
    				console.log(vm.videoLoaded);
    				vm.obj.nm = vm.videoLoaded.snippet.title;
    				vm.obj.dsExt = vm.videoLoaded.snippet.description;
    				vm.obj.ds = angular.copy( vm.obj.dsExt.substring(0, 195)  );

    				inserirTags();
    			}

    			return res;
    		})
    	}

    	function removerAcentos(strAccents) {
			var strAccents = strAccents.split('');
			var strAccentsOut = new Array();
			var strAccentsLen = strAccents.length;
			var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
			var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
			for (var y = 0; y < strAccentsLen; y++) {

				if (accents.indexOf(strAccents[y]) != -1) {
					strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
				} else{
					strAccentsOut[y] = strAccents[y];
				}
			}
			strAccentsOut = strAccentsOut.join('');
			return strAccentsOut;
		};

		function removerPontuacoes(strAccents) {
			var strAccents = strAccents.split('');
			var strAccentsOut = new Array();
			var strAccentsLen = strAccents.length;
			var accents = '<,>.?/;:}]{[-_=+)(*&ˆ%$#@!˜|';
			
			for (var y = 0; y < strAccentsLen; y++) {

				if (accents.indexOf(strAccents[y]) != -1) {
					strAccentsOut[y] = '';
				} else{
					strAccentsOut[y] = strAccents[y];
				}
			}
			strAccentsOut = strAccentsOut.join('');
			return strAccentsOut;
		};

    	/*
		* validate()
		*
		* Validando os campos antes de serem enviados.
		*/
		function validate(){

			var errors = [];

			if( ValidateService.isStrEmpty(vm.obj.nm) ) {
				var msg = {"type":"Obrigatório", "message": "É preciso digitar um título para a aula." };
				errors.push(msg);
			};

			return errors;

		};

		// Redirecionando para a página de listagem de profissionais.
		function redirecionarParaListagem(){
			$state.transitionTo("app.aula", {});
		};




		// Iniciando o procedimento.
		activate();
		
	};

})();

