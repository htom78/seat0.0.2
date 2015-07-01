var service = require('./index');

var baseUrl = 'localhost:8822';

var callSocket = function($rootScope, $location, $q, $http) {

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
			return $http.jsonp('http://' + baseUrl + '/signIn?callback=JSON_CALLBACK');
		},

		signOut: function() {
			return $http.jsonp('http://' + baseUrl + '/signOut?callback=JSON_CALLBACK');
		},

		sayRest: function() {
			return $http.jsonp('http://' + baseUrl + '/sayRest?callback=JSON_CALLBACK');
		},

		sayBusy: function() {
			return $http.jsonp('http://' + baseUrl + '/sayBusy?callback=JSON_CALLBACK');
		},

		sayFree: function() {
			return $http.jsonp('http://' + baseUrl + '/sayFree?callback=JSON_CALLBACK');
		},	

		login: function(data) {
			return $http.jsonp('http://' + baseUrl + '/login?callback=JSON_CALLBACK', {params: data});
		},

		loginOut: function() {
			return $http.jsonp('http://' + baseUrl + '/loginOut?callback=JSON_CALLBACK');
		},

		getCurrentState: function() {
			return $http.jsonp('http://' + baseUrl + '/currentStatus?callback=JSON_CALLBACK')
				.then(function(response) {
					console.log(response);
					return response.data;	
				});
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
callSocket.$inject = ['$rootScope', '$location', '$q', '$http'];
service.factory('callSocket', callSocket);
