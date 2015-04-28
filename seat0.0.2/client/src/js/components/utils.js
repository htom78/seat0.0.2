var components = require('./index');

var pi = Math.PI;
var ee = 0.00669342162296594323;
var a = 6378245.0;

function outOfChina(lng, lat) {
	if (lng < 72.004 || lng > 137.8347) {
		return true;
	}
	if (lat < 0.8293 || lat > 55.8271) {
		return true;
	}
	return false;
}

function transformLat(x, y) {
	var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));  
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;  
        ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;  
        ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;  
        return ret;  
}

function  transformLng(x, y) {
	var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));  
        ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;  
        ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;  
        ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;  
        return ret;  
}

function transform(lng, lat) {
	lng = parseFloat(lng);
	lat = parseFloat(lat);
	if (outOfChina(lng, lat)) {
		return { 
			lng: lng,
			lat: lat
		};
	}
	var dLat = transformLat(lng - 105.0, lat - 35.0);
	var dLng = transformLng(lng - 105.0, lat - 35.0);  

	var radLat = lat / 180 * pi;
	var magic = Math.sin(radLat);
	magic = 1 - ee * magic * magic;

	var sqrtMagic = Math.sqrt(magic); 

	dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);  
	dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);

	var mgLat = lat + dLat;  
		var mgLng = lng + dLng;    

	return {
		lng: mgLng,
		lat: mgLat
	};
}

var utils = function() {
	return {
		calculateAngle: function(total, count, offsetAngle) {
			offsetAngle = offsetAngle || 0;
			var angle = 180 * (count / total);
			return angle > (180 - offsetAngle) ? (180 - offsetAngle) : angle;
		},
		calculateAngleForData: function(data) {
				var total = 0,
					i;
				for (i in data) {
					total += data[i];
				}
				var result = {};
				for (i in data) {
					result[i] = this.calculateAngle(total, data[i]);
				}
				result.total = total;
				return result;
		},
		//gps 转 火星坐标系 (GCJ-02)
		gps84ToGcj02: function(lng, lat) {
			return transform(lng, lat);
		},
		//火星坐标系 (GCJ-02) 转 gps
		gcj02ToGps84: function(lng, lat) {
			var gps = transform(lng, lat);
			var longitude = lng * 2 - gps.lng;
			var latitude = lat * 2 - gps.lat;
			return {
				lng: longitude,
				lat: latitude
			};
		}
	};
};

utils.$inject = [];
components.factory('utils', utils);
