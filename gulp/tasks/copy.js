'use strict';

var gulp = require('gulp');
var config = require('../config').copy;
var size = require('gulp-size');

gulp.task('copy', () => {
	return gulp.src(config.src)
		.pipe(size())
		.pipe(gulp.dest(config.outputFile));
});
