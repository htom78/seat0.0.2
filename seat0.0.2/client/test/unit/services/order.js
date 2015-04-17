describe('order service', function() {
	var $httpBackend;
	beforeEach(window.angular.mock.module('app'));

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	var orderService;
	beforeEach(inject(function($injector) {
		orderService = $injector.get('orderService');
	}));

	describe('query order ok', function() {
		var orders;
		beforeEach(function() {
			orders = {'total': 301, list: [{id: 1}, {id: 2}]};
			$httpBackend.when('GET', '/search.htm?all=0&callType=1&k=&page=1&pagesize=6&status=4').respond(200, orders);
		});
		it('ok', function() {
			$httpBackend.expect('GET', '/search.htm?all=0&callType=1&k=&page=1&pagesize=6&status=4');
			orderService
				.query({keywords:'', currentTab: 'done'})
				.then(function(response) {
					orders.list.total = orders.total;
					expect(response).toEqual(orders.list);
				});
			$httpBackend.flush();
		});
	});

	describe('query order fail', function() {
		beforeEach(function() {
			$httpBackend.when('GET', '/search.htm?all=0&callType=1&k=&page=1&pagesize=6&status=4').respond(500, {state: 'error'});
		});
		it('fail', function() {
			$httpBackend.expect('GET', '/search.htm?all=0&callType=1&k=&page=1&pagesize=6&status=4');
			orderService
				.query({keywords:'', currentTab: 'done'})
				.then(function(response) {
					var arr = [];
					arr.total = 0;
					expect(response).toEqual(arr);
				});
			$httpBackend.flush();
		});
	});


});