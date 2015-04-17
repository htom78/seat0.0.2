describe('order resource', function() {
	var $rootScope, $httpBackend;

	beforeEach(window.angular.mock.module('app'));
	beforeEach(inject(function(_$rootScope_, _$httpBackend_) {
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
	}));

	var orderResource;
	beforeEach(inject(function($injector) {
		orderResource = $injector.get('orderResource');
	}));

	describe('add order', function() {
		var state;
		beforeEach(function() {
				state = {state: 'ok'};
				$httpBackend.when('POST', '/call.htm').respond(200, state);
			});
		it('new order', function() {
			$httpBackend.expect('POST', '/call.htm');
			orderResource
				.add({name:'quan'})
				.then(function(response) {
					expect(response).toEqual(state);
				});
			$httpBackend.flush();
		});
	});
	
});