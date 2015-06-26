var services = require('./index');

var seatMapService = function(gaode, gpsGcjExchangeUtils, properties) {
	var gaodeMap = gaode.map();
	return {
		map: function(elem) {
			gaodeMap.open(elem);
			gaodeMap.addMarker();
			gaodeMap.addCircle();
		},
		setMarkerPosition: function(lng, lat) {
			gaodeMap.setMarkerPosition(lng, lat);
			gaodeMap.setCirclePosition(lng, lat);
			gaodeMap.showMarker();
			gaodeMap.showCircle();
		},
		addCarMarker: function(carInfos) {
			if (!carInfos || carInfos.length === 0) {
				return;
			}
			for (var i = 0 ,len = carInfos.length; i < len; i ++) {
				var location = carInfos[i].location.split(' ');
				//gps转火星
				var gpsTogcj = gpsGcjExchangeUtils.gps84ToGcj02(location[0], location[1]);
				carInfos[i].location = gpsTogcj.lng + ' ' + gpsTogcj.lat;
			}
			gaodeMap.addCarMarker(carInfos);
		},
		removeCarMarker: function() {
			gaodeMap.removeCarMarker();
		},
		resetMap: function() {
			gaodeMap.hideMarker();
			gaodeMap.hideCircle();
			gaodeMap.setMapCenter(properties.lng, properties.lat);	
			gaodeMap.removeCarMarker();
		}
	};
};

seatMapService.$inject = ['gaode', 'gpsGcjExchangeUtils', 'properties'];

services.factory('seatMapService', seatMapService);
