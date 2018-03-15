var gulp = require('gulp');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var scss = require('gulp-scss');
//var fs = require('fs');

function version(){
  var now = new Date(),
    Y = now.getFullYear(),
    m = now.getMonth()+1,
    d = now.getDate(),
    H = now.getHours(),
    i = now.getMinutes(),
    s = now.getSeconds();

    if(H < 10) {
        H = '0' + H;
    }

    if(i < 10) {
        i = '0' + i;
    }

    if(s < 10) {
        s = '0' + s;
    }

    return String(10000*Y + 100*m + d + '.' + H + i + s);
}

/*
function setVersion(type) {
  fs.writeFile(`./config/version.${type}.txt`, version(), function(err) {
    if(err) {
        return console.log(err);
    }
  });
}
*/

gulp.task('default', ['watch']);

gulp.task('build-css', function(){
  var full = gulp.src([
    'node_modules/normalize.css/normalize.css',
    'src/scss/main.scss'
  ])
  . pipe(scss())
  . pipe(concat('main.css'))
  . pipe(gulp.dest('dist/css'));

  var min = gulp.src([
    'node_modules/normalize.css/normalize.css',
    'src/scss/main.scss'
  ])
  . pipe(scss())
  . pipe(cleanCSS())
  . pipe(concat('main.min.css'))
  . pipe(gulp.dest('dist/css'));


  //setVersion('css');

  return merge(full, min);
});

gulp.task('build-js', function() {
  var full = gulp.src([
    'src/js/main.js',

  ])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/js'));

  var min = gulp.src([
    'src/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));

  //setVersion('js');

  return merge(full, min);
});

gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss', ['build-css']);
  gulp.watch('./src/js/**/*.js', ['build-js']);
});
