var components = require('./index');

var leaderMap = function() {
	function Map() {
	
	}


	Map.prototype.open = function(elem) {
		this.map = new AMap.Map(elem.get(0), {
			view: new AMap.View2D({
				center: new AMap.LngLat(121.609614,29.866413),
				zoom: 16
			})
		});
	};

	Map.prototype.getPoint = function(lng, lat) {
		return new AMap.LngLat(lng, lat);
	};

	Map.prototype.addMarker = function() {
		this.marker = new AMap.Marker({
			icon: new AMap.Icon({
				size: new AMap.Size(22, 32),
				image: window.appRoot + '/static/imgs/car-marker.png'
			}),
			position:this.map.getCenter()
		});
		this.marker.setMap(this.map);
	};

	Map.prototype.setMarkerPosition = function(lng, lat) {
		var pointer = this.getPoint(lng, lat);
		this.marker.setPosition(pointer);
		this.map.setCenter(pointer);
	};

	Map.prototype.setPath = function(points) {
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
	};

	Map.prototype.clearPath = function() {
		if (this.route) {
			this.route.destroy();	
			this.route = null;
		}
	};

	return {
		map: function() {
			return new Map();	
		}	
	};
};

leaderMap.$inject = [];

components.factory('leaderMap', leaderMap);
