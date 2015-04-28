var services = require('./index');

function Map (elem) {
	this.map = new AMap.Map(elem.get(0), {
		view: new AMap.View2D({
			center: new AMap.LngLat(121.609614,29.866413),
			zoom: 16
		})
	});
}

var leaderMapService = function() {
	return {
		mapView: function(elem) {
			return new Map(elem);
		}
	};
};

leaderMapService.$inject = [];

services.factory('leaderMapService', leaderMapService);