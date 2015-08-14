var services = require('./index');
var statistics = function($http) {
	return {
		callStatistics: function() {
			return $http.get('statis/d.htm')
				.then(function(response) {
					return {
						hour: response.data.hour,
						day: response.data.day,
						lastHour: response.data['last_hour'],
						lastDay: response.data['last_day']
					};
				});
		}
	};
};
statistics.$inject = ['$http'];
services.factory('statisticsService', statistics);
