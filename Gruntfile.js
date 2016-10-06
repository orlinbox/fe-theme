// Define JavaScript files and their order for aggregation
var js_files = [
  'js/custom.js',
];

// Grunt
module.exports = function(grunt) {

  grunt.initConfig({

    // jshint
    jshint: {
      files: [
        'Gruntfile.js',
        'js/**/*.js',
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
          cssDir: 'compiled',
          sassDir: 'sass',
          config: 'config.rb',
        },
      },
    },

    // uglify
    uglify: {
      options: {
        mangle: false,
      },
      my_target: {
        files : {
          'compiled/script.js': js_files,
        },
      },
    },

    // csscount
    csscount: {
      dev: {
        src: [
          'compiled/*.css',
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
