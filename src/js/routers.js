var routers = function ($routeProvider) {
	var seatRouteConfig = {
		templateUrl: 'page/seat.html',
		controller: 'seatCtrl',
		title: '坐席',
		resolve: {
			store: ['seatOrderStorageService', '$location', function(seatOrderStorageService, $location) {
				if ($location.url() === '/special.htm') {
					seatOrderStorageService.setCallType(2);	//专车
				} else {
					seatOrderStorageService.setCallType(1);	
				}
				seatOrderStorageService.initOrderSearchParams();
				seatOrderStorageService.getPreparedOrders();
				return seatOrderStorageService;	
			}]	
		}
	};

	var leadRouteConfig = {
		templateUrl: 'page/leader.html',
		controller: 'leaderCtrl',
		title: '班长',
		resolve: {
			store: ['leaderOrderStorageService', function(leaderOrderStorageService) {
				leaderOrderStorageService.initOrderSearchParams();	
				leaderOrderStorageService.getPrepared();	
				return leaderOrderStorageService;	
			}]	
		}	
	};

	var searchRouteConfig = {
		templateUrl: 'page/search.html',
		controller: 'searchCtrl',
		title: '搜索',
		resolve: {
			store: ['searchOrderStorageService', function(searchOrderStorageService) {
				searchOrderStorageService.initOrderSearchParams();
				searchOrderStorageService.getAllOrders();
				return searchOrderStorageService;	
			}]	
		}	
	};

	var policeRouteConfig = {
		templateUrl: 'page/police.html',
		controller: 'policeCtrl',
		title: '报警',
		resolve: {
			store: ['policeService', function(policeService) {
				policeService.initService();
				policeService.get();
				return policeService;	
			}]	
		}
	};

	$routeProvider
		.when('/', seatRouteConfig)
		.when('/index.htm', seatRouteConfig)
		.when('/leader.htm', leadRouteConfig)
		.when('/searchMore.htm', searchRouteConfig)
		.when('/login.htm', {
			templateUrl: 'page/login.html',
			controller: 'loginCtrl',
			title: '登录',
			resolve: {
				initSign: function () {
					localStorage.setItem('parentId', 'quan');
				}
			}
		})
		.when('/police.htm', policeRouteConfig)
		.when('/special.htm', seatRouteConfig);
};

routers.$inject = ['$routeProvider'];

module.exports = routers;