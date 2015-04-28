var services = require('./index');
var userService = function(userResource, $q) {
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
		}
	};
};
userService.$inject = ['userResource', '$q'];

services.factory('userService', userService);