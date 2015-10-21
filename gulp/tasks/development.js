'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], cb => {
	cb = cb || function() {};
	global.isProd = false;
	runSequence(['sprite', 'images', 'styles', 'views', 'browserify'], 'watch', cb);
});
