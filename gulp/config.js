'use strict';

const sourceDir = './src';
const buildDir = './build';
const productionAssets = `${buildDir}/production/assets`;

module.exports = {

	browserPort: 3000,
	UIPort: 3001,

	sourceDir: sourceDir,
	buildDir: buildDir,

	outputName: 'app',

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
		src: 'src/assets/icons/**/*.png',
		dest: `${buildDir}/imgs`	
	},

	revision: {
		src: {
			assets: [
				buildDir + '/css/*.css',
				buildDir + '/js/*.js',
				buildDir + '/imgs/**/*'
			],
			base: buildDir	
		},
		dest: {
			assets: buildDir,
			manifest: {
				name: 'manifest.json',
				path: productionAssets
			}	
		}	
	},

	collect: {
		src: [
			`${productionAssets}/manifest.json`,
			buildDir + '/**/*.{html,json,css,js}'	
		],
		dest: buildDir	
	},

	postcss: {
		src: buildDir + '/css/*.css',
		dest: buildDir + '/css'	
	},

	iconfont: {
		src: 'src/iconfont/*.woff',
		dest: buildDir + '/iconfont'	
	},

	copy: {
		src: buildDir + '/**/*',
		outputFile: 'E:\\work\\aladdin-seat\\src\\main\\webapp\\static\\'	
	}

};

