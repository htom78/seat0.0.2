'use strict';
import angular from 'angular';

export default class Leader{
	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
		this.orderss = [];	
	}

	getOrdersFromService({
		all = 0,
		callType = 1,
		isImmediate = 1,
		k = '',
		page = 1,
		pagesize = 10,
		status = 1,	
	} = {}) {
		return this.$http.get('search.htm', {params: {
			all,
			callType,
			isImmediate,
			k,
			page,
			pagesize,
			status
		}})
		.then((response) => {
			let orders = response.data.list;	
			if (!angular.isArray(orders)) {
				return this.$q.reject();	
			}
			return response.data;	
		});	
	}

	getOrders(params) {
		return this.getOrdersFromService(params)
			.then((response) => {
				let orders = response.list;		
				angular.copy(orders, this.orderss);
				return response.total;
			}, () => {
				angular.copy([], this.orderss);	
			});	
	}

	removeOrder(order) {
		var index = this.orderss.indexOf(order);	
		if (index !== -1) {
			this.orderss.splice(index, 1);	
		}
	}

	getOrderInfo(sn) {
		return this.$http.get('search/route.htm', { params: { sn: sn	}	});
	}

	handleCancelOrder(sn) {
		return this.$http.post('cancel/1.htm', {sn: sn});
	}

	handlePassengerFuckOrder(sn) {
		return this.$http.post('cancel/6.htm', {sn: sn});
	}

	handleDriverFuckOrder(sn) {
		return this.$http.post('cancel/7.htm', {sn: sn});
	}

	assignOrderByCarPlate(sn, number) {
		return this.$http.post('assign.htm', {sn, number});	
	}
}
