'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');
var config = require('../config').revision;

gulp.task('revision', () => {
	return gulp.src(config.src.assets, {base: config.src.base})
		.pipe(rev())
		.pipe(gulp.dest(config.dest.assets))
		.pipe(rev.manifest({path: config.dest.manifest.name}))
		.pipe(gulp.dest(config.dest.manifest.path));
});
