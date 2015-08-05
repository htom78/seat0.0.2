var services = require('./index');

var signService = function(signResource, $q, callSocket) {
	var service = {

		parentId: null,

		getParentId: function() {
			if (service.parentId) {
				return service.parentId;	
			}	
			var parentId = localStorage.getItem('parentId');
			return parentId;
		},

		addParentId: function(parentId) {
			service.parentId = parentId;	
			localStorage.setItem('parentId', parentId);
		},
		
		clearParentId: function() {
			service.parentId = null;
			localStorage.removeItem('parentId');	
		},

		signIn: function() {
			callSocket.signIn();
			return signResource.signIn();	
		},

		signOut: function() {
			callSocket.signOut();
			return signResource.signOut();	
		},

		rest: function() {
			callSocket.sayRest();
			return signResource.rest()
				.then(function(id) {
					service.addParentId(id);
				});
		},
		unrest: function() {
			callSocket.sayFree();
			var parentId = service.getParentId();
			if (parentId) {
				return signResource.unrest(parentId)
					.then(function() {
						service.clearParentId();
					});
			}
		},

		busy: function() {
			callSocket.sayBusy();
			return signResource.busy()
					.then(function(id) {
						service.addParentId(id);
					});	
		},
		unbusy: function() {
			var defer = $q.defer();
			callSocket.sayFree();
			var parentId = service.getParentId();
			if (parentId) {
				return signResource.unbusy(parentId)
					.then(function() {
						service.clearParentId();
					});
			}
		},

		getCurrentState: function() {
			return callSocket.getCurrentState();	
		},

		loginOut: function() {
			callSocket.loginOut();	
		}	
	};

	return service;
};

signService.$inject = ['signResource', '$q', 'callSocket'];

services.factory('signService', signService);
