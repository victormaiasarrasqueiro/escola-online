(function() {
    'use strict';

    angular.module('app.curso').controller('CursoController', CursoController);

	CursoController.$inject = ['$scope','$uibModal','CRUDService','lista','categorias','$state','$localStorage','CategoriaService'];

    function CursoController($scope,$uibModal,CRUDService,lista,categorias,$state,$localStorage,CategoriaService) {
        
		var vm = this;
		vm.enter = enter

		vm.$storage = $localStorage;

		vm.obj = {};

        vm.lista     = [];
        vm.lstCateg1 = []; 
        vm.lstCateg2 = []; 
        vm.lstCateg3 = [];

        vm.lstIdCateg1 = [];
        vm.lstIdCateg2 = [];
        vm.lstIdCateg3 = [];

        vm.search1 = {};
        vm.search1.nm = 'beleza';

        vm.filterIDCat1 = '0';

		/*
		* Função Inicio.
		*/
		function activate() {

			//vm.temp = angular.copy( lista );
			//vm.lista = montarLista(angular.copy( lista ));
            

            vm.lista = angular.copy( lista );

            vm.lstCateg1 = [{'_id':'0','nm':'TODOS'}];
            vm.lstCateg1 = vm.lstCateg1.concat(angular.copy(categorias));

            buildListCat1(angular.copy( lista ));
            buildListCat2(angular.copy( lista ));
            buildListCat3(angular.copy( lista ));
						
        };

        function montarLista(listaBD){

        	var result = [];

        	var initial   = 0;
        	var tempArray = [];

        	while(initial < listaBD.length){

        		var obj = listaBD[initial];

        		tempArray.push(obj);

        		
        		if(tempArray.length == 4){
        			result.push( angular.copy(tempArray) );
        			tempArray = [];
        		}

        		initial = initial + 1;

        	}

        	if(tempArray != null && tempArray.length != 0 && tempArray.length < 4){
        		result.push( angular.copy(tempArray) );
        	}

        	return result;

        };

        function buildListCat1(listaBD){

            vm.lstIdCateg1.push('0');

            for(var i = 0 ; i<listaBD.length ; i++){

                vm.lstIdCateg1.push(listaBD[i].idCat1);

            }

        };

        function buildListCat2(listaBD){

            for(var i = 0 ; i<listaBD.length ; i++){

                vm.lstIdCateg2.push(listaBD[i].idCat2);

            }

        };

        function buildListCat3(listaBD){

            for(var i = 0 ; i<listaBD.length ; i++){

                vm.lstIdCateg3.push(listaBD[i].idCat3);

            }

        };

        vm.filterCat1 = function(categoria){
            return vm.lstIdCateg1.indexOf(categoria._id) != -1;
        };

        vm.filterCat2 = function(categoria){
            return vm.lstIdCateg2.indexOf(categoria._id) != -1;
        };

        vm.filterCat3 = function(categoria){
            return vm.lstIdCateg3.indexOf(categoria._id) != -1;
        };

        vm.filterItens = function(item){

            if(vm.filterIDCat1 === '0' || angular.isUndefined(vm.filterIDCat1)){
                return true;
            }

            return (item.idCat1 == vm.filterIDCat1 || item.idCat2 == vm.filterIDCat2 || item.idCat1 == vm.filterIDCat3);
        };

        $scope.$watch(
            "vm.filterIDCat1",
            function () {
                
                if(vm.filterIDCat1){
                    
                    vm.lstCateg2 = [];
                    vm.lstCateg3 = [];

                    vm.filterIDCat2 = null;
                    vm.filterIDCat3 = null;

                
                    return CategoriaService.listarFilhos(vm.filterIDCat1).then(function(data){
                        vm.lstCateg2 = data;
                        return data; 
                    });

                    
                }

            }
        );

        $scope.$watch(
            "vm.filterIDCat2",
            function () {
                
                if(vm.filterIDCat2){

                    vm.lstCateg3 = [];
                    vm.filterIDCat3 = null;

                    return CategoriaService.listarFilhos(vm.filterIDCat2).then(function(data){
                        vm.lstCateg3 = data;
                        return data; 
                    });

                }

            }
        );

        function enter(id,idVid){
            vm.$storage.idCurso = id;
            vm.$storage.idVid   = idVid;
            $state.transitionTo("app.aula", {} );
        };
		

		// Iniciando o procedimento.
		activate();
		
	};

})();

