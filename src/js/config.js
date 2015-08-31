var config = function($locationProvider, $httpProvider, socketProvider, mapProvider, myHttpInnterceptor, seatMapProvider, ocxSocketProvider, leaderMapProvider, ocxCallProvider, ocxSignProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];


	var socketUrl = 'ws://' + location.host + window.appRoot + '/ws/server';

	var ocxBaseUrl = 'http://localhost:8822';
	socketProvider.setSocketUrl(socketUrl);

	ocxSocketProvider.options({
		socketUrl: 'ws://localhost:8844'
	});

	ocxCallProvider.options({
		baseUrl: ocxBaseUrl	
	});

	ocxSignProvider.options({
		baseUrl: ocxBaseUrl	
	});

	mapProvider.options(require('./gaodeOptions'));
	myHttpInnterceptor.options(require('./gaodeOptions'));
	seatMapProvider.options(require('./gaodeOptions'));
	leaderMapProvider.options(require('./gaodeOptions'));

	$httpProvider.interceptors.push('myHttpInterceptor');
};

config.$inject = [
	'$locationProvider', 
	'$httpProvider', 
	'socketProvider', 
	'mapProvider',
	'myHttpInterceptorProvider',
	'seatMapProvider',
	'ocxSocketProvider',
	'leaderMapProvider',
	'ocxCallProvider',
	'ocxSignProvider'
	];

module.exports = config;
