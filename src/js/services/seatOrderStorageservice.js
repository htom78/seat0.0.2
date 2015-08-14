var services = require('./index');

var seatOrderStorageService = function($http, $q, map, gpsGcjExchangeUtils, orderUtils, $rootScope) {

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

		isImmediateSelect: function() {
			return this.isImmediate;	
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
					angular.copy(response.data.list, self.orders);
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

		getOrders: function(status) {
			var immediateOrReservation = this.isImmediate ? 1 : 0;
			return $http.get('search.htm', {
				params: {
					all: 0,
					page: 1,
					pagesize: 6,
					callType: this.callType,
					isImmediate: immediateOrReservation,
					k: '',
					status: status	 
				}	
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
			var self = this;
			orderData = orderUtils.convertOrderServerData(orderData);
			orderData.callType = this.callType;
			return $q.all([map.geocode(orderData.start), map.geocode(orderData.end)])
				.then(function(lngLats) {
					var startLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[0].lng, lngLats[0].lat);
					var destinationLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[1].lng, lngLats[1].lat);
					orderData.startLongitude = startLngLat.lng;
					orderData.startLatitude = startLngLat.lat;
					orderData.destinationLongitude = destinationLngLat.lng;
					orderData.destinationLatitude = destinationLngLat.lat;

					return orderData;
				})
				.then(function(orderData) {
					return self.create(orderData);
				})
				.then(function(sn) {
					if (orderData.reservationTime) {
						self.selectReservation();
					} else {
						self.selectImmediate();	
					}
					var newOrder = {
						sn: sn,
						contactPhone: orderData.actualTel,
						timeCreated: orderData.reservationTime || new Date(),
						user: orderData.fullName,
						poi: orderData.start,
						'destination_poi': orderData.end,
						isNewAdd: true
					};
					return newOrder;
				})
				.then(function(newOrder) {
						return self.getPreparedOrders().then(function(orders) {
							var hasOrder = false;
							self.orders.forEach(function(order) {
								if (order.sn === newOrder.sn) {
									order.isNewAdd = true;
									hasOrder = true;	
								}
							});
							if (!hasOrder) {
								self.orders.unshift(newOrder);	
							}
						});
				});
		},

		create: function(orderData) {
			var defer = $q.defer();
			$http.post('call.htm', orderData)
				.then(function(response) {
					if (response.data.sn) {
						defer.resolve(response.data.sn);	
					}	else {
						defer.reject();	
					}
				}, function() {
					defer.reject();	
				});	

			return defer.promise;
		},

		receiveOrderUpdate: function(sn) {
			return this.updateOrder(2, sn);
		},

		startedOrderUpdate: function(sn) {
			return this.updateOrder(3, sn);	
		},

		doneOrderUpdate: function(sn) {
			return this.updateOrder(4, sn);
		},

		updateOrder: function(status, sn) {
			if (this.isPauseSearch) {
				return $q.reject();	
			}
			var defer = $q.defer();	
			var self = this;
			this.getOrders(status).then(function(response) {
				var orders = response.data.list;	
				if (orders.length === 0) {
					defer.reject();	
				} else {
					var shouldUpdate = false;
					for (var i = 0, ii = orders.length; i < ii; i ++) {
						if (orders[i].sn === sn) {
							orders[i].isNewAdd = true;
							shouldUpdate = true;	
							break;
						}	
					}	
					if (shouldUpdate) {
						angular.copy(orders, self.orders);
						self.currentOrderType = status;
						defer.resolve();	
					} else {
						defer.reject();	
					}
				}
			});

			return defer.promise;
		},

		queryOrderBySn: function(sn, isImmediate) {
			if (isImmediate === 1) {
				this.selectImmediate();	
			} else {
				this.selectReservation();	
			}
			return $http.get('search.htm', {
				params: {
					all: 0,
					page: 1,
					pagesize: 6,
					callType: this.callType,
					isImmediate: isImmediate,
					k: sn,
					status: -1
				}
			}).then(function(response) {
				var orders = response.data.list;
				if (orders && orders.length > 0) {
					return orders[0];	
				} else {
					return $q.reject();	
				}
			});	
		}

	};
	return store;
};

seatOrderStorageService.$inject = ['$http', '$q', 'map', 'gpsGcjExchangeUtils', 'orderUtils', '$rootScope'];

services.factory('seatOrderStorageService', seatOrderStorageService);
