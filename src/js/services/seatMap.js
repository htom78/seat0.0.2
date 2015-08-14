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

var seatMap = function() {

	var mapOptions = {};

	this.options = function(value) {
		mapOptions = value;	
	};


	this.$get = ['$rootScope', function($rootScope) {

		var gaode = {

			init: function(elem) {
				this.circle = null;
				this.marker = null;
				this.carMarkers = [];
				this.map = new AMap.Map(elem, {
								view: new AMap.View2D({
									center: new AMap.LngLat(mapOptions.lng, mapOptions.lat),
									zoom: 16
								})
							});
				this.createInfoWindow();
			},

			getPoint: function(lng, lat) {
				return new AMap.LngLat(lng, lat);	
			},

			addMarker: function(lng, lat) {
				if (!this.marker) {
					this.marker = new AMap.Marker({
						position: this.getPoint(lng, lat)
					});
					this.marker.setMap(this.map);
				}	
			},

			addCircle: function(lng, lat) {
				if (!this.circle) {
					this.circle = new AMap.Circle({
						center: this.getPoint(lng, lat),
						radius: mapOptions.circleRadius,
						strokeColor: mapOptions.circleBorder,
						strokeOpacity: 1,
						strokeWeight: mapOptions.circleWeight,
						fillColor: mapOptions.circleColor,
						fillOpacity: mapOptions.circleOpacity
					});
					this.circle.setMap(this.map);
				}	
			},

			setMarkerPosition: function(lng, lat) {
				if (!this.marker) {
					this.addMarker(lng, lat);	
				}
				this.marker.setPosition(this.getPoint(lng, lat));
			},

			setCirclePosition: function(lng, lat) {
				if (!this.circle) {
					this.addCircle(lng, lat);
			 	}
				this.circle.setCenter(this.getPoint(lng, lat));
			},

			setMapCenter: function(lng, lat) {
				this.map.setCenter(this.getPoint(lng, lat));	
			},

			addCarMarker: function(carInfos) {
				this.clearCarMarkers();
				var info;
				for (var i = 0, len = carInfos.length; i < len; i ++) {
					info = carInfos[i];
					var marker = new AMap.Marker({
						icon: new AMap.Icon({
							size: new AMap.Size(mapOptions.markerSize.width, mapOptions.markerSize.height),
							image: mapOptions.markerTaxiIcon 
						}),
						position: this.getPoint(info.lng, info.lat)
					});
					marker.carInfo = info;
					this.carMarkers.push(marker);
					marker.setMap(this.map);
				}
				this.carMarkerBindEvents();
			},

			carMarkerBindEvents: function() {
				var self = this;
				this.carMarkers.forEach(function(marker) {
					AMap.event.addListener(marker, 'click', self.carMarkerEventFn.bind(self));	
				});
			},

			carMarkerEventFn: function(ev) {
				this.infoWindow.open(this.map, ev.target.getPosition());	
				var currentCarInfo = this.currentCarInfo = ev.target.carInfo;
				this.boxTitle.html('<span>' + currentCarInfo.vehicleNumber + '</span><span class="distance">距离:' + currentCarInfo.refDistance + '米</span>');
			},

			createInfoWindow: function() {
				var self = this;
				var boxInfo = createInfoWindow();	
				this.boxBtn = $(boxInfo).find('button');
				this.boxTitle = $(boxInfo).find('.title');
				this.infoWindow = new AMap.InfoWindow({
					isCustom: true,
					content: boxInfo,
					offset: new AMap.Pixel(0, -45)	
				});
				this.boxBtn.on('click', this.infoWindowBtnEventFn.bind(this));
			},

			infoWindowBtnEventFn: function(ev) {
				$rootScope.$broadcast('addNewOrder', this.currentCarInfo);	
			},

			clearCarMarkers: function() {
				var self = this;
				this.carMarkers.forEach(function(carMarker) {
					AMap.event.removeListener(carMarker, 'click', self.carMarkerEventFn.bind(self));
					carMarker.setMap(null);	
				});
				this.carMarkers = [];
			},

			clearWindowInfo: function() {
				this.map.clearInfoWindow();	
			},	

			clearMarkers: function() {
				if (this.marker) {
					this.marker.setMap(null);	
				}
				if (this.circle) {
					this.circle.setMap(null);	
				}
				this.circle = null;
				this.marker = null;
				this.clearCarMarkers();
				this.clearWindowInfo();
			},

			clearMap: function() {
				this.clearMarkers();	
				if (this.boxBtn) {
					this.boxBtn.off('click', this.infoWindowBtnEventFn.bind(this));
				}
				this.boxBtn = null;
				this.boxTitle = null;
				this.infoWindow = null;
				this.currentCarInfo = null;
				this.map = null;
			}

		};

		return {
			init: function(elem) {
				gaode.init(elem);
			},

			setMarkerPosition: function(lng, lat) {
				gaode.clearMarkers();
				gaode.setMapCenter(lng, lat);
				gaode.setCirclePosition(lng, lat);
				gaode.setMarkerPosition(lng, lat);
			},

			addCarMarker: function(carInfos) {
				gaode.addCarMarker(carInfos);
			},

			clearMap: function() {
				gaode.clearMap();
			},

			resetMap: function() {
				gaode.clearMarkers();
				gaode.setMapCenter(mapOptions.lng, mapOptions.lat);	
			}
		};	
	}];

};

services.provider('seatMap', seatMap);
