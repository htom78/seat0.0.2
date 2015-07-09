require('./templates/templates');
require('./controllers');
require('./resources');
require('./directives');
require('./services');
require('./components');
require('./filters');
require('./utils');


var requires = [
	'ngRoute',
	'app.templates',
	'app.controllers',
	'app.resoureces',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters',
	'app.utils'
];

var app = angular.module('app', requires)
	.config(require('./routers'))
	.config(require('./config'))
	.constant('properties', require('./properties'))
	.constant('selectData', require('./selectData'))
	.run(['$rootScope', '$location', 'employerService', 'callSocket', function($rootScope, $location, employerService, callSocket) {
		callSocket.connection();	
		$rootScope.appRoot = window.appRoot;
	}]);


module.exports = app;



