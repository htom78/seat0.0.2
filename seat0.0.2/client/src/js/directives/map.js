var directives = require('./index');
var mapDirective = function() {
	return {
		scope: {},
		link: function(scope, elem) {
			new AMap.Map(elem.get(0), {
				view: new AMap.View2D({
					center: new AMap.LngLat(116.397428, 39.90923),
					zoom: 12
				})
			});
		}
	};
};

mapDirective.$inject = [];

directives.directive('mapView', mapDirective);