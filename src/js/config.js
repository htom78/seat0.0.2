var config = function($locationProvider, $httpProvider, socketProvider, mapProvider, myHttpInnterceptor, seatMapProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];


	var socketUrl = 'ws://' + location.host + window.appRoot + '/ws/server';
	socketProvider.setSocketUrl(socketUrl);

	mapProvider.options(require('./gaodeOptions'));
	myHttpInnterceptor.options(require('./gaodeOptions'));
	seatMapProvider.options(require('./gaodeOptions'));

	$httpProvider.interceptors.push('myHttpInterceptor');
};

config.$inject = [
	'$locationProvider', 
	'$httpProvider', 
	'socketProvider', 
	'mapProvider',
	'myHttpInterceptorProvider',
	'seatMapProvider'
	];

module.exports = config;
