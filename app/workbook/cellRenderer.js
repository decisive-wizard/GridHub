
var cellRenderer = function (instance, TD, row, col, prop, value, cellProperties) {

  Handsontable.renderers.cellDecorator.apply(this, arguments);

  if (!value && cellProperties.placeholder) {
    value = cellProperties.placeholder;
  }

  var escaped = Handsontable.helper.stringify(value);

  if (cellProperties.rendererTemplate) {
    Handsontable.Dom.empty(TD);
    var TEMPLATE = document.createElement('TEMPLATE');
    TEMPLATE.setAttribute('bind', '{{}}');
    TEMPLATE.innerHTML = cellProperties.rendererTemplate;
    HTMLTemplateElement.decorate(TEMPLATE);
    TEMPLATE.model = instance.getSourceDataAtRow(row);
    TD.appendChild(TEMPLATE);
  }
  else {
    Handsontable.Dom.fastInnerText(TD, escaped);
  }

};

