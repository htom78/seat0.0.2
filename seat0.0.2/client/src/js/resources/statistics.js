var resources = require('./index');

var statistics = function($http, $q) {
	return {
		callStatistics: function() {
			var url = '/statis/m.htm';
			return $http
						.get(url)
						.then(function(response) {
							return response.data;
						}, function() {
							return $q.reject();
						});
		}
	};
};

statistics.$inject = ['$http', '$q'];

resources.factory('statisticsResource', statistics);