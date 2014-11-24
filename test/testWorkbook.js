
describe('handsontable changes should persist in current workbook', function(){
  it('should have equivalent worksheet cell data and handsontable cell data',function(){
    var testWorkbook = new Workbook();
    $('#spreadsheet').css('visibility','hidden');
    $('#spreadsheet').handsontable(testWorkbook[1]);
    $('#spreadsheet').handsontable('setDataAtCell',0,0,{value:"bob",formula:"",style:""});
    var handsonData = $('#spreadsheet').handsontable('getData');
    chai.expect(handsonData[0][0]).to.deep.equal(testWorkbook[1].data[0][0]);
  });
});

describe('handsontable formulas should equal excel formulas', function(){
  it('SUM(A1:D1), where A1:D1 is 1,2,3,4, should equal 10',function(){
    var testWorkbook = new Workbook();
    $('#spreadsheet').handsontable(testWorkbook[1]);
    $('#spreadsheet').handsontable('setDataAtCell',1,0,{value:"",formula:"=SUM(A1:D1)",style:""});
    $('#spreadsheet').handsontable('setDataAtCell',0,0,{value:"1",formula:"",style:""});
    $('#spreadsheet').handsontable('setDataAtCell',0,1,{value:"2",formula:"",style:""});
    $('#spreadsheet').handsontable('setDataAtCell',0,2,{value:"3",formula:"",style:""});
    $('#spreadsheet').handsontable('setDataAtCell',0,3,{value:"4",formula:"",style:""});
    chai.expect(testWorkbook[1].data[1][0].value).to.equal(10);
  });
});






