/**
 * Created by Victor Maia Sarrasqueiro
 */

(function() {

    'use strict';

    angular.module('app.curso').run(appRun);

    appRun.$inject = ['routerHelper','CRUDService','$localStorage'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    };

    function getStates() {
        return [
		
			{
				state: 'app.curso',
				config: {
					url: '/cursos',
					title: 'Home',
					views: {
						'content@app': {
							templateUrl: 'app/curso/curso.html',
							controller: 'CursoController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(CRUDService){
							return CRUDService.curso().listar().then(function(data) {
								return data;
							});
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
				state: 'app.curso.incluir',
				config: {
					url: '/novo',
					title: 'Incluir Novo Curso',
					views: {
						'content@app': {
							templateUrl: 'app/curso/incluir.curso.html',
							controller: 'IncluirCursoController',
							controllerAs: 'vm'
						}
					},
					data: {
						permissions: {
							only: ['administrator']
						}
					}
				}
	
			},
		
		];
    };

})();
