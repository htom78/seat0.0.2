import angular from 'angular';
var service = require('./index');

var orderSearchDefaultParams = {
	k: '',
	pagesize: 10,
	page: 1,
	callType: 0, //普通召车1， 专车2
	isImmediate: 0,	//立即召车1， 预约召车0, 0全部
	status: -1, //exception(0),prepared(1),received(2),started(3),done(4);
	beginTime: '',
	endTime: ''
};

var searchOrderStorageService = function($http) {
	var store = {
		orders: [],
		orderSearchParams: {},
		currentOrderPage: 1,
		orderItemCount: 0,
		allOrderCount: 0,
		immediateOrderCount: 0,
		reservationOrderCount: 0,

		getAllOrderCount: function() {
			return store.allOrderCount;	
		},

		getImmediateOrderCount: function() {
			return store.immediateOrderCount;	
		},

		getReservationOrderCount: function() {
			return store.reservationOrderCount;	
		},


		initOrderSearchParams: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orders = [];
			store.orderItemCount = 0;
			store.allOrderCount = 0;
			store.immediateOrderCount = 0;
			store.reservationOrderCount = 0;
		},

		get: function(orderSearchParams) {
			return $http.get('search/more.htm', {params: orderSearchParams})
				.then(function(response) {
					angular.copy(response.data.list, store.orders);
					store.orderItemCount = response.data.total;
					store.currentOrderPage = orderSearchParams.page;
					return response.data.total;
				});
		},

		getAllOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.k = '';
			store.orderSearchParams.isImmediate = 0;
			return store.get(store.orderSearchParams)
				.then(function(response) {
					store.allOrderCount = response;	
				});
		},

		getImmediatOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.k = '';
			store.orderSearchParams.isImmediate = 1;
			return store.get(store.orderSearchParams)
				.then(function(response) {
					store.immediateOrderCount = response;	
				});
		},

		getReservationOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.isImmediate = 2;
			return store.get(store.orderSearchParams)
				.then(function(response) {
					store.reservationOrderCount = response;	
				});
		},

		getShowOrderCount: function() {
			return store.orderItemCount;	
		},

		getSelectPageOrder: function(pageNumber) {
			store.orderSearchParams.page = pageNumber || 1;	
			return store.get(store.orderSearchParams);
		},

		searchOrderForKeywords: function(keywords, filterData) {
			store.orderSearchParams.page = 1;	
			store.orderSearchParams.k = keywords || '';
			for (var key in filterData) {
				store.orderSearchParams[key] = filterData[key];	
			}
			return store.get(store.orderSearchParams);
		}	
	};
	return store;
};

searchOrderStorageService.$inject = ['$http'];

service.factory('searchOrderStorageService', searchOrderStorageService);
