var resources = require('./index');

var phoneResource = function($http) {
	return {
		mobileToPosition: function(mobile) {
			var url = 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?callback=JSON_CALLBACK';
			return $http
					.jsonp(url, {
						params: {
							tel: mobile	
						}	
					})		
					.then(function(response) {
						return response.data;	
					});
		}	
	};
};

phoneResource.$inject = ['$http'];

resources.factory('phoneResource', phoneResource);
