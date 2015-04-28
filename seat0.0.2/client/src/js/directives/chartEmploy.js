var directives = require('./index');

var chartEmploy = function(chartEmployService) {
	return {
		scope: {
			employData: '='
		},
		link: function(scope, elem) {
			chartEmployService.get(elem);
			scope.$watch('employData', function() {
				if (scope.employData) {
					chartEmployService.draw(scope.employData);
				}
			});
		}
	};
};

chartEmploy.$inject = ['chartEmployService'];

directives.directive('chartEmploy', chartEmploy);