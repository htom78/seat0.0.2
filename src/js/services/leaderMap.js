var services = require('./index');

function Map (elem) {
	this.map = new AMap.Map(elem.get(0), {
		view: new AMap.View2D({
			center: new AMap.LngLat(121.609614,29.866413),
			zoom: 16
		})
	});
}

var leaderMapService = function(leaderMap) {
	var map = leaderMap.map();
	return {
		mapView: function(elem) {
			map.open(elem);
			//map.addMarker();
		},
		setMarkerPosition: function(lng, lat) {
			map.setMarkerPosition(lng, lat);	
		},
		setPath: function(points) {
			map.setPath(points);	
		},
		clearPath: function() {
			map.clearPath();	
		}
	};
};

leaderMapService.$inject = ['leaderMap'];

services.factory('leaderMapService', leaderMapService);