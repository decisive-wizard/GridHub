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
        	console.log('this is the temp path',currentWorkbook.data.tempFolderPath);
        	gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
          $scope.digest();
        };

        $scope.$on('git-commits-change', function(){
          console.log('WTF');
          $scope.$digest();
        });

        activate();

        function activate() {
        }
    }
})();