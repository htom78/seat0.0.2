var services = require('./index');

var loginService = function($q, $http, callSocket) {
	return {
		login: function(data) {
			return $http({
				method: 'POST',
				url: 'login.htm',
				data: data,
			}).then(function(response) {
				if (response.data.isSuccess) {
					callSocket.login(data);	
				} else {
					var info;
					switch (parseInt(response.data.code)) {
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

loginService.$inject = ['$q', '$http', 'callSocket'];

services.factory('loginService', loginService);
