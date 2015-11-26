'use strict';
import angular from 'angular';

export default class Leader{
	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
		this.orderss = [];	
	}

	getOrdersFromService({
		all = 1, // 0 个人 1 全部
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
			var orders = response.data.list;	
			if (!angular.isArray(orders)) {
				return this.$q.reject();	
			}
			return response.data;	
		});	
	}

	getOrders(params) {
		return this.getOrdersFromService(params)
			.then((response) => {
				var orders = response.list;		
				angular.copy(orders, this.orderss);
				return response.total;
			}, () => {
				angular.copy([], this.orderss);	
			});	
	}

	removeOrder(order) {
		var index = this.orderss.indexOf(order);	
		if (index !== -1) {
			return this.orderss.splice(index, 1);	
		}
	}
}
