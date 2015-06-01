var services = require('./index');

var socketService = function(orderNotify, $rootScope, $timeout) {
	var host = location.host;
	var link = 'ws://' + host + window.appRoot + '/ws/server';
	return {
		socket: null,
		connection: function() {
			if (this.socket) {
				throw new Error('socket has open');	
			}
			this.socket = new WebSocket(link);
			this.socket.onopen = function() {
			};
			this.socket.onclose = function() {
			};
			this.socket.onmessage = function(ev) {
				var info = JSON.parse(ev.data);
				var status = parseInt(info.status);
				var sn = info.sn;
				//console.log(info);
				if (status && status > 0) {
					$rootScope.$apply(function() {
						orderNotify
							.notify(status, sn);	
					});
				}
			};
			/*
			$timeout(function() {
				orderNotify
					.notify(2, 'P2CC72A501');	
			}, 2000);
			$timeout(function() {
				orderNotify
					.notify(4, 'P2CC72A501');	
			}, 4000);
			$timeout(function() {
				orderNotify
					.notify(9, 'P2CC72A501');	
			}, 6000);
			*/

		},
		close: function() {
			if (this.socket) {
				this.socket.close();
			}
			this.socket = null;	
		}
	};
};

socketService.$inject = ['orderNotifyService', '$rootScope', '$timeout'];

services.factory('socketService', socketService);
