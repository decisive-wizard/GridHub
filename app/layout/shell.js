(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = [
    '$scope',
    'currentWorkbook',
    'gridFileFormatConverter'
  ];

  var gridRegex = /\.grid$/;
  var xlsxRegex = /\.xlsx$/;

  function ShellController ($scope, currentWorkbook, gridFileFormatConverter){

    $scope.currentWorkbook = currentWorkbook;

    // Funtions:
    $scope.openRepository = openRepository;
    $scope.importXLSX = importXLSX;

   $scope.$watchCollection(function(){
      return currentWorkbook.currentHash;
    }, function(newVal, oldVal, scope){
      if (typeof newVal !== 'undefined'){
        gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
          setTimeout(function(){
            var workbook = new Workbook(dataObj, {grid: true});
            renderSheet(workbook, 1);
          }, 100)
        });
      }
    },true);

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          currentWorkbook.data.win.title = 'GridHub - ' + filePath;
          gridFileFormatConverter.openGridFile($scope, filePath, function(){
            console.log('this is how I did it before',$scope.currentWorkbook.data.tempFolderPath);
            gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
              setTimeout(function(){
                var workbook = new Workbook(dataObj, {grid: true});
                renderSheet(workbook, 1);
              }, 100)
            });
          });
        } else {
          console.error('is not a .grid file');
        }
      });
    }


    function importXLSX() {
      chooseFile('#fileDialog', function(filePath) {

        if (filePath.match(xlsxRegex)) {

          gridFileFormatConverter.xlsxToGrid($scope, filePath, function() {
            
            console.log('yoloswag');
          });

        } else {
          console.log('this is not a .xlsx file');
        }

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
