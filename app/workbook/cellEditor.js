var cellEditor = Handsontable.editors.TextEditor.prototype.extend();

// load the initial value in the editor field
cellEditor.prototype.setValue = function(cellObj){
  this.cellObj = cellObj;
  this.TEXTAREA.value = cellObj.value;
};
// retrieve what the user has entered
cellEditor.prototype.getValue = function(){
  this.cellObj.value = this.TEXTAREA.value;
  return this.cellObj;
};

