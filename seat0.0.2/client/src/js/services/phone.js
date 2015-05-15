var services = require('./index');

var phoneService = function(phoneResource) {
	return {
		mobileToPosition: function(mobile) {
			return phoneResource
					.mobileToPosition(mobile);
		
		}	
	};
};

phoneService.$inject = ['phoneResource'];
services.factory('phoneService', phoneService);
