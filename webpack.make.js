var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
	var BUILD = !!options.BUILD;
	var TEST = !!options.TEST;


	var config = {};

	config.resolve = {
		extensions: ['', '.js', '.scss', '.html']	
	};

	if (TEST) {
		config.entry = {};	
	} else {
		config.entry = {
			app: [
				path.resolve(__dirname, 'src/js/index.js'),
				path.resolve(__dirname, 'src/sass/index.scss')
			]
		};
	}

	if (TEST) {
		config.output = {};
	} else if (BUILD) {
		config.output = {
			path: 'E:/work/aladdin-seat/src/main/webapp/static',
			publicPath: '',
			filename: 'app.js'	
		};
	} else {
		config.output = {
			path: path.resolve(__dirname, 'dist'),
			publicPath: 'http://localhost:8833/',
			filename: 'app.js'	
		};	
	}

	if (TEST) {
		config.devtool = 'inline-source-map';	
	} else if (!BUILD) {
		config.devtool = 'source-map';	
	}

	config.module = {
		preLoaders: [],
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'	
		}, {
			test: /\.html$/,
			loader: 'ng-cache?module=app'	
		}, {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			loader: 'file'	
		}]	
	};

	var sassLoader = {
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')	
	};

	config.plugins = [
		new ExtractTextPlugin('style.css', {
			disable: TEST	
		})	
	];

	if (!TEST) {
		config.module.loaders.push(sassLoader);
		config.postcss = [
			autoprefixer({
				browsers: ['last 2 versions']	
			})	
		];
	}

	if (!TEST) {
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './index.html',
				inject: 'body'
			})		
		);	
	}

	if (BUILD) {
		config.plugins.push(
			new webpack.NoErrorsPlugin(),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin()	
		);	
	}

	config.devServer = {
		contentBase: './dist',
		stats: {
			color: true	
		}	
	};

	return config;

};
