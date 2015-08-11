var services = require('./index');

var socketMessageService = function($rootScope, alarmMessageService, orderStateChangeMessage) {
	return {

		message: function(data) {
			//$rootScope.$emit('socketMessage', msg);	
			var type = data.type;
			switch (type) {

				case 1:
					orderStateChangeMessage.message(data.msg);
					break;

				case 2:
					alarmMessageService.message(data.msg);
					break;	

				case 3:
					alarmMessageService.itemSelected(data.msg);
					break;
				default: 
					break;
			}
		}	

	};
};

socketMessageService.$inject = ['$rootScope', 'alarmMessageService', 'orderStateChangeMessage'];

services.factory('socketMessageService', socketMessageService);
