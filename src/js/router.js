
router.$inject = ['$locationProvider', '$routeProvider'];

export default function router($locationProvider, $routeProvider) {

	$locationProvider.html5Mode(true);

	var seatRouteConfig = {
		template: require('../html/page/seat.html'),
		controller: 'seatCtrl',
		title: '坐席',
		resolve: {
			store: ['seatService', '$location', function(seatService, $location) {
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
		template:  require('../html/page/leader.html'),
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
		template:  require('../html/page/search.html'),
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
		template:  require('../html/page/police.html'),
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
		template: require('../html/page/represent.html'),
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
			template: require('../html/page/login.html'),
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
