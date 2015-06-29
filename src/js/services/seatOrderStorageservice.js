var services = require('./index');

var orderGetUrl = 'search.htm';
var orderSearchDefaultParams = {
	k: '',
	all: 0,
	pagesize: 6,
	page: 1,
	callType: 1, //普通召车1， 专车2
	isImmediate: 1,	//立即召车1， 预约召车0
	status: 1 //exception(0),prepared(1),received(2),started(3),done(4);
};

var seatOrderStorageService = function($http, $q, mapService, gpsGcjExchangeUtils, orderUtils, $rootScope) {

	var store = {
		orders: [],
		variableOrders: [],
		orderSearchParams: {},
		normalOrderCount: 0,
		exceptionOrderCount: 0,
		averageTimer: 0,
		pauseSearch: false,
		initOrderSearchParams: function() {
			store.orderSearchParams = angular.copy(orderSearchDefaultParams);	
			store.orders = [];
			store.orders.normalOrderCount = 0;
			store.orders.exceptionOrderCount = 0;
		},

		setCallType: function(callType) {
			orderSearchDefaultParams.callType = callType;	
		},

		/**
		 * @param {json} form order raw data
		 */
		insert: function(orderData) {
			var defer = $q.defer();
			orderData = orderUtils.getCreateOrderData(orderData);
			orderData.callType = orderSearchDefaultParams.callType;
			$q.all([mapService.geocode(orderData.start), mapService.geocode(orderData.end)])
				.then(function(lngLats) {
					var startLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[0].lng, lngLats[0].lat);
					var destinationLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[1].lng, lngLats[1].lat);

					orderData.startLongitude = startLngLat.lng;
					orderData.startLatitude = startLngLat.lat;
					orderData.destinationLongitude = destinationLngLat.lng;
					orderData.destinationLatitude = destinationLngLat.lat;

					//submit order to server
					//I also want restFUL API, but .... fuck 
					$http({
						method: 'POST',
						url: 'call.htm',
						data: $.param(orderData),
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}
					}).then(function(response) {
						response = response.data;
						if (parseInt(response.status) === 0 &&
							response.sn &&
							response.sn.length > 2) {
							//add order success
							defer.resolve({
								sn: response.sn,
								order: orderData
							});	
						} else {
							defer.reject(response.code);	
						}
					}, function() {
						defer.reject('about server error');	
					});

				}, function() {
					defer.reject('from gaode convert address to longtude and latitude error');	
				});

			return defer.promise;
		},

		get: function(orderSearchParams) {
			store.pauseSearch = true;
			return $http.get(orderGetUrl, {params: orderSearchParams})
				.then(function(response) {
					angular.copy(response.data.list, store.orders);
					if (parseInt(orderSearchParams.status) === 0) {
						store.orders.exceptionOrderCount = response.data.total;	
					} else {
						store.orders.normalOrderCount = response.data.total;	
					}
					store.orders.averageTimer = response.data.sec;//平局秒数
					return store.orders;
				})
				.finally(function() {
					setTimeout(function() {
						store.pauseSearch = false;	
					}, 3000);
				});
		},

		getVriableOrders: function(status, sn) {
			var orderSearchParams = angular.copy(store.orderSearchParams);
			orderSearchParams.status = status;
			return $http.get(orderGetUrl, {params: orderSearchParams})
				.then(function(response) {
					angular.copy(response.data.list, store.variableOrders);	
					var variableOrders = store.variableOrders;
					for (var i = 0, ii = variableOrders.length; i < ii; i++) {
						if (variableOrders[i].sn === sn) {
							angular.copy(variableOrders, store.orders);	
							store.orders[i].isNewAdd = true;
							return true;
						}	
					}
					return $q.reject();
				});	
		},

		getPrepared: function() {
			store.orderSearchParams.status = 1;
			return store.get(store.orderSearchParams);
		},

		getReceived: function() {
			store.orderSearchParams.status = 2;
			return store.get(store.orderSearchParams);
		},

		getStarted: function() {
			store.orderSearchParams.status = 3;
			return store.get(store.orderSearchParams);
		},

		getDone: function() {
			store.orderSearchParams.status = 4;
			return store.get(store.orderSearchParams);
		},

		getException: function() {
			store.orderSearchParams.status = 0;
			return store.get(store.orderSearchParams);
		},

		flushCurrentOrderTab: function() {
			return store.get(store.orderSearchParams);
		},

		/**
		 * @param {string}
		 */
		searchOrderForKeywords: function(keywords) {
			var orderSearchParams = angular.copy(store.orderSearchParams);
			orderSearchParams.k = keywords;
			return store.get(orderSearchParams);
		},

		/**
		 * @param {string}
		 * @param {json}
		 */
		addNewOrderState: function(sn, newOrderData) {
			var orders = store.orders;
			newOrderData = orderUtils.convertOrderItemData(newOrderData);
			newOrderData.isNewAdd = true;
			if (orders.length === 0) {
				orders.push(newOrderData);	
			} else {
				var flag = false;
				for (var i = 0, ii = orders.length; i < ii; i++) {
					if (orders[i].sn === sn) {
						orders[i].isNewAdd = true;	
						flag = true;
						break;
					}	
				}
				if (!flag) {
					orders.unshift(newOrderData);
				}
			}	
		}

	};
	return store;
};

seatOrderStorageService.$inject = ['$http', '$q', 'mapService', 'gpsGcjExchangeUtils', 'orderUtils', '$rootScope'];

services.factory('seatOrderStorageService', seatOrderStorageService);
