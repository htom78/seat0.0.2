var services = require('./index');

var socketService = function() {

	this.socketUrl = '';

	this.$get = ['$timeout', '$rootScope', 'socketMessageService',
		function($timeout, $rootScope, socketMessageService) {

			var socketUrl = this.socketUrl;

			return {

				socket: null,

				connection: function() {
					if (!this.socket) {
						this.socket = new WebSocket(socketUrl);

						this.socket.onopen = function() {};
						this.socket.onclose = function() {};

						this.socket.onmessage = function(ev) {
							var data = JSON.parse(ev.data);
							console.log('socket', data);
							socketMessageService.message(data);
						};


						/*
						setTimeout(function() {
							socketMessageService.message({type: 2, msg: [{"note":"ddddd","isTransfered":0,"terminalMobile":"15257483078","corpName":"\r\n宁波大众出租汽车有限公司","poi":"近宁兴财富广场","rTypeLabel":"实警","isRevecatory":1,"oemStatus":"空车","opName":"","vehicleNumber":"浙BT3288","driverMobile":"15257483078","timeCreated":"2015-07-09 01:47:11","driverName":"杨健","id":4,"terminalCode":"2143506","status":1}]});
						}, 3000);

						setTimeout(function() {
							socketMessageService.message({type: 3, msg: 4});	
						}, 6000);
						$timeout(function() {
							orderNotify
								.notify(2, 'P2CC72A501');	
						}, 6000);
						$timeout(function() {
							orderNotify
								.notify(4, 'P2CC72A501');	
						}, 10000);
						$timeout(function() {
							orderNotify
								.notify(9, 'R79257D223');	
						}, 14000);
						*/
					}
				},

				close: function() {
					if (this.socket) {
						this.socket.close();
					}
					this.socket = null;	
				}
			};	
	}];

	this.setSocketUrl = function(url) {
		this.socketUrl = url;	
	};

};


services.provider('socketService', socketService);
