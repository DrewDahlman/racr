/*
  _____               _      _          
 |_   _|__ _ __  _ __| |__ _| |_ ___ ___
   | |/ -_) '  \| '_ \ / _` |  _/ -_|_-<
   |_|\___|_|_|_| .__/_\__,_|\__\___/__/
                |_|                     

 Compile all ECO in the ./src/views directory, and save a
 non-minified version for the local webserver to ./public/js.

 We prefer ECO for now as it supports CoffeeScript syntax.

*/

var gulp = require('gulp'),
    jst = require('gulp-jst-concat'),
    concat = require('gulp-concat');

gulp.task('templates', function () {
  return gulp.src('src/js/templates/**/*.jst')
    .pipe(jst('templates.js', {
      'renameKeys': ['^.*src/js/templates/(.*).jst$', '$1']
    }))
    .pipe(gulp.dest('./public/js'));
});