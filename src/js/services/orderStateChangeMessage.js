var services = require('./index');

var orderStateChangeMessage = function($rootScope) {
	return {
		message: function(msg) {
			var status = msg.status;	

			switch (status) {
				case 2: //receive
					$rootScope.$broadcast('order:received', msg);
					break;

				case 4:	
				case 5://depart
					$rootScope.$broadcast('order:depart', msg);
					break;

				case 9: //done
					$rootScope.$broadcast('order:done', msg);
					break;

				default:
					break;
			}
		}	
	};
};

orderStateChangeMessage.$inject = ['$rootScope'];

services.factory('orderStateChangeMessage', orderStateChangeMessage);
