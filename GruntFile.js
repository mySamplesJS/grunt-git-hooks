var request = require('request');

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imageoptim');

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		githooks: {
		    all: {
		      // Will run the jshint and test:unit tasks at every commit
		      'pre-commit': 'concat uglify'
		    }
		},
        browserSync: {
            bsFiles: {
                src : ['./build/*.html','./build/css/**/*.css']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./build"
                }
            }
        },
        concat: {
			js: {
				src: ['assets/js/jquery-1.10.2.js', 'assets/js/plugins/*.js', 'assets/js/main.js'],
                dest: 'build/js/scripts.js',
			}
		},
        uglify: {
			js: {
				src: ['build/js/scripts.js'],
                dest: 'build/js/scripts.min.js',
			}
		},
        sass: {
            dist: {
                 options: {
                  style: 'compressed'// Can be nested, compact, compressed, expanded.
                },
                files: [
                  {
                      expand: true, // Recursive Output style.
                      cwd: "assets/sass/", // The startup directory
                      src: ["**/*.scss"], // Source files
                      dest: "build/css/", // Destination
                      ext: ".css" // File extension
                  }
                ]
            }
        },
        imageoptim: {
              myTask: {
                  src: ['assets/images', 'build/images']
              }
        },
		watch: {
            js: {files: ['assets/js/**/*.js'],
                tasks: ['concat','uglify']
            },
			css: {
				files: 'assets/sass/**/*.{scss,sass}',
				tasks: ['sass']
			}
		}
	});
    // Optimize images.
    grunt.registerTask('img', ['imageoptim']);
    grunt.registerTask('default',['concat','uglify','browserSync', 'watch']);
}
