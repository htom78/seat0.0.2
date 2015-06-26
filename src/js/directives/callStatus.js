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

var dayWidth = 288;
var hourWidth = 192;

var callStatusDirective = function(statisticsService) {
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
			statisticsService
				.callStatistics()
				.then(function(result) {
					scope.lastHour = result.lastHour;
					scope.lastDay = result.lastDay;
					scope.hour = result.hour;
					scope.day = result.day;

					var dayFactor = calculateFactory(scope.day, scope.lastDay);
					var hourFactor = calculateFactory(scope.hour, scope.lastHour);

					scope.dayWidth = dayWidth * dayFactor.nowFactor; 	
					scope.lastDayWidth = dayWidth * dayFactor.lastFactor; 

					scope.hourWidth = hourWidth * hourFactor.nowFactor;
					scope.lastHourWidth = hourWidth * hourFactor.lastFactor;

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
		templateUrl: 'component/callStatus.html'
	};
};

callStatusDirective.$inject = ['statisticsService'];

directives.directive('callStatus', callStatusDirective);
