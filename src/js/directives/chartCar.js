var directives = require('./index');

var chartCar = function(chartCarService) {
	return {
		scope: {
			carData: '='
		},
		link: function(scope, elem) {
			chartCarService.get(elem);
			scope.$watch('carData', function() {
				if (scope.carData) {
					chartCarService.draw(scope.carData);
				}
			});
		}
	};
};

chartCar.$inject = ['chartCarService'];

directives.directive('chartCar', chartCar);