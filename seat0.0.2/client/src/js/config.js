var config = function($locationProvider) {
	$locationProvider.html5Mode(true);
};

config.$inject = ['$locationProvider'];

module.exports = config;