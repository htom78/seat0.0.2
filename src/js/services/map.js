var services = require('./index');

var some = [
	{
		location: '121.605131 29.865629'	
	},
	{
		location:	'121.609131 29.866629'
	},
	{
		location:	'121.610131 29.864629'	
	},
	{
		location: '121.607131 29.864629'
	}
];

var mapService = function() {

	var mapOptions = {};
	this.options = function(value) {
		mapOptions = value;	
	};

	this.$get = ['$http', '$q', function($http, $q) {

		var service = {
			queryByKeyword: function(words) {
				return $http.jsonp('http://restapi.amap.com/v3/assistant/inputtips?callback=JSON_CALLBACK', {
							params: {
								keywords: words	
							}	
						}).then(function(response) {
							return response.data.tips;	
						});
			},

			getNearCars: function(poi) {
				return $http.jsonp(mapOptions.nearCarUrl, {
					params: {
						location: poi	
					}	
				}).then(function(response) {
					/*
					if (response.data.list.length === 0) {
						return $q.reject();	
					}
					return response.data.list;	
					*/

					var carInfos = some;
					var info;
					for (var i = 0 ,len = carInfos.length; i < len; i ++) {
						info = carInfos[i];
						var poi = info.location.split(' ');
						//gps转火星
						//var gpsToGcj = gpsGcjExchangeUtils.gps84ToGcj02(poi[0], poi[1]);
						info.lng = poi[0];
						info.lat = poi[1];
					}

					return carInfos;
				});	
			},

			geocode: function(address) {
				return $http.jsonp('http://restapi.amap.com/v3/geocode/geo?callback=JSON_CALLBACK', {
							params: {
								address: address
							}	
						}).then(function(response) {
							if (response.data.geocodes.length > 0) {
								var lngLat = response.data.geocodes[0].location.split(',');
								return {lng: lngLat[0], lat: lngLat[1]};
							} else {
								return $q.reject();
							}
						});	
			}

		};

		return service;
	}];

};

services.provider('mapService', mapService);
