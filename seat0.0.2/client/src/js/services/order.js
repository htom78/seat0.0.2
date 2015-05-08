var services = require('./index');

var orderService = function(orderResource, mapService, $q) {

	return {
		add: function(data) {
			var defer = $q.defer();
			
			var orderData = {
				callingTel: data.callingTel || '',
				actualTel: data.actualTel,
				gender: data.gender,
				fullName: data.fullName,
				start: data.start,
				aroundRoadName: data.aroundRoadName || '',
				end: data.end,
				remark: data.remark || '',
				startLongitude: 0,
				startLatitude: 0,
				destinationLongitude: 0,
				destinationLatitude: 0,
				reservationTime: ''
			};

			//指派车辆
			if (data.vehicleNumber && data.vehicleNumber.length > 0) {
				orderData.vehicleNumber = data.vehicleNumber;
			}

			//订单次数暂时未实现
			var count = data.count,
			    callCount = 1;
			if (typeof parseInt(count) === 'number' && 
					count > 0) {
				callCount = count > 5 ? 5 : count;
			}

			//先获取到出点和目的地的经度纬度，然后再下订单
			$q
				.all([mapService.geocode(orderData.start), mapService.geocode(orderData.end)])
				.then(function(lngLats) {
					orderData.startLongitude = lngLats[0].lng;
					orderData.startLatitude = lngLats[0].lat;
					orderData.destinationLongitude = lngLats[1].lng;
					orderData.destinationLatitude = lngLats[1].lat;
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
				callType: 1,
				page:1
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
		leaderQuery: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				page: data.currentPage,
				k: data.keywords || '',
				callType: 1,
				all: 0,
				pagesize: 10
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
							endTime: ''
						};
			return orderResource
						.getStepInfo({
							sn: sn
						})
						.then(function(response) {
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
							if (response.isSuccess) {
								return response;
							} else {
								return $q.reject(response.msg);
							}
						});
		},
		cancelOrder: function(sn) {
			return orderResource
						.cancelOrder(sn);
		},
		passengerFuck: function(sn) {
			return  orderResource
						.passengerFuck(sn);
		},
		driverFuck: function(sn) {
			return  orderResource
						.driverFuck(sn);
		}
	};
};

orderService.$inject = ['orderResource', 'mapService', '$q'];

services.factory('orderService', orderService);
