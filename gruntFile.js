module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//distdir: 'dist',
		distdir: 'E:/work/aladdin-seat/src/main/webapp/static',
		src: {
			html: 'src/html/**/*.html',
			js: 'src/js/**/*.js'	
		},
		clean: ['<%= distdir %>/*'],
		concat: {
			/*
			index: {
				src: ['src/index.html'],
				dest: '<%= distdir %>/index.html',
				options: {
					process: true	
				}
			},*/
			angular: {
				src: ['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js'],
				dest: '<%= distdir %>/js/angular.js'
			},
			jquery: {
				src: ['bower_components/jquery/dist/jquery.js'],
				dest: '<%= distdir %>/js/jquery.js'
			},
			scocket: {
				src: ['bower_components/sockjs/sockjs.js'],
				dest: '<%= distdir %>/js/sockjs.js'
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
					'<%= distdir %>/css/<%= pkg.name %>.css': 'src/sass/index.scss'	
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
					'<%= distdir %>/js/<%= pkg.name %>.js': ['src/js/index.js']
				},
				options: {
					browserifyOptions: {
						debug: true	
					}	
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
		},
		uglify: {
			dist: {
				src: ['<%= distdir %>/js/<%= pkg.name %>.js'],
				dest: '<%= distdir %>/js/<%= pkg.name %>.js'
			},
			angular: {
				src: ['bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js'],
				dest: '<%= distdir %>/js/angular.js'
			},
			jquery: {
				src: ['bower_components/jquery/dist/jquery.js'],
				dest: '<%= distdir %>/js/jquery.js'
			}
		},
		cssmin: {
			target: {
				files: {'<%= distdir %>/css/<%= pkg.name %>.css' : ['<%= distdir %>/css/<%= pkg.name %>.css']}
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
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['jshint', 'build']);
	grunt.registerTask('build', ['concat', 'sass', 'html2js', 'copy:assets', 'browserify']);
	grunt.registerTask('test-watch', ['karma:unit']);
	grunt.registerTask('release', ['clean', 'copy:asserts', 'sass', 'html2js', 'browserify', 'uglify', 'cssmin', 'jshint']);
};
