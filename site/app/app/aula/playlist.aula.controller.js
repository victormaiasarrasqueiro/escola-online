(function() {
    'use strict';

    angular.module('app.aula').controller('PlaylistAulaController', PlaylistAulaController);

	  PlaylistAulaController.$inject = ['$scope','$state','YoutubeService','AulaService','$localStorage'];

    function PlaylistAulaController($scope,$state,YoutubeService,AulaService,$localStorage) {
        
		var vm = this;
    vm.getPlaylist = getPlaylist;
    vm.buscarPlaylist = buscarPlaylist;
    vm.selecionarTodos = selecionarTodos;
    vm.incluir = incluir;

    vm.nexPageToken = '0';
    vm.pageInfo     = {};

    vm.obj = {};
    vm.obj.id = '';
    vm.obj.page = {};
    vm.obj.lista = [];

    var idSelecionado = '';

    vm.checkAll = false;

		/*
		* Função Inicio.
		*/
		function activate() {
		  

						
    };

    function incluir(){

      var lst = [];

      //Processo de Inclusao
      for(var i = 0; i < vm.obj.lista.length; i++){

        if(vm.obj.lista[i].selecionado){
          lst.push(vm.obj.lista[i]);
        }

      };
      
      if(lst.length > 0){


        AulaService.insertAll({'lista':lst,'idCurso':$localStorage.idCurso}).then(function(res){

          return res;

        });

      }else{
        alert('E necessario selecionar alguma aula.')
      }

    }

    function buscarPlaylist(){

      idSelecionado = angular.copy(vm.obj.id);

      getPlaylist(0);

    }

    function getPlaylist(page){

      return YoutubeService.getPlaylistItems(idSelecionado,page).then(function(res){
        
        vm.obj.page  = res.data;
        vm.obj.lista = vm.obj.page.items.map(function(item) { 

          var aula = {

            nm: item.snippet.title,
            idVid: item.snippet.resourceId.videoId,
            ds: item.snippet.description,
            dsExt: item.snippet.description,
            ordem: item.snippet.position

          }

          vm.checkAll = false;

          return aula; 

        });

        if(angular.isUndefined(vm.obj.page.nextPageToken)){
          vm.obj.page.nextPageToken = 'FLU';
        }

        if(angular.isUndefined(vm.obj.page.prevPageToken)){
          vm.obj.page.prevPageToken = 'FLU';
        }

        return res;

      })

    };

    function selecionarTodos(){

      for(var i = 0; i < vm.obj.lista.length; i++){

        vm.obj.lista[i].selecionado = vm.checkAll;

      };

    };

		// Iniciando o procedimento.
		activate();
		
	};

})();

