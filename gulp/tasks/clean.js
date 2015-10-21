'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', cb => {
	cb = cb || function() {};
	return del(config.buildDir);
});
