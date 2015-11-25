'use strict';

function Security($q, $http, $location, ocxSign) {

	function redirect(url) {
		url = url || '/';
		$location.path(url);	
	}

	const service = {

		currentUser: null,

		isAuthenticated() {
			return !!service.currentUser;	
		},

		isLeader() {
			return service.isAuthenticated() && window.isLeader;
		},

		login(username, password) {
		
			return $http.post('login.htm', {
				username: username,
				password: password	
			})
				.then((response) => {
					if (response.data.isSuccess) {
						//ocxSign.login({username: username, password: password});
						redirect('index.htm');
					} else {
						var errorInfo;
						switch (parseInt(response.data.code)) {
							case 20:
								errorInfo = '用户不存在';
								break;
							case 21:
								errorInfo = '密码错误';
								break;
							default:
								errorInfo = '登录错误';
								break;
						}	
						return $q.reject(errorInfo);	
					}
				});
		},


		logout() {
			return $http.post('logout.htm')
				.then(() => {
					this.clearUserInfo();
					redirect('login.htm');
				});
		},

		clearUserInfo() {
			this.currentUser = null;
			window.currentUser = null;	
		},

		requestCurrentUser() {
			if (this.isAuthenticated()) {
				return $q.when(this.currentUser);	
			} else {
				this.currentUser = window.currentUser;
				if (!this.currentUser && $location.url() !== '/login.htm') {
					redirect('/login.htm');	
					return $q.reject();
				} else {
					return $q.when(this.currentUser);	
				}
			}	
		}

			
	};

	return service;

}

export default {
	name: 'security',
	fn: Security
};
