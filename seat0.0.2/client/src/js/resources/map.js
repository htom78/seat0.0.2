var resources = require('./index');
var mapConfig = {
	version: 'rsv3',
	key: 'd64e2c774ba08ec5d8fd282640cd546e',
	city: '宁波',
};

var mapResource = function($http) {
	return {
		getNearCars: function(location) {
			//var temp = 'http://192.168.0.242:18003/aladdin-service';
			var url = window.aspath + '/rest/instant/vnearby?myjsonp=JSON_CALLBACK';
			return $http
						.jsonp(url, {
							params: {
								location: location
							}
						})
						.then(function(response) {
							return response.data;
						});
		},
		queryByKeyword: function(keyword) {
			return $http
						.jsonp('http://restapi.amap.com/v3/assistant/inputtips?callback=JSON_CALLBACK', {
							params: {
								s: mapConfig.version,
								key: mapConfig.key,
								city: mapConfig.city,
								keywords: keyword
							}
						})
						.then(function(response) {
							return response.data;
						});
		},
		geocode: function(address) {
			return $http
						.jsonp('http://restapi.amap.com/v3/geocode/geo?callback=JSON_CALLBACK', {
							params: {
								s: mapConfig.version,
								key: mapConfig.key,
								city: mapConfig.city,
								address: address
							}
						})
						.then(function(response) {
							return response.data;
						});
		} 
	};
};

mapResource.$inject = ['$http'];
resources.factory('mapResource', mapResource);