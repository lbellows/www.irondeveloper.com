var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');


// Default task
gulp.task('default', ['dev']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });
});

// Dev task
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('./public/**/*', browserSync.reload);
});
