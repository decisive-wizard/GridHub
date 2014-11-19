(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('snapshotsController', Ctrl);

  Ctrl.$inject = ['$scope', 'currentWorkbook'];

  /* @ngInject */
  function Ctrl($scope, currentWorkbook) {
    /*jshint validthis: true */

    $scope.commits = currentWorkbook.data.gitCommits;

    //Tied with each li item being rendered by the ng-repeat on snapshots.html
    $scope.changeCommit = function(commitIndex){
      console.log('current hash was',currentWorkbook.currentHash);
      currentWorkbook.currentHash = $scope.commits[commitIndex];
      console.log('Now it is ',currentWorkbook.currentHash);
    };

    $scope.$watchCollection(function(){
      return currentWorkbook.data;
    }, function(newVal, oldVal, scope){
      console.log('im updating in $watchCollection', scope.commits);
      if (typeof newVal !== 'undefined'){
        scope.commits = newVal.gitCommits;
      }
    });

    $scope.$on('git-commits-change', function(){
      $scope.$digest();
    });

  }
})();
