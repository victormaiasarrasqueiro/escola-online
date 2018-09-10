(function() {
  'use strict';

  angular.module('app').run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun(routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getTemplates());
    routerHelper.configureStates(getHttpErros(), otherwise);
  }

  function getHttpErros() {
    return [{
      state: '404',
      config: {
        url: '/404',
        title: '404',
        templateUrl: 'app/core/404.html'
      }
    }];
  }

  function getTemplates() {
    return [
      {
        state: 'app',
        config: {
          views: {
            '': {
              templateUrl: 'app/template/template.app.html'
            },
            'header@app': {
              templateUrl: 'app/template/layout/header.html'
            },
            'footer@app': {
              templateUrl: 'app/template/layout/footer.html'
            }
          }
        }
      }
    ];
  }

})();