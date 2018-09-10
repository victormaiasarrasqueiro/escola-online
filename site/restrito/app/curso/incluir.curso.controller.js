(function() {
    'use strict';

    angular.module('app.curso').controller('IncluirCursoController', IncluirCursoController);

	IncluirCursoController.$inject = ['$scope','$uibModal','CRUDService','ValidateService','$state'];

    function IncluirCursoController($scope,$uibModal,CRUDService,ValidateService,$state) {
        
		var vm = this;
		vm.inserir = inserir;

		vm.obj = {};


		/*
		* Função Inicio.
		*/
		function activate() {
			
						
        };

		/*
		* inserir()
		*
		* Inseririndo Novo Registro na Base de Dados.		
		*/
		function inserir(){

			var errors = validate();
			console.log(errors);

			if(errors.length == 0){
							
				return CRUDService.curso().inserir(vm.obj).then(function(data) {

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
				var msg = {"type":"Obrigatório", "message": "É preciso digitar um nome para a categoria." };
				errors.push(msg);
			};

			if( ValidateService.isStrEmpty(vm.obj.ds) ) {
				var msg = {"type":"Obrigatório", "message": "É preciso escrever uma descrição." };
				errors.push(msg);
			};

			if( ValidateService.isNumEmpty(vm.obj.idCat) ) {
				var msg = {"type":"Obrigatório", "message": "É preciso selecionar uma categoria." };
				errors.push(msg);
			};


			

			return errors;

		};

		// Redirecionando para a página de listagem de profissionais.
		function redirecionarParaListagem(){
			$state.transitionTo("app.curso", {});
		};

		// Iniciando o procedimento.
		activate();
		
	};

})();

