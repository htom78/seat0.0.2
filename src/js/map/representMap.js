'use strict';

import angular from 'angular';

export default function RepresentMap() {

	let mapOptions = {};

	this.options = function(value) {
		mapOptions = value;	
	};


	this.$get = ['$rootScope', '$compile', 
		function($rootScope, $compile) {

		let [circle, marker, map, infoWindow, polyline] = [];
		let carMarkers = [];

		let template = 
					`
						<div class='represent-info-window flex'>
							<div>
								<img class='portrait'/>
							</div>
							<div class='info'>
								<p>{{name}}师傅</p>
								<p class='star'>{{stars}}</p>
							</div>
						</div>
					`;

		function setMarker(pointer) {
			if (!marker) {
				marker = new AMap.Marker({
					position: pointer	
				});	
				marker.setMap(map);
			}	else {
				marker.setPosition(pointer);	
			}
		}

		function setCircle(pointer) {
			if (!circle) {
				circle = new AMap.Circle({
					center: pointer,
					radius: mapOptions.circleRadius,
					strokeOpacity: 1,
					strokeColor: mapOptions.circleBorder,
					strokeWeight: mapOptions.circleWeight,
					fillColor: mapOptions.circleColor,
					fillOpacity: mapOptions.circleOpacity	
				});	
				circle.setMap(map);
			} else {
				circle.setCenter(pointer);
			}
		}

		function addCarMark(info) {
			let carMarker = new AMap.Marker({
				icon: new AMap.Icon({
					size: new AMap.Size(mapOptions.driverMarkderSize.width, mapOptions.driverMarkderSize.height),
					image: mapOptions.markerDriverIcon
				}),
				position: new AMap.LngLat(info.lng, info.lat)	
			});
			carMarker.setMap(map);
			carMarkers.push(carMarker);
			carMarker.info = info;
			AMap.event.addListener(carMarker, 'click', carMarkerEventFn);	
		}

		function carMarkerEventFn(ev) {
			let $scope = $rootScope.$new();
			let info = ev.target.info;
			$scope.name = info.familyName;
			let stars = [
				'\u2606\u2606\u2606\u2606\u2606',
				'\u2605\u2606\u2606\u2606\u2606',
				'\u2605\u2605\u2606\u2606\u2606',
				'\u2605\u2605\u2605\u2606\u2606',
				'\u2605\u2605\u2605\u2605\u2606',
				'\u2605\u2605\u2605\u2605\u2605'
			];
			$scope.stars = stars[info.rank];
			$compile(template)($scope, function(clone) {
				infoWindow.setContent(clone.get(0));
				clone.find('.portrait').attr('src', info.picUrl);
				infoWindow.open(map, ev.target.getPosition());
			});
		}

		function clearCarMarkers() {
			while (carMarkers.length) {
				let carMarker = carMarkers.pop();	
				carMarker.setMap(null);
				AMap.event.removeListener(carMarker, 'click', carMarkerEventFn);	
			}
		}

		function queryTrack(arr) {
			let lineArr = [];

			arr.forEach(item => {
				lineArr.push([item.lgt, item.lat]);	
			});

			polyline = new AMap.Polyline({
				path: lineArr,
				strokeColor: mapOptions.polyline.strokeColor,
				strokeOpacity: mapOptions.polyline.strokeOpacity,
				strokeWeight: mapOptions.polyline.strokeWeight,
				strokeStyle: mapOptions.polyline.strokeStyle,
				strokeDasharray: mapOptions.polyline.strokeDasharray,
				geodesic: mapOptions.polyline.geodesic	 
			});
			polyline.setMap(map);
			let a = arr[0];
			map.setCenter(new AMap.LngLat(a.lgt, a.lat));
		}

		let m = {
			init(elem) {
				map = new AMap.Map(elem, {
					view: new AMap.View2D({
						center: new AMap.LngLat(mapOptions.lng, mapOptions.lat),
						zoom: 16
					})
				});

				infoWindow =	new AMap.InfoWindow({
					isCustom: true,
					offset: new AMap.Pixel(6, -42)	
				});
			},

			setCenter(lng, lat) {
				this.clearMarkers();
				var pointer = new AMap.LngLat(lng, lat);
				setMarker(pointer);
				setCircle(pointer);
				map.setCenter(pointer);	
			},

			clearMarkers() {
				if (marker) {
					marker.setMap(null);	
					marker = null;
				}
				if (circle) {
					circle.setMap(null);	
					circle = null;
				}
				if (polyline) {
					polyline.setMap(null);	
					polyline = null;
				}
				clearCarMarkers();
				map.clearInfoWindow();	
			},

			clear() {
				this.clearMarkers();
				map.setCenter(new AMap.LngLat(mapOptions.lng, mapOptions.lat));
			},	

			destroy() {
				clearCarMarkers();
				circle = null; 
				marker = null; 
				map = null;
				infoWindow = null;
			},

			addCarMarks(data) {
				let coordinate;
				data.forEach(item => {
					addCarMark(item);
				});	
			},

			drawTrack(arr) {
				if (angular.isArray(arr) && arr.length > 1) {
					this.clearMarkers();
					queryTrack(arr);
				}		
			}

		};

		return m;
	}];
}
