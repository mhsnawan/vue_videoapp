module.exports = function(grunt) {
  // 1. all config stuff goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // reads the packages etc inside that file
      uglify: {
        // options: {
        //   nameCache: '.tmp/grunt-uglify-cache.json',
        // },
        my_target: {
          files: {
            'public/dist/main.min.js': ['public/script/main.js'],
            'public/dist/videopage.min.js': ['public/script/videopage.js']
          }
        }
      },

      watch: {
        sass: {
          files: ['sass/*.scss'],
          tasks: ['sass']
        }
      },

      sass: {
        dist: {
          options: {
            style: 'compressed'
          },

          files: {
            'public/css/style.css':'sass/master.scss'
          }
        }
      }
  });

 
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('default', ['sass', 'uglify']);
  grunt.registerTask('watchFiles', ['watch', 'sass']);
};