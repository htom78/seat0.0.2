var services = require('./index');

var ocxCall = function() {

	var ocxOptions;
	this.options = function(value) {
		ocxOptions = value;	
	};

	this.$get = ['$http', function($http) {

		var service = {
			callOutByPhone: function(phone) {
				return $http.jsonp(ocxOptions.baseUrl +  '/callOutByPhone?callback=JSON_CALLBACK', {
							params: {
								phone: phone	
							}	
						});	
			},

			callByTernimalNumber: function(terminalNumber) {
			
			},

			callTransform: function(employerNumber) {
				return $http.jsonp(ocxOptions.baseUrl + '/callTransform?callback=JSON_CALLBACK', {
					params: {
						employerNumber: employerNumber
					}	
				});
			},

			tripartiteConference: function(targetName) {
			
			}
		};

		return service;
	}];
};


services.provider('ocxCall', ocxCall);
