var services = require('./index');

var ocxSocket = function() {

	var socketOptions = {};

	this.options = function(value) {
		socketOptions = value;	
	};

	this.$get = ['$rootScope', '$http', 
		function($rootScope, $http) {
	
		var socket = {

			status: 'disable',

			connection: function() {
				if (socket.isConnection()) {
					return;	
				}	
				this.webSocket = new WebSocket(socketOptions.socketUrl);
				this.addListener();
			},


			addListener: function() {
				var self = this;
				var webSocket = this.webSocket;	

				webSocket.onopen = function() {
					console.log('local socket connection ------- ');
					self.status = 'connection';
				};

				webSocket.onmessage = function(ev) {
					$rootScope.$broadcast('userCall', {mobile: ev.data});
				};

				webSocket.onclose = function() {
					self.status = 'disable';
					console.log('local socket close ------ ');	
				};

				webSocket.onerror = function() {
					self.status = 'disable';
					console.log('connection server error');	
				};
			},

			close: function() {
				var webSocket = this.webSocket;
				if (this.isConnection()) {
					webSocket.close();	
					socket.status = 'disable';
				}	
			},

			isConnection: function() {
				return socket.status === 'connection';	
			}
		};
		
		return socket;
	}];

};
services.provider('ocxSocket', ocxSocket);
