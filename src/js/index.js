import angular from 'angular';
import 'angular-route';
import router from './router';
import config from './config';
import './map';

require('./controllers');
require('./directives');
require('./services');
require('./components');
require('./filters');
require('./utils');
require('./dialogs');	
require('./ocx');

var requires = [
	'ngRoute',
	'app.controllers',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters',
	'app.utils',
	'app.dialogs',
	'app.ocx',
	'app.map'
];

var app = angular.module('app', requires)
	.config(router)
	.config(config)
	.run(['$rootScope', 'ocxSocket', function($rootScope, ocxSocket) {
		ocxSocket.connection();	
		$rootScope.appRoot = window.appRoot;
		$rootScope.$on('$routeChangeSuccess', function(ev, current, previous) {
			$rootScope.title = current.$$route.title;	
		});
	}]);

require('./templates');

module.exports = app;



