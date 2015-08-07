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
							/*
							if (parseInt(response.type) === 1) {
								orderNotify.notify(response.msg.status, response.msg.sn);	
							}
							*/
						};
						/*
						$timeout(function() {
							socketMessageService.message({type: 2, msg: [{name: 'quan'}]});
						}, 3000);
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
