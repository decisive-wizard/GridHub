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
          var workbook = new Workbook(dataObj, {grid: true});
          renderSheet(workbook, 1);
        });
      }
    },true);

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          currentWorkbook.data.win.title = 'GridHub - ' + filePath;
          gridFileFormatConverter.openGridFile($scope, filePath, function(){
            gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
              var workbook = new Workbook(dataObj, {grid: true});
              renderSheet(workbook, 1);
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
            gridFileFormatConverter.xlsxToGrid($scope, filePath, function() {
              bootbox.hideAll();
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
