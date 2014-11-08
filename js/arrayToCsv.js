(function(){

  var fs = require('fs');

  module.exports = {
    arrayToCsv: arrayToCsv
  };

  ////////////

  function arrayToCsv(twoDimensionalArray, fileName, callback) {

    var csv = '';

    for (var i = 0; i < twoDimensionalArray.length; i++) {
      csv += twoDimensionalArray[i].join(',');
      csv += '\n';
    }

    if (fileName.indexOf('.csv') !== fileName.length - 4){
      fileName = fileName + '.csv';
    }

    fs.writeFile(fileName, csv, function(err) {

      if (err){
        console.log(err);
      }
      console.log('writeFile: ', fileName, 'successful');
      callback();
    });

  }

  function csvToArray(filePath, callback){

  }

})();
