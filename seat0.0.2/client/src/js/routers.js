var routers = function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when('/index.htm', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when('/leader.htm', {
			templateUrl: 'page/leader.html',
			controller: 'leaderCtrl'
		})
		.when('/searchMore.htm', {
			templateUrl: 'page/search.html',
			controller: 'searchCtrl'
		})
		.when('/login.htm', {
			templateUrl: 'page/login.html',
			controller: 'loginCtrl',
			resolve: {
				initSign: function () {
					localStorage.setItem('parentId', 'quan');
				}
			}
		})
		.when('/police.htm', {
			templateUrl: 'page/police.html',
			controller: 'policeCtrl'	
		});
};

routers.$inject = ['$routeProvider'];

module.exports = routers;
