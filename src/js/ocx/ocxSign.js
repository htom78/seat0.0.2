var services = require('./index');

var ocxSign = function() {
	var signOptions;
	this.options = function(value) {
		signOptions = value;	
	};

	this.$get = ['$http', function($http) {

		var service = {

			signIn: function() {
				return $http.jsonp(signOptions.baseUrl + '/signIn?callback=JSON_CALLBACK');
			},

			signOut: function() {
				return $http.jsonp(signOptions.baseUrl + '/signOut?callback=JSON_CALLBACK');
			},

			sayRest: function() {
				return $http.jsonp(signOptions.baseUrl + '/sayRest?callback=JSON_CALLBACK');
			},

			sayBusy: function() {
				return $http.jsonp(signOptions.baseUrl + '/sayBusy?callback=JSON_CALLBACK');
			},

			sayFree: function() {
				return $http.jsonp(signOptions.baseUrl + '/sayFree?callback=JSON_CALLBACK');
			},	

			login: function(data) {
				return $http.jsonp(signOptions.baseUrl + '/login?callback=JSON_CALLBACK', {params: data});
			},

			logout: function() {
				return $http.jsonp(signOptions.baseUrl + '/logout?callback=JSON_CALLBACK');
			},

			getCurrentState: function() {
				return $http.jsonp(signOptions.baseUrl + '/currentStatus?callback=JSON_CALLBACK')
					.then(function(response) {
						return response.data;	
					});
			}
		};	

		return service;	
	}];
};

services.provider('ocxSign', ocxSign);
