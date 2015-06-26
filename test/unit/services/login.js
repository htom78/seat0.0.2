describe('login', function() {
	beforeEach(window.angular.mock.module('app'));

	var $httpBackend;
	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	var loginService;
	beforeEach(inject(function($injector) {
		loginService = $injector.get('loginService');
	}));

	describe ('login ok', function() {
		beforeEach(function() {
			$httpBackend.when('POST', '/login.htm').respond(200, {state: 'ok'});
		});
		it('', function() {
			var data = {
				username: 'user001',
				password: '0'
			}
			$httpBackend.expect('POST', '/login.htm');
			loginService
				.login(data)
				.then(function(response) {
					expect(response).toEqual({state: 'ok'});
				});

			$httpBackend.flush();
		});
	});
});