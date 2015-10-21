'use strict';

var gulp = require('gulp');
var config = require('../config');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var gulpif = require('gulp-if');
var changed = require('gulp-changed');

gulp.task('images', () => {
	return gulp.src(config.images.src)
		.pipe(changed(config.images.dest))
		.pipe(gulpif(global.isProd, imagemin()))
		.pipe(gulp.dest(config.images.dest))
		.pipe(browserSync.stream({once: true}));
});
