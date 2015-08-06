var services = require('./index');

var PAGE_SIZE = 10;

var policeService = function($http, $q) {

	var store = {
		orders: [],
		keywords: '',
		status: 1,
		pageSize: PAGE_SIZE,
		currentPage:1,
		allOrderTotal: 0,	
		unhandleOrderTotal: 0,
		handleOrderTotal: 0,
		currentOrderTotal: 0,

		initParams: function() {
			this.keywords = '';
			this.currentPage = 1;
			this.status = 1;
		},

		initService: function() {
			this.orders = [];	
			this.initParams();
			this.allOrderTotal = 0;
			this.unhandleOrderTotal = 0;
			this.handleOrderTotal = 0;
			this.currentOrderTotal = 0;
		},

		get: function() {
			var self = this;
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

		watchCar: function(number) {
			return $http.post('alarm/listen.htm', {
				number: number	
			});
		},

		trackCar: function(number) {
			return $http.post('alarm/once.htm', {
				number: number	
			});
		},

		relieve: function() {
			return $q.when('relieve');	
		},

		photograph: function(number) {
			return $http.post('alarm/snap.htm', {
				number: number	
			});
		},

		transferPolice: function(id) {
			return $http.post('alarm/transfered.htm', {
				id: id	
			});	
		},

		handleAlarm: function(id, reason, note) {
			return $http.post('alarm/do.htm', {
				id: id,
				rType: reason,
				note: note || ''	
			});	
		}

	};

	return store;

};

policeService.$inject = ['$http', '$q'];



services.factory('policeService', policeService);
