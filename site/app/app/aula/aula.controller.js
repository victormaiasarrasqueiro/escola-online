(function() {
    'use strict';

    angular.module('app.aula').controller('AulaController', AulaController);

	  AulaController.$inject = ['$scope','$state','lista','AulaService'];

    function AulaController($scope,$state,lista,AulaService) {
        
		var vm = this;
    vm.edit = edit;
    vm.saveOrder = saveOrder;

    vm.lista = [];
		vm.orderUpdated = false;
		vm.orderConfig = {
            
      animation: 150,

      onSort: function (evt){
            vm.orderUpdated = true;
        }

    };

    /*
    * Função Inicio.
    */
    function activate() {
      
      vm.lista = lista;
            
    };

    function edit(idC) {
      
        $state.transitionTo("app.aulaeditar", { 'id':idC } );

    };

    function saveOrder(){

      var lst = [];

      if(vm.lista.length >  0){

        lst = vm.lista.map(function(obj,index) { 
          return { _id: obj._id , ordem:index + 1 } ; 
        });

        console.log(lst);

        //salvando a ordem
        return AulaService.saveOrder(lst).then(function(data) {

          if(data.success){

            alert('Atualizado com sucesso');

          }else{
            
            alert('ERRO');

          };

          return data;

        });


      }else{
        alert("Lista Vazia");
      }

    };

		/*
    * Inicio
    */
		activate();
		
	};

})();

