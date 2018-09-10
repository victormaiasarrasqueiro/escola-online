var gulp 		 = require('gulp');
var notify       = require('gulp-notify');
var eslint       = require('gulp-eslint');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var babel        = require('gulp-babel');
var react 		 = require('gulp-react');

gulp.task('jsx', function () {  

  return gulp.src('site/assets/js/fonte/*.jsx')

    .pipe(react())

    .pipe(gulp.dest('site/assets/js/comp'));

});


gulp.task('default', ['jsx']);