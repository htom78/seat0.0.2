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
	.run(['$rootScope', 'orderNotifyService', '$timeout', function($rootScope, orderNotify, $timeout) {
		$rootScope.appRoot = window.appRoot;
		var host = location.host;
		var link = 'ws://' + host + window.appRoot + '/ws/server';
		var socket = new WebSocket(link);
		socket.onopen = function() {
			console.log('open');	
		};
		socket.onclose = function() {
		
		};
		socket.onmessage = function(ev) {
			var info = JSON.parse(ev.data);
			var status = parseInt(info.status);
			var sn = info.sn;
				console.log(info);
			if (status && status > 0) {
				orderNotify
					.notify(status, sn);	
			}
		};

		/*
		$timeout(function() {
			orderNotify
				.notify(2, 'sdfsdfsdf');	
		}, 2000);
		$timeout(function() {
			orderNotify
				.notify(4, 'sdfsdfsdf');	
		}, 4000);
		$timeout(function() {
			orderNotify
				.notify(9, 'I9C2A07010');	
		}, 6000);
		*/

	}]);
	


module.exports = app;



