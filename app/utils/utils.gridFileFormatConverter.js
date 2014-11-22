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
  var parsexcel = require('parsexcel.js');
  var Promise = require('bluebird');
  var archiver = require('archiver');
  var gitStatus = Promise.promisify(gift.status,gift);
  var commit = Promise.promisify(gift.commit,gift);
  var commitHistory = Promise.promisify(gift.getHistory,gift);
  var checkOut = Promise.promisify(gift.checkout,gift);

  function gridFileFormatConverter(currentWorkbook){
    var service = {
      parseGrid : parseGrid,
      gridify   : gridify,
      openGridFile: openGridFile,
      xlsxToGrid: xlsxToGrid,
      changeToCommit:changeToCommit,
      takeSnapshot:takeSnapshot
    };

    return service;

    ///////////////////////////////////

    function openGridFile(scope, filePath, cb) {
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
          currentWorkbook.currentHash = commits[0];
          scope.$broadcast('git-commits-change');

          // cleanup temp files
          ncp(unzippedFolderPath, hiddenFolderPath, function(err){
            if (err) {
              return console.error(err);
            }

            rimraf(unzippedFolderPath, function(err){
              cb();
              if (err) throw err;
            });
          });

        });
      });
    }

    function xlsxToGrid(scope, filePath, cb) {
      // $("#activate-modal").leanModal();

      parsexcel(filePath, function(err, parsexcelOutput) {
        if (err) {console.log(err); };

        bootbox.hideAll();
        bootbox.dialog({
          title: 'Folder Select',
          message: 'Please select the folder where you want to save the .grid file'
        });

        setTimeout(function() {
          chooseFile('#folderDialog', function(directoryPath) {

            var importedWorkbook = new Workbook(parsexcelOutput, {xlsx: true});
            var hiddenFolderName = filePath.split('/').pop().replace('.xlsx', '');
            var hiddenFolderPath = path.join(directoryPath, '.' + hiddenFolderName);

            gridify(hiddenFolderPath, importedWorkbook, function() {
              gift.init(hiddenFolderPath, function(err, _repo){
                gift.add(hiddenFolderPath, '.', function(){
                  commit(hiddenFolderPath, 'Initial commit')
                    .then(function(commitStatus){
                    gift.getHistory(hiddenFolderPath,function(commits,err){
                      currentWorkbook.data.gitCommits = commits;
                      currentWorkbook.currentHash = commits[0];
                      renderSheet(importedWorkbook, 1);
                      scope.$apply(function(){
                          scope.$broadcast('git-commits-change');
                      });

                      // zip up to .grid using archiver
                      var output = fs.createWriteStream(path.join(directoryPath, hiddenFolderName + '.grid'));
                      var archive = archiver('zip');
                      output.on('close', function() { /* done zipping */ });
                      archive.on('error', function(err) { throw err });
                      archive.pipe(output);
                      archive.bulk([
                        { expand: true, cwd: hiddenFolderPath, src: ['**/*'] }
                      ]).finalize();
                    });
                  });
                });
              });
            });
          });
        }, 3000);
      });
    
    }

    function parseGrid(folderPath, cb) {
      var dataObj = {};

      var readDirPromised = function(directoryPath){
        return new Promise(function(resolve,reject){
          fs.readdir(directoryPath,function(err,files){
            if (err) reject(err);
            resolve(files);
          });
        })
      };

      // first get all of sheets in the csv folder
      readDirPromised(path.join(folderPath, '/csv'))
        // iterate through each folder, ignore hidden stuff
        .filter(function(folderOrFileName){
          return folderOrFileName[0] !== '.'
        })
        // transform each file into grid data
        .map(function(folderOrFileName){

          var sheetFolderPath = path.join(folderPath, 'csv/' + folderOrFileName);
          dataObj[folderOrFileName] = {};
          dataObj[folderOrFileName]['values'] = [];
          dataObj[folderOrFileName]['formulas'] = [];
          dataObj[folderOrFileName]['styles'] = [];

          return valuesPromised().then(function(){
            return formulasPromised().then(function(){
              return;
            });
          });

          // values
          function valuesPromised(){
            return new Promise(function(resolve,reject){
              converter.csvToArray(path.join(sheetFolderPath, 'values.csv'), function(values){
                dataObj[folderOrFileName]['values'] = values;
                resolve();
              });
            });
          }

          // formulas
          function formulasPromised(){
            return new Promise(function(resolve,reject){
              converter.csvToArray(path.join(sheetFolderPath, 'formulas.csv'), function(formulas){
                dataObj[folderOrFileName]['formulas'] = formulas;
                resolve();
              });
            });
          }

        })
        .then(function(){
          fs.readFile(path.join(folderPath, 'config.json'), function(err, config){
            dataObj['meta'] = JSON.parse(config.toString()).worksheetNames;
            cb(dataObj);
          });
        });
      }

    // run callback after gridify had created the file structure
    function gridify(folderPath, workbookInstance, callback) {

      var config = {};
      config.sheetNames = {};

      var sheetNames = [];
      for (var sheetName in workbookInstance){
        sheetNames.push(sheetName);
      }

      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
        fs.mkdirSync(path.join(folderPath, 'csv/'));
      }

      async.each(sheetNames, function(sheetName, eachCallback){

        var sheetFolderPath = path.join(folderPath, 'csv/' + sheetName);
        if (!fs.existsSync(sheetFolderPath)){
          fs.mkdirSync(sheetFolderPath);
        }

        config.sheetNames[sheetName] = workbookInstance[sheetName]['sheetName'];

        var values = _.map(workbookInstance[sheetName]['data'], function(row, rowIndex){
          return _.pluck(row, 'value');
        });

        var formulas = _.map(workbookInstance[sheetName]['data'], function(row, rowIndex){
          return _.pluck(row, 'formula');
        });

        var styles = _.map(workbookInstance[sheetName]['data'], function(row, rowIndex){
          return _.pluck(row, 'style');
        });

        converter.arrayToCsv(values, path.join(sheetFolderPath, 'values.csv'), function(){
          converter.arrayToCsv(formulas, path.join(sheetFolderPath, 'formulas.csv'), function(){
            fs.writeFileSync(path.join(sheetFolderPath, 'styles.json'), JSON.stringify(styles));
            eachCallback();
          });
        });

      }, function(err){
        if (err) {throw err; };
        fs.writeFileSync(path.join(folderPath, 'config.json'), JSON.stringify(config, null, '\t'));
        callback();
      });
    }

    function changeToCommit(filePath,targetHash){
      checkOut(filePath,targetHash).then(function(){
        currentWorkbook.currentHash = targetHash;
      }).catch(function(e){
        console.log(e);
      });
    }

    function chooseFile(name, cb) {
      var chooser = $(name);
      chooser.change(function(evt) {
        cb($(this).val());
      });

      chooser.trigger('click');
    }

    //Make a commit with the current state of the files
    function takeSnapshot(scope,filePath){
      gitStatus(filePath).then(function(status,blag){
        // This checks if there is anything to be committed
        if(status.clean){
          bootbox.dialog({
            title: 'Snapshot',
            message: '<p id="modal-text">There is nothing to be committed!</p>'
          });
          
        }else{
          //Prompts the user for a commit message
          bootbox.prompt("Insert a description for your Snapshot", function(message) {                
            if(message !== null){
              gift.add(filePath, '.', function(){
                commit(filePath,message).then(function(commitStatus){
                  gift.getHistory(filePath,function(commits,err){
                    //Changes the commits stored in the currentWorkbook factory
                    currentWorkbook.data.gitCommits = commits;
                    //Setting the current Hash to be the first item in the commits array
                    currentWorkbook.currentHash = commits[0];
                    //A (less) hacky way to update the sidebar - Got the idea from the Angula Ng-click Native Implementation
                    scope.$apply(function(){
                      scope.$broadcast('git-commits-change');
                    });
                  });
                }).catch(function(e){
                  console.log('error on hist',e);
                });
              });
            }
            
          });
         }
          //Stage every files for the commit - Might change this to only add the fomulas.csv, values (...)
      }).catch(function(e){
        console.log('Inside Catch',e);
      });
    }
  }
})();
