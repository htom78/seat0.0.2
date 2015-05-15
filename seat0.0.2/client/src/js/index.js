require('./templates/templates');
require('./controllers');
require('./resources');
require('./directives');
require('./services');
require('./components');
require('./filters');


var requires = [
	'ngRoute',
	'app.templates',
	'app.controllers',
	'app.resoureces',
	'app.dirctives',
	'app.services',
	'app.components',
	'app.filters'
];

var app = angular.module('app', requires)
	.config(require('./routers'))
	.config(require('./config'))
	.constant('properties', require('./properties'))
	.run(['$rootScope', function($rootScope) {
		$rootScope.appRoot = window.appRoot;
	}]);
	


module.exports = app;



