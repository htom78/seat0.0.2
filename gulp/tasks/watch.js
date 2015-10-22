'use strict';
var config = require('../config');
var gulp = require('gulp');

gulp.task('watch', ['browserSync'], () => {
	gulp.watch(config.styles.watch, ['styles']);
	gulp.watch(config.views.watch, ['views']);
	gulp.watch(config.sprites.src, ['sprite']);
	gulp.watch(config.images.src, ['images']);
});
