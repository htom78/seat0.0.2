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
				var response = JSON.parse(ev.data);
				console.log(response);
				if (parseInt(response.type) === 1) {
					orderNotify.notify(response.msg.status, response.msg.sn);	
				}
			};

			/*
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
