
// This render function is based on line 4892 TextRenderer from 
// handsontable.full.js. original function passes the arg 'value' 
// straight to the escaped val and then to 
// Handsontable.Dom.fastInnerText(TD,escaped). Here we are instead going to
// take a 'value' as an object and pass the correct aspects to the renderer
// rather than modify handsontable src, this gets passed to handsontable
// constructor via the Worksheet class

var cellRenderer = function (instance, TD, row, col, prop, valueObj, cellProperties) {
  Handsontable.renderers.cellDecorator.apply(this, arguments);

  if (!valueObj && cellProperties.placeholder) {
    valueObj = cellProperties.placeholder;
  }
  if (typeof valueObj !== 'string' && valueObj !== null){
    TD = addStyles(TD,valueObj.style);
  }
  var cellText = viewSelectProperty(valueObj);
  if (cellText === 'green centered and wrapped') console.dir(TD)
  // escape and select the property value to be displayed in the cell view to be displayed
  var escaped = Handsontable.helper.stringify(cellText);

  Handsontable.Dom.fastInnerText(TD, escaped);

};

// extend the cell's style to the TD html node's css styles object
function addStyles(TD,style){
  for (var key in style){
    TD.style[key] = style[key];
  }
  return TD;
}

// select what string to render in the cell
function viewSelectProperty(valueObj){
  if (typeof valueObj === 'string' || valueObj === null){
    return valueObj;
  }

  if (valueObj.formula){
    if (!formulaJsCompatibilityCheck(valueObj.formula)){
      return valueObj.formula + 'NOT SUPPORTED';
    }
  return '=' + valueObj.formula;
  }

  if (valueObj.value){
   return valueObj.value;
  }
}

