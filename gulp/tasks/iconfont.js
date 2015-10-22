'use strict';
var config = require('../config').iconfont;
var gulp = require('gulp');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');

gulp.task('iconfont', () => {
	return gulp.src(config.src)
		.pipe(changed(config.dest))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.stream({once: true}));
});
