var resoruces = require('./index');


var order = function($http) {
	return {
		add: function (data) {
			var url = '/call.htm';
			return $http
						.post(url, data)
						.then(function(response) {
							return response.data;
						});
		},
		query: function(data) {
			var url = '/search.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		}
	};
};

order.$inject = ['$http'];

resoruces.factory('orderResource', order);