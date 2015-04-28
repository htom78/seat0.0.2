var routers = function ($routeProvider) {
	$routeProvider
		.when('/index.htm', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when('/', {
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
			controller: 'loginCtrl'
		});
};

routers.$inject = ['$routeProvider'];

module.exports = routers;