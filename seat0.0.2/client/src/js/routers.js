var routers = function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when('/leader.htm', {
			templateUrl: 'page/leader.html',
			controller: 'leaderCtrl'
		});
};

routers.$inject = ['$routeProvider'];

module.exports = routers;