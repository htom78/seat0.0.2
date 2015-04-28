describe('user service', function() {
	beforeEach(window.angular.mock.module('app'));

	var $httpBackend;

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	var userService;
	beforeEach(inject(function($injector) {
		userService = $injector.get('userService');
	}));

	describe('mobile to get user info', function() {
		var userInfo;
		beforeEach(function() {
			userInfo = {
				"total": 7,
				"targetpoiList": [
					"万达广场",
					"万达",
					"凹凸曼大厦",
					"天一广场"
				],
				"sn": "IC0AC0920F",
				"rank": "普通客户",
				"contactName": "15888598309",
				"timeCreated": "2015-04-24 05:29:53",
				"poiList": [
					"宁兴财富广场",
					"宁兴财富广场宁东路"
				],
				"fkTotal": 1
			};
			$httpBackend.when('GET', '/statis/m.htm?mobile=15888598309').respond(200, userInfo)
		});

		it('ok', function() {
			$httpBackend.expect('GET', '/statis/m.htm?mobile=15888598309');
			userService
				.getUserInfoToMobile('15888598309')
				.then(function(response) {
					expect(response).toEqual(userInfo);
				});
			$httpBackend.flush();
		});
	});
});