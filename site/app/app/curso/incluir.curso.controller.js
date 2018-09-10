(function() {
    'use strict';

    angular.module('app.curso').controller('IncluirCursoController', IncluirCursoController);

	IncluirCursoController.$inject = ['$scope','$uibModal','CRUDService','ValidateService','$state','lista','CategoriaService','$localStorage'];

    function IncluirCursoController($scope,$uibModal,CRUDService,ValidateService,$state,lista,CategoriaService,$localStorage) {
        
		var vm = this;
		vm.inserir = inserir;

		vm.obj = {};

		vm.listaCategorias1 = [];
		vm.listaCategorias2 = [];
		vm.listaCategorias3 = [];

		vm.obj.idCat1 = null;
		vm.obj.idCat2 = null;
        vm.obj.idCat3 = null;

        vm.errors = [];

        vm.$storage = $localStorage;

		/*
		* Função Inicio.
		*/
		function activate() {
			
			if(lista){
				vm.listaCategorias1 = lista;
			}
						
        };

		/*
		* inserir()
		*
		* Inseririndo Novo Registro na Base de Dados.		
		*/
		function inserir(){

			var errors = validate();

			if(errors.length == 0){
							
				return CRUDService.curso().inserir(vm.obj).then(function(data) {

					if(data.success){
						alert(data.id);
						enter(data.id);

						//AlertService.sweetSucesso(1,"O usuário", redirecionarParaListagem);
						//AlertService.toastrSucesso('E-mail Enviado','Foi enviado um e-mail para o usuário com sua senha de acesso.');

					}else{

						//exibirErro(data.errors);

					};

					return data;

				});
				
			}else{
				vm.errors = angular.copy(errors);
			}

		};


        $scope.$watch(
            "vm.obj.idCat1",
            function () {
              	
              	if(vm.obj.idCat1){
              		
              		vm.listaCategorias2 = [];
              		vm.listaCategorias3 = [];

              		vm.obj.idCat2 = null;
              		vm.obj.idCat3 = null;

              	
              		return CategoriaService.listarFilhos(vm.obj.idCat1).then(function(data){
		        		vm.listaCategorias2 = data;
		        		return data; 
		        	});

              		
              	}

            }
        );

        $scope.$watch(
            "vm.obj.idCat2",
            function () {
              	
              	if(vm.obj.idCat2){

              		vm.obj.idCat3 = null;

              		return CategoriaService.listarFilhos(vm.obj.idCat2).then(function(data){
		        		vm.listaCategorias3 = data;
		        		return data; 
		        	});

              	}

            }
        );

        function carregarFilhos(id){

        	return CategoriaService.listarFilhos(id).then(function(data){
        		console.log(data);
        		return data; 
        	});

        }

		/*
		* validate()
		*
		* Validando os campos antes de serem enviados.
		*/
		function validate(){

			var errors = [];
			var msg = {};

			if( ValidateService.isStrEmpty(vm.obj.nm) ) {
				errors.push( {"type":"required", "message": "É preciso digitar um nome para o seu curso." });
			}else if(vm.obj.nm.length < 3){
				errors.push( {"type":"required", "message": "O nome do curso precisa ter no mínimo 3 caracteres." });
			}else if(vm.obj.nm.length > 50){
				errors.push( {"type":"required", "message": "O nome do curso precisa ter no máximo 50 caracteres." });
			};




			if( ValidateService.isStrEmpty(vm.obj.ds) ) {
				errors.push( {"type":"required", "message": "É preciso escrever uma descrição." });
			}else if(vm.obj.ds.length < 10){
				errors.push( {"type":"required", "message": "O nome do curso precisa ter no mínimo 10 caracteres." });
			}else if(vm.obj.ds.length > 200){
				errors.push( {"type":"required", "message": "O nome do curso precisa ter no máximo 200 caracteres." });
			}

			if( ValidateService.isNumEmpty(vm.obj.idCat1) ) {
				errors.push( {"type":"required", "message": "É preciso selecionar a primeira categoria. ( Categoria 1 )" } );
			}else if( ValidateService.isNumEmpty(vm.obj.idCat2) ) {
				errors.push( {"type":"required", "message": "É preciso selecionar a segunda categoria.  ( Categoria 2 )" } );
			}else if( ValidateService.isNumEmpty(vm.obj.idCat3) ) {
				errors.push( {"type":"required", "message": "É preciso selecionar a terceira categoria. ( Categoria 3 )" } );
			};



			

			return errors;

		};

		// Redirecionando para a página de listagem de profissionais.
		function redirecionarParaListagem(){
			$state.transitionTo("app.curso", {});
		};

		function enter(id){
			vm.$storage.idCurso = id;
			$state.transitionTo("app.aula", {} );
		};

		// Iniciando o procedimento.
		activate();
		
	};

})();

