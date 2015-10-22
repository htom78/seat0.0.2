'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var config = require('../config');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');

gulp.task('sprite', () => {
	const spriteData = gulp.src(config.sprites.src)
		.pipe(spritesmith({
			cssName: '_sprites.scss',
			cssFormat: 'css',
			cssOpts: {
				cssClass: function (item) {
					if (item.name.indexOf('-hover') !== -1) {
						return '.icon-' + item.name.replace('-hover', ':hover');	
					} else {
						return '.icon-' + item.name;	
					}	
				}	
			},
			imgName: 'icon-sprite.png',
			imgPath: '/imgs/icon-sprite.png'
		}));

	spriteData.img
		.pipe(gulpif(global.isProd, imagemin()))
		.pipe(gulp.dest(config.images.dest));

	return spriteData.css
		.pipe(gulp.dest(config.styles.srcdir))
		.pipe(browserSync.stream({once: true}));
});
