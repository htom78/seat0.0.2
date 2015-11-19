'use strict';
import angular from 'angular';
import 'angular-route';
import router from './router';
import config from './config';
import './map';
import './bootstrap';

require('./controllers');
require('./directives');
require('./services');
require('./components');
require('./filters');
require('./utils');
require('./dialogs');	
require('./ocx');
require('./templates');

var requires = [
	'ngRoute',
	'templates',
	'app.controllers',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters',
	'app.utils',
	'app.dialogs',
	'app.ocx',
	'app.map',
	'ui.bootstrap.datepicker',
	'ui.bootstrap.modal',
	'ui.bootstrap.dropdown'
];

var app = angular.module('app', requires)
	.config(router)
	.config(config)
	.run(['$rootScope', 'ocxSocket', function($rootScope, ocxSocket) {
		ocxSocket.connection();	
		$rootScope.$on('$routeChangeSuccess', function(ev, current, previous) {
			$rootScope.title = current.$$route.title;	
		});
	}]);


module.exports = app;



