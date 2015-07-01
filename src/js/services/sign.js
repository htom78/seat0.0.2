var services = require('./index');

var signService = function(signResource, $q, callSocket) {
	var store = {

		parentId: null,

		getParentId: function() {
			if (store.parentId) {
				return store.parentId;	
			}	
			var parentId = localStorage.getItem('parentId');
			return parentId;
		},

		addParentId: function(parentId) {
			store.parentId = parentId;	
			localStorage.setItem('parentId', parentId);
		},
		
		clearParentId: function() {
			store.parentId = null;
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
					store.addParentId(id);
				});
		},
		unrest: function() {
			callSocket.sayFree();
			var parentId = store.getParentId();
			if (parentId) {
				return signResource.unrest(parentId)
					.then(function() {
						store.clearParentId();
					});
			}
		},

		busy: function() {
			callSocket.sayBusy();
			return signResource.busy()
					.then(function(id) {
						store.addParentId(id);
					});	
		},
		unbusy: function() {
			var defer = $q.defer();
			callSocket.sayFree();
			var parentId = store.getParentId();
			if (parentId) {
				return signResource.unbusy(parentId)
					.then(function() {
						store.clearParentId();
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

	return store;
};

signService.$inject = ['signResource', '$q', 'callSocket'];

services.factory('signService', signService);
