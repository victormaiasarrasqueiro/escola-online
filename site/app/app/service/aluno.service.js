(function () {
    'use strict';

    angular.module('app').factory('AlunoService', AlunoService);

    AlunoService.$inject = ['$http', '$q'];

    function AlunoService($http, $q, $timeout) {
        
		var dominio = 'http://localhost:8080/api/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		var service = {
			'listarPorCurso': listarPorCurso
        };

        return service;

		
		/*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function listarPorCurso(id) {

			var url = dominio + 'aluno/curso/' + id;
			

			return $http.get(url, config).then(function(res) {

				if(!res.data.success){
					console.error('Erro ao listar aulas');
					console.info(res.data);
				}

				return res.data.list;
				
			});

        };

    };
	
})();
