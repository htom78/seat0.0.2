'use strict';
import angular from 'angular';

function Status($timeout, leaderService, iChart) {
	return {

		scope: {},

		templateUrl: 'component/employee-status.html',

		link(scope, elem) {

			scope.statusItems = [];

			const status = {
				tab: {
					BUSY: 'busy',
					REST: 'rest',
					RESPOND: 'respond',
					FREE: 'free',	
				}	
			};
			
			scope.currentTab = status.tab.BUSY;
			scope.isBusyTab = function() {
				return scope.currentTab === status.tab.BUSY;	
			};

			scope.isRestTab = function() {
				return scope.currentTab === status.tab.REST;	
			};

			scope.isRespondTab = function() {
				return scope.currentTab === status.tab.RESPOND;	
			};

			scope.isFreeTab = function() {
				return scope.currentTab === status.tab.FREE;	
			};

			scope.cutBusyTab = function() {
				scope.currentTab = status.tab.BUSY;	
			};

			scope.cutRestTab = function() {
				scope.currentTab = status.tab.REST;	
			};

			scope.cutRespondTab = function() {
				scope.currentTab = status.tab.RESPOND;	
			};

			scope.cutFreeTab = function() {
				scope.currentTab = status.tab.FREE;	
			};

				var chartInstance = iChart.instance(angular.element('#employeeGraph'), {
					colors: ['#ff7c3c', '#e6c707', '#97c255', '#649626'],
					hasLine: true,
				});

				var tickTimer;
				const TIME_INTERVAL = 8000;

				var info = {
					'示忙': 'busy',
					'小休': 'rest',
					'应答': 'respond',
					'空闲': 'free',	
				};
				scope.infos = {};

				(function tick() {
					leaderService.getEmployeeStatus()
						.then((response) => {
							var data = {};
							response.forEach((item) => {
								data[info[item.label]] = parseInt(item.sign);
								scope.infos[info[item.label]] = item.list; 
							});
							chartInstance.draw(data);
						});
					tickTimer = $timeout(tick, TIME_INTERVAL);
				})();
				
				scope.$on('$destroy', () => {
					$timeout.cancel(tickTimer);	
				});

				scope.$watch('currentTab', (tab) => {
					scope.statusItems = scope.infos[tab];
				});

				scope.$watchGroup([
						'infos.free', 
						'infos.busy', 
						'infos.rest', 
						'infos.respond'
						], (newValue) => {
						scope.statusItems = scope.infos[scope.currentTab];
				});

		}	
	};
}

export default {
	name: 'employeeStatus',
	fn: Status
};
