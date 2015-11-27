'use strict';
import angular from 'angular';

export default class Search {
	constructor($http, $filter, $q) {
		this.$http = $http;	
		this.$filter = $filter;
		this.$q = $q;
		this.orderss = [];
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
				return this.$q.reject();
			}); 	
	}

	getOrderStatuses() {
		return this.$http.get('status')
			.then((response) => {
				return response.data;	
			});	
	}
}

