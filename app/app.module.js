(function() {
  'use strict';
  angular
    .module('app', [
      'app.layout',
      'app.widgets',
      'app.utils',
      'ui.router'
    ]).run(function($state) {
      $state.go('main');
    });
})();