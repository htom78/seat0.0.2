var services = require('./index');

var leaderMapService = function() {

	var myMap = {

		init: function(elem) {
			this.map = new AMap.Map(elem.get(0), {
				view: new AMap.View2D({
					center: new AMap.LngLat(121.609614,29.866413),
					zoom: 16
				})
			});
		},	

		getPoint: function(lng, lat) {
			return new AMap.LngLat(lng, lat);
		},

		addMarker: function() {
			this.marker = new AMap.Marker({
				icon: new AMap.Icon({
					size: new AMap.Size(22, 32),
					image: 'static/imgs/car-marker.png'
				}),
				position:this.map.getCenter()
			});
			this.marker.setMap(this.map);
		},

		setMarkerPosition: function(lng, lat) {
			var pointer = this.getPoint(lng, lat);
			this.marker.setPosition(pointer);
			this.map.setCenter(pointer);
		},

		setPath: function(points) {
			this.clearPath();	
			var paths = [];	
			paths.push(this.getPoint(points.pickupX, points.pickupY));
			paths.push(this.getPoint(points.assignedX, points.assignedY));
			paths.push(this.getPoint(points.arrivedX, points.arrivedY));
			var self = this;
			this.map.plugin('AMap.DragRoute', function() {
				self.route = new AMap.DragRoute(self.map, paths, AMap.DrivingPolicy.LEAST_FEE);	
				self.route.search();
			});	
		},

		clearPath: function() {
			if (this.route) {
				this.route.destroy();	
				this.route = null;
			}
		}

	};

	return {
		mapView: function(elem) {
			myMap.init(elem);
		},
		setMarkerPosition: function(lng, lat) {
			myMap.setMarkerPosition(lng, lat);	
		},
		setPath: function(points) {
			myMap.setPath(points);	
		},
		clearPath: function() {
			myMap.clearPath();	
		}
	};
};

leaderMapService.$inject = [];

services.factory('leaderMapService', leaderMapService);
