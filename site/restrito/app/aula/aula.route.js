/**
 * Created by Victor Maia Sarrasqueiro
 */

(function() {

    'use strict';

    angular.module('app.aula').run(appRun);

    appRun.$inject = ['routerHelper','$localStorage','AulaService','CRUDService','$stateParams'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    };

    function getStates() {
        return [
		
			{
				state: 'app.aula',
				config: {
					url: '/aulas',
					title: 'Aulas',
					views: {
						'content@app': {
							templateUrl: 'app/aula/aula.html',
							controller: 'AulaController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(AulaService,$localStorage){
							
							var id = $localStorage.idCurso;

							return AulaService.listarPorCurso(id).then(function(data){ return data; });
							
						}
						
					},
					data: {
						permissions: {
							only: ['administrator']
						}
					}
				}
	
			},
			{
				state: 'app.aulaincluir',
				config: {
					url: '/incluiraula',
					title: 'Incluindo Nova Aula',
					views: {
						'content@app': {
							templateUrl: 'app/aula/incluir.editar.aula.html',
							controller: 'IncluirEditarAulaController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						aula: function(){
							
							return null;
							
						}
						
					},
					data: {
						permissions: {
							only: ['administrator']
						}
					}
				}
	
			},
			{
				state: 'app.aulaeditar',
				config: {
					url: '/editaraula/:id',
					title: 'Editando Aula',
					views: {
						'content@app': {
							templateUrl: 'app/aula/incluir.editar.aula.html',
							controller: 'IncluirEditarAulaController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						aula: function(CRUDService,$stateParams){
							
							return CRUDService.aula().obter($stateParams.id).then(function(data){console.log(data); return data; });
							
						}
						
					},
					data: {
						permissions: {
							only: ['administrator']
						}
					}
				}
	
			}
		
		];
    };

})();
