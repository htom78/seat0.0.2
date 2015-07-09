var services = require('./index');

var security = function($http, $q, $location, callSocket) {

	function redirect(url) {
		url = url || '/';
		$location.path(url);	
	}
	
	var service = {

		currentUser: null,

		login: function(username, password) {
			return $http({
				url: 'login.htm',	
				method: 'POST',
				data: $.param({username: username, password: password}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				if (response.data.isSuccess) {
					callSocket.login({username: username, password: password});
				} else {
					var errorInfo;
					switch (parseInt(response.data.code)) {
						case 20:
							errorInfo = '用户不存在';
							break;
						case 21:
							errorInfo = '密码错误';
							break;
						default:
							errorInfo = '登录错误';
							break;
					}	
					return $q.reject(errorInfo);	
				}
			});	
		},

		logout: function() {
			return $http({
				method: 'POST',
				url: 'logout.htm',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function() {
				window.currentUser = null;	
				redirect('login.htm');
			});
		},

		requestCurrentUser: function() {
			if (service.isAuthenticated()) {
				return $q.when(service.currentUser);	
			} else {
				/*
				return $http.get('currentUser').then(function(response) {
					service.currentUser = response.data.user;	
					return service.currentUser;
				});	
				*/
				return $q.reject();
			}	
		},

		isAuthenticated: function() {
			service.currentUser = window.currentUser;
			return !!service.currentUser;	
		},

		isLeader: function() {
			return !!(service.currentUser && window.userType === 'seat_leader');	
		}
	};

	return service;
};

security.$inject = ['$http', '$q', '$location', 'callSocket'];

services.factory('security', security);
