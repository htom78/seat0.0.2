var resources = require('./index');

var signResource = function($http, $q) {
	function request(url, id) {
		return $http({
				method: 'POST',
				url: url,
				data: $.param({parentId: id}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function(response) {
			if (response.data && response.data.isSuccess) {
				return response.data.msg;	
			} else {
				return $q.reject();	
			}
		});	
	}
	return {
		//签入
		signIn: function() {
			var url = window.appRoot + '/sign/1.htm';
			return request(url, 0);
		},
		//签出
		signOut: function() {
			var url = window.appRoot + '/sign/2.htm';
			return request(url, 0);
		},
		//小休
		rest: function() {
			var url = window.appRoot + '/sign/3.htm';
			return request(url, 0);
		},
		//取消休息
		unrest: function(id) {
			var url = window.appRoot + '/sign/4.htm';
			return request(url, id);
		},
		//示忙
		busy: function() {
			var url = window.appRoot + '/sign/5.htm';
			return request(url, 0);
		},
		//取消示忙
		unbusy: function(id) {
			var url = window.appRoot + '/sign/6.htm';
			return request(url, id);
		}	
	};
};

signResource.$inject = ['$http', '$q'];

resources.factory('signResource', signResource);
