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
			$httpBackend.whenPOST('login.htm').respond(200, {state: 'ok'});
		});

		it('username password for login', function() {
			$httpBackend.expectPOST('login.htm');
			loginService.login({username: 'username', password: 'password'})
				.then(function(response) {
					expect(response).toEqual({state: 'ok'});
				});
			$httpBackend.flush();
		});
	});

	describe('login fail', function() {
		beforeEach(function() {
			$httpBackend.whenPOST('login.htm').respond(200, {code: 20});	
		});	

		it('user is not exist error', function() {
			$httpBackend.expectPOST('login.htm');
			loginService.login({username:'username', password: 'password'})
				.then(
					function success(response) {}, 
					function error(errorInfo) {
						expect(errorInfo).toEqual('用户不存在');	
					}
				);	
			$httpBackend.flush();
		});
	});
});
