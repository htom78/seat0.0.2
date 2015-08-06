var services = require('./index');

var socketMessageService = function($rootScope, alarmMessageService) {
	return {

		message: function(data) {
			//$rootScope.$emit('socketMessage', msg);	
			var type = data.type;
			switch (type) {

				case 1:
					break;

				case 2:
					alarmMessageService.message(data.msg);
					break;	

				default: 
					break;
			}
		}	

	};
};

socketMessageService.$inject = ['$rootScope', 'alarmMessageService'];

services.factory('socketMessageService', socketMessageService);
