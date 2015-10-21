'use strict';

const sourceDir = './src';
const buildDir = './build';

module.exports = {

	browserPort: 3000,
	UIPort: 3001,

	sourceDir: sourceDir,
	buildDir: buildDir,

	styles: {
		src: 'src/sass/index.scss',
		srcdir: 'src/sass',
		dest: `${buildDir}/css`,
		prodSourcemap: false,
		sassIncludePath: [],
		watch: 'src/sass/**/*.scss'
	},

	scripts: {
		src: 'src/js/index.js',
		dest: `${buildDir}/js` 	
	},

	views: {
		index: 'src/index.html',
		src: 'src/html/**/*.html',
		dest: 'src/js',
 		watch: 'src/html/**/*.html'		
	},

	browserify: {
		bundleName: 'app.js',
		prodSourcemap: false	
	},

	images: {
		src: 'src/assets/imgs/**/*',
		dest: `${buildDir}/imgs`	
	},

	sprites: {
		src: 'src/assets/icons/*.png',
		dest: `${buildDir}/imgs`	
	}
};

