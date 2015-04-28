var services = require('./index');

var seatMapService = function(gaode, utils) {
	var gaodeMap = gaode.map();
	return {
		map: function(elem) {
			gaodeMap.open(elem);
			gaodeMap.addMarker();
		},
		setMarkerPosition: function(lng, lat) {
			gaodeMap.setMarkerPosition(lng, lat);
		},
		addCarMarker: function(carInfos) {
			if (!carInfos || carInfos.length === 0) {
				return;
			}
			for (var i = 0 ,len = carInfos.length; i < len; i ++) {
				var location = carInfos[i].location.split(' ');
				//gps转火星
				var gpsTogcj = utils.gps84ToGcj02(location[0], location[1]);
				carInfos[i].location = gpsTogcj.lng + ' ' + gpsTogcj.lat;
			}
			gaodeMap.addCarMarker(carInfos);
		},
		removeCarMarker: function() {
			gaodeMap.removeCarMarker();
		}
	};
};

seatMapService.$inject = ['gaode', 'utils'];

services.factory('seatMapService', seatMapService);