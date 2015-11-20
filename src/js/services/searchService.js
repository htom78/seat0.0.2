'use strict';
import angular from 'angular';

export default class Search {
	constructor($http, $filter, $q) {
		this.$http = $http;	
		this.$filter = $filter;
		this.$q = $q;
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
			poi = '',
			targetPoi = '',
			vehilceNumber = '',
			contactPhone = '',
			sn = '',
			opName = '',
			status = -1,	
			callType = 0, 
			isImmediate = 0,
		 	beginTime = '',	
			endTime = '',
			page = 1, 
			pagesize = 10 
	} = {}) {
		this.currentPage = page;
		return this.$http.get('search/more.htm', {
			params: {
				poi,
				targetPoi,
				vehilceNumber,
				contactPhone,
				sn,
				opName,
				status,
				callType,	
				isImmediate,
				beginTime,
				endTime,
				page,
				pagesize
			}		
		})
		.then((response) => {
			let orders = response.data.list; 
			if (!angular.isArray(orders)) {
				return this.$q.reject();
			}
			return response.data;
		});	
	}

	convertDate(str) {
		let result = '';
		if (angular.isDate(str)) {
			result = this.$filter('date')(str, 'yyyy-MM-dd');	
		}	
		return result;
	}

	getOrders(params) {
		params.beginTime = this.convertDate(params.beginTime);
		params.endTime = this.convertDate(params.endTime);
		return this.getOrdersFromService(params)
			.then((response) => {
				let orders = response.list;	
				angular.copy(orders, this.orderss);
				return response.total;
			}, () => {
				angular.copy([], this.orderss);	
			}); 	
	}

	getOrderStatuses() {
		return this.$http.get('status')
			.then((response) => {
				return response.data;	
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
