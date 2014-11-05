(function(){
  
  // var fs = require('fs');

  module.exports = {
    arrayToCsv: arrayToCsv
  };
  
  ////////////

  function arrayToCsv(twoDimensionalArray, fileName) {

    var csv = "";

    for (var i = 0; i < twoDimensionalArray.length; i++) {
      csv += twoDimensionalArray[i].join(",");
      csv += "\n";
    }

    console.log(csv);
    fileName = fileName + '.csv';

    fs.writeFile(fileName, csv, function(err) {

      if (err){
        console.log(err);
      }

      console.log('writeFile: ', fileName, 'successful');
    });

  }

})();