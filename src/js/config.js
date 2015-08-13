var config = function($locationProvider, $httpProvider, socketServiceProvider, mapServiceProvider, myHttpInnterceptor, seatMapProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];


	var socketUrl = 'ws://' + location.host + window.appRoot + '/ws/server';
	socketServiceProvider.setSocketUrl(socketUrl);

	mapServiceProvider.options(require('./gaodeOptions'));
	myHttpInnterceptor.options(require('./gaodeOptions'));
	seatMapProvider.options(require('./gaodeOptions'));

	$httpProvider.interceptors.push('myHttpInterceptor');
};

config.$inject = [
	'$locationProvider', 
	'$httpProvider', 
	'socketServiceProvider', 
	'mapServiceProvider',
	'myHttpInterceptorProvider',
	'seatMapServiceProvider'
	];

module.exports = config;
