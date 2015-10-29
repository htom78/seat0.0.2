'use strict';

router.$inject = ['$locationProvider', '$routeProvider'];

export default function router($locationProvider, $routeProvider) {

	$locationProvider.html5Mode(true);

	var seatRouteConfig = {
		templateUrl: 'page/seat.html',
		controller: 'seatCtrl',
		title: '坐席',
		resolve: {
			initCount: ['seatService', '$location', function(seatService, $location) {
				if ($location.url() === '/special.htm') {
					seatService.selectSpecialCar();
				} else {
					seatService.selectNormalCar();
				}
				return seatService.getPreparedOrders();
			}]	
		}
	};

	var leadRouteConfig = {
		templateUrl: 'page/leader.html',
		controller: 'leaderCtrl',
		title: '班长',
		resolve: {
			store: ['leaderService', function(leaderService) {
				/*
				leaderService.initService();
				leaderService.get();
				return leaderService;	
				*/
			}]	
		}	
	};

	var searchRouteConfig = {
		templateUrl: 'page/search.html',
		controller: 'searchCtrl',
		title: '搜索',
		resolve: {
			initCount: ['searchService', function(searchService) {
				return searchService.getAllOrders();	
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

	var representConfig = {
		templateUrl: 'page/represent.html',
		controller: 'representCtrl',
		title: '代驾',
		resolve: {
			store: ['representService', function(representService) {
				representService.getOrders();
				return representService;	
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
		.when('/special.htm', seatRouteConfig)
		.when('/sinbad.htm', representConfig);
}
