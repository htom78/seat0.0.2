'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy', ['prod'], () => {
	runSequence(['postcss'], 'copy');
});
