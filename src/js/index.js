import angular from 'angular';
import 'angular-route';
import router from './router';
import config from './config';

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
	'app.ocx'
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

require('../html/header.html');
require('../html/component/addressList.html');
require('../html/component/messageBox.html')
require('../html/component/unhandleAlarmDialog.html')
require('../html/component/handleAlarmDialog.html')

module.exports = app;



