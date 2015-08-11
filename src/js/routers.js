var routers = function ($routeProvider) {

	var seatRouteConfig = {
		templateUrl: 'page/seat.html',
		controller: 'seatCtrl',
		title: '坐席',
		resolve: {
			store: ['seatOrderStorageService', '$location', function(seatService, $location) {
				if ($location.url() === '/special.htm') {
					seatService.selectSpecialCar();
				} else {
					seatService.selectNormalCar();
				}
				seatService.initService();
				seatService.get();
				return seatService;	
			}]	
		}
	};

	var leadRouteConfig = {
		templateUrl: 'page/leader.html',
		controller: 'leaderCtrl',
		title: '班长',
		resolve: {
			store: ['leaderOrderStorageService', function(leaderService) {
				leaderService.initService();
				leaderService.get();
				return leaderService;	
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
