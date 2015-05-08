var services = require('./index');
var orderNotify = function($rootScope) {
	return {
		notify: function(status, sn) {
			switch (status) {
				case 2:
					//已接单
					$rootScope.$broadcast('order:received', sn);
					break;
				case 4:
				case 5:
					//已出发
					$rootScope.$broadcast('order:started', sn);
					break;	
				case 9:
					//已完成
					$rootScope.$broadcast('order:done', sn);
					break;
				default:
					break;
			}	
		}	
	};
};

orderNotify.$inject = ['$rootScope'];

services.factory('orderNotifyService', orderNotify);
