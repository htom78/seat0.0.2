var resources = require('./index');

var statistics = function($http) {
	return {
		callStatistics: function() {
			var url = window.appRoot + '/statis/d.htm';
			return $http
						.get(url)
						.then(function(response) {
							return response.data;
						});
		}
	};
};

statistics.$inject = ['$http'];

resources.factory('statisticsResource', statistics);