var services = require('./index');

var seatOrderStorageService = function($http, $q, mapService, gpsGcjExchangeUtils, orderUtils, $rootScope) {

	var store = {

		initParams: function() {
			this.searchOrderKeywords = '';
			this.currentOrderType = 1;
		},

		initService: function() {
			this.initParams();		
			this.isImmediate = true;
			this.normalOrderCount = 0;
			this.exceptionOrderCount = 0;
			this.averageTimer = 0;
			this.orders = [];
			this.variableOrders = [];
		},

		selectSpecialCar: function() {
			this.callType = 2;	
		},

		selectNormalCar: function() {
			this.callType = 1;	
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
			this.isPauseSearch = true;
			return $http.get('search.htm', {
				params: {
					all: 0,
					page: 1,
					pagesize: 6,
					callType: this.callType,
					isImmediate: immediateOrReservation,
					k: this.searchOrderKeywords,
					status: this.currentOrderType
				}
			})
				.then(function(response) {
					angular.copy(response.data.list, store.orders);
					var total = response.data.total;
					if (self.currentOrderType === 0) {
						self.exceptionOrderCount = total;	
					} else {
						self.normalOrderCount = total;	
					}
					self.averageTimer = response.data.sec;//平局秒数
					return self.orders;
				})
				.finally(function() {
					setTimeout(function() {
						self.isPauseSearch = false;	
					}, 3000);
				});
		},

		getPreparedOrders: function() {
			this.initParams();
			this.currentOrderType = 1;
			return this.get();
		},

		getReceivedOrders: function() {
			this.initParams();
			this.currentOrderType = 2;
			return this.get();
		},

		getStartedOrders: function() {
			this.initParams();
			this.currentOrderType = 3;
			return this.get();
		},

		getDoneOrders: function() {
			this.initParams();
			this.currentOrderType = 4;
			return this.get();
		},

		getExceptionOrders: function() {
			this.initParams();
			this.currentOrderType = 0;
			return this.get();
		},

		refreshCurrentOrder: function() {
			this.searchOrderKeywords = '';
			return this.get();
		},

		getCurrentOrdersByKeywords: function(keywords) {
			this.searchOrderKeywords = keywords || '';
			return this.get();
		},

		getNormalOrderCount: function() {
			return store.normalOrderCount;		
		},

		getExceptionOrderCount: function() {
			return store.exceptionOrderCount;	
		},

		getAverageTimer: function() {
			return store.averageTimer;	
		},

		addNewOrder: function(orderData) {
			var defer = $q.defer();
			orderData = orderUtils.convertOrderServerData(orderData);
			orderData.callType = this.callType;
			$q.all([mapService.geocode(orderData.start), mapService.geocode(orderData.end)])
				.then(function(lngLats) {
					var startLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[0].lng, lngLats[0].lat);
					var destinationLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[1].lng, lngLats[1].lat);

					orderData.startLongitude = startLngLat.lng;
					orderData.startLatitude = startLngLat.lat;
					orderData.destinationLongitude = destinationLngLat.lng;
					orderData.destinationLatitude = destinationLngLat.lat;

					$http.post('call.htm', orderData)
						.then(function(response) {
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
				});

			return defer.promise;
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
