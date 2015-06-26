var services = require('./index');
var employerService = function() {
	return {
		employerName: null,
		employerType: null,
		signState: null,
		clearInfo: function() {
			this.employerName = null;
			this.employerType = null;	
			this.signState = null;
			window.signState = null;
			window.employer = null;
			window.employerType = null;
		}	
	};
};
employerService.$inject = [];
services.factory('employerService', employerService);
