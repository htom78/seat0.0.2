var services = require('./index');
var userService = function($http, $q) {
	return {
		getUserInfoByMobile: function(mobile) {
			return $http.get('statis/m.htm', { params: {mobile: mobile}})
				.then(function(response) {
					if (response.data.sn) {
						return response.data;	
					} else {
						return $q.reject();	
					}	
				});
		},
		fromMobileGetLocation: function(mobile) {
			return $http.jsonp('http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?callback=JSON_CALLBACK', {
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
userService.$inject = ['$http', '$q'];

services.factory('userService', userService);
