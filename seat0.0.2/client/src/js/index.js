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
	.run(['$rootScope', '$location', 'employerService', function($rootScope, $location, employerService) {
		$rootScope.appRoot = window.appRoot;
		$rootScope.$on('$routeChangeSuccess', function(ev) {
			if (window.employer && employerService.employerName !== window.employer) {
				employerService.employerName = window.employer;	
				employerService.employerType = window.employerType;
				employerService.signState = window.signState && parseInt(window.signState);
			} else if ($location.$$path !== '/login.htm' && !employerService.employerName){
				location.reload();	
			}
		});
	}]);


module.exports = app;



