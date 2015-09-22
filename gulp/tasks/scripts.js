/*
  ___         _      _      
 / __| __ _ _(_)_ __| |_ ___
 \__ \/ _| '_| | '_ \  _(_-<
 |___/\__|_| |_| .__/\__/__/
               |_|          

 Compile all CoffeeScript in the ./src/js directory, bundle it and save a
 non-minified version for the local webserver to ./public/js.

 No sourcemaps here (yet).

*/

var browserify = require('browserify'),
    gulp = require('gulp'),
    handleErrors = require('../util/handleErrors'),
    source = require('vinyl-source-stream');

gulp.task('scripts', function() {
  return browserify({
      entries: ['./src/js/app.js'],
      extensions: ['.js']
    })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/js'));
});
