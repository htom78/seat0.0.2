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
			return request('sign/1.htm', 0);
		},
		//签出
		signOut: function() {
			return request('sign/2.htm', 0);
		},
		//小休
		rest: function() {
			return request('sign/3.htm', 0);
		},
		//取消休息
		unrest: function(id) {
			return request('sign/4.htm', id);
		},
		//示忙
		busy: function() {
			return request('sign/5.htm', 0);
		},
		//取消示忙
		unbusy: function(id) {
			return request('sign/6.htm', id);
		}	
	};
};

signResource.$inject = ['$http', '$q'];

resources.factory('signResource', signResource);
