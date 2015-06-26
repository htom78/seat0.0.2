var resoruces = require('./index');


var order = function($http) {
	return {
		//添加新的订单
		add: function (data) {
			var url = 'call.htm';
			return $http({
							method: 'POST',
							url: url,
							data: $.param(data),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {
							return response.data;
						});
		},
		query: function(data) {
			var url = 'search.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		queryMore: function(data) {
			var url = 'search/more.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		getStepInfo: function(data) {
			var url = 'search/route.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		assign: function(data) {
			var url = 'assign.htm';
			return $http({
							method: 'POST',
							url: url,
							data: $.param(data),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {
							return response.data;
						});
		},
		cancelOrder: function(sn) {
			var url = 'cancel/1.htm';
			return $http({
							method: 'POST',
							url: url,
							data: $.param({sn: sn}),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {
							return response.data;
						});
		},
		passengerFuck: function(sn) {
			var url = 'cancel/6.htm';
			return $http({
							method: 'POST',
							url: url,
							data: $.param({sn: sn}),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {
							return response.data;
						});
		},
		driverFuck: function(sn) {
			var url = 'cancel/7.htm';
			return $http({
							method: 'POST',
							url: url,
							data: $.param({sn: sn}),
							headers: {'Content-Type': 'application/x-www-form-urlencoded'}
						})
						.then(function(response) {
							return response.data;
						});
		}
	};
};

order.$inject = ['$http'];

resoruces.factory('orderResource', order);
