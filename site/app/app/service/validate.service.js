(function () {
    'use strict';

    angular.module('app').factory('ValidateService', ValidateService);

    ValidateService.$inject = [];

    function ValidateService() {

		var service = {
            hasDuplicidade: hasDuplicidade,
			isStrEmpty:isStrEmpty,
			isNumEmpty:isNumEmpty,
			isIdEmpty:isIdEmpty,
			isListEmpty:isListEmpty
        };

        return service;
		
		/**
		 * hasDuplicidade
		 * Retorna true se existe um objeto igual na lista.
		 */
		function hasDuplicidade(valor,prop,lista){
			
			if(lista != null && lista.length > 0){
				for(var i = 0 ; i < lista.length ; i++){
					
					if(lista[i][prop] == valor){
						return true;
					};
					
				};
			};
			
			return false;
			
		};
	
		/**
		 * isStrEmpty
		 * Verifica se a string passada é vazia.
		 */
		function isStrEmpty (valor){
			return ( valor == null || angular.isUndefined(valor) || valor.toString().trim() == "");
		};
		
		/**
		 * isNumEmpty
		 * Verifica se o valor passado é vazio.
		 */
		function isNumEmpty(valor){
			return ( valor == null || angular.isUndefined(valor) || valor == 0 || valor.toString().trim() == "" || valor.toString().trim() == "0" );
		};
		
		/**
		 * isIdEmpty
		 * Verifica se o objeto é nulo e se o id tb é nulo.
		 */
		function isIdEmpty(valor){
			return ( angular.isUndefined(valor) || !angular.isObject(valor) || angular.isUndefined(valor.id) || isNumEmpty(valor.id) );
		};

		/**
		 * isListEmpty
		 * Verifica se a lista passada é vazia
		 */
		function isListEmpty(valor){
			return ( valor == null || angular.isUndefined(valor) ||  !angular.isArray(valor) || valor.length == 0 );
		};

    };
	
})();
