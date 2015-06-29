var service = require('./index');

var orderSearchDefaultParams = {
	k: '',
	pagesize: 10,
	page: 1,
	callType: 0, //普通召车1， 专车2
	isImmediate: 1,	//立即召车1， 预约召车0
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
		initOrderSearchParams: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orders = [];
		},
		get: function(orderSearchParams) {
			return $http.get('search/more.htm', {params: orderSearchParams})
				.then(function(response) {
					angular.copy(response.data.list, store.orders);
					store.orderItemCount = response.data.total;
					store.currentOrderPage = orderSearchParams.page;
					return store.orders;
				});
		},

		getAllOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getImmediatOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.k = '';
			return store.get(store.orderSearchParams);
		},

		getReservationOrders: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orderSearchParams.isImmediate = 2;
			return store.get(store.orderSearchParams);
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
