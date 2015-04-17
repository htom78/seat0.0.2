var services = require('./index');
var statistics = function(statisticsResource) {
	return {
		callStatistics: function() {
			return	statisticsResource
						.callStatistics()
						.then(function(response) {
							return {
								hour: response.hour,
								day: response.day,
								lastHour: response['last_hour'],
								lastDay: response['last_day']
							};
						}, function() {
							return {
								hour: 0,
								day: 0,
								lastHour: 0,
								lastDay: 0
							};
						});
		}
	};
};
statistics.$inject = ['statisticsResource'];
services.factory('statisticsService', statistics);