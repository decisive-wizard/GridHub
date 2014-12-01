(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('snapshotsController', Ctrl);

  Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter'];

  /* @ngInject */
  function Ctrl($scope, currentWorkbook,gridFileFormatConverter) {
    /*jshint validthis: true */

    $scope.commits = currentWorkbook.data.gitCommits;
    $scope.currentIndex = $scope.commits.length || 0;

    //Tied with each li item being rendered by the ng-repeat on snapshots.html
    $scope.changeCommit = function(commitIndex){
      currentWorkbook.currentHash = $scope.commits[commitIndex];
      $scope.currentIndex = commitIndex;
      //Does Git Checkout to the current workbook file detaching from the head to the clicked commit
      gridFileFormatConverter.changeToCommit(currentWorkbook.data.tempFolderPath,currentWorkbook.currentHash.id);
    };

    $scope.$watchCollection(function(){
      return currentWorkbook.data;
    }, function(newVal, oldVal, scope){
      if (typeof newVal !== 'undefined'){
        scope.commits = newVal.gitCommits;
      }
    },true);

    $scope.$on('git-commits-change', function(){
      $scope.$digest();
    });

  }
})();
