'use strict';

var gulp = require('gulp');
var config = require('../config');
var spritesmith = require('gulp.spritesmith');

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
		.pipe(gulp.dest(config.images.dest));

	return spriteData.css
		.pipe(gulp.dest(config.styles.srcdir));
});
