/*
*   comboCrudService
*
*	Responsável por montar um combo box ui-selec genérico.
*	@author Victor Sarrasqueiro
*/
(function() {
    'use strict';

    angular.module('combocrudservice.directive', []);

	angular.module('combocrudservice.directive').directive('combocrudservice',['CRUDService','$uibModal','$q','AlertService','UtilService',function(CRUDService,$uibModal,$q,AlertService) {
	
	return {
      
		templateUrl:'app/directives/combobox/crudservice/combocrudservice.html',
      
		restrict: 'E',
      
		scope: {
			
			obj: "=",                    	// -> Objeto no qual irá receber o valor selecionado.
			list: "=",						// -> Lista passada com os valores que irá ser montado a combobox.
			hasCad: "=",                    // -> Se irá possuir cadastro
			service: "@",                   // -> Serviço que será cadastrado ou localizado.
			textCad: "@",                   // -> Texto que será exibido para o link de cadastro
			vazio: "@",                     // -> Se será possivel adcionar null.
			phold: "="                      // -> Placeholdes
			
		},
		link: function(scope) {

		},
		controller:function($scope,CRUDService,$timeout,UtilService){
			
			var objTemp = {"nm":"Selecione","id":"0"};
			
			$scope._id = "";							
			$scope.component = {};

			/*
			* Função Inicio -> Iniciando a combobox.
			*/
			function activate() {
				
				// Definindo o ID do objeto
				$scope._id = "combo" + new Date().getTime();

				if( !angular.isObject($scope.list) || !angular.isArray($scope.list) ){
			
					// Caso a lista de dados não seja passada, buscaremos no banco de dados.
					carregar();
				
				}else{
				
					//Carregando a lista do serviço.
					buildList();
					
				};

			};
			
			/*
			* Função Responsável por carregar dados do servidor de acordo com o serviço informado.
			*/
			function carregar(){		
			
				return CRUDService.getService($scope.service)().listar().then(function(data) {
				
					$scope.list = data;
					buildList();
					
					return data;
					
				});
				
			};
			
			/*
			* Função Responsável por montar os dados a serem apresentados.
			*/
			function buildList(){
			
				if(!angular.isObject($scope.list) || !angular.isArray($scope.list)){
					$scope.list = [];  	
				};
				
				if($scope.vazio != null && $scope.vazio){
					
					var tmp = [];
					tmp.push(objTemp);
					
					angular.forEach($scope.list, function(obj, key) {
						tmp.push(obj);
					});
					
					$scope.list = tmp;
					
				};
				
				definirObjSelecionado();
				
			};
			
			/*
			* Função Responsável por definir o objeto selecionado.
			*/
			function definirObjSelecionado(){
				
				if( angular.isUndefined($scope.obj) || angular.isUndefined($scope.obj._id) ){
					
					if($scope.vazio != null && $scope.vazio){
						
						$scope.component.select = objTemp;
						$scope.obj = objTemp;
						
					}else{
						
						$scope.component.select = {};
						$scope.obj = {};
					};
				
				}else{
					
					if(angular.isUndefined($scope.obj.nm) || $scope.obj.nm == ""){
				
						$scope.component.select = UtilService.getObjectFromList($scope.obj._id,"_id",$scope.list);
						$scope.obj = $scope.component.select;
						
					}else{
					
						$scope.component.select = $scope.obj;
						
					};

				};

			};
			
			/*
			* Função Responsável por abrir o modal de cadastro
			*/
			$scope.openModal = function() {
				
				var urlTemplate = 'app/crudbasico/' + $scope.service + '/cadastro-' + $scope.service + '-modal.html';
			
				var modalInstance = $uibModal.open({
					animation:true,
					size:"lg",
					templateUrl: urlTemplate ,
					controller: 'CRUDBasicoModalController',
					controllerAs: 'vm',
					bindToController:true,
					
					resolve: {
						
						list:  function(CRUDService){
							
							var deferred = $q.defer();
							deferred.resolve($scope.list);	
							return deferred.promise;

						},
						
						config: function($q){
							
							var obj = {
								text: $scope.textCad,
								service: $scope.service
							};

							var deferred = $q.defer();
							deferred.resolve(obj);	
							return deferred.promise;
						}

					}
					
				});
				
				modalInstance.result.then(function (ret){
					
					AlertService.toastrSucesso("Sucesso","O registro foi Inserido com Sucesso");
					
					var CRet = angular.copy(ret);
					$scope.list.push(CRet);
					$scope.component.select = CRet;
					$scope.obj = CRet;
	
				}, function () {
					alert("Ocorreu um erro no processo.")
				});
				
			};
			
			/*
			* Função Responsável por setar o objeto selecionado dentro do objeto passado para a diretiva.
			*/
			$scope.onSelectCallback = function(item){
				$scope.obj = angular.copy(item);
			};

			//Localizar o endereço pelo Google.
			$scope.$watch('obj', function() {
	
				if( angular.isUndefined($scope.obj) || angular.isUndefined($scope.obj._id) ){
					$scope.component.select = {};
				}else{
					$scope.component.select = $scope.obj;
				};
				
			});

			
			// Chamando a função.
			activate();
			
					
		}

    };

  }]);

})();