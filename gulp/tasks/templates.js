/*
  _____               _      _          
 |_   _|__ _ __  _ __| |__ _| |_ ___ ___
   | |/ -_) '  \| '_ \ / _` |  _/ -_|_-<
   |_|\___|_|_|_| .__/_\__,_|\__\___/__/
                |_|                     

 Compile all ECO in the ./src/coffee/templates directory, and save a
 non-minified version for the local webserver to ./public/js.

 We prefer ECO for now as it supports CoffeeScript syntax.

*/

var gulp = require('gulp'),
    eco = require('gulp-eco'),
    concat = require('gulp-concat');

gulp.task('templates', function () {
  return gulp.src('src/coffee/templates/**/*.eco')
    .pipe(eco())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/js/'));
});