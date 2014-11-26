(function() {
  'use strict';

  angular
    .module('app.utils')
    .controller('syncRibbonController', Ctrl);

	Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter','$http'];

  function Ctrl($scope, currentWorkbook,gridFileFormatConverter,socket,$http) {
    $scope.takeSnapshot = takeSnapshot;
    $scope.upload = upload;
    $scope.mytime = 'Still waiting';
    $scope.getLink = function(){
      return currentWorkbook.data.tempFolderPath;
    };


    function takeSnapshot(){
      console.log(currentWorkbook);
      console.log(currentWorkbook.data.tempFolderPath, 'temp folder path');
      gridFileFormatConverter.gridify(currentWorkbook.data.tempFolderPath, currentWorkbook.currentInstance, function(){
      	gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
      });
    }

    function upload(repoPath){

      var formData = new FormData();
      formData.append('file',repoPath);

      $http.post({
        method:'POST',
        url:'http://10.8.32.239:3000/upload',
        'Content-Type': 'multipart/form-data',
        data:formData,
        transformRequest: formDataObject

      }).success(function(data){
        console.log(JSON.stringify(data));
      });
      
     
    }

    $scope.$on('git-commits-change', function(){
      $scope.$digest();
    });
  }
})();
