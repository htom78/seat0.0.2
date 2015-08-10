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
					switch (self.status) {
						case 0:
							self.allOrderTotal = total;	
							self.setOrderSelectState();
							break;	
						case 1:
							self.unhandleOrderTotal = total;	
							self.setOrderSelectState();
							break;
						case 2:
							self.handleOrderTotal = total;	
							break;
						default:
							break;
					}
					return self.orders;
				});	
		},

		setOrderSelectState: function() {
			var orders = this.orders;	
			var self = this;
			var info;
			this.getOrderSelectState().then(function(response) {

				var selectInfos = response.data.msg;	
				angular.forEach(orders, function(order) {
					for (var i = 0, ii = selectInfos.length; i < ii; i ++) {
						info = selectInfos[i];
						if (self.isUnhandleOrder(order) && 
							parseInt(info.id) === order.id) {
							if (info.isOwner) {
								order.isSelfSelected = true;	
							} else {
								order.isOtherSelected = true;	
							}
						}	
					}	
				});

			});
		},

		isUnhandleOrder: function(order) {
			return order.status === 1;	
		},

		getAllOrders: function() {
			var self = this;
			this.initParams();
			this.status = 0;
			return this.get();
		},

		getUnhandleOrders: function() {
			var self = this;	
			this.initParams();
			this.status = 1;
			return this.get();
		},

		getHandleOrders: function() {
			var self = this;	
			this.initParams();
			this.status = 2;
			return this.get();
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

		relieve: function(id) {
			return $http.post('alarm/remove.htm', {
				id: id	
			});
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

		addAlarmNode: function(id, reason, note) {
			return $http.post('alarm/do.htm', {
				id: id,
				rType: reason,
				note: note || ''	
			});	
		},

		selectItem: function(id) {
			return $http.get('alarm/select.htm', {
				params: {
					id: id	
				}
			});	
		},

		getOrderSelectState: function() {
			return $http.get('alarm/getSelected.htm');	
		},

		hasOrderExist: function(order) {
			var isExist = false;
			angular.forEach(this.orders, function(item) {
				if (item.id === order.id) {
					isExist = true;	
				}	
			});	

			return isExist;
		}

	};

	return store;

};

policeService.$inject = ['$http', '$q'];



services.factory('policeService', policeService);
