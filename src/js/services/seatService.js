'use strict';
import angular from 'angular';

export default class Seat {

	constructor($http, $q, $filter, orderUtils) {
		this.$http = $http;
		this.$q = $q;
		this.$filter = $filter;
		this.orderss = [];
		this.orderUtils = orderUtils;
	}

	getOrdersFromService({
		all = 0, // 0 个人 1 全部
		page = 1,
		pagesize = 6,
		isImmediate = 1, // 0 预约 1即时
		k = '',
		status = 1,	// 0 异常单 1调派中 2已接单 3已出发 4已完成
	} = {}) {
		return this.$http.get('search.htm', {params: {
			page,
			pagesize,
			isImmediate,
			k,
			status,			
			all,		 
			callType: this.callType, //1专车召车 2普通招车
		}})
		.then((response) => {
			var orders = response.data.list;	
			if (!angular.isArray(orders)) {
				return this.$q.reject();	
			}
			return response.data;
		});
	}

	getOrders(params) {
		return this.getOrdersFromService(params)
			.then((response) => {
				var orders = response.list;
				angular.copy(orders, this.orderss);
				return response;
			}, (error) => {
				angular.copy([], this.orderss);	
				return this.$q.reject();
			})
			.finally(() => {
				setTimeout(() => {
				}, 3000);	
			});	
	}

	selectSpecialCar() {
		this.callType = 2;	
	}

	selectNormalCar() {
		this.callType = 1;	
	}

	addNewOrder(orderData) {
		return this.orderUtils.convertSeatOrderDataToServerData(orderData)	
			.then((d) => {
				d.callType = this.callType;
				return this.$http.post('call.htm', d)
					.then((response) => {
						if (response.data.sn) {
							return response.data.sn;	
						} else {
							return this.$q.reject();	
						}	
					});
			})
			.then((sn) => {
				return {
					sn,
					contactPhone: orderData.actualTel,
					timeCreated: orderData.reservationTime || this.$filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
					user: orderData.fullName,
					poi: orderData.start,
					'destination_poi': orderData.end,
					isNewAdd: true,
				};		
			})
			.then((d) => {
				let hasOrder = false;

				return this.getOrdersFromService({
					isImmediate: orderData.isReservation ? 0 : 1,
					status: 1,
					all: 0, 
				})
					.then((orderInfo) => {
						this.orderss.forEach( (order) => {
							if (d.sn === order.sn) {
								order.isNewAdd = true;	
								hasOrder = true;
							}	
						});	
						if (!hasOrder) {
							orderInfo.total = orderInfo.total + 1;
							this.orderss.unshift(d);	
						}
						return orderInfo;
					});
			});
	}

	shouldUpdateOrderItemList(status, isImmediate, sn) {
		return this.getOrdersFromService({
			isImmediate,
			status,			
		})
			.then((response) => {
				var orders = response.list;	
				var shouldUpdate = false;
				if (orders.lenght < 1) {
					return this.$q.reject();	
				}
				for (let i = 0, ii = orders.length; i < ii; i++) {
					if (orders[i].sn === sn) {
						orders[i].isNewAdd = true;	
						shouldUpdate = true;
						break;
					}	
				}
				if (!shouldUpdate) {
					return this.$q.reject();	
				}
				angular.copy(orders, this.orderss);
				return {
					total: response.total,
					average: response.sec,	
				};
			});
	}

	queryOrderBySn(sn, isImmediate) {
		return this.getOrdersFromService({
			isImmediate,
			k: sn,
			status: -1,	
		})
		.then((response) => {
			var orders = response.list;	
			if (orders.length === 0) {
				return this.$q.reject();	
			}
			angular.copy(orders, this.orderss);
			return this.orderss[0];
		});
	}

}
