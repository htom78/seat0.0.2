var services = require('./index');

var loginService = function($q, loginResource) {
	return {
		login: function(data) {
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
		}
	};
};

loginService.$inject = ['$q', 'loginResource'];

services.factory('loginService', loginService);