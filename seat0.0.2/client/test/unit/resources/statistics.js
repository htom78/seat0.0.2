describe('statistics resource', function() {
	var $rootScope,
		$httpBackend;

	beforeEach(window.angular.mock.module('app'));

	beforeEach(inject(function(_$rootScope_, _$httpBackend_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
	}));

	var statisticsResource;
	beforeEach(inject(function($injector) {
		statisticsResource = $injector.get('statisticsResource');
	}));

	describe('call status', function() {
		var callStatistics;
		beforeEach(function() {
				callStatistics = {"day":8,"hour":2,"last_day":20,"last_hour":5};
				$httpBackend.when('GET', '/statis/m.htm').respond(200, callStatistics);
			});
		it('call status', function() {
			$httpBackend.expect('GET', '/statis/m.htm');
			statisticsResource
				.callStatistics()
				.then(function(response) {
					expect(response).toEqual(callStatistics);
				});

			$httpBackend.flush();
		});
		
	});
});