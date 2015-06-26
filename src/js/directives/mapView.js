var directives = require('./index');
var mapView = function(seatMapService) {
	return {
		scope: {},
		link: function(scope, elem) {
			seatMapService.map(elem);
		}
	};
};

mapView.$inject = ['seatMapService'];

directives.directive('mapView', mapView);