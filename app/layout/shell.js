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
  var extract = require('extract-zip');
  var ncp = require('ncp').ncp;
  var rimraf = require('rimraf');
  var gridRegex = /\.grid$/;

  function ShellController ($scope, currentWorkbook, gridFileFormatConverter){

    $scope.currentWorkbook = currentWorkbook;
    $scope.openRepository = openRepository;

    function openRepository() {
      chooseFile('#fileDialog', function(filePath){
        if (filePath.match(gridRegex)) {
          $scope.currentWorkbook.data.gridFilePath = filePath;
          $scope.currentWorkbook.data.currentSheet = '1';

          // file paths
          var splitFilePath = filePath.split('/');
          var parentDirectory = '/' +
            splitFilePath.slice(0, splitFilePath.length - 1).join('/');
          var gitFolderPath = filePath.replace('.grid', '/.git');
          var unzippedFolderPath = filePath.replace('.grid', '');
          var components = filePath.replace('.grid', '').split('/');
          var hiddenFolderPath = components.slice(0, components.length - 1).join('/') +
            '/.' + components[components.length - 1];

          $scope.currentWorkbook.data.tempFolderPath = hiddenFolderPath;

          extract(filePath, { dir: parentDirectory }, function(err){
            gift.getHistory(gitFolderPath, function(commits){
              $scope.currentWorkbook.data.gitCommits = commits;
              console.log($scope.currentWorkbook.data);

              // cleanup
              // move contents to hidden folder
              ncp(unzippedFolderPath, hiddenFolderPath, function(err){
                if (err) {
                  return console.error(err);
                }
                console.log('done!');
                
                // delete the visible unzipped folder
                rimraf(unzippedFolderPath, function(err){
                  if (err) throw err;
                });
              });

            });
          });
        } else {
          console.error('is not a .grid file');
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
