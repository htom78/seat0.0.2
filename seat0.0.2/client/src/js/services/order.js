var services = require('./index');

var orderService = function(orderResource) {

	return {
		query: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				k: data.keywords,
				all: 0,
				pagesize: 6,
				callType: 1,
				page:1
			};
			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		leaderQuery: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				k: data.keywords,
				callType: data.page,
				all: 0,
				pagesize: 10,
				page:1
			};

			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		}
	};
};

orderService.$inject = ['orderResource'];

services.factory('orderService', orderService);