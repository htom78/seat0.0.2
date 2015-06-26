var service = require('./index');
var callSocket = function($rootScope, $location) {
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
};
callSocket.$inject = ['$rootScope', '$location'];
service.factory('callSocket', callSocket);
