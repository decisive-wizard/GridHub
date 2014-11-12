// run in browser by opening SpecRunner.html in the browser
// run in terminal with command "mocha-phantomjs test/SpecRunner.html"

var fs = require('fs');
var AdmZip = require('adm-zip');
var path = require('path');
var expect = require('chai').expect;
var exec = require('child_process').exec

describe('.shync file format', function(){

  afterEach(function(){
    // clean up files made during test
    var unzippedPath = path.join(__dirname, '/examples/compressed/sample_sheet');
    fs.exists(unzippedPath, function(exists){
      exec('rm -rf test/examples/compressed/sample_sheet', function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    });
    var renamedZipPath = path.join(__dirname, '/examples/compressed/sample_sheet.zip');
    fs.exists(renamedZipPath, function(exists){
      fs.unlink(renamedZipPath, function(err){
        if (err) throw err;
        // deleted the path of .shync renamed to .zip
      });
    });
  });

  it('.shync file should be unzipped into folder with csv and .git subfolders', function(done){
    // create copy of .shync and change extension to .zip
    var rs = fs.createReadStream(path.join(__dirname, '/examples/compressed/sample_sheet.shync'));
    var ws = fs.createWriteStream(path.join(__dirname, '/examples/compressed/sample_sheet.zip'));
    ws.on('close', function(){
      var zip = new AdmZip(path.join(__dirname, '/examples/compressed/sample_sheet.zip'));
      zip.extractAllTo(path.join(__dirname, '/examples/compressed'));
      fs.readdir(path.join(__dirname, '/examples/compressed/sample_sheet'), function(err, files){
        expect(files.length).to.be.equal(2);
        expect(files.indexOf('csv')).to.be.above(-1);
        expect(files.indexOf('.git')).to.be.above(-1);
        done();
      });
    });
    rs.pipe(ws);
  });

  xit('.shync unzipped should have a csv folder with 3 files for formulas, styles, and values', function(){

  });

  xit('should not contain values in formulas.csv', function(){

  });

  xit('should not contain formulas in values.csv', function(){

  });

});

describe('saving to new .shync files', function(){

});

describe('importing .csv and .xslx files', function(){

});

describe('git commit and logs', function(){

});
