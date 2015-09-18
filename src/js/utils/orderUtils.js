var utils = require('./index');

var orderUtils = function($filter, mapService, $q, gpsGcjExchangeUtils) {
	return {
		convertSeatOrderDataToServerData: function(rawFormData, mapService) {
			var orderData = {
				callingTel: rawFormData.callingTel || '',
				actualTel: rawFormData.actualTel,
				gender: rawFormData.gender,
				fullName: rawFormData.fullName,
				start: rawFormData.start,
				aroundRoadName: rawFormData.aroundRoadName || '',
				end: rawFormData.end,
				remark: rawFormData.remark || '',
				startLongitude: 0,
				startLatitude: 0,
				destinationLongitude: 0,
				destinationLatitude: 0,
				reservationTime: '',
				callType: 1 //招车类型:1、普通 2、专车
			};

			//指派车辆
			if (rawFormData.vehicleNumber && rawFormData.vehicleNumber.trim()) {
				orderData.vehicleNumber = rawFormData.vehicleNumber;
			}

			//预约
			if (rawFormData.isReservation && rawFormData.reservationCalendar) {
				var reservationCalendar = new Date(rawFormData.reservationCalendar);
				if (!isNaN(reservationCalendar.valueOf())) {
					orderData.reservationTime = '' + $filter('date')(reservationCalendar, 'yyyy-MM-dd') + 
						' ' + rawFormData.hour + ':' + rawFormData.minute;
				}
			}
			//专车单
			if (rawFormData.isCarType) {
				orderData.callType = 2;	
			}
			return orderData;
		},

		convertRepresentOrderDataToServerData: function(rawFormData) {
			let defer = $q.defer();
			let orderData = {
				callName: rawFormData.callName,
				callPhone: rawFormData.callPhone,
				contactName: rawFormData.contactName,
				contactPhone: rawFormData.contactPhone,
				gender: rawFormData.gender,
				startPoint: rawFormData.startPoint,
				startPointDesc: rawFormData.startPointDesc,
				startPointLocation: '',
				destination: rawFormData.destination,
				destinationDesc: rawFormData.destinationDesc,
				destinationLocation: '',
				number: rawFormData.number,
				isReserved: 0,
				reservedTime: ''	
			};	

			if (rawFormData.isReserved &&
					rawFormData.reservedDate) {
				let reservedDate = new Date(rawFormData.reservedDate);	
				if (!isNaN(reservedDate.valueOf())) {
					orderData.reservedTime = `${$filter('date')(reservedDate, 'yyyy-MM-dd')} ${rawFormData.hour}:${rawFormData.minute}`;
					orderData.isReserved = 1;	
				}
			}

			$q.all([
						mapService.geocode(orderData.startPoint), 
						mapService.geocode(orderData.destination)
					]).then((lngLats) => {
						let startLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[0].lng, lngLats[0].lat);
						let destinationLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[1].lng, lngLats[1].lat);
						orderData.startPointX = startLngLat.lng;
						orderData.startPointY = startLngLat.lat;
						orderData.destinationX = destinationLngLat.lng;
						orderData.destinationY = destinationLngLat.lat;
						defer.resolve(orderData);
					}, (err) => {
						defer.reject(err);	
					});

			return defer.promise;
		},

		//###########################################
		convertOrderItemData: function(orderData) {
			return {
				sn: orderData.sn,
				timeCreated: new Date(),
				user: orderData.fullName,
				contactPhone: orderData.actualTel,
				vehicleNumber: '',
				poi: orderData.start,
				'destination_poi': orderData.end
			};	
		}

	};
};

orderUtils.$inject = ['$filter', 'mapService', '$q', 'gpsGcjExchangeUtils'];

utils.factory('orderUtils', orderUtils);
