var converter = require('./app/arrayToCsv.js');

function generateBlankSheet(height, width) {
  var newSheet = [];
  for (var i = 0; i < height; i++) {
    var row = [];
    for (var j = 0; j < width; j++) {
      row.push('');
    }
    newSheet.push(row);
  }
  return newSheet;
}


var Worksheet = function(dataObj,options){

  // load a blank worksheet when invoked with no arguments
  if (arguments[0] === null){
    this.sheetName = options.sheetName;
    this.data = simpleValuesToGridFormat(generateBlankSheet(3,3));

  // convert csv file to the .grid data structure
  // this.data is the matrix that goes to .grid eventually
  } else if (options.csv) {
    this.sheetName = options.sheetName;
    this.data = simpleValuesToGridFormat(dataObj);

  // convert parsed xslx file to the .grid data structure
  // this.data is the matrix that goes to .grid eventually
  } else if (options.xlsx) {
    this.sheetName = dataObj.sheetName;
    this.data = xlsxToGridFormat(dataObj.data);

  // render the already .grid data
  } else if (options.grid) {
    this.data = gridToGridFormat(dataObj);
    this.sheetName = options.sheetName;
  }

  // all worksheets will have these properties
  this.rowHeaders = true;
  this.colHeaders = true;
  this.stretchH = 'last';
  this.minSpareRows = 0;
  this.contextMenu = true;
  this.outsideClickDeselects = false;
  this.formulas = true;
  this.comments = true;
  this.wordWrap = false;
  this.renderer = cellRenderer;
  this.editor = cellEditor;
};


function simpleValuesToGridFormat(dataArrOfArr){
  return dataArrOfArr
    .map(function(row,k,c){
    // map each row of simple values to our grid 
    // representation of the cell
    return row.map(function(value,subKey,subRow){
      return new BlankCell();
    });
  });
}

function xlsxToGridFormat(dataArrOfArrOfObj){
  return dataArrOfArrOfObj
    .map(function(row,k,c){
      // map each row of xslx cells to our grid
      // representation of the cell
      return row.map(function(cell,subKey,subRow){
        var gridCell = {};
        if (typeof cell !== 'string' && cell !== null){
          gridCell.style = new XlsxStyleImport(cell.style);
          gridCell.value = (cell.formula === "") ? cell.value : "";
          gridCell.formula = cell.formula;
        } else {
          gridCell.style = new BaseStyle();
          gridCell.value = "";
          gridCell.formula = "";
        }
        return gridCell;
      });
    });
}

function gridToGridFormat(dataObj){
  // zip up three "array of arrays" into ONE "array of arrays of objects"
  var values = dataObj.values; // array of arrays
  var formulas = dataObj.formulas; // array of arrays
  var styles = dataObj.styles; // array of arrays
  // iterate the value rows and map to a new array of rows
  return values
    .map(function(row,rowIndex){
      // zip each corresponding row array from values, formulas, styles
      return _.zip(values[rowIndex], formulas[rowIndex], styles[rowIndex])
        // map each zipped tuple to a cell object
        .map(function(cell,cellIndex,row){
          return {
            style: cell[2],
            formula: cell[1],
            value: cell[0]
          };
        }); 
    });
}



function writeFileCallback() {
  // console.log('file successfully saved');
}

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
