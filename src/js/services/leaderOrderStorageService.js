var services = require('./index');

var orderGetUrl = 'search.htm';
var orderSearchDefaultParams = {
	k: '',
	all: 0,
	pagesize: 10,
	page: 1,
	callType: 1, //普通召车1， 专车2
	isImmediate: 1,	//立即召车1， 预约召车0
	status: 1 //exception(0),prepared(1),received(2),started(3),done(4);
};

var leaderOrderStorageService = function($http, orderStepDialog) {

	var store = {
		orders: [],
		orderSearchParams: {},
		currentOrderPage: 1,
		orderItemCount: 0,
		currentOrderStepItemNumber: null,	

		getShowOrderCount: function() {
			var count = store.orderItemCount > 999 ? 999 : store.orderItemCount;	
			return ('000' + count).slice(-3).split('');
		},

		initOrderSearchParams: function() {
			angular.copy(orderSearchDefaultParams, store.orderSearchParams);	
			store.orders = [];
			store.orderItemCount = 0;
		},

		get: function(orderSearchParams) {
			orderStepDialog.close();
			return $http.get(orderGetUrl, {params: orderSearchParams})
				.then(function(response) {
					angular.copy(response.data.list, store.orders);	
					store.orderItemCount = response.data.total;
					store.currentOrderPage = orderSearchParams.page;
					store.currentOrderStepItemNumber = null;
					store.orders.forEach(function(orderItem) {
						orderItem.isActive = false;	
					});
					return store.orders;
				});	
		},

		getPrepared: function() {
			store.orderSearchParams.status = 1;
			store.orderSearchParams.page = 1;
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getReceived: function() {
			store.orderSearchParams.status = 2;
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getStarted: function() {
			store.orderSearchParams.status = 3;
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getDone: function() {
			store.orderSearchParams.status = 4;
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getException: function() {
			store.orderSearchParams.status = 0;
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getSelectPageOrder: function(pageNumber) {
			store.orderSearchParams.page = pageNumber || 1;	
			return store.get(store.orderSearchParams);
		},

		searchOrderForKeywords: function(keywords) {
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = keywords;
			return store.get(store.orderSearchParams);
		},

		refreshCurrentOrderTab: function(pageNumber) {
			if (pageNumber) {
				store.orderSearchParams.page = pageNumber;	
			}
			return store.get(store.orderSearchParams);
		},

		getOrderStepInfo: function(order) {
			store.clearOrderItemActive();
			store.currentOrderStepItemNumber = store.orders.indexOf(order);
			order.isActive = true;
			return $http.get('search/route.htm', {params: {sn: order.sn}})
				.then(function(response) {
					return response.data;	
				});	
		},

		clearOrderItemActive: function() {
			if (store.currentOrderStepItemNumber !== null) {
				store.orders[store.currentOrderStepItemNumber].isActive = false;
			}
		},

		cancelOrder: function(url) {
			var currentOrder = store.orders[store.currentOrderStepItemNumber];
			if (!currentOrder) {
				return $q.reject();	
			}
			return $http({
				method: 'POST',
				url: url,
				data: $.param({sn: currentOrder.sn}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function() {
				store.refreshCurrentOrderTab(1);	
			})
			.finally(function() {
				store.clearOrderItemActive();
				orderStepDialog.close();	
			});	
		},

		dealPassengerFuckOrder: function() {
			return store.cancelOrder('cancel/6.htm');
		},

		dealDriverFuckOrder: function(sn) {
			return store.cancelOrder('cancel/7.htm');
		},

		dealCancelOrder: function() {
			return store.cancelOrder('cancel/1.htm');
		},

		assignOrderToCarPlate: function(carPlate) {
			var currentOrder = store.orders[store.currentOrderStepItemNumber];
			if (!currentOrder) {
				return $q.reject();	
			}
			return $http({
				method: 'POST',
				url: 'assign.htm',
				data: $.param({sn: currentOrder.sn, number: carPlate}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.then(function() {
				store.refreshCurrentOrderTab(1);	
			})
			.finally(function() {
				store.clearOrderItemActive();
				orderStepDialog.close();	
			});	
		}	

	};
	return store;
};

leaderOrderStorageService.$inject = ['$http', 'orderStepDialog', '$q'];

services.factory('leaderOrderStorageService', leaderOrderStorageService);
