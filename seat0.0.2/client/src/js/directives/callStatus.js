var directives = require('./index');
var callStatusDirective = function(statisticsService) {
	return {
		scope: {},
		replace: true,
		link: function(scope, elem) {
			statisticsService
				.callStatistics()
				.then(function(result) {
					scope.lastHour = result.lastHour;
					scope.lastDay = result.lastDay;
					scope.hour = result.hour;
					scope.day = result.day;
					var hourRate = (scope.hour / scope.lastHour) * 100,
						dayRate = (scope.day / scope.lastDay) * 100;
					scope.hourRate = hourRate > 100 ? 100: hourRate;
					scope.dayRate = dayRate > 100 ? 100: dayRate;
				});
		},
		templateUrl: 'component/callStatus.html'
	};
};

callStatusDirective.$inject = ['statisticsService'];

directives.directive('callStatus', callStatusDirective);