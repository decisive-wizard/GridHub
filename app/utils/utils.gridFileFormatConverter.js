(function(){
  'use strict';

  angular
    .module('app.utils')
    .factory('gridFileFormatConverter', gridFileFormatConverter);

  gridFileFormatConverter.$inject = [
    'currentWorkbook'
  ];

  var gift = require('./app/git/git');
  var fs = require('fs');
  var path = require('path');
  var extract = require('extract-zip');
  var ncp = require('ncp').ncp;
  var rimraf = require('rimraf');
  var converter = require('./app/arrayToCsv');
  var async = require('async');

  function gridFileFormatConverter(currentWorkbook){
    var service = {
      parseGrid : parseGrid,
      gridify   : gridify,
      openGridFile: openGridFile,
      changeToCommit:changeToCommit
    };

    return service;

    ///////////////////////////////////

    function openGridFile(scope, filePath, cb) {
      console.log('opening grid file from the converter', filePath);
      // console.log(currentWorkbook.data);

      currentWorkbook.data.gridFilePath = filePath;
      currentWorkbook.data.currentSheet = '1';

      // file paths
      var splitFilePath = filePath.split('/');
      var parentDirectory = '/' +
        splitFilePath.slice(0, splitFilePath.length - 1).join('/');
      var gitFolderPath = filePath.replace('.grid', '/.git');
      var unzippedFolderPath = filePath.replace('.grid', '');
      var components = filePath.replace('.grid', '').split('/');
      var hiddenFolderPath = components.slice(0, components.length - 1).join('/') +
        '/.' + components[components.length - 1];

      currentWorkbook.data.tempFolderPath = hiddenFolderPath;

      extract(filePath, { dir: parentDirectory }, function(err){
        gift.getHistory(gitFolderPath, function(commits){
          currentWorkbook.data.gitCommits = commits;
          //Setting the current Hash to be the first item in the commits array
          currentWorkbook.currentHash = commits[0];
          scope.$broadcast('git-commits-change');
          console.log(currentWorkbook.data);

          // cleanup
          // move contents to hidden folder
          ncp(unzippedFolderPath, hiddenFolderPath, function(err){
            if (err) {
              return console.error(err);
            }
            console.log('done!');

            // delete the visible unzipped folder
            rimraf(unzippedFolderPath, function(err){
              cb();
              if (err) throw err;
            });
          });

        });
      });
    }

    function parseGrid(folderPath, cb) {
      var dataObj = {};
      // first get all of sheets in the csv folder
      fs.readdir(path.join(folderPath, '/csv'), function(err, files){
        if (err) throw err;

        // iterate through each folder, ignore hidden stuff
        async.each(files, function(folderOrFileName, eachCallback){
          if (folderOrFileName[0] === '.'){
            eachCallback('not a valid folder');
            return;
          }

          var sheetFolderPath = path.join(folderPath, 'csv/' + folderOrFileName);
          dataObj[folderOrFileName] = {};
          dataObj[folderOrFileName]['values'] = [];
          dataObj[folderOrFileName]['formulas'] = [];
          dataObj[folderOrFileName]['styles'] = [];

          // process contents of each sheet folder in parallel
          async.parallel([
            // values
            function(cb){
              converter.csvToArray(path.join(sheetFolderPath, 'values.csv'), function(values){
                dataObj[folderOrFileName]['values'] = values;
                cb();
              });
            },
            // formulas
            function(cb){
              converter.csvToArray(path.join(sheetFolderPath, 'formulas.csv'), function(formulas){
                dataObj[folderOrFileName]['formulas'] = formulas;
                cb();
              });
            }
          ], function(){
            // will execute when all the other functions finished
            eachCallback('all folders have been processed');
          });

        }, function(err){
          // process metadata before invoking callback
          fs.readFile(path.join(folderPath, 'config.json'), function(err, config){
            dataObj['meta'] = JSON.parse(config.toString()).worksheetNames;
            cb(dataObj);
          })
        });

      });


    }

    function gridify(gridArray) {
      // use pluck
    }

    function changeToCommit(filePath,targetHash){
      
        gift.checkout(filePath,targetHash, function(commits){
          //Setting the current Hash to be the first item in the commits array
          console.log('error checking out',err);
          currentWorkbook.currentHash = targetHash;
          scope.$broadcast('git-commits-change');
          console.log(commits);

        });
      


    }
  }
})();
