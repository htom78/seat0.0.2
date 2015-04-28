var resources = require('./index');

var carResource = function($http) {
	return {
		getNearCars: function(location) {
			var url = 'http://192.168.0.242:9090/aladdin-service/rest/instant/vnearby?myjsonp=JSON_CALLBACK';
			return $http
						.jsonp(url, {
							params: {
								location: location
							}
						})
						.then(function(response) {
							console.log(response);
						});
		}
	};
};

carResource.$inject = ['$http'];


resources.factory('carResource', carResource);