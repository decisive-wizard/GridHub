(function(){

  var fs = require('fs');

  module.exports = {
    arrayToCsv: arrayToCsv,
    csvToArray: csvToArray
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

    fs.readFile(filePath, function(err, data){
      if (err) throw err;

      var rows = data.toString().split('\n');
      for (var i = 0; i < rows.length; i++){
        rows[i] = rows[i].split(',');
      }

      callback(rows);

    });

  }

})();
