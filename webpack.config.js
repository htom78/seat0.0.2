var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'src'),
	resolve: {
		extensions: ['', '.js']	
	},
	entry: {
		app: [
			'./js/index.js',
			'./sass/index.scss'	
			]	
	},
	output: {
		path: 'E:/work/aladdin-seat/src/main/webapp/static',
		//path: 'E:/work/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/aladdin-seat/static',
		publicPaht: '/dist/',
		filename: 'app.js',
		sourceMapFilename: '[file].map'	
	},
	module: {
		loaders: [{
			test: /\.js$/,	
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap=true&sourceMapContents=true')	
		}, {
			test: /\.html$/,
			loader: 'ng-cache?module=app'	
		}, {
			test: /(\.png|\.gif|\.jpg)$/,
			loader: 'file-loader'	
		}]	
	},
	plugins: [
		new ExtractTextPlugin('style.css', {allChunks: true})	
		],
	devtool: '#inline-source-map'
};
