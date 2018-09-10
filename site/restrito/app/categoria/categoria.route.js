/**
 * Created by Victor Maia Sarrasqueiro
 */

(function() {

    'use strict';

    angular.module('app.categoria').run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    };

    function getStates() {
        return [
		
			{
				state: 'app.categoria',
				config: {
					url: '/categoria',
					title: 'Categorias',
					views: {
						'content@app': {
							templateUrl: 'app/categoria/categoria.html',
							controller: 'CategoriaController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(CRUDService){
							
							return CRUDService.categoria().listar().then(function(data){return data; });
							
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
