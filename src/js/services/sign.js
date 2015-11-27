'use strict';

function Sign($http) {
	var service = {

		markSignId(id) {
			this.signId = parseInt(id);
		},

		clearSignId() {
			this.signId = null;		
		},

		signOut() {
			return $http.post('sign/2.htm', {parentId: 0});	
		},

		signIn() {
			return $http.post('sign/1.htm', {parentId: 0});	
		},
			
		rest() {
			return $http.post('sign/3.htm', {parentId: 0})
				.then((response) => {
					this.markSignId(response.data.msg);	
				});
		},

		unrest() {
			return $http.post('sign/4.htm', {parentId: this.signId})
				.then(() => {
					this.clearSignId();	
				});
		},

		busy: function() {
			return $http.post('sign/5.htm', {parentId: 0})
				.then((response) => {
					this.markSignId(response.data.msg);	
				});
		},

		//取消示忙
		unbusy: function() {
			return $http.post('sign/6.htm', {parentId: this.signId})
				.then(() => {
					this.clearSignId();
				});
		},
	};

	return service;
}

export default {
	name: 'signService',
	fn: Sign
};

