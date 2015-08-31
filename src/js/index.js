require('./templates/templates');
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
	'app.templates',
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
	.config(require('./routers'))
	.config(require('./config'))
	.run(['$rootScope', 'ocxSocket', function($rootScope, ocxSocket) {
		ocxSocket.connection();	
		$rootScope.appRoot = window.appRoot;
		$rootScope.$on('$routeChangeSuccess', function(ev, current, previous) {
			$rootScope.title = current.$$route.title;	
		});
	}]);

module.exports = app;



