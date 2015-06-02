// FinalProject/Gruntfile.js

module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask("default", ["sass", "autoprefixer", "concurrent"]);

  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ["watch", "nodemon"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: "index.js"
      }
    },
    watch: {
      prefix: {
        files: ["public/css/**/*.css", "public/css/**/*.scss"],
        tasks: ["sass", "autoprefixer"],
      },
      template: {
        files: "**/*.html",
      }
    },
    autoprefixer : {
      dev: {
        expand: true,
        flatten: true,
        src: "public/css/*.css",
        dest: "build/css"
      }
    },
    sass: {
      dist: {
        files: {
          './public/css/style.css' : './public/css/style.scss'
        }
      }
    }
  });
};
