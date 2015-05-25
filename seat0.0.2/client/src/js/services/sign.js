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

var signService = function(signResource, $q) {
	var parentId = getId();
	return {
		signIn: function() {
			parentId = null;
			removeId();
			return signResource.signIn();	
		},
		signOut: function() {
			parentId = null;
			removeId();
			return signResource.signOut();	
		},
		rest: function() {
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

signService.$inject = ['signResource', '$q'];

services.factory('signService', signService);
