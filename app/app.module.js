(function() {
  'use strict';
  angular
    .module('app', [
      'app.layout',
      'app.widgets',
      'ui.router'
    ]).run(function($state) {
      $state.go('main');
    });
})();