(function() {
    'use strict';

    angular.module('app.curso').controller('CursoController', CursoController);

	CursoController.$inject = ['$scope','$uibModal','CRUDService','lista','$state','$localStorage'];

    function CursoController($scope,$uibModal,CRUDService,lista,$state,$localStorage) {
        
		var vm = this;
		vm.enter = enter

		vm.$storage = $localStorage;


		vm.obj = {};

		function enter(id){
			vm.$storage.idCurso = id;
			$state.transitionTo("app.aula", {} );
		};

		/*
		* Função Inicio.
		*/
		function activate() {
			vm.lista = lista;
						
        };
		

		// Iniciando o procedimento.
		activate();
		
	};

})();

