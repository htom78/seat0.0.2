'use strict';
var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browserSync', () => {
	browserSync.init({
		server: config.buildDir,
		port: config.browserPort,
		ui: {
			port: config.UIPort	
		},
		ghostMode: {
			links: false	
		}	
	});
});
