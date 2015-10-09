import angular from 'angular';
export default class Represent {

	constructor(orderUtils, $http, $q) {
		this.state = Represent.state.FREE;	
		this.orderUtils = orderUtils;
		this.$http = $http;
		this.$q = $q;
		this.orderss = [];
	}

	addNewOrder(orderData) {
		if (this.state === Represent.state.SENDING) {
			return this.$q.reject('order is submited');	
		}
		let self = this;
		this.state = Represent.state.SENDING;
		return this.orderUtils.convertRepresentOrderDataToServerData(orderData)
			.then((data) => {
				return self.$http.post('sinbad/order.htm', data);	
			})
			.then((response) => {
				console.log('submit ok');	
			})
			.finally(() => {
				self.state = Represent.state.FREE;	
			});	
	}

	getNearCar(lng, lat) {
		return this.$http.get('sinbad/nearList', {
			params: {
				x: lng,
				y: lat,
				distance: 500	 
			}	
		})
		.then( response => {
			if (response.data.msg.length === 0) {
				return this.$q.reject();	
			}
			let carInfos = response.data.msg;
			let [item, coordinate] = [];
			for (let i = 0 ,len = carInfos.length; i < len; i ++) {
				item = carInfos[i];
				coordinate = item.coordinates.split(',');
				item.lng = coordinate[0];
				item.lat = coordinate[1];
			}
			return carInfos;	
		});
	}

	getOrdersFromService(keyword = '', page = 1, pagesize = 10) {
		return this.$http.get('sinbad/order/list.htm', {
				params:	{
					keyword,
				 	page,
					pagesize	 
				}
			})
			.then(response => {
				return response.data.msg;
			});			
	}

	getOrders(keywords) {
		return this.getOrdersFromService(keywords)
			.then(orders => {
				if (angular.isArray(orders)) {
					angular.copy(orders, this.orderss);

					return this.orderss;
				} else {
					return [];	
				}	
			});	
	}
}

Represent.$inject = ['orderUtils', '$http', '$q'];

Represent.state = {
	FREE: 0,
	SENDING: 1,
	FAIL: 2,
	SUCCESS: 3,
};
