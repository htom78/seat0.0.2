var services = require('./index');

var socket = function() {

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
							socketMessageService.message({type: 2, msg: [{"note":"ddddd","isTransfered":0,"terminalMobile":"15257483078","corpName":"\r\n宁波大众出租汽车有限公司","poi":"近宁兴财富广场","rTypeLabel":"实警","isRevecatory":1,"oemStatus":"空车","opName":"","vehicleNumber":"浙BT3288","driverMobile":"15257483078","timeCreated":"2015-07-09 01:47:11","driverName":"杨健","id":8,"terminalCode":"2143506","status":1}]});
						}, 3000);

						setTimeout(function() {
							socketMessageService.message({
								type: 1, 
								msg: {
									clientSn: "2",
									driverName: "",
									refDistance: 0,
									sn: "I5502D910B",
									status: 2,
									statusDesc: "系统异常",
									tag: "DISP",
									timeCreated: 1439257730000,
									vehicleId: "",
									vehicleNumber: "浙BT9035",
									vehiclePhone: "18667870255"	
								}
							});
						}, 3000);

						setTimeout(function() {
							socketMessageService.message({
								type: 1, 
								msg: {
									clientSn: "2",
									driverName: "",
									refDistance: 0,
									sn: "I5502D910B",
									status: 4,
									statusDesc: "系统异常",
									tag: "DISP",
									timeCreated: 1439257730000,
									vehicleId: "",
									vehicleNumber: "浙BT9035",
									vehiclePhone: "18667870255"	
								}
							});
						}, 6000);

						setTimeout(function() {
							socketMessageService.message({
								type: 1, 
								msg: {
									clientSn: "2",
									driverName: "",
									refDistance: 0,
									sn: "I5502D910B",
									status: 9,
									statusDesc: "系统异常",
									tag: "DISP",
									timeCreated: 1439257730000,
									vehicleId: "",
									vehicleNumber: "浙BT9035",
									vehiclePhone: "18667870255"	
								}
							});
						}, 10000);
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


services.provider('socket', socket);
