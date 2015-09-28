export default class Represent {

	constructor(orderUtils, $http, $q) {
		this.state = Represent.state.FREE;	
		this.orderUtils = orderUtils;
		this.$http = $http;
		this.$q = $q;
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
				distance: 1000	 
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
}

Represent.$inject = ['orderUtils', '$http', '$q'];

Represent.state = {
	FREE: 0,
	SENDING: 1,
	FAIL: 2,
	SUCCESS: 3,
};
