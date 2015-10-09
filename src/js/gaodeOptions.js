export default {
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
	markerTaxiIcon: require('../assets/imgs/car-marker.png'),
	markerDriverIcon: require('../assets/imgs/driver-icon.png'),
	markerSize: {
		width: 22,
		height: 32 	
	},
	driverMarkderSize: {
		width: 24,
		height: 24	
	},
	nearCarUrl: `${window.aspath}/rest/instant/vnearby?myjsonp=JSON_CALLBACK`
};
