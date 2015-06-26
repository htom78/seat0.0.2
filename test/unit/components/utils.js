describe('utils', function() {
	beforeEach(window.angular.mock.module('app'));

	var utils;
	beforeEach(inject(function($injector) {
		utils = $injector.get('utils');
	}));

	it('gps80 to gcj02', function() {
		var gps2gcj = utils.gps84ToGcj02(121.609129, 29.866628);
		expect(gps2gcj).toEqual({lng: 121.61322113083109, lat: 29.86399760273489});
	});

	it('gcj02 to gps80', function() {
		var gcj2gps = utils.gcj02ToGps84( 121.601605, 29.889689);
		expect(gcj2gps).toEqual({lng: 121.59751227515075, lat: 29.89232058179028});
	});
});