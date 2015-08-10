var directives = require('./index');

function buildTime(scope, endNum, mod) {
	scope.times = [];

	for (var i = 0; i < endNum; i ++) {
		var t = '000' + i;
		t = t.slice(-2);
		if (mod) {
			var num = i % mod;
			if (num === 0 || i === 0) {
				scope.times.push({number: t});
			}
		} else {
			scope.times.push({number: t});	
		}
	}
}

var timeSelect = function($compile, $document) {
	return {

		scope: {
			number: '@timeSelect',
			mod: '@numberMod',
			selected: '=',
			isReservation: '=reservation'	
		},

		link: function(scope, elem) {

			var template = '<span class="time-number"' + 
				'ng-repeat="item in times"' + 
				'ng-click="select(item.number)">{{item.number}}</span>';


			scope.select = function(num) {
				scope.selected = num;	
				if (scope.popout) {
					scope.popout.isShow = false;	
				}
			};

			scope.element = elem;

			$compile('<select-time input="element" reservation="isReservation">' + template + '</select-time>')(scope, function(clone) {
				clone.appendTo($document.find('body'));	
			});	
			buildTime(scope, scope.number, scope.mod);
		}		

	};
};

timeSelect.$inject = ['$compile', '$document'];

directives.directive('timeSelect', timeSelect);

var selectTime = function($document) {
	return {
		
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			input: '=',
			isReservation: '=reservation'
		},

		link: function(scope, elem) {
			var input = scope.input;	
			scope.$parent.popout = scope;

			scope.$on('$destroy', function() {
				elem.remove();	
			});

			input.on('click', function() {
				scope.$apply(function() {
					scope.isShow = true;	
				});	
				var pos = input.offset();

				elem.css({
					left: pos.left,
					top: pos.top + input.height()	
				});
			});

			$document.on('click', function(ev) {
				if (input[0] !== ev.target &&
					elem.has(ev.target).length === 0) {
					scope.$apply(function() {
						scope.isShow = false;	
					});
				}	
			});

		},

		template: 
			'<div class="time-item-select" ng-show="isShow && isReservation" ng-transclude></div>'	

	};
};

selectTime.$inject = ['$document'];

directives.directive('selectTime', selectTime);
