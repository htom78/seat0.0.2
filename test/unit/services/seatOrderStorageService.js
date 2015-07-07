describe('seat order service', function() {
	beforeEach(window.angular.mock.module('app'));	

	var $httpBackend;
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;	
	}));

	var seatOrderStorageService, properties;

	beforeEach(inject(function($injector) {
		seatOrderStorageService = $injector.get('seatOrderStorageService');	
		properties = $injector.get('properties');
	}));	

	

	describe('add new order', function() {
		beforeEach(function() {
			$httpBackend.whenPOST('call.htm').respond(200, {status: 0, sn: '123456'});	
			$httpBackend.whenJSONP('http://restapi.amap.com/v3/geocode/geo?callback=JSON_CALLBACK&address=ningbo&city=' + properties.city + '&key=' + properties.key + '&s=' + properties.version)
				.respond(200, {geocodes: [{location: '121.609614,29.866413'}]});
		});	

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('add order ok', function() {
			$httpBackend.expectPOST('call.htm');
			var orderData = {
				start: 'ningbo',
				end: 'ningbo'
			};
			seatOrderStorageService.addNewOrder(orderData)
				.then(function(response) {
					expect(response.sn).toEqual('123456');
				});	

			$httpBackend.flush();
		});
	});

	describe('get prepared orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=1')
				.respond(200, result);	
		});	

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=1');
			seatOrderStorageService.getPreparedOrders()
				.then(function(response) {
					expect(seatOrderStorageService.orders).toEqual(response);
				});	

			$httpBackend.flush();
		});
	});

	describe('get received orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=2')
				.respond(200, result);	
		});	

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=2');	
			seatOrderStorageService.getReceivedOrders()
				.then(function(response) {
					expect(seatOrderStorageService.orders).toBe(response);	
				});

			$httpBackend.flush();
		});
	});

	describe('get start orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=3').respond(200, result);	
		});	

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=3');
			seatOrderStorageService.getStartedOrders()
				.then(function(response) {
					expect(response).toBe(seatOrderStorageService.orders);	
				});	

			$httpBackend.flush();
		});

	});

	describe('get done orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=4').respond(200, result);
		});

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=4');
			seatOrderStorageService.getDoneOrders()
				.then(function(response) {
					expect(seatOrderStorageService.orders).toBe(response);	
				});	
			$httpBackend.flush();
		});
	
	});

	describe('get exception orders', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=0').respond(200, result);
		});	

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=0');
			seatOrderStorageService.getExceptionOrders()
				.then(function(response) {
					expect(response).toBe(seatOrderStorageService.orders);	
				});	

			$httpBackend.flush();
		});
	});

	describe('get orders by keywords', function() {
		var result;
		beforeEach(function() {
			result = {"sec":1144,"total":0,"list":[]};
			seatOrderStorageService.initOrderSearchParams();
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=4').respond(200, result);
			$httpBackend.whenGET('search.htm?all=0&callType=1&isImmediate=1&k=134&page=1&pagesize=6&status=4').respond(200, result);
		});		

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();	
		});

		it('get ok', function() {
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=&page=1&pagesize=6&status=4');
			$httpBackend.expectGET('search.htm?all=0&callType=1&isImmediate=1&k=134&page=1&pagesize=6&status=4');
			seatOrderStorageService.getDoneOrders();
			seatOrderStorageService.getCurrentOrdersByKeywords('134')
				.then(function(response) {
					expect(response).toBe(seatOrderStorageService.orders);;	
				});		
			$httpBackend.flush();
		});
	});

});
