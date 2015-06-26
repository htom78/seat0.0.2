var services = require('./index');

var orderService = function(orderResource, mapService, $q, gpsGcjExchangeUtils) {

	return {
		//新建订单
		add: function(orderData) {
			var defer = $q.defer();
			//先获取到出点和目的地的经度纬度，然后再下订单
			$q
				.all([mapService.geocode(orderData.start), mapService.geocode(orderData.end)])
				.then(function(lngLats) {
					//根据地理位置，从高德获取到经纬度 =>  火星坐标转国标 
					var startLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[0].lng, lngLats[0].lat),
					    destinationLngLat = gpsGcjExchangeUtils.gcj02ToGps84(lngLats[1].lng, lngLats[1].lat);
					orderData.startLongitude = startLngLat.lng;
					orderData.startLatitude = startLngLat.lat;
					orderData.destinationLongitude = destinationLngLat.lng;
					orderData.destinationLatitude = destinationLngLat.lat;
					/*
					 创建多次订单
					var requests = [];
					for (var i = 0; i < callCount; i ++ ) {
						requests.push(orderResource.add);
					}
					$q
						.all(angular.forEach(requests, function(request) {
							return	request(orderData);
						}))
						.then(function(responses) {
							console.log(responses[0]);
							defer.resolve();		
						}, function() {
							defer.reject();	
						});
						*/
					orderResource
						.add(orderData)
						.then(function(response) {
							if (parseInt(response.status) === 0 &&
								response.sn && 
								response.sn.length > 2) {
								defer.resolve(response.sn);	
							} else {
								defer.reject(response.code);	
							}
						}, function() {
							defer.reject('关于服务器上的错误');
						});
				});
			return defer.promise;
		},
		query: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				k: data.keywords || '',
				all: 0,
				pagesize: 6,
				callType: data.callType,
				page:1,
				isImmediate: data.isImmediate
			};
			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.averageTimer = response.sec;
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		leaderQuery: function(data) {
			var result = [];
			result.total = 0;
			result.averageTimer = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				page: data.currentPage,
				k: data.keywords || '',
				callType: 1,
				all: 0,
				pagesize: 10,
				isImmediate: 1
			};

			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		queryMore: function(data) {

			var result = [];
			result.total = 0;
			var queryData = {
				beginTime: data.beginTime || '',
				endTime: data.endTime || '',
				status: data.status,
				page: data.currentPage,
				k: data.keywords || '',
				callType: data.callType,
				pagesize: 10
			};
			return orderResource
						.queryMore(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		getStepInfo: function(sn) {
			var data = {
							createTime: '',
							orderTime: '',
							pickupTime: '',
							endTime: '',
							pickupX: 0,
							pickupY: 0,
							assignedX: 0,
							assignedY: 0,
							arrivedX: 0,
							arrivedY: 0
						};
			return orderResource
						.getStepInfo({
							sn: sn
						})
						.then(function(response) {
							//gps 转 火星
							var pickupLngLat = gpsGcjExchangeUtils.gps84ToGcj02(response.pickupX, response.pickupY),
							    assignedLngLat = gpsGcjExchangeUtils.gps84ToGcj02(response.assignedX, response.assignedY),
							    arrivedLngLat = gpsGcjExchangeUtils.gps84ToGcj02(response.arrivedX, response.arrivedY);
							data.pickupX = pickupLngLat.lng;
							data.pickupY = pickupLngLat.lat;
							data.assignedX = assignedLngLat.lng;
							data.assignedY = assignedLngLat.lat;
							data.arrivedX = arrivedLngLat.lng;
							data.arrivedY = arrivedLngLat.lat;
							if (!response.createTime) {
								return data;
							}
							data.createTime = response.createTime;
							if (!response.orderTime) {
								return data;
							}
							data.orderTime = response.orderTime;
							if (!response.pickupTime) {
								return data;
							}
							data.pickupTime = response.pickupTime;
							if (!response.endTime) {
								return data;
							}
							data.endTime = response.endTime;
							return data;
						}, function() {
							return data;
						});
		},
		assign: function(data) {
			return orderResource
						.assign({
							sn: data.sn,
							number: data.carNumber
						})
						.then(function(response) {
							if (response && parseInt(response.status) === 0) {
								return response;
							} else {
								return $q.reject(response);
							}
						});
		},
		cancelOrder: function(sn) {
			return orderResource
						.cancelOrder(sn)
						.then(function(response) {
							if (response && parseInt(response.status) === 0) {
								return response;
							} else {
								return $q.reject(response);
							}
						});
		},
		passengerFuck: function(sn) {
			return  orderResource
						.passengerFuck(sn)
						.then(function(response) {
							if (response && parseInt(response.status) === 0) {
								return response;
							} else {
								return $q.reject(response);
							}
						});
		},
		driverFuck: function(sn) {
			return  orderResource
						.driverFuck(sn)
						.then(function(response) {
							if (response && parseInt(response.status) === 0) {
								return response;
							} else {
								return $q.reject(response);
							}
						});
		}
	};
};

orderService.$inject = ['orderResource', 'mapService', '$q', 'gpsGcjExchangeUtils'];

services.factory('orderService', orderService);
