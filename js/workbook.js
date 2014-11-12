
var Workbook = function(dataObj,options){
  if (arguments.length === 0){
    // blank workbook with blank worksheets
    this[1] = new Worksheet(null,{sheetName:"Sheet1"});
    this[2] = new Worksheet(null,{sheetName:"Sheet2"});
    this[3] = new Worksheet(null,{sheetName:"Sheet3"});
  } else if (options.csv) {
    this[1] = new Worksheet(dataObj,{csv:true,sheetName:"Sheet1"});
  } else if (options.xlsx){
    // loop through sheets
    for (var key in dataObj){
      this[key] = new Worksheet(dataObj[key],{xlsx:true});
    }
  }
};

