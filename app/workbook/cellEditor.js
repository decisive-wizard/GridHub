var cellEditor = Handsontable.editors.TextEditor.prototype.extend();

// load the initial value in the editor field
cellEditor.prototype.setValue = function(cellObj){
  this.cellObj = cellObj;
  this.TEXTAREA.value = cellObj.formula ? cellObj.formula : cellObj.value;
};

// retrieve what the user has entered
cellEditor.prototype.getValue = function(){
  // .trim() is extended onto String inside Handsontable
  var str = String.prototype.trim.call(this.TEXTAREA.value);
  if (str && str[0] === '='){
    this.cellObj.formula = str;
  } else {
    this.cellObj.value = str;
  }
  return this.cellObj;
};

