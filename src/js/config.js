var config = function($locationProvider, $httpProvider, socketProvider, mapProvider, myHttpInnterceptor, seatMapProvider, callSocketProvider, leaderMapProvider, ocxCallProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];


	var socketUrl = 'ws://' + location.host + window.appRoot + '/ws/server';
	socketProvider.setSocketUrl(socketUrl);

	callSocketProvider.options({
		socketUrl: 'ws://localhost:8844',
		baseUrl: 'localhost:8822'	
	});

	ocxCallProvider.options({
		baseUrl: 'localhost:8822'	
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
	'callSocketProvider',
	'leaderMapProvider',
	'ocxCallProvider'
	];

module.exports = config;
