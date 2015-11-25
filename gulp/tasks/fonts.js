'use strict';

var gulp = require('gulp');
var config = require('../config');


gulp.task('fonts', () => {
	return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
		.pipe(gulp.dest(config.fonts.dest));
});
