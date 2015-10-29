'use strict';
import angular from 'angular';

export default class Leader{
	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;
		this.orderss = [];	
		this.total = 0;
		this.shoudUpdate = 0;
		this.currentPage = 1;
	}

	getOrdersFromService({
		all = 1,
		callType = 1,
		isImmediate = 1,
		k = '',
		page = 1,
		pagesize = 10,
		status = 1,	
	} = {}) {
		this.currentPage = page;
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
				this.total = 0;
				return this.$q.reject();	
			}
			this.shouldUpdate = Date.now() + Math.floor(Math.random(999999));
			this.total = response.data.total;
			return response.data;	
		});	
	}

	getOrders(params) {
		return this.getOrdersFromService(params)
			.then((response) => {
				let orders = response.list;		
				angular.copy(orders, this.orderss);
				return response.total;
			});	
	}

	getPreparedOrders(isImmediate = 1) {
		return this.getOrders({
			isImmediate,
			status: 1	
		});
	}

	getReceivedOrders(isImmediate) {
		return this.getOrders({
			isImmediate,
			status: 2	
		});	
	}

	getStartedOrders(isImmediate) {
		return this.getOrders({
			isImmediate,
			status: 3	
		});	
	}

	getDoneOrders(isImmediate) {
		return this.getOrders({
			isImmediate,
			status: 4	
		});	
	}

	getExceptionOrders(isImmediate) {
		return this.getOrders({
			isImmediate,
			status: 0	
		});	
	}

	queryOrderByKeywords(k, isImmediate, status) {
		return this.getOrders({
			k,
			isImmediate,	
			status
		});	
	}

	getSelectPageOrder( page, isImmediate, status, k = '') {
		return this.getOrders({
			page,
			k,
			isImmediate,
			status	
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


/*
var leaderService = function($http) {

	var store = {

		initParams: function() {
			this.searchOrderKeywords = '';
			this.currentOrderType = 1;
			this.currentPage = 1;
		},

		initService: function() {
			this.initParams();	
			this.isImmediate = true;
			this.orders = [];
			this.currentTabName = 'prepared';
			this.currentOrderTotal = 0;
			this.isMapShow = false;
		},

		getCurrentTabName: function() {
			return store.currentTabName;	
		},

		showMap: function() {
			this.isMapShow = true;	
		},

		closeMap: function() {
			this.isMapShow = false;	
		},

		selectImmediate: function() {
			this.isImmediate = true;	
		},

		selectReservation: function() {
			this.isImmediate = false;	
		},

		get: function() {
			var self = this;	
			var immediateOrReservation = this.isImmediate ? 1 : 0;
			return $http.get('search.htm', {
				params: {
					all: 0,
					page: this.currentPage,
					pagesize: 10,	 
					callType: 1,
					isImmediate: immediateOrReservation,
					k: this.searchOrderKeywords,
					status: this.currentOrderType
				}	
			}).then(function(response) {
				angular.copy(response.data.list, self.orders);	
				var total = response.data.total;
				self.currentOrderTotal = total;
				return self.orders;
			});
		},

		getPreparedOrders: function() {
			this.currentTabName = 'prepared';
			this.initParams();
			this.currentOrderType = 1;
			return this.get();
		},

		getReceivedOrders: function() {
			this.currentTabName = 'received';
			this.initParams();
			this.currentOrderType = 2;
			return this.get();
		},

		getStartedOrders: function() {
			this.currentTabName = 'started';
			this.initParams();
			this.currentOrderType = 3;
			return this.get();
		},

		getDoneOrders: function() {
			this.currentTabName = 'done';
			this.initParams();
			this.currentOrderType = 4;
			return this.get();
		},

		getExceptionOrders: function() {
			this.currentTabName = 'exception';
			this.initParams();
			this.currentOrderType = 0;
			return this.get();
		},

		getOrderByPageNumber: function(num) {
			this.currentPage = num || 1;	
			return this.get();
		},

		refreshCurrentOrder: function() {
			this.searchOrderForKeywords = '';	
			return this.get();
		},

		getCurrentOrdersByKeywords: function(keywords) {
			this.searchOrderKeywords = keywords || '';
			this.currentPage = 1;
			return this.get();
		},

		getShowOrderCount: function() {
			var count = this.currentOrderTotal > 999 ? 999 : this.currentOrderTotal;	
			return ('000' + count).slice(-3).split('');
		},

		getOrderInfo: function(sn) {
			return $http.get('search/route.htm', {
				params: {
					sn: sn	
				}	
			});
		},

		handlePassengerFuckOrder: function(sn) {
			return $http.post('cancel/6.htm', {sn: sn});
		},

		handleDriverFuckOrder: function(sn) {
			return $http.post('cancel/7.htm', {sn: sn});
		},

		handleCancelOrder: function(sn) {
			return $http.post('cancel/1.htm', {sn: sn});
		},

		assignOrderToCarPlate: function(sn, carPlate) {
			return $http.post('assign.htm', {
				sn: sn,
				number: carPlate	 
			});	
		},

		removeOrder: function(order) {
			var index = this.orders.indexOf(order);	
			if (index !== -1) {
				this.orders.splice(index, 1);	
			}
		}

	};
	return store;
};

leaderService.$inject = ['$http'];

services.factory('leaderService', leaderService);
*/
