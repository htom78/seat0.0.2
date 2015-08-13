var directives = require('./index');
var seatMapView = function(seatMapService) {
	return {
		scope: {},
		link: function(scope, elem) {
			seatMapService.init(elem.get(0));
		}
	};
};

seatMapView.$inject = ['seatMapService'];

directives.directive('seatMapView', seatMapView);
