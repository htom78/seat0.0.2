module.exports = {
	key: 'd64e2c774ba08ec5d8fd282640cd546e',
	version: 'rsv3',
	city: 'ningbo',
	lng: 121.609614,
	lat: 29.866413,
	circleColor: '#ffba58',
	circleBorder: '#ffba58',
	circleOpacity: 0.35,
	circleWeight: 2,
	circleRadius: 500,
	markerTaxiIcon: 'static/' + require('../assets/imgs/car-marker.png'),
	markerSize: {
		width: 22,
		height: 32 	
	},
	nearCarUrl: window.aspath + '/rest/instant/vnearby?myjsonp=JSON_CALLBACK'
};
