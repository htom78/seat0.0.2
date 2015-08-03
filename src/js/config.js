var config = function($locationProvider, $httpProvider) {
	$locationProvider.html5Mode(true);
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [function(data) {
		return angular.isObject(data) ? $.param(data) : data;
	}];
};

config.$inject = ['$locationProvider', '$httpProvider'];

module.exports = config;
