'use strict';

function Order($http) {

	var service = {

		handleCancelOrder(sn) {
			return $http.post('cancel/2.htm', {sn})
				.then((response) => {
					return response.data;	
				});	
		},

		handlePassengerFuckOrder(sn) {
			return $http.post('cancel/6.htm', {sn})
				.then((response) => {
					return response.data;	
				});	
		},

		handleDriverFuckOrder(sn) {
			return $http.post('cancel/7.htm', {sn})
				.then((response) => {
					return response.data;	
				});	
		},

		assignOrderByCarPlate(sn, number) {
			return $http.post('assign.htm', {sn, number})
				.then((response) => {
					return response.data;	
				});	
		},

		getOrderStepInfo(sn) {
			return $http.get('search/route.htm', { params: { sn	}	})
				.then((response) => {
					return response.data;	
				});
		},

		getOrderDetail(id) {
			return $http.get('dispatch/' + id)
				.then((response) => {
					return response.data;	
				});	
		}
	};

	return service;
}


export default {
	name: 'orderService',
	fn: Order
};
