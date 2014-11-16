(function() {
  'use strict';
  angular
    .module('app')
    .config(function Router($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('main');

      $stateProvider
        .state('main', {
          url: '/main',
          templateUrl: 'app/layout/shell.html',
          controller: 'ShellController'
        });
    });

})();
