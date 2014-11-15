(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

    ShellController.$inject = ['$scope'];

    function ShellController ($scope) {


      $scope.openRepository = openRepository;


      function openRepository() {
        console.log('Opened Repository');
      }

    }

})();