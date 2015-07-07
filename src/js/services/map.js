var services = require('./index');

var mapService = function(mapResource) {
	return {
		queryByKeyword: function(words) {
			return mapResource
						.queryByKeyword(words)
						.then(function(response) {
							return response.tips;
						});
		},
		geocode: function(address) {
			return mapResource
						.geocode(address)
						.then(function(response) {
							if (response.geocodes.length > 0) {
								var lngLat = response.geocodes[0].location.split(',');
								return {lng: lngLat[0], lat: lngLat[1]};
							} else {
								return {lng: 0, lat: 0};
							}
						});
		},
		getNearCars: function(location) {
			return mapResource
						.getNearCars(location);
		}
	};
};

mapService.$inject = ['mapResource'];

services.factory('mapService', mapService);
