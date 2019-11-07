/* Files -------------------------------------------------------------------- */

const paths = {
  styles: {
    src: 'sass/styles.scss',
    watch: 'sass/**/*.scss',
    count: 'compiled/**/*.css',
    dest: 'compiled/',
  },
  scripts: {
    srcVendor: [
      'js/vendor/jquery-3.4.1.min.js',
      'js/vendor/jquery.detectSwipe-2.1.4.min.js',
      'js/vendor/popper-1.14.3.min.js',
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
  },
};

/* Includes ----------------------------------------------------------------- */

const fs = require('fs');
const respath = require('path');
const gulp = require('gulp');
const color = require('colors');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const sourceMaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const gulpCssCount = require('gulp-css-count');
const uglify = require('gulp-uglify');

function logInfo(file) {
  const path = paths.scripts.dest + file;
  const absolutePath = color.cyan(respath.resolve(path));
  const stats = color.yellow((fs.statSync(path).size / 1000).toFixed(2));
  const measure = color.yellow('kB');
  console.log(`\n${absolutePath} ${stats} ${measure}`);
}

/* Styles ------------------------------------------------------------------- */

function styles() {
  const onError = (err) => { notify.onError({ title: 'SASS' })(err); this.emit('end'); };
  return gulp.src(paths.styles.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' })) /* compressed / expanded */
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}

function stylesCount() {
  return gulp.src(paths.styles.count)
    .pipe(gulpCssCount());
}

/* Scripts ------------------------------------------------------------------ */

function scriptsVendor() {
  const file = 'vendor.js';
  return gulp.src(paths.scripts.srcVendor)
    .pipe(concat({ path: file }))
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', () => { logInfo(file); });
}

function scriptsBootstrap() {
  const file = 'bootstrap.js';
  return gulp.src(paths.scripts.srcBootstrap)
    .pipe(concat({ path: file }))
    .pipe(uglify({ output: { comments: /^!|@preserve|@license|@cc_on/i }, mangle: false })) /* comment this line to skip minification */
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', () => { logInfo(file); });
}

function scriptsCustom() {
  const file = 'custom.js';
  return gulp.src(paths.scripts.srcCustom)
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat({ path: file }))
    .pipe(minify({
      mangle: {
        keepClassName: true,
      },
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest))
    .on('end', () => { logInfo(file); });
}

function scriptsLint() {
  const onError = (err) => { notify.onError({ title: 'JS' })(err); this.emit('end'); };
  return gulp.src(paths.scripts.lint)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

/* Helpers ------------------------------------------------------------------ */

const scripts = gulp.parallel(scriptsVendor, scriptsBootstrap, scriptsCustom);
const buildStyles = gulp.series(styles, stylesCount);
const buildScripts = gulp.series(scriptsLint, scripts);
const build = gulp.parallel(buildScripts, buildStyles);

function watchNow() {
  gulp.watch(paths.styles.watch, buildStyles);
  gulp.watch(paths.scripts.watchVendor, scriptsVendor);
  gulp.watch(paths.scripts.watchBootstrap, scriptsBootstrap);
  gulp.watch(paths.scripts.watchCustom, scriptsCustom);
  gulp.watch(paths.scripts.watchCustom, scriptsLint);
}

gulp.task('watch', gulp.parallel(build, watchNow));
gulp.task('default', build);
