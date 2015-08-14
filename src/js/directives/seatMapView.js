var directives = require('./index');
var seatMapView = function(seatMap) {
	return {
		scope: {},
		link: function(scope, elem) {
			seatMap.init(elem.get(0));
		}
	};
};

seatMapView.$inject = ['seatMap'];

directives.directive('seatMapView', seatMapView);
