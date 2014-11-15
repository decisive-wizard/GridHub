var cellEditor = Handsontable.editors.TextEditor.prototype.extend();

// load the initial value in the editor field
cellEditor.prototype.setValue = function(cellObj){
  this.cellObj = cellObj;
  this.TEXTAREA.value = cellObj.value;
};

// retrieve what the user has entered
cellEditor.prototype.getValue = function(){
  // .trim() is extended onto String inside Handsontable
  this.cellObj.value = String.prototype.trim.call(this.TEXTAREA.value);
  return this.cellObj;
};

