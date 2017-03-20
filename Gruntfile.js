// Grunt
module.exports = function(grunt) {

	grunt.initConfig({

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

	});

	grunt.loadNpmTasks('grunt-css-count');

	grunt.registerTask('default', ['csscount']);

};
