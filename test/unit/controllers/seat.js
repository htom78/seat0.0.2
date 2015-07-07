describe('seat controller', function() {
	beforeEach(window.angular.mock.module('app'));

	var $httpBackend, $controller, $scope;
	beforeEach(inject(function(_$httpBackend_, _$controller_, _$rootScope_) {
		$httpBackend = _$httpBackend_;	
		$controller = _$controller_;
		$scope = _$rootScope_.$new();
	}));

	var seatOrderStorageService;

	beforeEach(inject(function($injector) {
		seatOrderStorageService = $injector.get('seatOrderStorageService');	
	}));

	describe('should give prepared orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[{sn: '111222'}]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=1').respond(200, result);	
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$controller('seatCtrl', {
				$scope: $scope	
			});
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=1');
			$scope.cutOrderTabPrepared()
				.then(function() {
				expect($scope.orders.length).toBe(result.list.length);
				});	
			$httpBackend.flush();
		});
	});
});
