'use strict';

import gaodeOptions from './gaodeOptions';
import angular from 'angular';

config.$inject = [
	'$httpProvider', 
	'socketProvider', 
	'mapServiceProvider',
	'myHttpInterceptorProvider',
	'seatMapProvider',
	'ocxSocketProvider',
	'leaderMapProvider',
	'ocxCallProvider',
	'ocxSignProvider',
	'representMapProvider'
	];


export default function config(
			$httpProvider, 
			socketProvider, 
			mapServiceProvider, 
			myHttpInnterceptor, 
			seatMapProvider, 
			ocxSocketProvider, 
			leaderMapProvider, 
			ocxCallProvider, 
			ocxSignProvider,
			representMapProvider
		) {

	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [(data) => {
		return angular.isObject(data) ? $.param(data) : data;
	}];

	var ocxBaseUrl = 'http://192.168.0.106:8822';
	socketProvider.setSocketUrl(`ws:\/\/${location.host}${window.appRoot}/ws/server`);

	ocxSocketProvider.options({
		socketUrl: 'ws://192.168.0.106:8844'
	});

	ocxCallProvider.options({
		baseUrl: ocxBaseUrl	
	});

	ocxSignProvider.options({
		baseUrl: ocxBaseUrl	
	});

	mapServiceProvider.options(gaodeOptions);
	myHttpInnterceptor.options(gaodeOptions);
	seatMapProvider.options(gaodeOptions);
	leaderMapProvider.options(gaodeOptions);
	representMapProvider.options(gaodeOptions);

	$httpProvider.interceptors.push('myHttpInterceptor');
}
