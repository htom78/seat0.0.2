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
	.config(require('./config'));
	

module.exports = app;



