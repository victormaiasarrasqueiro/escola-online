(function() {
    'use strict';
	

    angular.module('app').run(["$rootScope", "$anchorScroll" , function ($rootScope, $anchorScroll) {
        $rootScope.$on("$locationChangeSuccess", function() {
            $anchorScroll();
        });
    }]);

    angular.module('app').config(function($mdIconProvider) {
    	
    	$mdIconProvider
	       .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
	       .defaultIconSet('img/icons/sets/core-icons.svg', 24);
	       
   });
    

});



