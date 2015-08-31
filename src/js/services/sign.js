var services = require('./index');

var signService = function($http, $q, ocxSign) {
	var service = {

		parentId: null,

		getParentId: function() {
			if (this.parentId) {
				return this.parentId;	
			}	
			var parentId = this.parentId = localStorage.getItem('parentId');
			return parentId;
		},

		addParentId: function(parentId) {
			this.parentId = parentId;	
			localStorage.setItem('parentId', parentId);
		},
		
		clearParentId: function() {
			this.parentId = null;
			localStorage.removeItem('parentId');	
		},

		signIn: function() {
			ocxSign.signIn();
			return $http.post('sign/1.htm', {parentId: 0});	
		},

		signOut: function() {
			ocxSign.signOut();
			return $http.post('sign/2.htm', {parentId: 0});	
		},

		//小休
		rest: function() {
			var self = this;
			ocxSign.sayRest();
			return $http.post('sign/3.htm', {parentId: 0})
				.then(function(response) {
					self.addParentId(response.data.msg);	
				});
		},

		//取消休息
		unrest: function() {
			var self = this;
			var parentId = this.getParentId();
			if (!parentId) {
				return $q.reject();
			}
			ocxSign.sayFree();
			return $http.post('sign/4.htm', {parentId: parentId})
				.then(function() {
					self.clearParentId();	
				});
		},

		//示忙
		busy: function() {
			var self = this;
			ocxSign.sayBusy();
			return $http.post('sign/5.htm', {parentId: 0})
				.then(function(response) {
					self.addParentId(response.data.msg);	
				});
		},

		//取消示忙
		unbusy: function() {
			var self = this;
			var parentId = this.getParentId();
			if (!parentId) {
				return $q.reject();	
			}
			ocxSign.sayFree();
			return $http.post('sign/6.htm', {parentId: parentId})
				.then(function() {
					self.clearParentId();	
				});
		},

		getCurrentState: function() {
			return ocxSign.getCurrentState();	
		},

		logout: function() {
			ocxSign.logout();	
		}	
	};

	return service;
};

signService.$inject = ['$http', '$q', 'ocxSign'];

services.factory('signService', signService);
