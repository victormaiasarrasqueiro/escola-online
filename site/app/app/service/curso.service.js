(function () {
    'use strict';

    angular.module('app').factory('CursoService', CursoService);

    CursoService.$inject = ['$http', '$q', '$timeout'];

    function CursoService($http, $q, $timeout) {
        
		var dominio = '/api/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		var service = {
			
        };

        return service;



    };
	
})();
