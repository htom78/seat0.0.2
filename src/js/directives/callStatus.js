var directives = require('./index');

function calculateFactory(now, last) {
	var nowFactor = 1,
			lastFactor = 1;
	if (now < last) {
		nowFactor = now / last; 
	} else if (now !== 0){
		lastFactor = last /now; 
	}
	return {
		nowFactor: nowFactor,
		lastFactor: lastFactor	
	};
}

var DAY_WIDTH = 288;
var HOUR_WIDTH = 192;
var TIME_INTERVAL = 10000;

var callStatusDirective = function(statisticsService, $timeout) {
	return {
		scope: {},
		replace: true,
		link: function(scope, elem) {
			scope.isDayOverflow = function() {
			    return scope.day > scope.lastDay;	
			};

			scope.isHourOverflow = function() {
			    return scope.hour > scope.lastHour;	
			};

			var tickTimer;
			(function tick() {
				statisticsService.callStatistics()
					.then(function(result) {
						scope.lastHour = result.lastHour;
						scope.lastDay = result.lastDay;
						scope.hour = result.hour;
						scope.day = result.day;
					});
				tickTimer = $timeout(tick, TIME_INTERVAL);	
			}());

			scope.$on('$destroy', function() {
				$timeout.cancel(tickTimer);	
			});

			scope.$watchGroup(['lastHour', 'lastDay', 'hour', 'day'], function() {
				var dayFactor = calculateFactory(scope.day, scope.lastDay);
				var hourFactor = calculateFactory(scope.hour, scope.lastHour);

				scope.dayWidth = DAY_WIDTH * dayFactor.nowFactor; 	
				scope.lastDayWidth = DAY_WIDTH * dayFactor.lastFactor; 

				scope.hourWidth = HOUR_WIDTH * hourFactor.nowFactor;
				scope.lastHourWidth = HOUR_WIDTH * hourFactor.lastFactor;

				if (dayFactor.nowFactor !== 1) {
						//当前的接电话数量小于预计数
						scope.showDay = scope.day;
				} else {
						scope.showDay = scope.lastDay;	
						scope.dayOverflow = scope.day - scope.lastDay;
				}

				if (hourFactor.nowFactor !== 1) {
						scope.showHour = scope.hour;	
				} else {
						scope.showHour = scope.lastHour;
						scope.hourOverflow = scope.hour - scope.lastHour;	    
				}
			});
		},
		
		template: require('../../html/component/callStatus.html')
	};
};

callStatusDirective.$inject = ['statisticsService', '$timeout'];

directives.directive('callStatus', callStatusDirective);
