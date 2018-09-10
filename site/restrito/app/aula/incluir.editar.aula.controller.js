(function() {
    'use strict';

    angular.module('app.aula').controller('IncluirEditarAulaController', IncluirEditarAulaController);

	IncluirEditarAulaController.$inject = ['$scope','$state','CRUDService','$localStorage','ValidateService','aula' ];

    function IncluirEditarAulaController($scope,$state,CRUDService,$localStorage,ValidateService,aula) {
        
		var vm = this;
		vm.incAlt = incAlt;

		vm.idOpe = 1;

		vm.obj = {};

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
				vm.idOpe = 2;
			}

    	};


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

