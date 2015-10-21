'use strict';

var directives = require('./index');
var moment = require('moment');

function buildWeek(date, month) {
	var days = [];
	for (var i = 0; i < 7; i ++) {
		days.push({
			name: date.format('dd').substring(0, 1),
			number: date.date(),
			isCurrentMonth: date.month() === month.month(),
			isToday: date.isSame(new Date() , 'day'),
			date: date	
		});	
		date = date.clone();
		date.add(1, 'd');

	}
	return days;
}

function buildMonth(scope, start, month) {
	scope.weeks = [];
	var done = false, 
			date = start.clone(),
		 	monthIndex = date.month(),
			count = 0;	
	while (!done) {
		scope.weeks.push({days: buildWeek(date.clone(), month)});	
		date.add(1, 'w');
		done = count ++ > 2 && monthIndex !== date.month();
		monthIndex = date.month();
	}
}


function removeTime(date) {
	return date.day(0).hour(0).minute(0).second(0).millisecond(0);
}


var calendar = function($document) {
	return {
		templateUrl: 'component/calendar.html',
		scope: {
			selected: '='	
		},
		link: function(scope, elem) {
			var selected = moment(scope.selected);
			scope.month = selected.clone();
			var start = selected.clone();
			start.date(1);
			buildMonth(scope, start, scope.month);

			scope.select = function(day) {
				scope.selected = day.date.format('YYYY-MM-DD');	
				scope.isShow = false;	
			};

			scope.next = function() {
				var next = scope.month.clone();	
				removeTime(next.month(next.month() + 1).date(1));
				scope.month.month(scope.month.month() + 1);
				buildMonth(scope, next, scope.month);
			};

			scope.previous = function() {
				var previous = scope.month.clone();
				removeTime(previous.month(previous.month()-1).date(1));
				scope.month.month(scope.month.month()-1);
				buildMonth(scope, previous, scope.month);
			};

			var inputElem = elem.prev();

			inputElem.on({
				focus: function() {
					var inputOffset = inputElem.position();
					elem.position({
						left: inputOffset.left,
						top: inputOffset.top + inputElem.height()	
					});
					scope.$apply(function() {
						scope.isShow = true;	
					});
				},
				blur: function() {
				}	
			});

			$document.on('click', function(ev) {
				scope.$apply(function() {
					if (inputElem.get(0) !== ev.target &&
								elem.has($(ev.target)).length === 0) {
						scope.isShow = false;	
					}	
				});	
			});
			
		}	
	};
};

calendar.$inject = ['$document'];

directives.directive('calendar', calendar);
