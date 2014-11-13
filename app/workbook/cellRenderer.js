
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

  addStyles(TD,valueObj);
  var cellText = viewSelectProperty(valueObj);

  // escape and select the property value to be displayed in the cell view to be displayed
  var escaped = Handsontable.helper.stringify(cellText);

  Handsontable.Dom.fastInnerText(TD, escaped);

};

function addStyles(TD,valueObj){

}

function viewSelectProperty(valueObj){
 if (typeof valueObj === 'string'){
  return valueObj;
 }

}

