(function() {
  'use strict';

  angular
    .module('app.utils')
    .controller('syncRibbonController', Ctrl);

	Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter','socket','$http'];

  function Ctrl($scope, currentWorkbook,gridFileFormatConverter,socket,$http) {
    $scope.takeSnapshot = takeSnapshot;
    $scope.upload = upload;
    $scope.mytime = 'Still waiting';

    socket.on('send:time', function (data) {
      console.log(data);
      $scope.mytime = data.time;
    });
    socket.on('send:name', function (data) {
      console.log(data);
      $scope.mytime = data.time;
    });

    function takeSnapshot(){
      console.log(currentWorkbook);
      console.log(currentWorkbook.data.tempFolderPath, 'temp folder path');
      gridFileFormatConverter.gridify(currentWorkbook.data.tempFolderPath, currentWorkbook.currentInstance, function(){
      	gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
      });
    }

    function upload(){
      console.log('blah');
      $http.get('http://10.8.32.239:3000/').success(function(data){
        console.log(JSON.stringify(data));
      });
      console.log('end');
      // $scope.mytime  = 'Now';
      // console.log('Uploading');
      // socket.emit('init',function(data){
      //   console.log(data);
      //   alert(data);
      // })
    }

    $scope.$on('git-commits-change', function(){
      $scope.$digest();
    });
  }
})();
