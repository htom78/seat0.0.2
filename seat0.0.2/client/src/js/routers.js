var routers = function ($routeProvider) {
	var approot = window.appRoot;
	$routeProvider
		.when(approot + '/index.htm', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when(approot + '/', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when(approot + '/leader.htm', {
			templateUrl: 'page/leader.html',
			controller: 'leaderCtrl'
		})
		.when(approot + '/searchMore.htm', {
			templateUrl: 'page/search.html',
			controller: 'searchCtrl'
		})
		.when(approot + '/login.htm', {
			templateUrl: 'page/login.html',
			controller: 'loginCtrl'
		})
		.when(approot + '/police.htm', {
			templateUrl: 'page/police.html',
			controller: 'policeCtrl'	
		});
};

routers.$inject = ['$routeProvider'];

module.exports = routers;
