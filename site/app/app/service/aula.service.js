(function () {
    'use strict';

    angular.module('app').factory('AulaService', AulaService);

    AulaService.$inject = ['$http', '$q'];

    function AulaService($http, $q, $timeout) {
        
		var dominio = '/api/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		var service = {
			'listarPorCurso': listarPorCurso,
			'saveOrder':saveOrder,
			'insertAll':insertAll
        };

        return service;

		
		/*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function listarPorCurso(id) {

			var url = dominio + 'aula/curso/' + id;
			

			return $http.get(url, config).then(function(res) {

				if(!res.data.success){
					console.error('Erro ao listar aulas');
					console.info(res.data);
				}

				return res.data.list;
				
			});

        };

        /*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function insertAll(lista) {

			var url = dominio + 'aula/insertAll/';
			
			return $http.post(url, angular.toJson( lista ), config).then(function(res) {
				
				if(res.data.success){
		
				}else{
					console.error('Erro ao inserir os objetos. lista:');
					console.info( res.data.message );
				};

				return res.data;
			});


        };


        /*
		* saveOrder
		* Atualiza a ordem da lista
		*/
		function saveOrder(lst) {

			var url = dominio + 'aula/saveOrder/';

			alert(url);

			return $http.post(url, angular.toJson( lst ), config).then(function(res) {
				
				if(!res.data.success){

					console.error('Erro ao atualizar objeto. model:');
					console.info( angular.toJson( lst ) );
					console.error(res);

				};

				return res.data;

			});

        };


    };
	
})();
