(function () {
    'use strict';

    angular.module('app').factory('CategoriaService', CategoriaService);

    CategoriaService.$inject = ['$http', '$q'];

    function CategoriaService($http, $q, $timeout) {
        
		var dominio = 'http://localhost:8080/api/categoria/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		var service = {
			'listarFilhos': listarFilhos
        };

        return service;

		
		/*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function listarFilhos(id) {

			var url = dominio + 'pai/' + id;
			

			return $http.get(url, config).then(function(res) {

				if(!res.data.success){
					console.error('Erro ao listar categorias');
					console.info(res.data);
				}

				return res.data.list;
				
			});

        };

    };
	
})();
