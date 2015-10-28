'use strict';
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
								console.log(333);
							socketMessageService.message({
								type: 1, 
								msg: {
									clientSn: "2",
									driverName: "",
									refDistance: 0,
									sn: "I4C1E6D642",
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
