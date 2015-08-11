var utils = require('./index');

var orderUtils = function($filter) {
	return {
		convertOrderServerData: function(rawFormData) {
		
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

orderUtils.$inject = ['$filter'];

utils.factory('orderUtils', orderUtils);
