'use strict';
import angular from 'angular';

export default class Seat {

	constructor($http, $q, $filter, orderUtils) {
		this.$http = $http;
		this.$q = $q;
		this.$filter = $filter;
		this.orderss = [];
		this.orderUtils = orderUtils;
		this.isPauseSearch = false;
		this.all = 0;
	}

	getOrdersFromService({
		all = 0,
		page = 1,
		pagesize = 6,
		isImmediate = 1,
		k = '',
		status = 1,	
	} = {}) {
		return this.$http.get('search.htm', {params: {
			page,
			pagesize,
			isImmediate,
			k,
			status,			
			all: this.all,
			callType: this.callType,
		}});
	}

	selectSpecialCar() {
		this.callType = 2;	
	}

	selectNormalCar() {
		this.callType = 1;	
	}

	setOrderType(type) {
		this.all = type;	
	}

	getOrders(params) {
		this.isPauseSearch = true;
		return this.getOrdersFromService(params)
			.then((response) => {
				let orders = response.data.list;	
				let total = 0;
				if (angular.isArray(orders)) {
					angular.copy(orders, this.orderss);	
					total = response.data.total;
				} else {
					angular.copy([], this.orderss);		
				}
				return {
					total: total,
					average: response.data.sec,	
				};
			})
			.finally(() => {
				setTimeout(() => {
					this.isPauseSearch = false;	
				}, 3000);	
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
					sn: sn,
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
				return this.getPreparedOrders(orderData.isReservation ? 0 : 1)
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
		if (this.isPauseSearch) {
			return this.$q.reject();	
		}
		return this.getOrdersFromService({
			isImmediate,
			status,			
		})
			.then((response) => {
				let orders = response.data.list;	
				if (!angular.isArray(orders) || orders.lenght < 1) {
					return this.$q.reject();	
				}
				let shouldUpdate = false;
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
					total: response.data.total,
					average: response.data.sec,	
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
			var orders = response.data.list;	
			if (!angular.isArray(orders) && orders.length === 0) {
				return this.$q.reject();	
			}
			angular.copy(orders, this.orderss);
			return this.orderss[0];
		});
	}

	handleCancelOrder(order) {
		return this.$http.post('cancel/1.htm', {sn: order.sn});	
	}

	handlePassengerFuckOrder(order) {
		return this.$http.post('cancel/6.htm', {sn: order.sn});	
	}

	handleDriverFuckOrder(order) {
		return this.$http.post('cancel/7.htm', {sn: order.sn});	
	}

	assignOrderByCarPlate(order, number) {
		return this.$http.post('assign.htm', {sn: order.sn, number});	
	}
}
