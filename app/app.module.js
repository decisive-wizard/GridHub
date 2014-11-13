(function() {
  'use strict';
  angular
    .module('app', [
      'app.layout',
      'ui.router'
    ]).run(function($state) {
      $state.go('main');
    });
})();