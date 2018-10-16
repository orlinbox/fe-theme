/* Files -------------------------------------------------------------------- */

var paths = {
  styles: {
    src: 'sass/styles.scss',
    watch: 'sass/**/*.scss',
    count: 'compiled/**/*.css',
    dest: 'compiled/',
  },
  scripts: {
    srcVendor: [
      'js/vendor/jquery-3.3.1.slim.min.js',
      'js/vendor/popper-1.14.3.min.js',
      'js/vendor/jquery.detect_swipe_final.js',
    ],
    srcBootstrap: [
      /* comment out the unnecessary ones */
      'js/bootstrap/util.js', /* required */
      //         'js/bootstrap/tooltip.js',
      //         'js/bootstrap/alert.js',
      //         'js/bootstrap/button.js',
      //         'js/bootstrap/carousel.js',
      //         'js/bootstrap/collapse.js',
      //         'js/bootstrap/dropdown.js',
      //         'js/bootstrap/index.js',
      //         'js/bootstrap/modal.js',
      //         'js/bootstrap/popover.js',
      //         'js/bootstrap/scrollspy.js',
      //         'js/bootstrap/tab.js',
    ],
    srcCustom: [
      'js/custom/scripts.js',
    ],
    watchVendor: 'js/vendor/**/*.js',
    watchBootstrap: 'js/bootstrap/**/*.js',
    watchCustom: [
      'gulpfile.js',
      'js/custom/**/*.js',
    ],
    lint: [
      'gulpfile.js',
      'js/custom/**/*.js',
    ],
    dest: 'compiled/',
  }
};

/* Includes ----------------------------------------------------------------- */

var fs = require('fs');
var respath = require('path');
var gulp = require('gulp');
var color = require('colors');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
var gulp_css_count = require('gulp-css-count');
var uglify = require('gulp-uglify');

/* Styles ------------------------------------------------------------------- */

function styles() {
  var onError = function(err) { notify.onError({title: "SASS"})(err); this.emit('end'); };
  return gulp.src(paths.styles.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})) /* compressed / expanded */
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}

function stylesCount() {
  return gulp.src(paths.styles.count)
    .pipe(gulp_css_count());
}

/* Scripts */

function scriptsVendor() {
  var file = 'vendor.js';
  return gulp.src(paths.scripts.srcVendor)
    .pipe(concat({path: file}))
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}, mangle: false})) /* comment this line to skip minification */
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', function() { logInfo(file); });
}

function scriptsBootstrap() {
  var file = 'bootstrap.js';
  return gulp.src(paths.scripts.srcBootstrap)
    .pipe(concat({path: file}))
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}, mangle: false})) /* comment this line to skip minification */
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', function() { logInfo(file); });
}

function scriptsCustom() {
  var file = 'custom.js';
  return gulp.src(paths.scripts.srcCustom)
    .pipe(concat({path: file}))
    .pipe(uglify({output: {comments: /^!|@preserve|@license|@cc_on/i}, mangle: false})) /* comment this line to skip minification */
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', function() { logInfo(file); });
}

function scriptsLint() {
  var onError = function(err) { notify.onError({title: "JS"})(err); this.emit('end'); };
  return gulp.src(paths.scripts.lint)
    .pipe(plumber({errorHandler: onError}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
}

/* Helpers */

function logInfo(file) {
  var path = paths.scripts.dest + file;
  var absolutePath = respath.resolve(path);
  var stats = fs.statSync(path);
  console.log('\n' + color.cyan(absolutePath) + ' ' +  color.yellow((stats.size/1000).toFixed(2) +' kB'));
}

var scripts = gulp.parallel(scriptsVendor, scriptsBootstrap, scriptsCustom);
var buildStyles = gulp.series(styles, stylesCount);
var buildScripts = gulp.series(scriptsLint, scripts);
var build = gulp.parallel(buildScripts, buildStyles);

function watchNow() {
  gulp.watch(paths.styles.watch, buildStyles);
  gulp.watch(paths.scripts.watchVendor, scriptsVendor);
  gulp.watch(paths.scripts.watchBootstrap, scriptsBootstrap);
  gulp.watch(paths.scripts.watchCustom, scriptsCustom);
}

gulp.task('watch', gulp.parallel(build, watchNow));
gulp.task('default', build);
