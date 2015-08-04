var services = require('./index');

var PAGE_SIZE = 10;

var policeService = function($http, $q) {

	var store = {
		orders: [],
		keywords: '',
		status: 0,
		pageSize: PAGE_SIZE,
		currentPage:1,
		allOrderTotal: 0,	
		unhandleOrderTotal: 0,
		handleOrderTotal: 0,
		currentOrderTotal: 0,
		activeItemIndex: -1,

		initParams: function() {
			this.keywords = '';
			this.currentPage = 1;
			this.status = 0;
		},

		initService: function() {
			this.orders = [];	
			this.initParams();
			this.allOrderTotal = 0;
			this.unhandleOrderTotal = 0;
			this.handleOrderTotal = 0;
			this.currentOrderTotal = 0;
			this.activeItemIndex = -1;
		},

		get: function() {
			var self = this;
			this.activeItemIndex = -1;
			return $http.get('alarm/list.htm', {
				params: {
					k: this.keywords,
					pagesize: this.pageSize,
					page: this.currentPage,
					status: this.status		
				}
			})
				.then(function(response) {
					var total = response.data.count;
					angular.copy(response.data.list, self.orders);		
					self.currentOrderTotal = total;
					return total;
				});	
		},

		getAllOrders: function() {
			var self = this;
			this.initParams();
			this.status = 0;
			return this.get()
				.then(function(total) {
					self.allOrderTotal = total;	
				});
		},

		getUnhandleOrders: function() {
			var self = this;	
			this.initParams();
			this.status = 1;
			return this.get()
				.then(function(total) {
					self.unhandleOrderTotal = total;	
				});
		},

		getHandleOrders: function() {
			var self = this;	
			this.initParams();
			this.status = 2;
			return this.get()
				.then(function(total) {
					self.handleOrderTotal = total;	
				});
		},

		getOrderByPageNumber: function(pageNumber) {
			this.currentPage = pageNumber || 1;	
			return this.get();
		},

		getOrderByKeywords: function(keywords) {
			this.keywords = keywords || '';	
			this.currentPage = 1;
			return this.get();
		},

		getAllOrderTotal: function() {
			return store.allOrderTotal;	
		},

		getUnhandleOrderTotal: function() {
			return store.unhandleOrderTotal;	
		},

		getHandleOrderTotal: function() {
			return store.handleOrderTotal;	
		},

		addActiveItem: function(order) {
			this.removeActiveItem();
			this.activeItemIndex = this.orders.indexOf(order);
			var order = this.getActiveItem();
			if (order) {
				order.isActive =  true;
			}
		},

		removeActiveItem: function() {
			if (this.activeItemIndex !== -1) {
				this.orders[this.activeItemIndex].isActive = false;				
			}	
			this.activeItemIndex = -1;
		},

		getActiveItem: function() {
			if (this.activeItemIndex !== -1) {
				return this.orders[this.activeItemIndex];	
			}
			return null;	
		},

		watchCar: function() {
			var item = this.getActiveItem();
			if (item) {
				return $http.post('alarm/listen.htm', {
					number: item.vehicleNumber	
				});	
			}
		},

		trackCar: function() {
			var item = this.getActiveItem();	
			if (item) {
				return $http.post('alarm/once.htm', {
					number: item.vehicleNumber	
				});	
			}
		},

		photograph: function() {
			var item = this.getActiveItem();	
			if (item) {
				return $http.post('alarm/snap.htm', {
					number: item.vehicleNumber	
				});	
			}
		},

		transferPolice: function() {
			var item = this.getActiveItem();	
			if (item) {
				return $http.post('alarm/transfered.htm', {
					id: item.id	
				});	
			}
		},

		handleAlarm: function(reason, note) {
			var item = this.getActiveItem();	
			if (item) {
				return $http.post('alarm/do.htm', {
					id: item.id,
					rType: reason,
					note: note || ''	
				});	
			}
			return $q.reject();
		}

	};

	return store;

};

policeService.$inject = ['$http', '$q'];



services.factory('policeService', policeService);
