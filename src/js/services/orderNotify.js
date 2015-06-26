var services = require('./index');
var orderNotify = function($rootScope) {
	return {
		notify: function(status, sn) {
			var info = {};
			info.sn = sn;
			switch (status) {
				case 2:
					//已接单
					info.state = 'received';
					break;
				case 4:
				case 5:
					//已出发
					info.state = 'started';
					break;	
				case 9:
					//已完成
					info.state = 'done';
					break;
				default:
					break;
			}	
			$rootScope.$broadcast('order:stateChange', info);
		}	
	};
};

orderNotify.$inject = ['$rootScope'];

services.factory('orderNotifyService', orderNotify);
