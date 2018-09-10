/**
 * Created by Victor Maia Sarrasqueiro
 */

(function() {

    'use strict';

    angular.module('app.curso').run(appRun);

    appRun.$inject = ['routerHelper','CRUDService','CategoriaService', '$localStorage'];

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
						},
						categorias: function(CategoriaService){
							
							return CategoriaService.listarFilhos('0').then(function(data){return data; });
							
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
				state: 'app.cursoincluir',
				config: {
					url: '/cursos/incluir',
					title: 'Incluir Novo Curso',
					views: {
						'content@app': {
							templateUrl: 'app/curso/incluir.curso.html',
							controller: 'IncluirCursoController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(CategoriaService){
							
							return CategoriaService.listarFilhos('0').then(function(data){return data; });
							
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
				state: 'app.cursoeditar',
				config: {
					url: '/cursos/editar',
					title: 'Editar Curso',
					views: {
						'content@app': {
							templateUrl: 'app/curso/editar.curso.html',
							controller: 'EditarCursoController',
							controllerAs: 'vm'
						}
					},
					resolve:{

						lista: function(AulaService,$localStorage){
							
							var id = $localStorage.idCurso;

							return AulaService.listarPorCurso(id).then(function(data){ return data; });
							
						},

						curso: function(CRUDService,$localStorage){

							var id = $localStorage.idCurso;
							
							return CRUDService.curso().obter(id).then(function(data){ return data; });
						},

						categorias: function(CategoriaService){
							
							return CategoriaService.listarFilhos('0').then(function(data){return data; });
							
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
