(function() {
    'use strict';

    angular
        .module('app.utils')
        .controller('syncRibbonController', Ctrl);

	Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter'];

  /* @ngInject */
  function Ctrl($scope, currentWorkbook,gridFileFormatConverter) {
        /*jshint validthis: true */
         $scope.takeSnapshot = takeSnapshot;
         
         function takeSnapshot(){ 	
        	gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
        }
        
        $scope.$on('git-commits-change', function(){
          $scope.$digest();
        });

        activate();

        function activate() {
        }
    }
})();