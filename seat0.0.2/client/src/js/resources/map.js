var resources = require('./index');

var mapResource = function($http, properties) {
	return {
		getNearCars: function(location) {
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
								s: properties.version,
								key: properties.key,
								city: properties.city,
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
								s: properties.version,
								key: properties.key,
								city: properties.city,
								address: address
							}
						})
						.then(function(response) {
							return response.data;
						});
		} 
	};
};

mapResource.$inject = ['$http', 'properties'];
resources.factory('mapResource', mapResource);
