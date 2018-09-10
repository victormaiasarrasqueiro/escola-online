(function() {
    'use strict';

    angular.module('app.curso').controller('EditarCursoController', EditarCursoController);

	EditarCursoController.$inject = ['$scope','CRUDService','lista','CategoriaService','curso','categorias'];

    function EditarCursoController($scope,CRUDService,lista,CategoriaService,curso,categorias) {
        
		var vm = this;
		vm.atualizar = atualizar;

		vm.lista = lista;
		vm.obj   = null;

		vm.listaCategorias1 = [];
		vm.listaCategorias2 = [];
		vm.listaCategorias3 = [];

		function activate(){

			if(curso){
				vm.obj = angular.copy(curso);

				if(lista){

					vm.listaCategorias1 = angular.copy(categorias);


				}
			}

		}

		function atualizar(){

			return CRUDService.curso().atualizar(vm.obj).then(function(data) {

				if(data.success){
					
					toastr.success('Salvo!', 'Seu curso teve as informações atualizadas com sucesso!!!')
				

					//AlertService.sweetSucesso(1,"O usuário", redirecionarParaListagem);
					//AlertService.toastrSucesso('E-mail Enviado','Foi enviado um e-mail para o usuário com sua senha de acesso.');

				}else{

					//exibirErro(data.errors);

				};

				return data;

			});

		};

		$scope.$watch(
            "vm.obj.idCat1",
            function () {
              	
              	if(vm.obj.idCat1){
              	
              		return CategoriaService.listarFilhos(vm.obj.idCat1).then(function(data){
		        		vm.listaCategorias2 = data;
		        		vm.listaCategorias3 = [];
		        		return data; 
		        	});

              		
              	}

            }
        );

        $scope.$watch(
            "vm.obj.idCat2",
            function () {
              	
              	if(vm.obj.idCat2){

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

        };



		// Iniciando o procedimento.
		activate();
		
	};

})();

