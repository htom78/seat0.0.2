'use strict';

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
	markerTaxiIcon: 'static/imgs/car-marker.png',
	markerDriverIcon: 'static/imgs/driver-marker.png',
	markerSize: {
		width: 22,
		height: 32 	
	},
	driverMarkderSize: {
		width: 24,
		height: 24	
	},
	polyline: {
		strokeColor: '#3366ff',
		strokeOpacity: 1,
		strokeWeight: 2,
		strokeStyle: 'solid',
		strokeDasharray: [10, 5],
		geodesic: true	
	},
	nearCarUrl: `${window.aspath}/rest/instant/vnearby?myjsonp=JSON_CALLBACK`
};
