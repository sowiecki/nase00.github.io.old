module.exports = function(grunt) {
  var cleanCssOptions;

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    connect: {
      all: {
        options:{
          port: 9000, // keepalive server is 8000
          hostname: "localhost",
          keepalive: true
        },
      },
      keepalive: true,
    },
    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      app: {
        src: 'assets/jsx/application.jsx',
        dest: 'assets/js/application.js'
      }
    },
    react: {
      combined_file_output: {
        files: {
          'assets/js/application.js': [
            'assets/jsx/application.jsx',
            'assets/jsx/slides.jsx'
          ]
        }
      },
    },
    less: {
      development: {
        options: {
          paths: ["./assets/"],
          yuicompress: true
        },
        files: {
          "./assets/css/application.css": "./assets/less/application.less",
          "./assets/css/navigation.css": "./assets/less/navigation.less"
        },
      },
    },
    watch: {
      files: ["./assets/less/*.less", "./assets/jsx/*.jsx"],
      tasks: ["browserify", "less"],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-react');

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  grunt.registerTask('server',[
    'connect:keepalive',
    'watch'
  ]);
};