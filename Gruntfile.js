// FinalProject/Gruntfile.js

module.exports = function(grunt){

  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");

  grunt.registerTask("default", ["autoprefixer", "concurrent"]);

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
        scripts: "index.js"
      }
    },
    watch: {
      prefix: {
        files: "public/css/**/*.css",
        tasks: ["autoprefixer"],
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
    }
  });
};
