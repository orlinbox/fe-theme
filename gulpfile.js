// Define JavaScript files for aggregation
var js_files_concat = [
	'javascript/vendor/jquery-3.1.1.min.js',
	'javascript/vendor/jquery.detect_swipe.js',
	'javascript/custom/custom.js',
];

// Define JavaScript files for lint
var js_files_lint = [
	'./gulpfile.js',
	'javascript/custom/custom.js',
];

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
var gulp_grunt = require('gulp-grunt');

gulp.task('jshint', function() {
	return gulp.src(js_files_lint)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./css_js'))
		.pipe(notify('SASS done!'));
});

gulp.task('concat', function(cb) {
	return gulp.src(js_files_concat)
		.pipe(concat({path: 'scripts.js'}))
		.pipe(gulp.dest('./css_js'));
});

gulp.task('count', function() {

});

gulp.task('watch', function() {
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch(js_files_lint, ['jshint']);
	gulp.watch(js_files_concat, ['concat']);
	gulp.watch('./css_js/*.css', ['count']);
});

gulp.task('default', function() {
	gulp.start('sass', 'jshint', 'concat', 'count');
});
