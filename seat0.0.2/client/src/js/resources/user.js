var resources = require('./index');

var userResource = function($http) {
	return {
		getUserInfoToMobile: function(mobile) {
			var url = window.appRoot + '/statis/m.htm';
			return $http
						.get(url, {
							params: {
								mobile: mobile
							}
						})
						.then(function(response) {
							return response.data;
						});
		}
	};
};

userResource.$inject = ['$http'];

resources.factory('userResource', userResource);