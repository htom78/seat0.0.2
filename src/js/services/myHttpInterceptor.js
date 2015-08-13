var services = require('./index');

var GAODE_REQUEST_URL_REGEXP = /http:\/\/restapi.amap.com/;

var myHttpRequestInterceptor = function() {

	var mapOptions = {};
	this.options = function(value) {
		mapOptions = value;	
	};

	this.$get = [function() {

		return {
			request: function(request) {
				if (request.method === 'JSONP' &&
						request.url.match(GAODE_REQUEST_URL_REGEXP)) {
					request.params.city = mapOptions.city;	
					request.params.key = mapOptions.key;
					request.params.s= mapOptions.version;
				}
				return request;
			}	
		};	

	}];

};

services.provider('myHttpInterceptor', myHttpRequestInterceptor);
