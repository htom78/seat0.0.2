require('./templates/templates');
require('./controllers');
require('./directives');
require('./services');
require('./components');
require('./filters');
require('./utils');


var requires = [
	'ngRoute',
	'app.templates',
	'app.controllers',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters',
	'app.utils'
];

var app = angular.module('app', requires)
	.config(require('./routers'))
	.config(require('./config'))
	.run(['$rootScope', 'callSocket', function($rootScope, callSocket) {

		callSocket.connection();	
		$rootScope.appRoot = window.appRoot;

		$rootScope.$on('$routeChangeSuccess', function(ev, current, previous) {
			$rootScope.title = current.$$route.title;	
		});
	}]);


module.exports = app;



