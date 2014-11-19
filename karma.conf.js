// Karma configuration
// Generated on Tue Nov 18 2014 15:25:23 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      "node_modules/requirejs/require.js",
      "node_modules/**/*.js", 
      "app/git/git.js",
      "app/arrayToCsv.js",
      "bower_components/jquery/dist/jquery.js",
      "bower_components/handsontable/dist/jquery.handsontable.full.js",
      "bower_components/bootstrap/dist/js/bootstrap.js",       
      "app/globals.js",
      "app/sheetRender.js",
      "app/activateGitSession.js",
      "app/workbook/blankcell.js",
      "app/workbook/style.js",
      "app/workbook/formulaJsCompatabilityCheck.js",
      "app/workbook/cellEditor.js",
      "app/workbook/cellRenderer.js",
      "app/workbook/worksheet.js",
      "app/workbook/workbook.js",
      "app/workbook/formulaBar.js",
      "app/importFiles.js",
      "app/navigation.js",
      "app/sheetRender.js",
      "app/app.js", 
      "bower_components/angular/angular.js",
      "bower_components/angular-ui-router/release/angular-ui-router.js",
      "app/app.module.js",
      "app/utils/utils.module.js",
      "app/services/excel.service.js",
      "app/layout/layout.module.js",
      "app/snapshots/snapshots.controller.js",
      "app/snapshots/snapshots.directive.js",
      "app/layout/shell.js",
      "app/widgets/widgets.module.js",
      "app/widgets/WidgetTabs.js",
      "app/spreadsheet/formulaBar.directive.js",
      "app/utils/utils.currentWorkbook.js",
      "app/utils/utils.gridFileFormatConverter.js",
      "app/spreadsheet/spreadsheet.directive.js",
      "app/spreadsheet/spreadsheet.controller.js",
      "app/route.config.js",
      'test/**.test.js',
    ],

    
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['NodeWebkit'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
