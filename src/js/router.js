'use strict';

function Router($locationProvider, $stateProvider, $routeProvider) {

	$locationProvider.html5Mode(true);

	$stateProvider
		.state('Login', {
			url: '/login.htm',	
			controller: 'loginCtrl',
			templateUrl: 'page/login.html',
			title: '登录'
		})
		.state('Seat', {
			url: '/main',
			templateUrl: 'page/main/index.html',
			title: 'xxxx',
			controller: 'headerCtrl'
		})
		.state('Seat.seat', {
			url: '/seat.htm',
			templateUrl: 'page/main/seat.html',
			controller: 'seatCtrl',
			title: '坐席',
			resolve: {
				init(seatService) {
					seatService.selectNormalCar();
				}	
			}
		})
		.state('Seat.special', {
			url: '/special.htm',
			templateUrl: 'page/main/seat.html',
			title: '专车',	
			controller: 'seatCtrl',
			resolve: {
				init(seatService) {
					seatService.selectSpecialCar();
				}	
			}
		})
		.state('Seat.leader', {
			url: '/leader.htm',
			templateUrl: 'page/main/leader.html',	
			controller: 'leaderCtrl',
			title: '班长',
			resolve: {
			
			}
		})
		.state('Seat.search', {
			url: '/searchMore.htm',
			templateUrl: 'page/main/search.html',	
			controller: 'searchCtrl',
			title: '搜索',
			resolve: {
				orderStatuses(searchService) {
					return 	searchService.getOrderStatuses();
				}
			}
		})
		.state('Seat.police', {
			url: '/police.htm',
			templateUrl: 'page/main/police.html',
			controller: 'policeCtrl',
			title: '报警',
			resolve: {
			}
		})
		.state('Seat.sinbad', {
			url: '/sinbad.htm',
			templateUrl: 'page/main/represent.html',
			controller: 'representCtrl',
			title: '代驾',
			resolve: {
			
			}	
		});

	/*
	var seatRouteConfig = {
		templateUrl: 'page/seat.html',
		controller: 'seatCtrl',
		title: '坐席',
		resolve: {
			init: ['seatService', '$location', function(seatService, $location) {
				if ($location.url() === '/special.htm') {
					seatService.selectSpecialCar();
				} else {
					seatService.selectNormalCar();
				}
			}]	
		}
	};

	var leadRouteConfig = {
		templateUrl: 'page/leader.html',
		controller: 'leaderCtrl',
		title: '班长',
		resolve: {
			preparedOrderCount($q, security, leaderService) {
				if (!security.isLeader()) {
					return $q.reject();
				}
				return leaderService.getOrders();
			}	
		}	
	};

	var searchRouteConfig = {
		templateUrl: 'page/search.html',
		controller: 'searchCtrl',
		title: '搜索',
		resolve: {
			startCount(searchService) {
				return searchService.getOrders({});	
			},

			orderStatuses(searchService) {
				return searchService.getOrderStatuses();	
			}
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
		*/
}


export default Router;
