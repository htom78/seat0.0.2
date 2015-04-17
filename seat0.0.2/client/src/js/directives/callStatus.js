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
					
					scope.hourRate = (scope.hour / scope.lastHour) * 100;
					scope.dayRate = (scope.day / scope.lastDay) * 100;
				});
		},
		templateUrl: 'component/callStatus.html'
	};
};

callStatusDirective.$inject = ['statisticsService'];

directives.directive('callStatus', callStatusDirective);