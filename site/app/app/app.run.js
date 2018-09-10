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



    angular.module('app', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
    



    angular.module('app', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
  }])

});



