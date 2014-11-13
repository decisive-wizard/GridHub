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
  //Private variable to keep track of Formula JS comp.
  var invalid = false;
  if (arguments[0] === null){
    // blank worksheet
    this.data = generateBlankSheet(30,30);
    this.sheetName = options.sheetName;
  } else if (options.csv) {
    this.data = dataObj;
    this.sheetName = options.sheetName;
  } else if (options.xlsx) {
    this.invalid = false;
    this.data = dataObj.data
      .map(function(row,k,c){
        // map each row of cells to the correct cell property
        return row.map(function(cell,subKey,subRow){
          if (typeof cell !== 'string'){
            if(cell.formula){
              //Check current formular for FormulaJS comp
              if(formulaJsCompatibilityCheck(cell.formula)){
                return '=' + cell.formula;
              }else{
                //Sets invalid to true, making this a Invalid Import
                invalid = true;

              } 
            }else{
              return cell.value;
            }
          } else {
            return cell;
          }
        });
      });
    if(invalid){
      //Aborts the importing process and Resets and the generated spreadsheet              
      this.data = generateBlankSheet(30,30);
      alert('The Spreadsheet you are trying to import is not compatible to GridHub');
    }  
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


 var supportedFormulas = { 
  ABS: true,
  ACCRINT: true,
  ACOS: true,
  ACOSH: true,
  ACOTH: true,
  AND: true,
  ARABIC: true,
  ASIN: true,
  ASINH: true,
  ATAN: true,
  ATAN2: true,
  ATANH: true,
  AVEDEV: true,
  AVERAGE: true,
  AVERAGEA: true,
  AVERAGEIF: true,
  BASE: true,
  BESSELI: true,
  BESSELJ: true,
  BESSELK: true,
  BESSELY: true,
  BETADIST: true,
  BETAINV: true,
  BIN2DEC: true,
  BIN2HEX: true,
  BIN2OCT: true,
  BINOMDIST: true,
  BINOMDISTRANGE: true,
  BINOMINV: true,
  BITAND: true,
  BITLSHIFT: true,
  BITOR: true,
  BITRSHIFT: true,
  BITXOR: true,
  CEILING: true,
  CEILINGMATH: true,
  CEILINGPRECISE: true,
  CHAR: true,
  CHISQDIST: true,
  CHISQINV: true,
  CODE: true,
  COMBIN: true,
  COMBINA: true,
  COMPLEX: true,
  CONCATENATE: true,
  CONFIDENCENORM: true,
  CONFIDENCET: true,
  CONVERT: true,
  CORREL: true,
  COS: true,
  COSH: true,
  COT: true,
  COTH: true,
  COUNT: true,
  COUNTA: true,
  COUNTBLANK: true,
  COUNTIF: true,
  COUNTIFS: true,
  COUNTIN: true,
  COUNTUNIQUE: true,
  COVARIANCEP: true,
  COVARIANCES: true,
  CSC: true,
  CSCH: true,
  CUMIPMT: true,
  CUMPRINC: true,
  DATE: true,
  DATEVALUE: true,
  DAY: true,
  DAYS: true,
  DAYS360: true,
  DB: true,
  DDB: true,
  DEC2BIN: true,
  DEC2HEX: true,
  DEC2OCT: true,
  DECIMAL: true,
  DEGREES: true,
  DELTA: true,
  DEVSQ: true,
  DOLLAR: true,
  DOLLARDE: true,
  DOLLARFR: true,
  E: true,
  EDATE: true,
  EFFECT: true,
  EOMONTH: true,
  ERF: true,
  ERFC: true,
  EVEN: true,
  EXACT: true,
  EXPONDIST: true,
  FALSE: true,
  FDIST: true,
  FINV: true,
  FISHER: true,
  FISHERINV: true,
  IF: true,
  INT: true,
  ISEVEN: true,
  ISODD: true,
  LN: true,
  LOG: true,
  LOG10: true,
  MAX: true,
  MAXA: true,
  MEDIAN: true,
  MIN: true,
  MINA: true,
  MOD: true,
  NOT: true,
  ODD: true,
  OR: true,
  PI: true,
  POWER: true,
  ROUND: true,
  ROUNDDOWN: true,
  ROUNDUP: true,
  SIN: true,
  SINH: true,
  SPLIT: true,
  SQRT: true,
  SQRTPI: true,
  SUM: true,
  SUMIF: true,
  SUMIFS: true,
  SUMPRODUCT: true,
  SUMSQ: true,
  SUMX2MY2: true,
  SUMX2PY2: true,
  SUMXMY2: true,
  TAN: true,
  TANH: true,
  TRUE: true,
  TRUNC: true,
};


function formulaJsCompatibilityCheck (formula){
  console.log(formula);
  var formularRegex = /\b[A-Za-z2]+(?=\()(?![^']*'!)/g;
  var formularArr = formula.match(formularRegex);
  if(formularArr !== null){
    for(var i = 0;i < formularArr.length;i++){
      if(!(formularArr[i] in supportedFormulas)){
        return false;
      }
    }
  }
  return true;
}



