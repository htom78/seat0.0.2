var service = require('./index');
var callSocket = function($rootScope, $location, $q) {

	var socket = {
		status: 'disable',
		connection: function() {
			if (socket.isConnection()) {
				return;	
			}	
			socket.webSocket = new WebSocket('ws://localhost:8844');
			socket.addListener();
		},


		addListener: function() {
			var webSocket = socket.webSocket;	

			webSocket.onopen = function() {
				console.log('local socket connection ------- ');
				socket.status = 'connection';
			};

			webSocket.onmessage = function(ev) {
				$rootScope.$broadcast('userCall', {mobile: ev.data});
			};

			webSocket.onclose = function() {
				socket.status = 'disable';
				console.log('local socket close ------ ');	
			};

			webSocket.onerror = function() {
				socket.status = 'disable';
				console.log('connection server error');	
			};
		},

		close: function() {
			var webSocket = socket.webSocket;
			if (socket.isConnection()) {
				webSocket.close();	
				socket.status = 'disable';
			}	
		},

		isConnection: function() {
			return socket.status === 'connection';	
		},

		signIn: function() {
			socket.webSocket.send(JSON.stringify({operate: 'signIn'}));	
		},

		signOut: function() {
			socket.webSocket.send(JSON.stringify({operate: 'signOut'}));	
		},

		sayRest: function() {
			socket.webSocket.send(JSON.stringify({operate: 'sayBusy'}));	
		},

		sayBusy: function() {
			socket.webSocket.send(JSON.stringify({operate: 'sayBusy'}));	
		},

		sayFree: function() {
			socket.webSocket.send(JSON.stringify({operate: 'sayFree'}));	
		},	

		login: function(data) {
			socket.webSocket.send(JSON.stringify(data));	
		}
	};

	/*
	return {
		socket: null,
		connection: function() {
			if (this.socket) {
				throw new Error('call socket has connection');	
			}	
			this.socket = new WebSocket('ws://localhost:8844'); 
			this.socket.onopen = function() {
				console.log('call socket connection');	
			};
			this.socket.onmessage = function(ev) {
				var info = JSON.parse(ev.data);
				if (info.state === 'callIn') {
					$rootScope.$broadcast('userCall', {mobile: info.msg});
				}
			};
		},
		close: function() {
			if (this.socket) {
				this.socket.close();	
			}
			this.socket = null;
		}
	};
	*/
	
	return socket;
};
callSocket.$inject = ['$rootScope', '$location', '$q'];
service.factory('callSocket', callSocket);
