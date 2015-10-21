'use strict';

var gulp = require('gulp');
var config = require('../config');
var gulpif = require('gulp-if');
var gtuil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var handleErrors = require('../utils/handleErrors');
var browserSync = require('browser-sync');
var debowerify = require('debowerify');
var ngAnnotate = require('browserify-ngannotate');

function buildScript(file) {
	var bundler = browserify({
		entries: [`${config.sourceDir}/js/${file}`],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: !global.isProd	
	});

	if (!global.isProd) {
		bundler = watchify(bundler);	
		bundler.on('update', () => {
			rebundle();	
			console.log('Rebundle...');
		});
	}

	const transforms = [
		{name: babelify, options: {}},
		{name: debowerify, options: {}},
		{name: ngAnnotate, options: {}},
		{name: 'brfs', options: {}},
		{name: 'bulkify', options: {}}
	];

	transforms.forEach(transform => {
		bundler.transform(transform.name, transform.options);	
	});

	function rebundle() {
		const stream = bundler.bundle();	
		const createSourcemap = global.isProd && config.browserify.prodSourcemap;

		return stream.on('error', handleErrors)
			.pipe(source(file))
			.pipe(gulpif(createSourcemap, buffer()))
			.pipe(gulpif(createSourcemap, sourcemaps.init()))
			.pipe(gulpif(global.isProd, streamify(uglify({
				cmpress: {drop_console: true}	
			}))))
			.pipe(gulpif(createSourcemap, sourcemaps.write('./')))
			.pipe(gulp.dest(config.scripts.dest))
			.pipe(browserSync.stream({once: true}));
	}

	return rebundle();
}

gulp.task('browserify', () => {
	return buildScript('index.js');
});
