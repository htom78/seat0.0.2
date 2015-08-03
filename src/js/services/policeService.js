var services = require('./index');

var PAGE_SIZE = 10;

var policeService = function($http) {

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
			if (this.activeItemIndex !== -1) {
				this.orders[this.activeItemIndex].isActive = false;				
			}	
			this.activeItemIndex = this.orders.indexOf(order);
			order.isActive =  true;
		}


	};

	return store;

};

policeService.$inject = ['$http'];



services.factory('policeService', policeService);
