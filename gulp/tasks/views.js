'use strict';

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('views', () => {
	gulp.src(config.views.index)
		.pipe(gulp.dest(config.buildDir));

	return gulp.src(config.views.src)
		.pipe(templateCache({
			standalone: true	
		}))
		.pipe(gulp.dest(config.views.dest))
		.pipe(browserSync.stream({once: true}));
});
