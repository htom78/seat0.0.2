var config = function($locationProvider, $httpProvider, socketServiceProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];

	var socketUrl = 'ws://' + location.host + window.appRoot + '/ws/server';
	socketServiceProvider.setSocketUrl(socketUrl);
};

config.$inject = ['$locationProvider', '$httpProvider', 'socketServiceProvider'];

module.exports = config;
