'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('prod', ['clean'], cb => {
	cb = cb || function() {};
	global.isProd = false;
	runSequence(['sprite', 'styles', 'fonts', 'images', 'views', 'browserify'], cb);
});
