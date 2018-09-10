/*
* 
* CRUD.SERVICE
* 
* SERVICO GENERICO PARA CONTEMPLAR AS OPERACOES DE CRUD DE ELEMENTOS DO SISTEMA.
* i9MIND - Desenvolvido por Victor Sarrasqueiro
*
*/
(function () {
    'use strict';

    angular.module('app').factory('CRUDService', CRUDService);

    CRUDService.$inject = ['$http', '$q'];

    function CRUDService($http, $q) {

		var dominio = '/api/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		/*
		* OPERAÇÕES BÁSICAS
		*/
		var crudOptions = {
			'inserir': inserir,
			'atualizar': atualizar,
			'remover': remover,
			'listar': listar,
			'obter':obter,
			'agendarRefresh':agendarRefresh
        };
		
		/*
		* SERVICES
		* context: Mapeamento no servidor para o serviço.
		* cache: Lista em cache. ( list -> Lista de Objetos | refresh -> Marcado para atualizar a lista | last -> Ultima atualização | timeExp -> Tempo limite para realizar refresh
		*/
		var atual = '';
		var services = {

			curso: 					{ 'context':'curso', 				'cache':{ 'list':[],'refresh':true } },
			modulo: 				{ 'context':'curso', 				'cache':{ 'list':[],'refresh':true } },
			aula: 					{ 'context':'aula', 		    	'cache':{ 'list':[],'refresh':true } }
		};
		
		/*
		* SERVICE FACTORY
		*/
		var factory = {
			
			getService:getService,
			
			curso: basicFactoryCurso,
			aula: basicFactoryAula,
			modulo:basicFactoryModulo
			
        };
		
        return factory;
		
		/*
		* GETSERVICE
		*  - Ao informar o servico, retorna a instancia.
		*/
		function getService(v){
			return factory[v];
		};
		

		function basicFactoryCurso(){
		
			atual = 'curso';
			return crudOptions;	
			
		};
		function basicFactoryAula(){
		
			atual = 'aula';
			return crudOptions;	
			
		};
		function basicFactoryModulo(){
		
			atual = 'modulo';
			return crudOptions;	
			
		};
		
		/*
		*
		* obter
		* Obter o objeto com o id informado.
		*
		*/
		function obter(id) {
			
			var url = dominio + services[atual].context + '/' + id;

			return $http.get(url, config).then(function(res) {

				if(!res.data.success){
					console.error('Erro ao recuperar o objeto.');
					console.info( 'id:' + id );
					console.info(res.data.message);
				};

				return res.data.model;

			});
			
        };
		
		/*
		* inserir(model)
		* Insere um registro para a empresa logada.
		*/
		function inserir(model) {
			
			var url = dominio + services[atual].context;
			
			return $http.post(url, angular.toJson( model ), config).then(function(res) {
				
				if(res.data.success){
					setRefresh();
				}else{
					console.error('Erro ao inserir objeto. model:');
					console.info( angular.toJson( model ) );
					console.info( res.data.message );
				};

				return res.data;
			});
			
        };
		
		/*
		* atualizar
		* Atualiza um item para a empresa logada.
		*/
		function atualizar(model) {

			var url = dominio + services[atual].context + '/' + model._id;

			return $http.put(url, angular.toJson( model ), config).then(function(res) {
				
				if(res.data.success){
					setRefresh();
				}else{
					console.error('Erro ao atualizar objeto. model:');
					console.info( angular.toJson( model ) );
					console.info( res.data.message );
				};

				return res.data;

			});

        };
		
		/*
		* remover
		* Remove um item para a empresa logada.
		*/		
		function remover(id) {
			
			var url = dominio + services[atual].context + '/' + id;
			
			return $http.delete(url, config).then(function(res) {
				
				if(res.data.success){
					setRefresh();
				}else{
					console.error('Erro ao excluir objeto:');
					console.info('id: ' + id);
					console.info(res.data.message);
				};

				return res.data;
			});
			
        };

		/*
		* listar
		* Obter uma lista de itens cadastrados da empresa cadastrada.
		*/
        function listar() {

			var servicoAtual = angular.copy(atual);

			if( (!angular.isObject(services[servicoAtual].cache.list)) || services[servicoAtual].cache.list.length === 0 || services[servicoAtual].cache.refresh ){
			
				var url = dominio + services[servicoAtual].context;

				return $http.get(url, config).then(function(res) {

					if(res.data.success){

						//Informando o tempo que deverá ser atualizada a lista.
						setTimeRefresh(servicoAtual);
						
						//Setando a lista no cache.
						setListCache(res.data.list,servicoAtual);

					}else{

						console.error('Ocorreu um erro ao retornar a listagem.');
						console.info(res.data);

					}
					
					//Retornando a lista recuperada.
					return res.data.list;
					
				});
				
			}else{

				var deferred = $q.defer();
				deferred.resolve(services[servicoAtual].cache.list);	
				return deferred.promise;
			
			};
			
        };

		/*
		* agendarRefresh
		* Agenda para os dados da página sejam atualizados.
		*/		
		function agendarRefresh() {
			
			setRefresh();
			
			var deferred = $q.defer();
			deferred.resolve(true);	
			return deferred.promise;

        };
		
		/*
		* setListCache(list)
		* Inserindo dados na lista de cache.
		*/
		function setListCache(list,servicoAtual){
			services[servicoAtual].cache.list = angular.copy(list);
		};
		
		/*
		* setRefresh()
		* Agendar para atualizar a lista quando preciso.
		*/
		function setRefresh(){
			services[atual].cache.refresh = true;
		};
		
		/*
		* setRefresh()
		* Agendar para atualizar a lista de especialidades quando preciso.
		*/
		function setTimeRefresh(servicoAtual){
		
			if(services[servicoAtual].cache.timeExp != 0){

				//alert(moment().diff(cache.timeExp));

			};
			
		};

    };
	
})();
