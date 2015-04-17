module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		distdir: 'dist',
		src: {
			html: 'src/html/**/*.html',
			js: 'src/js/**/*.js'	
		},
		clean: ['<%= distdir %>/*'],
		concat: {
			index: {
				src: ['src/index.html'],
				dest: '<%= distdir %>/index.html',
				options: {
					process: true	
				}
			},
			angular: {
				src: ['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js'],
				dest: '<%= distdir %>/angular.js'
			},
			jquery: {
				src: ['bower_components/jquery/dist/jquery.js'],
				dest: '<%= distdir %>/jquery.js'
			}	
		},
		copy: {
			assets: {
				files: [{
					src: '**',
					dest: '<%= distdir %>',	
					expand: true,
					cwd: 'src/assets/'
				}]	
			}
		},
		sass: {
			dist: {
				files: {
					'<%= distdir %>/<%= pkg.name %>.css': 'src/sass/index.scss'	
				}	
			}
		},
		html2js: {
			app: {
				options: {
					base: 'src/html'
				},
				src: ['<%= src.html %>'],
				dest: 'src/js/templates/templates.js',
				module: 'app.templates'
			}
		},
		browserify: {
			dist: {
				files: {
					'<%= distdir %>/<%= pkg.name %>.js': ['src/js/index.js']
				}
			}
		},
		jshint: {
			files: ['<%= src.js %>'],
			options: {
				curly:true,
				eqeqeq:true,
				immed:true,
				latedef:true,
				newcap:true,
				noarg:true,
				sub:true,
				boss:true,
				eqnull:true,
				globals:{}	
			}	
		},
		karma: {
			unit: {
				options: {
					configFile: 'test/config/unit.js'
				}
			}
		}	
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default', ['jshint', 'build']);
	grunt.registerTask('build', ['clean', 'concat', 'sass', 'html2js', 'copy:assets', 'browserify']);
	grunt.registerTask('test-watch', ['karma:unit']);
};
