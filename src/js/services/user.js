var services = require('./index');
var userService = function(userResource, $q, $http) {
	return {
		getUserInfoToMobile: function(mobile) {
			return userResource
						.getUserInfoToMobile(mobile)
						.then(function(response) {
							if (response.sn) {
								return response;
							} else {
								return $q.reject();
							}
						});
		},
		loginOut: function() {
			return $http({
				method: 'POST',
				url: 'logout.htm',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});	
		}
	};
};
userService.$inject = ['userResource', '$q', '$http'];

services.factory('userService', userService);
