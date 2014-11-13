(function(){

  var fs = require('fs');
  var csv = require('csv');

  // promisify all of the things!
  var Promise = require('bluebird');
  var readFile = Promise.promisify(fs.readFile);
  var writeFile = Promise.promisify(fs.writeFile);
  var stringifyCsv = Promise.promisify(csv.stringify);
  var parseCsv = Promise.promisify(csv.parse);

  module.exports = {
    arrayToCsv: arrayToCsv,
    csvToArray: csvToArray
  };

  ////////////

  function arrayToCsv(twoDimensionalArray, fileName, callback) {
    stringifyCsv(twoDimensionalArray).then(function(output){
        return writeFile(fileName, output);
      }).then(function(){
        return callback();
      }).catch(function(e){
        console.log('there was an error', e);
      });
  }

  function csvToArray(filePath, callback){
    readFile(filePath).then(function(data){
      return parseCsv(data.toString());
    }).then(function(output){
      return callback(output);
    }).catch(function(e){
      console.log('there was an error', e);
    });
  }

})();
