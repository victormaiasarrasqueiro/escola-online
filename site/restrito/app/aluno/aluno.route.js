/**
 * Created by Victor Maia Sarrasqueiro
 */

(function() {

    'use strict';

    angular.module('app.aluno').run(appRun);

    appRun.$inject = ['routerHelper','$localStorage','AlunoService','CRUDService','$stateParams'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    };

    function getStates() {
        return [
		
			{
				state: 'app.aluno',
				config: {
					url: '/alunos',
					title: 'Alunos do Curso',
					views: {
						'content@app': {
							templateUrl: 'app/aluno/aluno.html',
							controller: 'AlunoController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(AlunoService,$localStorage){
							
							var id = $localStorage.idCurso;

							return AlunoService.listarPorCurso(id).then(function(data){ return data; });
							
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
