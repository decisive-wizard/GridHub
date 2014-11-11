
var Workbook = function(dataObj,options){
  if (arguments.length === 0){
    // blank workbook with blank worksheet
    this.sheet1 = new Worksheet();
  } else if (options.csv) {
    this.sheet1 = new Worksheet(dataObj,{csv:true});
  } else if (options.xlsx){
    // loop through sheets
    for (var key in dataObj){
      this[key] = new Worksheet(dataObj[key],{xlsx:true});
    }
  }
};

