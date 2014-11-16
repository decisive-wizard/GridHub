(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

    ShellController.$inject = ['$scope', 'currentWorkbook'];

    function ShellController ($scope, currentWorkbook) {

      $scope.currentWorkbook = currentWorkbook;
      $scope.openRepository = openRepository;


      function openRepository() {
        // console.log('Opened Repository');
        chooseFile('#fileDialog', function(filePath){
          console.log(filePath);
          var gridRegex = /\.grid$/;
          if (filePath.match(gridRegex)) {
            $scope.currentWorkbook.data.filePath = filePath;
            $scope.currentWorkbook.data.currentSheet = '1';
            //TODO: set initial commit hash
          } else {
            console.log('is not a .grid file');
          }

          console.log($scope.currentWorkbook);
        });
      }

      function chooseFile(name, cb) {
        var chooser = $(name);
        chooser.change(function(evt) {
          cb($(this).val());
        });

        chooser.trigger('click');
      }

    }

})();
