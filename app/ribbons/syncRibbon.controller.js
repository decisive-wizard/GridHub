(function() {
  'use strict';

  angular
    .module('app.utils')
    .controller('syncRibbonController', Ctrl);

	Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter'];

  function Ctrl($scope, currentWorkbook, gridFileFormatConverter) {
    $scope.takeSnapshot = takeSnapshot;

    function takeSnapshot(){
      console.log(currentWorkbook);
      console.log(currentWorkbook.data.tempFolderPath, 'temp folder path');
      gridFileFormatConverter.gridify(currentWorkbook.data.tempFolderPath, currentWorkbook.currentInstance, function(){
      	gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
      });
    }

    $scope.$on('git-commits-change', function(){
      $scope.$digest();
    });
  }
})();
