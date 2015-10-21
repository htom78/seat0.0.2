'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var config = require('../config');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../utils/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('styles', () => {
	const createSourcemap = !global.isProd || config.styles.prodSourcemap;
	return gulp.src(config.styles.src)
		.pipe(gulpif(createSourcemap, sourcemaps.init()))
		.pipe(sass({
			sourceComments: !global.isProd,
			outputStyle: global.isProd ? 'compressed' : 'nested',	
			includePaths: config.styles.sassIncludePaths
		}))
		.on('error', handleErrors)
		.pipe(autoprefixer('last 2 version', '> 1%', 'ie 8'))
		.pipe(gulpif(
			createSourcemap,
			sourcemaps.write(global.isProd ? './' : null)		
		))
		.pipe(gulp.dest(config.styles.dest))
		.pipe(browserSync.stream({once: true}));
});
