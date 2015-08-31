var service = require('./index');

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
			},

			signIn: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/signIn?callback=JSON_CALLBACK');
			},

			signOut: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/signOut?callback=JSON_CALLBACK');
			},

			sayRest: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/sayRest?callback=JSON_CALLBACK');
			},

			sayBusy: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/sayBusy?callback=JSON_CALLBACK');
			},

			sayFree: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/sayFree?callback=JSON_CALLBACK');
			},	

			login: function(data) {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/login?callback=JSON_CALLBACK', {params: data});
			},

			logout: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/logout?callback=JSON_CALLBACK');
			},

			getCurrentState: function() {
				return $http.jsonp('http://' + socketOptions.baseUrl + '/currentStatus?callback=JSON_CALLBACK')
					.then(function(response) {
						return response.data;	
					});
			}

		};
		
		return socket;
	}];

};
service.provider('ocxSocket', ocxSocket);
