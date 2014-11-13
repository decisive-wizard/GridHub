var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
  gulp.src('./assets/css/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('build', ['stylus']);

gulp.task('watch', function(){
  gulp.watch('./assets/css/**/*.styl', ['stylus']);
});

gulp.task('default', ['build', 'watch']);
