var utilsService = require('./index');

var utils = function($http) {
	return {

		getLocationByMobile: function(mobile) {
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

utils.$inject = ['$http'];

utilsService.factory('utils', utils);
