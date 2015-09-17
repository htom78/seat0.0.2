import gaodeOptions from './gaodeOptions';

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
	];

export default function config($httpProvider, socketProvider, mapServiceProvider, myHttpInnterceptor, seatMapProvider, ocxSocketProvider, leaderMapProvider, ocxCallProvider, ocxSignProvider) {

	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = [(data) => {
		return angular.isObject(data) ? $.param(data) : data;
	}];

	var ocxBaseUrl = 'http://localhost:8822';
	socketProvider.setSocketUrl(`ws:\/\/${location.host}${window.appRoot}/ws/server`);

	ocxSocketProvider.options({
		socketUrl: 'ws://localhost:8844'
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

	$httpProvider.interceptors.push('myHttpInterceptor');
}
