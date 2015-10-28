'use strict';
import angular from 'angular';

export default class Search {
	constructor($http) {
		this.$http = $http;	
		this.orderss = [];
		this.allOrderCount = 0;
		this.immediateOrderCount = 0;
		this.reservationOrderCount = 0;
		this.state = Search.state.ALL_TAB;
		this.currentPage = 1;
		this.total = 0;
		this.shoudUpdate = 0;
	}

	getOrdersFromService({
		 	beginTime = '',	
			endTime = '',
			k = '', 
			page = 1, 
			pagesize = 10, 
			status = -1, 
			callType = 0, 
			isImmediate = 0
	} = {}) {
		this.currentPage = page;
		return this.$http.get('search/more.htm', {
			params: {
				beginTime,
				endTime,
				k,
				page,
				pagesize,
				status,
				callType,	
				isImmediate
			}		
		})
		.then((response) => {
			let orders = response.data.list; 
			let total = 0;
			if (angular.isArray(orders)) {
				angular.copy(orders, this.orderss);	
				total = response.data.total;
			} else {
				angular.copy([], this.orderss);
			}
			this.shoudUpdate = Date.now() + Math.floor(Math.random(999999));
			this.total = total;
			return total;
		});	
	}

	getAllOrders() {
		this.state = Search.state.ALL_TAB;
		return this.getOrdersFromService();
	}

	getImmediatOrders() {
		this.state = Search.state.IMMEDIATE_TAB;
		return this.getOrdersFromService({isImmediate: 1});	
	}	

	getReservationOrders() {
		this.state = Search.state.RESERVATION_TAB;
		return this.getOrdersFromService({isImmediate: 2});	
	}

	queryOrderByKeywords(k = '', beginTime = '', endTime = '') {
		return this.getOrdersFromService({
			k,
			beginTime,
			endTime,
			isImmediate: this.state	
		});	
	}

	getSelectPageOrder(page, k = '', beginTime = '', endTime = '') {
		return this.getOrdersFromService({
			page,
			k,
			beginTime,
			endTime,
			isImmediate: this.state,
		});	
	}
}

Search.state = {
	ALL_TAB: 0,
	IMMEDIATE_TAB: 1,
	RESERVATION_TAB: 2
};
