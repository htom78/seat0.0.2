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
		}

	};
};
userService.$inject = ['$http', '$q'];

services.factory('userService', userService);
