// Define JavaScript files and their order for aggregation
var js_files = [
	'javascript/vendor/jquery-3.1.1.min.js',
	'javascript/vendor/jquery.detect_swipe.js',
	'javascript/custom/custom.js',
];

// Grunt
module.exports = function(grunt) {

	grunt.initConfig({

		// jshint
		jshint: {
			files: [
				'Gruntfile.js',
				'javascript/custom/**/*.js',
			],
			options: {
				globals: {
					jQuery: true,
				},
			},
		},

		// compass
		compass: {
			dev: {
				options: {
					cssDir: 'css_js',
					sassDir: 'sass',
					config: 'config.rb',
				},
			},
		},

		// uglify
		uglify: {
			options: {
				mangle: false,
				preserveComments: 'some',
			},
			my_target: {
				files : {
					'css_js/scripts.js': js_files,
				},
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
				tasks: ['compass'],
			},
			set2: {
				files: ['<%= csscount.dev.src %>'],
				tasks: ['csscount'],
			},
			set3: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'uglify'],
			},
		},

		// notify
		notify_hooks: {
			options: {
				title: "Grunt",
				enabled: true,
				success: true,
				duration: 3,
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-css-count');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['compass', 'csscount', 'jshint', 'uglify']);

	grunt.task.run('notify_hooks');

};
