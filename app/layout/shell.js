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

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          currentWorkbook.data.win.title = 'GridHub - ' + filePath;
          gridFileFormatConverter.openGridFile($scope, filePath, function(){
            // now let's parse the grid
            gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
              // console.log('successfully in the parseGrid callback', dataObj);
              console.log('IN THE PARSE GRID CALLBACK');
              console.log(dataObj, 'data obj in open repo');
              console.log(dataObj['1'].values);
              setTimeout(function(){
                var workbook = new Workbook(dataObj, {grid: true});
                renderSheet(workbook, 1);
              }, 100)
              // console.log($('#spreadsheet').handsontable('getData'));
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
          console.log(filePath);
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
