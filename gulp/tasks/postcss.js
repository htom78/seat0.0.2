'use strict';
var gulp = require('gulp');
var urlAdjuster = require('gulp-css-url-adjuster');
var config = require('../config').postcss;
var csso = require('gulp-csso');

gulp.task('postcss', () => {
	return gulp.src(config.src)
		.pipe(urlAdjuster({
			prepend: '..',
			append: '?v=' + (Date.now() + Math.floor(Math.random(999999)))
		}))
		.pipe(csso())
		.pipe(gulp.dest(config.dest))
});
