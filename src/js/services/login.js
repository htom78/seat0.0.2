var services = require('./index');

var loginService = function($q, loginResource, callSocket) {
	return {
		login: function(data) {
			var defer = $q.defer();
			/*
			return loginResource
						.login(data)
						.then(function(response) {
							if (response.isSuccess) {
								return 'ok';
							} else {
								var info;
								switch (parseInt(response.code)) {
									case 20:
										info = '用户不存在';
										break;
									case 21:
										info = '密码错误';
										break;
									default:
										info = '登录错误';
										break;
								}
								return $q.reject(info);
							}
						});
						*/
			loginResource.login(data)
				.then(function(response) {
					if (response.isSuccess) {
						callSocket.login(data);
						defer.resolve();
					}	else {
						var info;
						switch (parseInt(response.code)) {
							case 20:
								info = '用户不存在';
								break;
							case 21:
								info = '密码错误';
								break;
							default:
								info = '登录错误';
								break;
						}
						defer.reject(info);
					}
				});

			return defer.promise;
		}
	};
};

loginService.$inject = ['$q', 'loginResource', 'callSocket'];

services.factory('loginService', loginService);
