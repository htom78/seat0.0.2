var services = require('./index');

var leaderOrderStorageService = function($http, orderStepDialog) {

	var store = {

		initParams: function() {
			this.searchOrderKeywords = '';
			this.currentOrderType = 1;
			this.currentPage = 1;
		},

		initService: function() {
			this.initParams();	
			this.isImmediate = true;
			this.orders = [];
			this.currentOrderTotal = 0;
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
			return $http.get('search.htm', {
				params: {
					all: 0,
					page: this.currentPage,
					pagesize: 10,	 
					callType: 1,
					isImmediate: immediateOrReservation,
					k: this.searchOrderKeywords,
					status: this.currentOrderType
				}	
			}).then(function(response) {
				angular.copy(response.data.list, self.orders);	
				var total = response.data.total;
				self.currentOrderTotal = total;
				return self.orders;
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
			this.searchOrderForKeywords = '';	
			return this.get();
		},

		getCurrentOrdersByKeywords: function(keywords) {
			this.searchOrderKeywords = keywords || '';
			this.currentPage = 1;
			return this.get();
		},

		getShowOrderCount: function() {
			var count = this.currentOrderTotal > 999 ? 999 : this.currentOrderTotal;	
			return ('000' + count).slice(-3).split('');
		},

		getOrderInfo: function(sn) {
			return $http.get('search/route.htm', {
				params: {
					sn: sn	
				}	
			});
		},

		handlePassengerFuckOrder: function(sn) {
			return $http.post('cancel/6.htm', {sn: sn});
		},

		heandleDriverFuckOrder: function(sn) {
			return $http.post('cancel/7.htm', {sn: sn});
		},

		heandleCancelOrder: function(sn) {
			return $http.post('cancel/1.htm', {sn: sn});
		},

		assignOrderToCarPlate: function(sn, carPlate) {
			return $http.post('assign.htm', {
				sn: sn,
				number: carPlate	 
			});	
		}

	};
	return store;
};

leaderOrderStorageService.$inject = ['$http', 'orderStepDialog', '$q'];

services.factory('leaderOrderStorageService', leaderOrderStorageService);
