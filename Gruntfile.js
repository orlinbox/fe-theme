// // Define JavaScript files for aggregation
var js_files_concat = [
	'javascript/vendor/jquery-3.1.1.min.js',
	'javascript/vendor/jquery.detect_swipe.js',
	'javascript/custom/custom.js',
];

// Define JavaScript files for lint
var js_files_lint = [
	'Gruntfile.js',
	'javascript/custom/**/*.js',
];

// Grunt
module.exports = function(grunt) {

	grunt.initConfig({

		// jshint
		jshint: {
			files: js_files_lint,
			options: {
				globals: {
					jQuery: true,
				},
			},
		},

		// sass
		sass: {
			options: {
				outputStyle: 'compressed', //nested, compact, expanded, compressed
				precision: 5,
			},
			dev: {
				files: {
					'css_js/styles.css': 'sass/styles.scss',
				},
			},
		},

		// concat
		concat: {
			options: {
				separator: '\n',
			},
			dist: {
				src: js_files_concat,
				dest: 'css_js/scripts.js',
			},
		},

		// csscount
		csscount: {
			dev: {
				src: [
					'css_js/*.css',
				],
				options: {
					maxSelectors: 4000,
					maxSelectorDepth: 5,
					beForgiving: true
				},
			},
		},

		// watch
		watch: {
			set1: {
				files: 'sass/**/*.scss',
				tasks: ['sass'],
			},
			set2: {
				files: js_files_lint,
				tasks: ['jshint'],
			},
			set3: {
				files: js_files_concat,
				tasks: ['concat'],
			},
			set4: {
				files: ['<%= csscount.dev.src %>'],
				tasks: ['csscount'],
			},
		},

		// notify
		notify_hooks: {
			options: {
				title: "Grunt",
				enabled: true,
				success: true,
				duration: 2,
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-css-count');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['sass', 'csscount', 'jshint', 'concat']);

	grunt.task.run('notify_hooks');

};
