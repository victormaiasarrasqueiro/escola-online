(function() {
    'use strict';

    angular.module('app.categoria').controller('CategoriaController', CategoriaController);

	CategoriaController.$inject = ['$scope','lista','CRUDService','CategoriaService'];

    function CategoriaController($scope,lista,CRUDService,CategoriaService) {
        
		var vm = this;
		vm.inserir = inserir;
		vm.carregarFilhos = carregarFilhos;
		vm.atualizar = atualizar;

		vm.obj = {};
		vm.obj.pai = '0';
		vm.obj.ieAtv = 'true';
		vm.obj.ordem = '0';

		vm.lista = [];

		/*
		* Função Inicio.
		*/
		function activate() {
			
			if(angular.isObject(lista)){

				vm.lista = angular.copy(lista);

			}
			
        };

        function carregarFilhos(id){
        	alert(id);
        	alert('Carregando');
        	vm.lista = [];

        	return CategoriaService.listarFilhos(id).then(function(data){
        		
        		vm.obj.pai = id;
        		vm.lista = angular.copy(data);
        		console.log(data);

        		return data; 

        	});

        };

		/*
		* inserir()
		*
		* Inseririndo Novo Registro na Base de Dados.		
		*/
		function inserir(){

			vm.obj.ordem = vm.lista.length + 1;

			return CRUDService.categoria().inserir(vm.obj).then(function(data) {

				if(data.success){

					vm.lista.push(angular.copy(vm.obj));
					alert('Inserido');
					

				}else{

					alert('Erro');

				};

				return data;

			});

		};

		/*
		* inserir()
		*
		* Inseririndo Novo Registro na Base de Dados.		
		*/
		function atualizar(index){

			var obj = vm.lista[index];

			return CRUDService.categoria().atualizar(obj).then(function(data) {

				if(data.success){

			
					alert('Atualizado');
					

				}else{

					alert('Erro');

				};

				return data;

			});

		};


		// Iniciando o procedimento.
		activate();

		
	};

})();

