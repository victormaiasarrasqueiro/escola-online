(function() {
    'use strict';

    angular.module('app.aula').controller('AulaController', AulaController);

	  AulaController.$inject = ['$scope','$state','lista'];

    function AulaController($scope,$state,lista) {
        
		var vm = this;
    vm.edit = edit;

		vm.orderUpdated = false;
		vm.orderConfig = {
            
      animation: 150,
      //onAdd: function (/** ngSortEvent */evt){
          // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
          //alert("add");
      //},
      //onRemove: function (/** ngSortEvent */evt){
          // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
          //alert("remov");
      //},
      onSort: function (/** ngSortEvent */evt){
            // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
            vm.orderUpdated = true;
        }

    };


    function edit(idC) {
      
        $state.transitionTo("app.aulaeditar", { 'id':idC } );

    }

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

