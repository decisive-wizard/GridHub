(function() {
  'use strict';
  angular
    .module('app', [
      'app.layout',
      'app.widgets',
      'app.utils',
      'ui.router'
      
    ]).
    config(['$httpProvider', function($httpProvider) {
      
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }])
    .run(function($state,$http) {
      $state.go('main');
      $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
    });
})();
