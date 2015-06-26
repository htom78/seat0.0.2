var services = require('./index');

function createInfoWindow() {
	var infoBox = document.createElement('div');
	infoBox.className = 'map-dialog';

	var title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = '车牌号:65535';

	var btnWrap = document.createElement('div');
	btnWrap.className = 'btn-wrapper';

	var btn = document.createElement('button');
	btn.innerHTML = '指派';

	btnWrap.appendChild(btn);

	infoBox.appendChild(title);
	infoBox.appendChild(btnWrap);
	return infoBox;
}

/************************************/
var gaode = function($rootScope, properties) {
	function Map() {
		this.carMarkers = [];
	}

	Map.prototype.open = function(elem) {
		this.map = new AMap.Map(elem.get(0), {
						view: new AMap.View2D({
							center: new AMap.LngLat(properties.lng, properties.lat),
							zoom: 16
						})
					});
		this.createInfoWindow();
	};

	Map.prototype.getPoint = function(lng, lat) {
		return new AMap.LngLat(lng, lat);
	};

	Map.prototype.addMarker = function() {
		this.marker = new AMap.Marker({
			position:this.map.getCenter()
		});
		this.marker.setMap(this.map);
		this.marker.hide();
	};

	Map.prototype.addCircle = function() {
		this.circle = new AMap.Circle({
			center: this.map.getCenter(),
			radius: properties.circleRadius,
			strokeColor: properties.circleBorder,
			strokeOpacity: 1,
			strokeWeight: properties.circleWeight,
			fillColor: properties.circleColor,
			fillOpacity: properties.circleOpacity
		});
		this.circle.setMap(this.map);
		this.circle.hide();
	
	};

	Map.prototype.setMarkerPosition = function(lng, lat) {
		var pointer = this.getPoint(lng, lat);
		this.marker.setPosition(pointer);
		this.map.setCenter(pointer);
	};

	Map.prototype.setCirclePosition = function(lng, lat) {
		var pointer = this.getPoint(lng, lat);
		this.circle.setCenter(pointer);
	};

	Map.prototype.setMapCenter = function(lng, lat) {
		var pointer = this.getPoint(lng, lat);
		this.map.setCenter(pointer);	
	};

	Map.prototype.hideMarker = function() {
		this.marker.hide();	
	};
	Map.prototype.showMarker = function() {
		this.marker.show();	
	};

	Map.prototype.hideCircle = function() {
		this.circle.hide();	
	};
	Map.prototype.showCircle = function() {
		this.circle.show();	
	};

	Map.prototype.addCarMarker = function(carInfos) {
		this.removeCarMarker();
		if (!carInfos) {
			return;
		}
		carInfos = carInfos.list;
		for (var i = 0, len = carInfos.length; i < len; i ++) {
			var lngLat = carInfos[i].location.split(' ');

			var marker = new AMap.Marker({
				icon: new AMap.Icon({
					size: new AMap.Size(22, 32),
					image: properties.markerTaxiIcon 
				}),
				position: this.getPoint(lngLat[0], lngLat[1])
			});
			marker.carInfo = carInfos[i];
			this.carMarkers.push(marker);
			marker.setMap(this.map);
		}
		this.carMarkerAddEvent();
	};

	Map.prototype.removeCarMarker = function() {
		var markers = this.carMarkers;
		if (markers) {
			for (var i = 0, len = markers.length; i < len; i ++) {
				markers[i].setMap(null);
			}
		}
		AMap.event.removeListener('click');
		this.carMarkers = [];
		this.clearInfoWindow();
	};

	//点击坐标，发生事件
	Map.prototype.carMarkerAddEvent = function() {
		var self = this;
		var addInfo = function(ev) {
			self.infoWindow.open(self.map, ev.target.getPosition());
			self.currentCarInfo = ev.target.carInfo;
			self.boxTitle.html('<span>' + self.currentCarInfo.vehicleNumber + '</span><span class="distance">距离:' + self.currentCarInfo.refDistance + '米</span>');
		};
		var markers = this.carMarkers;
		for (var i = 0, len = markers.length; i < len; i ++) {
			AMap.event.addListener(markers[i], 'click', addInfo);	
		}
	};

	Map.prototype.createInfoWindow = function() {
		var self = this;
		var boxInfo = createInfoWindow();
		this.boxTitle = $(boxInfo).find('.title');
		self.boxBtn = $(boxInfo).find('button');
		var scope = $rootScope.$new();
		self.boxBtn.on('click', function() {
			$rootScope.$broadcast('addNewOrder', self.currentCarInfo);
		});
		this.infoWindow = new AMap.InfoWindow({
			isCustom: true,
			content: boxInfo,
			offset:new AMap.Pixel(0, -45)
		});
	};

	Map.prototype.clearInfoWindow = function() {
		this.map.clearInfoWindow();
	};

	return {
		map: function() {
			return new Map();
		}
	};
};

gaode.$inject = ['$rootScope', 'properties'];

services.factory('gaode', gaode);
