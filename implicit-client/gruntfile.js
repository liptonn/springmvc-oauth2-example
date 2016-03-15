module.exports = function(grunt) {

  grunt.initConfig({

    wiredep: {
      task: {
        src: 'src/main/**/*.html'
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

  grunt.registerTask('default', ['wiredep', 'connect', 'watch']);

}; //wrapper function