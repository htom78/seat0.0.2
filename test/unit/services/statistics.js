describe('service statistics', function() {
	var $rootScope,
		$httpBackend;

	beforeEach(window.angular.mock.module('app'));
	beforeEach(inject(function(_$rootScope_, _$httpBackend_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
	}));

	var statisticsService;
	beforeEach(inject(function($injector) {
		statisticsService = $injector.get('statisticsService');
	}));

	describe('query call statistics', function() {
		var status;
		beforeEach(function() {
			status = {"day":8,"hour":2,"last_day":20,"last_hour":5};
			$httpBackend.when('GET', '/statis/d.htm').respond(200, status);
		});

		it('query ok', function() {
			$httpBackend.expect('GET', '/statis/d.htm');
			statisticsService
				.callStatistics()
				.then(function(data) {
					expect(data).toEqual({hour: 2, day: 8, lastHour: 5, lastDay: 20});
				});

			$httpBackend.flush();
		});
	});

	
	describe('query call statistics fail', function() {
		beforeEach(function() {
			$httpBackend.when('GET', '/statis/d.htm').respond(500, {state: 'error'});
		});

		it('query fail', function() {
			$httpBackend.expect('GET', '/statis/d.htm');
			statisticsService
				.callStatistics()
				.then(function(data) {
					expect(data).toEqual({hour: 0, day: 0, lastHour: 0, lastDay: 0});
				});
			$httpBackend.flush();
		});
	});
});