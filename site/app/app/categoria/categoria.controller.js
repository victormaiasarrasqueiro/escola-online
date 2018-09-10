(function() {
    'use strict';

    angular.module('app.categoria').controller('CategoriaController', CategoriaController);

	CategoriaController.$inject = ['$scope'];

    function CategoriaController($scope) {
        
		var vm = this;

		vm.obj = {};
		vm.obj.nome = "FUNCIONANDO!!!!"

		vm.states = [{'abbrev':'RJ'},{'abbrev':'SP'},{'abbrev':'TO'}];
		/*
		* Função Inicio.
		*/
		function activate() {
			
						
        };
		

		// Iniciando o procedimento.
		activate();
		
	};

})();

