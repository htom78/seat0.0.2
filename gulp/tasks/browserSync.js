'use strict';
var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var url = require('url');

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: config.buildDir
		},
		port: config.browserPort,
		ui: {
			port: config.UIPort	
		},
		ghostMode: {
			links: false	
		}	
	});
});
