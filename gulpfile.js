var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
  gulp.src('./css/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function(){
  gulp.watch('./css/**/*.styl', ['stylus']);
});

gulp.task('default', ['stylus','watch']);
