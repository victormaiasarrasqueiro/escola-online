(function () {
    'use strict';

    angular.module('app').factory('TabelaService', TabelaService);

    TabelaService.$inject = ['$http', '$q'];

    function TabelaService($http, $q) {				
		
		var service = {
			getService:getService
        };

        return service;
		
		
		function getService(service){
			
			switch(service)
			{
				case "categoria":
					return getListaCategoria();

			};

		};
		
		
		/*
		* getListaCategoria()
		*
		* Retorna uma lista de categorias.
		*/
		function getListaCategoria(){
			
			var deferred = $q.defer();
			
			// listaTipoEstadoCivil - Lista de Tipos de Estados Civis
			var	lt = [
				{"id":0,"ds":"Selecione"},
				{"id":1,"ds":"Geral"},
				{"id":2,"ds":"Programação"},
				{"id":3,"ds":"Vestibular"},
				{"id":4,"ds":"Concursos Públicos"}];

			deferred.resolve(lt);	
			
			return deferred.promise;
			
		};
		

    };
	
})();
