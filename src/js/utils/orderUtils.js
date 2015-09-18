var utils = require('./index');

var orderUtils = function($filter, mapService, $q) {
	return {
		convertSeatOrderDataToServerData: function(rawFormData) {
			let defer = $q.defer();
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
			if (rawFormData.vehicleNumber && 
					rawFormData.vehicleNumber.trim()) {
				orderData.vehicleNumber = rawFormData.vehicleNumber;
			}

			//预约
			if (rawFormData.isReservation && 
					rawFormData.reservationCalendar) {
				var reservationCalendar = new Date(rawFormData.reservationCalendar);
				if (!isNaN(reservationCalendar.valueOf())) {
					orderData.reservationTime = `${$filter('date')(reservationCalendar, 'yyyy-MM-dd')} ${rawFormData.hour}:${rawFormData.minute}`;
				}
			}

			$q.all([
						mapService.geocode(orderData.start), 
						mapService.geocode(orderData.end)
					]).then((lngLats) => {
						orderData.startLongitude = lngLats[0].lng;
						orderData.startLatitude = lngLats[0].lat;
						orderData.destinationLongitude = lngLats[1].lng;
						orderData.destinationLatitude = lngLats[1].lat;
						defer.resolve(orderData);
					}, (err) => {
						defer.reject(err);	
					});

			return defer.promise;
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
						orderData.startPointX = lngLats[0].lng;
						orderData.startPointY = lngLats[0].lat;
						orderData.destinationX = lngLats[1].lng;
						orderData.destinationY = lngLats[1].lat;
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

orderUtils.$inject = ['$filter', 'mapService', '$q'];

utils.factory('orderUtils', orderUtils);
