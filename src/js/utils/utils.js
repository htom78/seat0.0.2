'use strict';
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
		},

		capitalizeFirstLetter(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);	
		}
	};
};

utils.$inject = ['$http'];

utilsService.factory('utils', utils);
