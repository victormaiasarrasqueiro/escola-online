(function() {
    'use strict';

    angular.module('combotabelaservice.directive', []);

	angular.module('combotabelaservice.directive').directive('combotabelaservice',['TabelaService',function(TabelaService) {
	
	return {
      
		templateUrl:'app/directives/combobox/tabelaservice/combotabelaservice.html',
      
		restrict: 'E',
      
		scope: {
			
			obj: "=",
			service: "@",
			name: "@",
			text: "@"
		},
		link: function(scope) {

		},
		controller:function($scope,TabelaService){

			$scope.list = [];  									

			/*
			* Fun��o Inicio.
			*/
			function activate() {

				//Carregando a lista do servi�o.
				return carregar();

			};
		
			/*
			* carregar()
			*/
			function carregar(){
			
				return TabelaService.getService($scope.service).then(function(data) {
				
					$scope.list = data;
					
					return data;
				});

			};	

			activate();
					
		}

    };

  }]);

})();