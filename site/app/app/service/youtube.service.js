(function () {
    'use strict';

    angular.module('app').factory('YoutubeService', YoutubeService);

    YoutubeService.$inject = ['$http', '$q'];

    function YoutubeService($http, $q, $timeout) {
        
		var dominio = '/api/';
		var config = {headers: {'Content-Type': 'application/json'}};
		
		var service = {
			'getVideo': getVideo,
			'getPlaylistItems':getPlaylistItems
        };

        return service;

        /*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function getVideo(id) {

        	var url = dominio + 'youtube/video/' + id;

			return $http.get(url, config).then(function(res) {

				return res;
				
			});

        };

        /*
		* listByPro
		* Obter uma lista de agendamentos por profissional.
		*/
        function getPlaylistItems(id,page) {

        	var url = dominio + 'youtube/playlistitems/' + id + '/page/' + page;
        	console.log(url);
			
			return $http.get(url, config).then(function(res) {

				return res;
				
			});


        };

    };
	
})();
