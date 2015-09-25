import angular from 'angular';

export default function RepresentMap() {

	let mapOptions = {};

	this.options = function(value) {
		mapOptions = value;	
	};


	this.$get = ['$rootScope', '$compile', 
		function($rootScope, $compile) {

		let [circle, marker, map, infoWindow] = [];
		let carMarkers = [];

		let template = 
					`
						<div class='represent-info-window flex'>
							<div>
								<img data-src='{{portrait}}' class='portrait'/>
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
					size: new AMap.Size(mapOptions.markerSize.width, mapOptions.markerSize.height),
					image: mapOptions.markerTaxiIcon 
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
			$scope.portrait = 'http://pic38.nipic.com/20140220/13597469_211002639000_2.jpg';
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
					offset: new AMap.Pixel(0, -42)	
				});
			},

			setCenter(lng, lat) {
				var pointer = new AMap.LngLat(lng, lat);
				setMarker(pointer);
				setCircle(pointer);
				map.setCenter(pointer);	
			},

			clear() {
				if (marker) {
					marker.setMap(null);	
					marker = null;
				}
				if (circle) {
					circle.setMap(null);	
					circle = null;
				}
				clearCarMarkers();
				map.clearInfoWindow();	
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
					coordinate = item.coordinates.split(',');
					item.lng = coordinate[0];
					item.lat = coordinate[1];
					addCarMark(item);
				});	
			}

		};

		return m;
	}];
}
