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

  function ShellController ($scope, currentWorkbook, gridFileFormatConverter){

    $scope.currentWorkbook = currentWorkbook;
    $scope.openRepository = openRepository;

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          currentWorkbook.data.win.title = 'GridHub - ' + filePath;
          gridFileFormatConverter.openGridFile($scope, filePath, function(){
            // now let's parse the grid
            gridFileFormatConverter.parseGrid($scope.currentWorkbook.data.tempFolderPath, function(dataObj){
              console.log('successfully in the parseGrid callback', dataObj);
              var workbook = new Workbook(dataObj, {grid: true});
              renderSheet(workbook, 1);
            });
          });
        } else {
          console.error('is not a .grid file');
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
