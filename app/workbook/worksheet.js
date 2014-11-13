var converter = require('./app/arrayToCsv.js');

function generateBlankSheet(height, width) {
  var newSheet = [];
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      row.push(" ");
    }
    newSheet.push(row);
  }
  return newSheet;
}

var Worksheet = function(dataObj,options){
  if (arguments[0] === null){
    // blank worksheet
    this.data = generateBlankSheet(30,30);
    this.sheetName = options.sheetName;
  } else if (options.csv) {
    this.data = dataObj;
    this.sheetName = options.sheetName;
  } else if (options.xlsx) {
    this.data = dataObj.data
      .map(function(row,k,c){
        // map each row of cells to the correct cell property
        return row.map(function(cell,subKey,subRow){
          if (typeof cell !== 'string'){
            return cell.formula ? '='+cell.formula : cell.value;
          } else {
            return cell;
          }
        });
      });
    this.sheetName = dataObj.sheetName;
  }

  // all worksheets will have these properties
  this.rowHeaders = true;
  this.colHeaders = true;
  this.stretchH = 'last';
  this.minSpareRows = 1;
  this.contextMenu = true;
  this.outsideClickDeselects = false;
  this.formulas = true;
  this.comments = true;
  this.renderer = cellRenderer;
};

function writeFileCallback() {
  // console.log('file successfully saved');
};

Worksheet.prototype.afterChange = function(changes, source){
  // cell value has changed
  // continually save files
  // var currentDir = process.env.PWD;
  // var data = this.getData();
  // if (metaData.filePath !== undefined){
  //   converter.arrayToCsv(data, metaData.filePath, writeFileCallback);
  // }
};

Worksheet.prototype.afterSelection = function(r, c, r2, c2){
  // r = selection start row
  // c = selection start column
  // r2 = selection end row
  // c2 = selection end column
  // note: only show function or value for a single cell
  if (r === r2 && c === c2){
    $('.formula-input').val(this.getDataAtCell(r, c));
  } else {
    $('.formula-input').val('');
  }
};
