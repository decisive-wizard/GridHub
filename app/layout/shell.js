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

    $scope.takeSnapshot = takeSnapshot;
    $scope.toggle = false;

    function takeSnapshot(){
      console.log(currentWorkbook);
      console.log(currentWorkbook.data.tempFolderPath, 'temp folder path');
      gridFileFormatConverter.gridify(currentWorkbook.data.tempFolderPath, currentWorkbook.currentInstance, function(){
        gridFileFormatConverter.takeSnapshot($scope,currentWorkbook.data.tempFolderPath);
      });
    }

    $scope.toggleSidebar = function() {
      $scope.boolChangeClass = !$scope.boolChangeClass;
    }

    $scope.currentWorkbook = currentWorkbook;

    // Funtions:
    $scope.openRepository = openRepository;
    $scope.importXLSX = importXLSX;

   $scope.$watch(function(){
      return currentWorkbook.currentHash;
    }, function(newVal, oldVal, scope){
      if (typeof newVal !== 'undefined' && typeof oldVal !== 'undefined'){
        console.log('WATCHED THE COLLECTION');
        gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
          console.log('DATA OBJ IN SHELL JS', dataObj);
          currentWorkbook.currentInstance = new Workbook(dataObj, {grid: true});
          console.log('WORKBOOK INSTANCE IN SHELL JS', JSON.stringify(currentWorkbook.currentInstance));
          console.log('CURRENT WORKBOOK INSTANCE IN SHELL JS');
          console.log(currentWorkbook.currentInstance);
          renderSheet(currentWorkbook.currentInstance, 1);
        });
      }
    });

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          currentWorkbook.data.win.title = 'GridHub - ' + filePath;
          gridFileFormatConverter.openGridFile($scope, filePath, function(){
            gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
              currentWorkbook.currentInstance = new Workbook(dataObj, {grid: true});
              renderSheet(currentWorkbook.currentInstance, 1);
            });
          });
        }
      });
    }


    function importXLSX() {
      chooseFile('#fileDialog', function(filePath) {

        bootbox.dialog({
          title: 'File Import',
          message: '<p id="modal-text">We are currently importing your .xlsx file...</p><div class="spinner"></div>'
        });
        setTimeout(function(){
          if (filePath.match(xlsxRegex)) {
            gridFileFormatConverter.xlsxToGrid($scope, filePath, function(workbook) {
              console.log('WORKBOOK IN IMPORT XLSX', JSON.stringify(Workbook));
              console.log('im back after the callback', workbook);
              bootbox.hideAll();
              currentWorkbook.currentInstance = workbook;
              renderSheet(currentWorkbook.currentInstance, 1);
            });
          }
        }, 1000);

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
