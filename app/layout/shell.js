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

    var gift = require('./app/git/git');
    var fs = require('fs');
    var path = require('path');
    var AdmZip = require('adm-zip');

    function ShellController ($scope, currentWorkbook, gridFileFormatConverter){

      $scope.currentWorkbook = currentWorkbook;
      $scope.openRepository = openRepository;

      function openRepository() {
        // console.log('Opened Repository');
        chooseFile('#fileDialog', function(filePath){
          console.log(filePath);
          var gridRegex = /\.grid$/;
          if (filePath.match(gridRegex)) {
            $scope.currentWorkbook.data.filePath = filePath;
            $scope.currentWorkbook.data.currentSheet = '1';
            // this is not going to work right now, need to give gift a path to
            // the .git directory
            // so we have to unzip the .grid file first
            // and then navigate to that place
            var zipFilePath = filePath.replace('.grid', '.zip');
            var splitFilePath = filePath.split('/');
            var unzippedFolderPath = '/' +
              splitFilePath.slice(0, splitFilePath.length - 1).join('/');

            var rs = fs.createReadStream(filePath);
            var ws = fs.createWriteStream(zipFilePath);
            ws.on('close', function(){
              var zip = new AdmZip(zipFilePath);
              zip.extractAllTo(unzippedFolderPath);
              console.log(filePath.replace('.grid', '/.git'))
              gift.getHistory(filePath.replace('.grid', '/.git'), function(commits){
                $scope.currentWorkbook.data.gitCommits = commits;
                // console.log('added git commit history');
                // console.log($scope.currentWorkbook.data);
              });
            });
            rs.pipe(ws);
          } else {
            console.log('is not a .grid file');
          }

          console.log($scope.currentWorkbook);
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
