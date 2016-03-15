module.exports = function(grunt) {

  grunt.initConfig({

    wiredep: {
      task: {
        src: 'src/main/**/*.html'
      }
    },

    bower_concat: {
      all: {
        dest: 'src/main/js/_bower.js'
      }
    },

    connect: {
      sever: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'src/main/',
          livereload: true
        }
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['src/main/**/*.html',
        'src/main/**/*.js',
        'src/main/**/*.css']
      }
    }


  }); //initConfig

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['bower_concat', 'wiredep', 'connect', 'watch']);

}; //wrapper function