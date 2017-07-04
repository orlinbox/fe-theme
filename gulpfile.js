// Define JavaScript files for aggregation
var js_files_concat = [
	'javascript/vendor/jquery-3.2.1.min.js',
	'javascript/vendor/jquery.detect_swipe.js',
	'javascript/custom/custom.js',
];

// Define JavaScript files for lint
var js_files_lint = [
	'./gulpfile.js',
	'javascript/custom/**/*.js',
];

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
var gulp_css_count = require('gulp-css-count');

gulp.task('jshint', function() {
	var onError = function(err) {
		notify.onError({title: "JS"})(err);
		this.emit('end');
	};
	return gulp.src(js_files_lint)
		.pipe(plumber({errorHandler: onError}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

gulp.task('sass', function() {
	var onError = function(err) {
		notify.onError({title: "SASS"})(err);
		this.emit('end');
	};
	return gulp.src('./sass/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('./css_js'))
		.pipe(gulp_css_count());
});

gulp.task('concat', function(cb) {
	return gulp.src(js_files_concat)
		.pipe(concat({path: 'scripts.js'}))
		.pipe(gulp.dest('./css_js'));
});

gulp.task('watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch(js_files_lint, ['jshint']);
	gulp.watch(js_files_concat, ['concat']);
});

gulp.task('default', function() {
	gulp.start('sass', 'jshint', 'concat');
});
