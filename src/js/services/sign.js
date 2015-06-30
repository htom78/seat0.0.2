var services = require('./index');

function saveId(id) {
	localStorage.setItem('parentId', id);
}

function removeId() {
	localStorage.removeItem('parentId');
}

function getId() {
	return localStorage.getItem('parentId');
}

var signService = function(signResource, $q, callSocket) {
	var parentId = getId();
	return {
		signIn: function() {
			parentId = null;
			removeId();
			callSocket.signIn();
			return signResource.signIn();	
		},
		signOut: function() {
			parentId = null;
			removeId();
			callSocket.signOut();
			return signResource.signOut();	
		},
		rest: function() {
			callSocket.sayRest();
			return signResource
					.rest()
					.then(function(id) {
						if (id) {
							parentId = id;	
							saveId(id);
							return parentId;
						} else {
							return $q.reject();	
						}
					}, function() {
						parentId = null;	
						removeId();
						return $q.reject();
					});	
		},
		unrest: function() {
			var defer = $q.defer();
			if (!parentId) {
				defer.reject();	
			} else {
				callSocket.sayFree();
				signResource
					.unrest(parentId)
					.then(function() {
						parentId = null;
						removeId();
						defer.resolve();	
					}, function() {
						parentId = null;
						removeId();
						defer.reject();	
					});	
			}
			return defer.promise;
		},
		busy: function() {
			callSocket.sayBusy();
			return signResource
					.busy()
					.then(function(id) {
						if (id) {
							parentId = id;	
							saveId(id);
							return parentId;	
						} else {
							return $q.reject();	
						}
					}, function() {
						parentId = null;	
						removeId();
						return $q.reject();
					});	
		},
		unbusy: function() {
			var defer = $q.defer();
			if (parentId) {
				callSocket.sayFree();
				signResource
					.unbusy(parentId)
					.then(function() {
						parentId = null;
						removeId();
						defer.resolve();	
					}, function() {
						parentId = null;
						removeId();
						defer.reject();	
					});	
			} else {
				defer.reject();	
			}
			return defer.promise;
		}	
	};
};

signService.$inject = ['signResource', '$q', 'callSocket'];

services.factory('signService', signService);
