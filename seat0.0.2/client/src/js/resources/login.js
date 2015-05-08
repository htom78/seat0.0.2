var resources =  require('./index');

var loginResource = function($http) {
	return {
		login: function(data) {
			var url = window.appRoot + '/login.htm';

			return $http({
						method: 'POST',
						url: url,
						data: $.param(data),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					})
					.then(function(response) {
						return response.data;
					});
		}
	};
};

resources.factory('loginResource', loginResource);