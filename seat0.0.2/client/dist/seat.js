(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var components = require('./index');

function createElement(clazz) {
	var el = angular.element('<div>');
	el.addClass(clazz);
	return el;
}

var dialogService = function($http, $q, $compile, $templateCache, $document) {
	var defaults = {
		modalClass: 'modal'
	};
	var body = $document.find('body');

	function Dialog(opts) {
		this.options = angular.extend({}, defaults, opts);
		this.modalEl = createElement(this.options.modalClass);
	}

	Dialog.prototype.open = function(info) {
		var self = this,
			options = this.options;
		
		options.templateUrl = info.url;
		options.scope = info.scope;

		$http
			.get(options.templateUrl, {cache: $templateCache})
			.then(function(response) {
				self.modalEl.html(response.data);
				$compile(self.modalEl.contents())(options.scope);
				self._addElementsToDom();
			});

		this.deferred = $q.defer();
		return this.deferred.promise;

	};

	Dialog.prototype.close = function(result) {
		if (this.isOpen()) {
			this._removeElementsFromDom();
			this.deferred.resolve(result);
		}
	};

	Dialog.prototype._addElementsToDom = function() {
		body.append(this.modalEl);
		this._open = true;
	};

	Dialog.prototype._removeElementsFromDom = function() {
		this.modalEl.remove();
		this._open = false;
	};

	Dialog.prototype.isOpen = function() {
		return this._open;
	};

	return {
		dialog: function(opt) {
			return new Dialog(opt);
		}
	};
};

dialogService.$inject = ['$http', '$q', '$compile', '$templateCache', '$document'];

components.factory('dialog', dialogService);
},{"./index":3}],2:[function(require,module,exports){
var services = require('./index');

function createInfoWindow() {
	var infoBox = document.createElement('div');
	infoBox.className = 'map-dialog';

	var title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = '车牌号:65535';

	var btnWrap = document.createElement('div');
	btnWrap.className = 'btn-wrapper';

	var btn = document.createElement('button');
	btn.innerHTML = '指派';

	btnWrap.appendChild(btn);

	infoBox.appendChild(title);
	infoBox.appendChild(btnWrap);
	return infoBox;
}

/************************************/
var gaode = function($rootScope) {
	function Map() {
		this.carMarkers = [];
	}

	Map.prototype.open = function(elem) {
		this.map = new AMap.Map(elem.get(0), {
						view: new AMap.View2D({
							center: new AMap.LngLat(121.609614,29.866413),
							zoom: 14
						})
					});
		this.createInfoWindow();
	};

	Map.prototype.getPoint = function(lng, lat) {
		return new AMap.LngLat(lng, lat);
	};

	Map.prototype.addMarker = function() {
		 this.marker = new AMap.Marker({
	        position:this.map.getCenter()
	    });
		this.marker.setMap(this.map);
	};

	Map.prototype.setMarkerPosition = function(lng, lat) {
		var pointer = this.getPoint(lng, lat);
		this.marker.setPosition(pointer);
		this.map.setCenter(pointer);
	};

	Map.prototype.addCarMarker = function(carInfos) {
		this.removeCarMarker();
		for (var i = 0, len = carInfos.length; i < len; i ++) {
			var lngLat = carInfos[i].location.split(',');
			var marker = new AMap.Marker({
				icon: new AMap.Icon({
					size: new AMap.Size(22, 32),
					image: '/static/imgs/car-marker.png'
				}),
				position: this.getPoint(lngLat[0], lngLat[1])
			});
			marker.carInfo = carInfos[i];
			this.carMarkers.push(marker);
			marker.setMap(this.map);
		}
		this.carMarkerAddEvent();
	};

	Map.prototype.removeCarMarker = function() {
		var markers = this.carMarkers;
		for (var i = 0, len = markers.length; i < len; i ++) {
			markers[i].setMap(null);
		}
		AMap.event.removeListener('click');
		this.carMarkers = [];
		this.clearInfoWindow();
	};

	//点击坐标，发生事件
	Map.prototype.carMarkerAddEvent = function() {
		var self = this;
		var addInfo = function(ev) {
			self.infoWindow.open(self.map, ev.target.getPosition());
			self.currentCarInfo = ev.target.carInfo;
			self.boxTitle.html('车牌号:' + self.currentCarInfo.carNum);
		};
		var markers = this.carMarkers;
		for (var i = 0, len = markers.length; i < len; i ++) {
			AMap.event.addListener(markers[i], 'click', addInfo);	
		}
	};

	Map.prototype.createInfoWindow = function() {
		var self = this;
		var boxInfo = createInfoWindow();
		this.boxTitle = $(boxInfo).find('.title');
		self.boxBtn = $(boxInfo).find('button');
		var scope = $rootScope.$new();
		self.boxBtn.on('click', function() {
			$rootScope.$broadcast('addNewOrder', self.currentCarInfo);
		});
		this.infoWindow = new AMap.InfoWindow({
			isCustom: true,
			content: boxInfo,
			offset:new AMap.Pixel(0, -45)
		});
	};

	Map.prototype.clearInfoWindow = function() {
		this.map.clearInfoWindow();
	};

	return {
		map: function() {
			return new Map();
		}
	};
};

gaode.$inject = ['$rootScope'];

services.factory('gaode', gaode);
},{"./index":3}],3:[function(require,module,exports){
module.exports = angular.module('app.components', []);
require('./dialog');
require('./gaode');
},{"./dialog":1,"./gaode":2}],4:[function(require,module,exports){
var config = function($locationProvider) {
	$locationProvider.html5Mode(true);
};

config.$inject = ['$locationProvider'];

module.exports = config;
},{}],5:[function(require,module,exports){
var controllers = require('./index');

var headerCtrl = function($scope) {
	
};

headerCtrl.$inject = ['$scope'];

controllers.controller('headerCtrl', headerCtrl);
},{"./index":6}],6:[function(require,module,exports){
module.exports = angular.module('app.controllers', []);
require('./header');
require('./seat');
require('./leader');
require('./search');
require('./login');

},{"./header":5,"./leader":7,"./login":8,"./search":9,"./seat":10}],7:[function(require,module,exports){
var controllers = require('./index');

var leaderCtrl = function($scope, orderService, orderStepDialog, assignDialog) {

	$scope.search = {};

	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};

	//tab切换
	$scope.toggleTab = function(tabName) {
		orderStepDialog.close();
		$scope.search.currentTab = tabName;
		$scope.isSearching = false;
		$scope.search.keywords = '';
		$scope.search.currentPage = 1;
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
				
			});
	};

	//点击分页
	$scope.onSelectPage = function(page) {
		orderStepDialog.close();
		$scope.search.currentPage = page;
		if ($scope.isSearching) {
			$scope.search.keywords = $scope.words;
		} else {
			$scope.search.keywords = '';
		}
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//搜索
	$scope.searchOrder = function() {
		orderStepDialog.close();
		$scope.search.currentPage = 1;
		$scope.isSearching = true;
		$scope.search.keywords = $scope.words;
		orderService
			.leaderQuery($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//init
	$scope.toggleTab('prepared');


	//dialog ------------------------------
	$scope.step = {};
	$scope.assign = {};
	
	$scope.showInfo = function(sn, pos) {
		orderStepDialog.open($scope, pos);
		$scope.assign.sn = sn;
		orderService
			.getStepInfo(sn)
			.then(function(response) {
				$scope.step = response;
			});
	};

	//指派
	$scope.showAssign = function() {
		assignDialog.open($scope);
	};


	$scope.assigning = function() {
		orderService.assign($scope.assign);
		assignDialog.close();
	};

	$scope.cancelAssign = function() {
		assignDialog.close();
	};


	/**********************/
	$scope.$on('$destroy', function() {
		orderStepDialog.close();
	});

};

leaderCtrl.$inject = ['$scope', 'orderService', 'orderStepDialog', 'assignDialog'];

controllers.controller('leaderCtrl', leaderCtrl);
},{"./index":6}],8:[function(require,module,exports){
var controllers = require('./index');

var loginCtrl = function($scope, loginService, $location, $rootScope) {
	$scope.loginForm = {};
	$rootScope.isLoginPage = true;
	$scope.$on('$destroy', function() {
		$rootScope.isLoginPage = false;
	});
	$scope.login = function() {
		loginService
			.login($scope.loginForm)
			.then(function() {
				$location.path('/');
			}, function() {

			});
	};
};

loginCtrl.$inject = ['$scope', 'loginService', '$location', '$rootScope'];

controllers.controller('loginCtrl', loginCtrl);
},{"./index":6}],9:[function(require,module,exports){
var controllers = require('./index');

var initInfo = {
	beginTime: '',
	endTime: '',
	currentPage: 1,
	keywords: '',
	status: -1
};

var searchCtrl = function($scope, orderService) {

	$scope.tabCount = {
		total: 0,
		immediate: 0,
		prepared: 0
	};

		//全部、即时、预约，切换按钮
	$scope.toggleCallType = function(type) {
		$scope.isSearching = false;
		$scope.search = angular.copy(initInfo);
		$scope.search.callType = type;
		var callTypes = ['total', 'immediate', 'prepared'];
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
				$scope.tabCount[callTypes[type]] = $scope.orders.total;
			});
	};

	//点击搜索按钮
	$scope.searchOrder = function() {
		$scope.isSearching = true;
		$scope.search.currentPage = 1;
		$scope.search.keywords = $scope.words;
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	//点击分页按钮
	$scope.onSelectPage = function(page) {
		$scope.search.currentPage = page;
		if ($scope.isSearching) {
			$scope.search.keywords = $scope.words;
		} else {
			$scope.search.keywords = '';
		}
		orderService
			.queryMore($scope.search)
			.then(function(response) {
				$scope.orders = response;
				$scope.numItems = $scope.orders.total;
			});
	};

	$scope.isCurrentTab = function(type) {
		return $scope.search.callType === type;
	};

	//更多筛选条件
	$scope.selectMore = function() {
		var temp = angular.copy(initInfo);
		temp.callType = $scope.search.callType;
		$scope.search = temp;
		$scope.isShowMore = !$scope.isShowMore;
	};

	//init
	$scope.toggleCallType(0);
};

searchCtrl.$inject = ['$scope', 'orderService'];

controllers.controller('searchCtrl', searchCtrl);
},{"./index":6}],10:[function(require,module,exports){
var controllers = require('./index');

var seatCtrl = function ($scope, orderResource, $timeout, orderService) {
	//新建订单
	$scope.order = {};
	$scope.addOrder = function() {
		$scope.order.vehicleNumber = null;
		if ($scope.newOrder.$valid) {
			orderService.add($scope.order);
		}
		
	};


	//用户个人统计图、订单次数放空次数统计
	$scope.user = {};
	$scope.user.orderFuck = 0;
	$scope.user.orderTotal = 0;
	$timeout(function() {
		$scope.user.orderFuck = 3;
		$scope.user.orderTotal = 20;
	}, 3000);

	//订单查询 右下部分
	//exception(0),prepared(1),received(2),started(3),done(4);
	$scope.search = {};
	$scope.errorTotal = 0;
	$scope.toggleTab = function(tabName) {
		$scope.search.currentTab = tabName;
		$scope.search.keywords = '';
		orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
				if ($scope.isCurrentTab('exception')) {
					$scope.errorTotal = $scope.orders.total;
				} else {
					$scope.normalTotal = $scope.orders.total;
				}
			});
	};
	$scope.isCurrentTab = function(tabName) {
		return tabName === $scope.search.currentTab;
	};
	$scope.search = function() {
		$scope.search.keywords = $scope.words;
		orderService
			.query($scope.search)
			.then(function(response) {
				$scope.orders = response;
			});
	};

	$scope.$on('addNewOrder', function(ev, carInfo) {
		$scope.order.vehicleNumber = carInfo.carNum;
		if ($scope.newOrder.$valid) {
			orderService.add($scope.order);
		}
	});

	//初始化查询
	$scope.toggleTab('prepared');

};
seatCtrl.$inject = ['$scope', 'orderResource', '$timeout', 'orderService'];

controllers.controller('seatCtrl', seatCtrl);
},{"./index":6}],11:[function(require,module,exports){
var directives = require('./index');
var callStatusDirective = function(statisticsService) {
	return {
		scope: {},
		replace: true,
		link: function(scope, elem) {
			statisticsService
				.callStatistics()
				.then(function(result) {
					scope.lastHour = result.lastHour;
					scope.lastDay = result.lastDay;
					scope.hour = result.hour;
					scope.day = result.day;
					
					scope.hourRate = (scope.hour / scope.lastHour) * 100;
					scope.dayRate = (scope.day / scope.lastDay) * 100;
				});
		},
		templateUrl: 'component/callStatus.html'
	};
};

callStatusDirective.$inject = ['statisticsService'];

directives.directive('callStatus', callStatusDirective);
},{"./index":13}],12:[function(require,module,exports){
var directives = require('./index');

function createCanvas(width, height) {
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

function drawPie(context, x, y, r, startAngle, endAngle, color, shadowBlur, shadowOffsetY) {
	context.beginPath();
	context.fillStyle = color;
	context.shadowBlur = shadowBlur || 0;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = shadowOffsetY || 0;
	context.arc(x, y, r, startAngle, endAngle, false);
	context.lineTo(x, y);
	context.fill();
}

function calculateAngle(total, count, offsetAngle) {
	offsetAngle = offsetAngle || 0;
	var angle = 180 * (count / total);
	return angle > (180 - offsetAngle) ? (180 - offsetAngle) : angle;
}

var chartDirective = function() {
	return {
		scope: {
			orderTotal: '=',
			orderFuck: '='
		},
		link: function(scope, elem) {
			var width = elem.width(),
				height = elem.height(),
				marginBottom = 16,
				pivotX = width / 2,
				pivotY = height - marginBottom,
				outRadius = 80,
				pieRadius = 62,
				smallRadius = 20,
				navLineWidth = 20,
				navLineHeight = 25,
				navLineHorizontal = 8,
				offsetAngle = 5;

			var canvas = createCanvas(width, height),
				context = canvas.getContext('2d');

			//draw out pie	
			function drawOutPie() {
				drawPie(context, pivotX, pivotY, outRadius, Math.PI, 2 * Math.PI, '#dfdfdf', 6, -4);
			}

			//draw total pie
			function drawTotalPie() {
				drawPie(context, pivotX, pivotY, pieRadius, Math.PI, 2 * Math.PI, '#8ab14d');
			}
			
			
			function drawFuckPie(total, count) {
				var endA = -(Math.PI / 180) * offsetAngle,
					startA = -(Math.PI / 180) * (offsetAngle + calculateAngle(total, count, offsetAngle));
				drawPie(context, pivotX, pivotY, pieRadius, startA, endA, '#e77037');
			}

			function drawTotalLine(total) {
				var x = pivotX - outRadius,
					y = pivotY - outRadius / 2;
				context.beginPath();
				context.lineWidth = 2;
				context.strokeStyle = '#8ab14d';
				context.moveTo(x, y);
				x = x - navLineWidth;
				context.lineTo(x, y);
				y = y - navLineHeight;
				context.lineTo(x, y);
				context.stroke();
				context.font = '12pt Calibri';
				context.fillStyle = '#8ab14d';
				var txt = total.toString();
				context.fillText(txt, x - context.measureText(txt).width / 2, y - 4);
			}

			function drawFuckLine(total, fuckCount) {
				var angle = calculateAngle(total, fuckCount, offsetAngle) / 2;
				var angleX = Math.cos(Math.PI / 180 * (angle + offsetAngle));
				var angleY = Math.sin(Math.PI / 180 * (angle + offsetAngle));
				var x = pivotX + angleX * (outRadius + 5);
				var y = pivotY - angleY * (outRadius + 5);

				context.beginPath();
				context.strokeStyle = '#e77037';
				context.lineWidth = 2;
				context.moveTo(x, y);
				x = pivotX + angleX * (outRadius + 5 + navLineWidth);
				y = pivotY - angleY * (outRadius + 5 + navLineWidth);
				context.lineTo(x, y);
				x = x + 20;
				context.lineTo(x, y);
				context.stroke();
				context.font = '12pt Calibri';
				context.fillStyle = '#e77037';
				var txt = fuckCount.toString();
				context.fillText(txt, x + 4, y + 6);
			}
			
			function draw(data) {
				context.clearRect(0, 0, width, height);
				var total = data.total,
					count = data.fuckCount;
				drawOutPie();
				drawTotalPie();
				drawFuckPie(total, count);

				drawTotalLine(total);
				drawFuckLine(total, count);
			}
			
			$(canvas).appendTo(elem);
			scope.$watch('orderTotal;orderFuck', function() {
				draw({
					total: scope.orderTotal,
					fuckCount: scope.orderFuck
				});
			});
		}
	};
};

chartDirective.$inject = [];

directives.directive('chartUser', chartDirective);
},{"./index":13}],13:[function(require,module,exports){
module.exports = angular.module('app.dirctives', []);
require('./mapView');
require('./chart');
require('./callStatus');
require('./pagination');
require('./orderStep');
require('./wordsPlace');
},{"./callStatus":11,"./chart":12,"./mapView":14,"./orderStep":15,"./pagination":16,"./wordsPlace":17}],14:[function(require,module,exports){
var directives = require('./index');
var mapView = function(seatMapService) {
	return {
		scope: {},
		link: function(scope, elem) {
			seatMapService.map(elem);
		}
	};
};

mapView.$inject = ['seatMapService'];

directives.directive('mapView', mapView);
},{"./index":13}],15:[function(require,module,exports){
var directives = require('./index');

var orderStep = function() {
	return {
		scope: {
			order: '=orderStep',
			showInfo: '&'
		},
		link: function(scope, elem) {
			elem.on('dblclick', function(ev) {
				var pos = elem.offset();
				pos.top = elem.height() + pos.top;
				pos.width = elem.width();
				scope.showInfo({sn: scope.order.sn, pos: pos});
			});
		}
	};
};

orderStep.$inject = [];

directives.directive('orderStep', orderStep);
},{"./index":13}],16:[function(require,module,exports){
var directives = require('./index');

//分页大小
var itemSize = 5;
//显示数量
var pageSize = 10;

function calculateNumPages(total, size) {
	return Math.ceil(total / size);
}

function resultNumPages(numPages, itemSize, current) {
	var pages = [];
	for (var i = 1; i <= numPages; i ++) {
		pages.push(i);
	}
	var medium = Math.ceil(itemSize / 2),
		begin = Math.max(0, current - medium),
		end = Math.min(numPages, begin + itemSize);
	begin = Math.max(0, end - itemSize);
	return pages.slice(begin, end);
}

var pagination = function() {
	return {
		scope: {
			numItems: '=',
			currentPage: '=',
			onSelectPage: '&'
		},
		restrict: 'E',
		replace: true,
		link: function(scope, elem) {
			scope.$watch('numItems + currentPage', function() {
				var numPages = calculateNumPages(scope.numItems, pageSize);
				scope.pages = resultNumPages(numPages, itemSize, scope.currentPage);
			});

			scope.isCurrentPage = function(page) {
				return page === scope.currentPage;
			};

			//点击分页
			scope.selectPage = function(page) {
				if (!scope.isCurrentPage(page)) {
					scope.currentPage = page;
					scope.onSelectPage({page:page});
				}
			};

			scope.noPrevious = function() {
				return scope.currentPage === 1;
			};

			scope.noNext = function() {
				return scope.currentPage === calculateNumPages(scope.numItems, pageSize);
			};

			scope.selectPrevious = function() {
				if (!scope.noPrevious()) {
					scope.selectPage(scope.currentPage - 1);
				}
			};

			scope.selectNext = function() {
				if (!scope.noNext()) {
					scope.selectPage(scope.currentPage + 1);
				}
			};
		},
		templateUrl: 'component/pagination.html'
	};
};

pagination.$inject = [];

directives.directive('pagination', pagination);
},{"./index":13}],17:[function(require,module,exports){
var directives = require('./index');

var wordsPlace = function(mapService, $http, $templateCache, $compile, $document, $timeout, seatMapService) {
	return {
		scope: {
			words: '=wordsPlace'
		},
		link: function(scope, elem) {
			scope.$watch('words', function(words) {
				if (words && scope.isSearch) {
					scope.initIndex();
					mapService
						.queryByKeyword(words)
						.then(function(data) {
							scope.addresses = data;
						});
				} else if (!words && scope.isSearch) {
					scope.addresses = [];
				}
			});

			scope.element = elem;

			$http
				.get('component/addressList.html', {cache: $templateCache})
				.then(function(response) {
					$compile('<address-list input="element" addresses="addresses">' + response.data + '</address-list>')(scope, function(clone) {
						clone.appendTo($document.find('body'));
					});
				});

			scope.moveDown = function() {
				if (scope.moveIndex < (scope.addresses.length - 1)) {
					scope.moveIndex ++;
				} else if (scope.moveIndex === (scope.addresses.length - 1)) {
					scope.moveIndex = 0;
				}
			};

			scope.moveUp = function() {
				if (scope.moveIndex <= 0) {
					scope.moveIndex = scope.addresses.length - 1;
				} else {
					scope.moveIndex --;
				}
			};
			scope.isSearch = true;
			scope.updateAddress = function(name) {
				scope.words = name;
			};

			scope.initIndex = function() {
				scope.moveIndex = -1;
			};

			scope.isActive = function(idx) {
				return idx === scope.moveIndex;
			};

			scope.onSelectAddress = function(address) {
				if (scope.popout) {
					scope.popout.show = false;
				}
				scope.isSearch = false;
				scope.updateAddress(address.name);
			};

			elem.on({
				keydown: function(ev) {
					var keyCode = ev.which;
					if (keyCode === 40 || keyCode === 38) {
						ev.preventDefault();
						scope.isSearch = false;
						switch (keyCode) {
							case 40:
								scope.moveDown();
								break;
							case 38:
								scope.moveUp();
								break;
						}
						scope.$apply(function() {
							scope.updateAddress(scope.addresses[scope.moveIndex].name);
						});
					} else {
						scope.isSearch = true;
					}
				},
				blur: function() {
					$timeout(function() {
						if ($.trim(scope.words)) {
							mapService
								.geocode(scope.words)
								.then(function(response) {
									if (parseInt(response.lng) !== 0 ) {
										seatMapService.setMarkerPosition(response.lng, response.lat);
										mapService
											.getNearCars(response.lng + ',' + response.lat)
											.then(function(response) {
												seatMapService.addCarMarker(response);
											});
									}
								});
						}
					}, 200);
				}
			});
		}
	};
};

wordsPlace.$inject = ['mapService', '$http', '$templateCache', '$compile', '$document', '$timeout', 'seatMapService'];

directives.directive('wordsPlace', wordsPlace);

var addressList = function($document) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			input: '=',
			addresses: '='
		},
		link: function(scope, elem) {
			scope.$parent.popout = scope;
			var input = scope.input,
				pos = input.offset();

			elem
				.offset({
					left: pos.left,
					top: pos.top + input.innerHeight() + 2
				})
				.width(input.innerWidth());

			input.on({
				focus: function() {
					scope.show = true;
				},
				blur: function() {
					if (document.activeElement !== document.body && elem.has($(document.activeElement)).length === 0) {
						scope.$apply(function(){
							scope.show = false;
						});
					}
				}
			});

			$document.on('click', function(ev) {
				scope.$apply(function() {
					if (input.get(0) !== ev.target && elem.has(ev.target).length === 0) {
						scope.show = false;
					}
				});
			});
		},
		template:
			'<div class="address-list" ng-transclude ng-show="show && addresses.length > 0"></div>'
	};
};

addressList.$inject = ['$document'];


directives.directive('addressList', addressList);
},{"./index":13}],18:[function(require,module,exports){
require('./templates/templates');
require('./controllers');
require('./resources');
require('./directives');
require('./services');
require('./components');

var requires = [
	'ngRoute',
	'app.templates',
	'app.controllers',
	'app.resoureces',
	'app.dirctives',
	'app.services',
	'app.components'
];

var app = angular.module('app', requires)
	.config(require('./routers'))
	.config(require('./config'));

module.exports = app;




},{"./components":3,"./config":4,"./controllers":6,"./directives":13,"./resources":20,"./routers":25,"./services":27,"./templates/templates":34}],19:[function(require,module,exports){
var resources = require('./index');

var carResource = function($http) {
	return {
		getNearCars: function(location) {
			var url = 'http://192.168.0.242:9090/aladdin-service/rest/instant/vnearby?myjsonp=JSON_CALLBACK';
			return $http
						.jsonp(url, {
							params: {
								location: location
							}
						})
						.then(function(response) {
							console.log(response);
						});
		}
	};
};

carResource.$inject = ['$http'];


resources.factory('carResource', carResource);
},{"./index":20}],20:[function(require,module,exports){
module.exports = angular.module('app.resoureces', []);
require('./order');
require('./statistics');
require('./car');
require('./map');
require('./login');
},{"./car":19,"./login":21,"./map":22,"./order":23,"./statistics":24}],21:[function(require,module,exports){
var resources =  require('./index');

var loginResource = function($http) {
	return {
		login: function(data) {
			var url = '/login.htm';

			return $http
						.post(url, data)
						.then(function(response) {
							return response.data;
						});
		}
	};
};

resources.factory('loginResource', loginResource);
},{"./index":20}],22:[function(require,module,exports){
var resources = require('./index');
var mapConfig = {
	version: 'rsv3',
	key: 'd64e2c774ba08ec5d8fd282640cd546e',
	city: '宁波',
};

var mapResource = function($http) {
	return {
		getNearCars: function(location) {
			var url = 'http://192.168.0.242:9090/aladdin-service/rest/instant/vnearby?myjsonp=JSON_CALLBACK';
			return $http
						.jsonp(url, {
							params: {
								location: location
							}
						})
						.then(function(response) {
							return response.data;
						});
		},
		queryByKeyword: function(keyword) {
			return $http
						.jsonp('http://restapi.amap.com/v3/assistant/inputtips?callback=JSON_CALLBACK', {
							params: {
								s: mapConfig.version,
								key: mapConfig.key,
								city: mapConfig.city,
								keywords: keyword
							}
						})
						.then(function(response) {
							return response.data;
						});
		},
		geocode: function(address) {
			return $http
						.jsonp('http://restapi.amap.com/v3/geocode/geo?callback=JSON_CALLBACK', {
							params: {
								s: mapConfig.version,
								key: mapConfig.key,
								city: mapConfig.city,
								address: address
							}
						})
						.then(function(response) {
							return response.data;
						});
		} 
	};
};

mapResource.$inject = ['$http'];
resources.factory('mapResource', mapResource);
},{"./index":20}],23:[function(require,module,exports){
var resoruces = require('./index');


var order = function($http) {
	return {
		add: function (data) {
			var url = '/call.htm';
			return $http
						.post(url, data)
						.then(function(response) {
							return response.data;
						});
		},
		query: function(data) {
			var url = '/search.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		queryMore: function(data) {
			var url = '/search/more.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		getStepInfo: function(data) {
			var url = '/search/route.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		},
		assign: function(data) {
			var url = '/assign.htm';
			return $http
						.get(url, {
							params: data
						})
						.then(function(response) {
							return response.data;
						});
		}
	};
};

order.$inject = ['$http'];

resoruces.factory('orderResource', order);
},{"./index":20}],24:[function(require,module,exports){
var resources = require('./index');

var statistics = function($http, $q) {
	return {
		callStatistics: function() {
			var url = '/statis/m.htm';
			return $http
						.get(url)
						.then(function(response) {
							return response.data;
						}, function() {
							return $q.reject();
						});
		}
	};
};

statistics.$inject = ['$http', '$q'];

resources.factory('statisticsResource', statistics);
},{"./index":20}],25:[function(require,module,exports){
var routers = function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'page/seat.html',
			controller: 'seatCtrl'
		})
		.when('/leader.htm', {
			templateUrl: 'page/leader.html',
			controller: 'leaderCtrl'
		})
		.when('/searchMore.htm', {
			templateUrl: 'page/search.html',
			controller: 'searchCtrl'
		})
		.when('/login.htm', {
			templateUrl: 'page/login.html',
			controller: 'loginCtrl'
		});
};

routers.$inject = ['$routeProvider'];

module.exports = routers;
},{}],26:[function(require,module,exports){
var services = require('./index');

var assignDialog = function(dialog) {
	var alert = dialog.dialog({modalClass: 'assign-dialog'});
	return {
		open: function(scope) {
			alert.open({
						url: 'component/assignDialog.html',
						scope: scope
					});
		},
		close: function() {
			alert.close();
		}
	};
};

assignDialog.$inject = ['dialog'];

services.factory('assignDialog', assignDialog);
},{"./index":27}],27:[function(require,module,exports){
module.exports = angular.module('app.services', []);
require('./statistics');
require('./order');
require('./orderStep');
require('./assign');
require('./map');
require('./seatMap');
require('./login');

},{"./assign":26,"./login":28,"./map":29,"./order":30,"./orderStep":31,"./seatMap":32,"./statistics":33}],28:[function(require,module,exports){
var services = require('./index');

var loginService = function(loginResource) {
	return {
		login: function(data) {
			return loginResource
						.login(data)
						.then(function(response) {
							return response;
						});
		}
	};
};

loginService.$inject = ['loginResource'];

services.factory('loginService', loginService);
},{"./index":27}],29:[function(require,module,exports){
var services = require('./index');

var mapService = function(mapResource) {
	return {
		queryByKeyword: function(words) {
			return mapResource
						.queryByKeyword(words)
						.then(function(response) {
							return response.tips;
						});
		},
		geocode: function(address) {
			return mapResource
						.geocode(address)
						.then(function(response) {
							if (response.geocodes.length > 0) {
								var lngLat = response.geocodes[0].location.split(',');
								return {lng: lngLat[0], lat: lngLat[1]};
							} else {
								return {lng: 0, lat: 0};
							}
						});
		},
		getNearCars: function(location) {
			return mapResource
						.getNearCars(location)
						.then(function(response) {
							return response;
						}, function() {
							return [{location: '121.604453, 29.887558', carNum: '浙B11011'}, {location: '121.654453, 29.877558', carNum: '浙B22222'}];
						});
		}
	};
};

mapService.$inject = ['mapResource'];

services.factory('mapService', mapService);
},{"./index":27}],30:[function(require,module,exports){
var services = require('./index');

var orderService = function(orderResource) {

	return {
		add: function(data) {
			return orderResource
						.add(data)
						.then(function(response) {
							return response;
						});
		},
		query: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				k: data.keywords || '',
				all: 0,
				pagesize: 6,
				callType: 1,
				page:1
			};
			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		leaderQuery: function(data) {
			var result = [];
			result.total = 0;
			var queryData = {
				status: ['exception', 'prepared', 'received', 'started', 'done'].indexOf(data.currentTab),
				page: data.currentPage,
				k: data.keywords || '',
				callType: 1,
				all: 0,
				pagesize: 10
			};

			return orderResource
						.query(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		queryMore: function(data) {

			var result = [];
			result.total = 0;
			var queryData = {
				beginTime: data.beginTime || '',
				endTime: data.endTime || '',
				status: data.status,
				page: data.currentPage,
				k: data.keywords || '',
				callType: data.callType,
				pagesize: 10
			};
			return orderResource
						.queryMore(queryData)
						.then(function(response) {
							angular.forEach(response.list, function(value, key) {
								result[key] = value;
							});
							result.total = response.total;
							return result;
						}, function() {
							return result;
						});
		},
		getStepInfo: function(sn) {
			var data = {
							createTime: '',
							orderTime: '',
							pickupTime: '',
							endTime: ''
						};
			return orderResource
						.getStepInfo({
							sn: sn
						})
						.then(function(response) {
							if (!response.createTime) {
								return data;
							}
							data.createTime = response.createTime;
							if (!response.orderTime) {
								return data;
							}
							data.orderTime = response.orderTime;
							if (!response.pickupTime) {
								return data;
							}
							data.pickupTime = response.pickupTime;
							if (!response.endTime) {
								return data;
							}
							data.endTime = response.endTime;
							return data;
						}, function() {
							return data;
						});
		},
		assign: function(data) {
			return orderResource
						.assign({
							sn: data.sn,
							number: data.carNumber
						})
						.then(function(response) {
							return response;
						});
		}
	};
};

orderService.$inject = ['orderResource'];

services.factory('orderService', orderService);
},{"./index":27}],31:[function(require,module,exports){
var services = require('./index');

var orderStepDialog = function(dialog) {
	var stepDialog = dialog.dialog({modalClass: 'order-step'});

	function setDialogPosition(pos) {
		stepDialog.modalEl.css({
			width: pos.width,
			top: pos.top,
			left: pos.left
		});
	}

	return {
		open: function(scope, pos) {
			stepDialog.open({
						url: 'component/stepInfo.html',
						scope: scope
					});
			setDialogPosition(pos);
		},
		close: function() {
			stepDialog.close();
		}
	};
};

orderStepDialog.$inject = ['dialog'];

services.factory('orderStepDialog', orderStepDialog);
},{"./index":27}],32:[function(require,module,exports){
var services = require('./index');

var seatMapService = function(gaode) {
	var gaodeMap = gaode.map();
	return {
		map: function(elem) {
			gaodeMap.open(elem);
			gaodeMap.addMarker();
		},
		setMarkerPosition: function(lng, lat) {
			gaodeMap.setMarkerPosition(lng, lat);
		},
		addCarMarker: function(carInfos) {
			gaodeMap.addCarMarker(carInfos);
		},
		removeCarMarker: function() {
			gaodeMap.removeCarMarker();
		}
	};
};

seatMapService.$inject = ['gaode'];

services.factory('seatMapService', seatMapService);
},{"./index":27}],33:[function(require,module,exports){
var services = require('./index');
var statistics = function(statisticsResource) {
	return {
		callStatistics: function() {
			return	statisticsResource
						.callStatistics()
						.then(function(response) {
							return {
								hour: response.hour,
								day: response.day,
								lastHour: response['last_hour'],
								lastDay: response['last_day']
							};
						}, function() {
							return {
								hour: 0,
								day: 0,
								lastHour: 0,
								lastDay: 0
							};
						});
		}
	};
};
statistics.$inject = ['statisticsResource'];
services.factory('statisticsService', statistics);
},{"./index":27}],34:[function(require,module,exports){
angular.module('app.templates', ['component/addressList.html', 'component/assignDialog.html', 'component/callStatus.html', 'component/pagination.html', 'component/stepInfo.html', 'header.html', 'page/leader.html', 'page/login.html', 'page/search.html', 'page/seat.html']);

angular.module("component/addressList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/addressList.html",
    "<ul>\n" +
    "	<li ng-repeat='item in addresses'>\n" +
    "		<a \n" +
    "			href='javascript:;' \n" +
    "			class='link ellipsis' \n" +
    "			ng-class='{active: isActive($index)}'\n" +
    "			ng-click='onSelectAddress(item)'>{{item.name}}</a>\n" +
    "		</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("component/assignDialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/assignDialog.html",
    "<h1 class='title'>指派车辆</h1>\n" +
    "<div class='content'>\n" +
    "	<form>\n" +
    "		<div>\n" +
    "			<input \n" +
    "				type='text' \n" +
    "				class='input-normal' \n" +
    "				placeholder='请输入车牌号码'\n" +
    "				ng-model='assign.carNumber'/>\n" +
    "		</div>\n" +
    "		<div class='btns'>\n" +
    "			<button class='btn ensure' ng-click='assigning()'>确定</button>\n" +
    "			<a href='javascript:;' class='btn btn-normal' ng-click='cancelAssign()'>取消</a>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>");
}]);

angular.module("component/callStatus.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/callStatus.html",
    "<section class='call-status'>\n" +
    "	<div class='process process-hour'>\n" +
    "		<div class='current' style='width:{{hourRate}}%'><span>{{hour}}</span></div>\n" +
    "		<div class='info'><span>{{lastHour}}</span></div>\n" +
    "	</div>\n" +
    "	<div class='process process-day'>\n" +
    "		<div class='current' style='width:{{dayRate}}%'><span>{{day}}</span></div>\n" +
    "		<div class='info'><span>{{lastDay}}</span></div>\n" +
    "	</div>\n" +
    "	<ul class='flex legend'>\n" +
    "		<li><i class='legend-dot hour'></i><span>当前小时电召数量</span></li>\n" +
    "		<li><i class='legend-dot day'></i><span>当前天电召数量</span></li>\n" +
    "		<li><i class='legend-dot predict'></i><span>预计数量</span></li>\n" +
    "	</ul>\n" +
    "</section>");
}]);

angular.module("component/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/pagination.html",
    "<div class='pagination'>\n" +
    "	<ul>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='prev'\n" +
    "				ng-class='{disabled: noPrevious()}'\n" +
    "				ng-click='selectPrevious()'><i></i></a></li>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='page'\n" +
    "				ng-class='{active: isCurrentPage(item)}'\n" +
    "				ng-click='selectPage(item)'\n" +
    "				ng-repeat='item in pages'>{{item}}</a></li>\n" +
    "		<li><a \n" +
    "				href='javascript:;' \n" +
    "				class='next'\n" +
    "				ng-class='{disabled: noNext()}'\n" +
    "				ng-click='selectNext()'><i></i></a></li>\n" +
    "	</ul>\n" +
    "</div>");
}]);

angular.module("component/stepInfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("component/stepInfo.html",
    "<div class='step'>\n" +
    "	<ul class='flex'>\n" +
    "		<li>\n" +
    "			<p>{{step.createTime}}</p>\n" +
    "			<p>乘客电话召车</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>司机抢单成功</p>\n" +
    "			<p>{{step.orderTime}}</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>{{step.pickupTime}}</p>\n" +
    "			<p>司机接到乘客</p>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p>到达目的</p>\n" +
    "			<p>{{step.endTime}}</p>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class='btns'>\n" +
    "	<button ng-click='showAssign()'>指派</button>\n" +
    "	<button>取消</button>\n" +
    "	<button>乘客放空</button>\n" +
    "	<button>司机爽约</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.html",
    "<section class='flex'>\n" +
    "	<nav class='nav'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><a href='/' class='btn-icon-large file-btn'></a></li>\n" +
    "			<li><a href='/leader.htm' class='btn-icon-large file-search'></a></li>\n" +
    "			<li><a href='/searchMore.htm' class='btn-icon-large file-search'></a></li>\n" +
    "		</ul>\n" +
    "	</nav>\n" +
    "\n" +
    "	<div class='call-operate'>\n" +
    "		<ul class='flex'>\n" +
    "			<li><span class='call-count'>24</span></li>\n" +
    "			<li><button class='btn-bg-icon call-btn'></button></li>\n" +
    "			<li><button class='btn-bg-icon transform-btn'></button></li>\n" +
    "			<li><button class='btn-bg-icon list-btn'></button></li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='status'>\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "<section class='flex info-bar'>\n" +
    "	<div class='info-left'><span>11111</span></div>\n" +
    "	<div class='info-right'><span>22222</span></div>\n" +
    "</section>");
}]);

angular.module("page/leader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/leader.html",
    "<section class='leader-chart flex'>\n" +
    "	<div class='employ'>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='car'>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='call'>\n" +
    "		<div call-status></div>\n" +
    "	</div>\n" +
    "</section>\n" +
    "\n" +
    "<section class='leader-orders'>\n" +
    "	<div class='nav-bar'>\n" +
    "		<nav class='tabs'>\n" +
    "			<div class='fr search-wrap'>\n" +
    "				<form class='flex' ng-submit='searchOrder()'>\n" +
    "					<div class='input-wrap'><input \n" +
    "												type='text' \n" +
    "												class='search-input' \n" +
    "												ng-required='true'\n" +
    "												ng-model='words'/></div>\n" +
    "					<div><button class='btn-normal search-btn'><i></i></button></div>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<ul class='flex'>\n" +
    "				<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "					ng-click='toggleTab(\"prepared\")'><i class='prepared-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "						ng-click='toggleTab(\"received\")'><i class='received-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "						ng-click='toggleTab(\"started\")'><i class='started-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "						ng-click='toggleTab(\"done\")'><i class='done-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i class='exception-icon'></i><span><b>2</b><b>3</b><b>1</b></span></a>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "	</div>\n" +
    "	<div class='orders'>\n" +
    "		<div class='table-wrapper'>\n" +
    "			<table class='table'>\n" +
    "				<thead>\n" +
    "					<tr>\n" +
    "						<th>NO</th>\n" +
    "						<th>订单编号</th>\n" +
    "						<th>用车时间</th>\n" +
    "						<th>乘客</th>\n" +
    "						<th>乘客号码</th>\n" +
    "						<th>车牌号</th>\n" +
    "						<th>乘客地址</th>\n" +
    "						<th>目的地</th>\n" +
    "						<th>状态</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr \n" +
    "						ng-repeat='item in orders' \n" +
    "						order-step='item' \n" +
    "						show-info='showInfo(sn, pos)'>\n" +
    "						<td>{{$index + 1}}</td>\n" +
    "						<td>{{item.sn}}</td>\n" +
    "						<td>{{item.timeCreated}}</td>\n" +
    "						<td>{{item.user}}</td>\n" +
    "						<td>{{item.contactPhone}}</td>\n" +
    "						<td>{{item.vehicleNumber}}</td>\n" +
    "						<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "						<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "						<td>{{item.statusName}}</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='numItems > 10'>\n" +
    "			<pagination \n" +
    "				num-items='numItems' \n" +
    "				current-page='search.currentPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("page/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/login.html",
    "<div class='login-page'>\n" +
    "	<form class='login-form' ng-submit='login()'>\n" +
    "		<div class='input-wrapper'>\n" +
    "			<input \n" +
    "				type='text' \n" +
    "				class='login-input input-normal'\n" +
    "				placeholder='工号'\n" +
    "				ng-required='true'\n" +
    "				ng-model='loginForm.username'/>\n" +
    "		</div>\n" +
    "		<div class='input-wrapper'>\n" +
    "			<input \n" +
    "				type='password'\n" +
    "				class='login-input input-normal'\n" +
    "				placeholder='密码'\n" +
    "				ng-required='true'\n" +
    "				ng-model='loginForm.password'/>\n" +
    "		</div>\n" +
    "		<div class='btn-wrapper'>\n" +
    "			<button class='login-btn'>登录</button>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>");
}]);

angular.module("page/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/search.html",
    "<section class='search-page'>\n" +
    "	<div class='tabs'>\n" +
    "		<ul class='flex'>\n" +
    "			<li>\n" +
    "					<a \n" +
    "					href='javascript:;' \n" +
    "					class='tab'\n" +
    "					ng-click='toggleTab(\"prepared\")'><i class='prepared-icon'>订单记录查询</a>\n" +
    "			</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='search'>\n" +
    "		<form ng-submit='searchOrder()'>\n" +
    "			<div class='simple'>\n" +
    "				<input \n" +
    "					type='text' \n" +
    "					class='input-text'\n" +
    "					ng-model='words'/><button class='search-btn btn-normal'>搜索</button>\n" +
    "				<a href='javascript:;' class='more-link' ng-click='selectMore()'>更多筛选条件</a>\n" +
    "			</div>\n" +
    "			<div class='more' ng-show='isShowMore'>\n" +
    "				<div>\n" +
    "					<span class='field-wraper'>\n" +
    "						<label>接线员:</label>\n" +
    "						<input type='text' class='input-normal'/>\n" +
    "					</span>\n" +
    "					<span class='field-wraper'>\n" +
    "						<lable>状态</label>\n" +
    "						<select class='select-normal'><option>请选择</option></select>\n" +
    "					</span>\n" +
    "					<span  class='field-wraper'>\n" +
    "						<label>订单时间:</label>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-normal'\n" +
    "							ng-model='search.beginTime'/>\n" +
    "						<b>-</b>\n" +
    "						<input \n" +
    "							type='text' \n" +
    "							class='input-normal'\n" +
    "							ng-model='search.endTime'/>\n" +
    "					</span>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class='more-btn-wrap'>\n" +
    "					<button class='more-btn'>搜索</button>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "		<div class='toggle-btns'>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(0)'\n" +
    "				ng-class='{active:isCurrentTab(0)}'>全部({{tabCount.total}})</button>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(1)'\n" +
    "				ng-class='{active:isCurrentTab(1)}'>即时({{tabCount.immediate}})</button>\n" +
    "			<button \n" +
    "				class='btn-normal' \n" +
    "				ng-click='toggleCallType(2)'\n" +
    "				ng-class='{active:isCurrentTab(2)}'>预约({{tabCount.prepared}})</button>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='orders'>\n" +
    "		<div class='table-wrapper'>\n" +
    "			<table class='table'>\n" +
    "				<thead>\n" +
    "					<tr>\n" +
    "						<th>NO</th>\n" +
    "						<th>订单编号</th>\n" +
    "						<th>用车时间</th>\n" +
    "						<th>乘客</th>\n" +
    "						<th>乘客号码</th>\n" +
    "						<th>车牌号</th>\n" +
    "						<th>乘客地址</th>\n" +
    "						<th>目的地</th>\n" +
    "						<th>类型</th>\n" +
    "						<th>订单状态</th>\n" +
    "						<th>接线员</th>\n" +
    "						<th>作业员</th>\n" +
    "						<th>订单形式</th>\n" +
    "					</tr>\n" +
    "				</thead>\n" +
    "				<tbody>\n" +
    "					<tr ng-repeat='item in orders'>\n" +
    "						<td>{{$index + 1}}</td>\n" +
    "						<td>{{item.sn}}</td>\n" +
    "						<td>{{item.timeCreated}}</td>\n" +
    "						<td>{{item.user}}</td>\n" +
    "						<td>{{item.contactPhone}}</td>\n" +
    "						<td>{{item.vehicleNumber}}</td>\n" +
    "						<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "						<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "						<td>普通</td>\n" +
    "						<td>{{item.statusName}}</td>\n" +
    "						<td>2562</td>\n" +
    "						<td>{{item.opName}}</td>\n" +
    "						<td ng-switch='item.isReserved'>\n" +
    "							<span ng-switch-when='0'>即时</span>\n" +
    "							<span ng-switch-when='1'>预约</span>\n" +
    "						</td>\n" +
    "					</tr>\n" +
    "				</tbody>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "		<div class='paging' ng-show='numItems > 10'>\n" +
    "			<pagination \n" +
    "				num-items='numItems' \n" +
    "				current-page='search.currentPage'\n" +
    "				on-select-page='onSelectPage(page)'></pagination>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</section>");
}]);

angular.module("page/seat.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("page/seat.html",
    "<section class='seat-above flex'>\n" +
    "\n" +
    "	<div class='seat-top-left'>\n" +
    "		<div class='chart'>\n" +
    "			<div class='info'>\n" +
    "				<div class='justify'>\n" +
    "					<span  class='info-item'><i class='custom-type'></i>普通客户</span>\n" +
    "					<span class='info-item'><i class='timer'></i>2014-12-12 12:12</span>\n" +
    "				</div>\n" +
    "				<div class='justify'>\n" +
    "					<span class='info-item'><i class='serial'></i>111111</span>\n" +
    "					<span class='info-item'>\n" +
    "						<span><b class='legend-dot dot-order-count'></b>订单次数</span>\n" +
    "						<span><b class='legend-dot dot-fuck-count'></b>放空次数</span>\n" +
    "					</span>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class='graph' chart-user order-fuck='user.orderFuck' order-total='user.orderTotal'>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<form class='seat-top-form' name='newOrder' ng-submit='addOrder()'>\n" +
    "			<ul class='seat-field1'>\n" +
    "				<li>\n" +
    "					<label class='icon-label calling-label'><i></i></label>\n" +
    "					<input type='text' class='input-normal' disabled='disabled'/>\n" +
    "					<input type='checkbox' class='checkbox' id='autoCall'/>\n" +
    "					<label class='label-checkbox' for='autoCall'></label>\n" +
    "					<label class='auto-call-label' for='autoCall'>自动回拨</label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label actual-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal' \n" +
    "						ng-required='true'\n" +
    "						ng-model='order.actualTel'\n" +
    "						ng-pattern='/1\\d{10}/'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label username-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.fullName'\n" +
    "						placeholder='请输入用户姓名'/>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='femaleRadio'\n" +
    "						ng-model='order.gender'\n" +
    "						value='1'\n" +
    "						ng-init='order.gender=1'/>\n" +
    "					<label class='label-radio female' for='femaleRadio'></label>\n" +
    "					<input \n" +
    "						type='radio' \n" +
    "						name='gender' \n" +
    "						class='gender-radio' \n" +
    "						id='maleRadio'\n" +
    "						ng-model='order.gender'\n" +
    "						value='2'/>\n" +
    "					<label class='label-radio male' for='maleRadio'></label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label start-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-required='true'\n" +
    "						ng-model='order.start'\n" +
    "						placeholder='请输入出发位置'\n" +
    "						words-place='order.start'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label around-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.aroundRoadName'\n" +
    "						placeholder='请输入周围道路名称'/>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul>\n" +
    "				<li>\n" +
    "					<label class='icon-label cartype-label'><i></i></label>\n" +
    "					<span class='cartype-selects'>\n" +
    "						<select class='select-normal car-select'>\n" +
    "							<option>汽车类型</option>\n" +
    "						</select>\n" +
    "						<select class='select-normal price-select'>\n" +
    "							<option>价格</option>\n" +
    "						</select>\n" +
    "						<select class='select-normal count-select'>\n" +
    "							<option>车数</option>\n" +
    "						</select>\n" +
    "					</span>\n" +
    "					<label class='icon-label destination-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal long-width'\n" +
    "						ng-model='order.end'\n" +
    "						placeholder='请输入目的地'/>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<input type='checkbox' id='prepareSelect' class='prepare-checkbox'/>\n" +
    "					<label class='icon-label prepare-label' for='prepareSelect'><i></i></label>\n" +
    "					<input type='text' class='input-normal input-calendar'/>\n" +
    "					<select class='select-normal timer-select'>\n" +
    "						<option>10</option>\n" +
    "					</select>\n" +
    "					<select class='select-normal timer-select'>\n" +
    "						<option>36</option>\n" +
    "					</select>\n" +
    "					<input type='checkbox' class='checkbox' id='autoDate'/>\n" +
    "					<label class='label-checkbox' for='autoDate'></label>\n" +
    "					<label class='auto-checked-label' for='autoDate'>自动</label>\n" +
    "				</li>\n" +
    "				<li>\n" +
    "					<label class='icon-label remark-label'><i></i></label>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='input-normal large-width'\n" +
    "						ng-model='order.remark'\n" +
    "						placeholder='请输入附加信息'/>\n" +
    "				</il>\n" +
    "			</ul>\n" +
    "			<div class='btns text-center'>\n" +
    "				<button class='btn-normal'>保存</button>\n" +
    "				<a href='javascript:;' class='btn-normal'>取消</a>\n" +
    "				<a href='javascript:;' class='btn-normal'>转咨询投诉</a>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div class='seat-top-right'>\n" +
    "		<nav class='nav'>\n" +
    "			<ul class='flex'>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "				<li><a href='javascript:;' class='btn-icon-small zoom'></a></li>\n" +
    "			</ul>\n" +
    "		</nav>\n" +
    "		<div class='map' map-view>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</section>\n" +
    "\n" +
    "\n" +
    "<section class='seat-blow flex'>\n" +
    "	<div class='seat-bottom-left'>\n" +
    "		<section class='car-status'>\n" +
    "			<ul class='flex'>\n" +
    "				<li class='car-icon stop-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon empty-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon big-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "				<li class='car-icon task-icon'>\n" +
    "					<div><span>0152</span></div>\n" +
    "					<div><span>15%</span></div>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "			<ul class='flex legend'>\n" +
    "				<li><i class='legend-dot stop'></i><span>未登录车/停运</span></li>\n" +
    "				<li><i class='legend-dot empty'></i><span>空车</span></li>\n" +
    "				<li><i class='legend-dot big'></i><span>重车</span></li>\n" +
    "				<li><i class='legend-dot task'></i><span>任务车</span></li>\n" +
    "			</ul>\n" +
    "		</section>\n" +
    "\n" +
    "		<div call-status></div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div class='seat-bottom-right'>\n" +
    "		<section class='search-bar'>\n" +
    "			<div class='fl'>\n" +
    "				<button class='btn-normal toggle-btn'>即时</button>\n" +
    "			</div>\n" +
    "			<ul class='flex fl tabs'>\n" +
    "				<li><a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: !isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"prepared\")'><i></i>({{normalTotal}})</a></li>\n" +
    "				<li><a \n" +
    "						href='javascript:;' \n" +
    "						class='tab'\n" +
    "						ng-class='{active: isCurrentTab(\"exception\")}'\n" +
    "						ng-click='toggleTab(\"exception\")'><i></i>({{errorTotal}})</a></li>\n" +
    "			</ul>\n" +
    "			<div class='fr'>\n" +
    "				<form ng-submit='search()'>\n" +
    "					<input \n" +
    "						type='text' \n" +
    "						class='search-input'\n" +
    "						ng-required='true'\n" +
    "						ng-model='words'/><button class='btn-normal search-btn'><i></i></button>\n" +
    "					<select class='search-select'>\n" +
    "						<option>个人</option>\n" +
    "					</select>\n" +
    "				</form>\n" +
    "			</div>\n" +
    "			<div class='fr'>\n" +
    "				<span class='tick-timer'>300秒</span>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "		<section class='order-content flex'>\n" +
    "			<div class='order-nav-var' ng-show='!isCurrentTab(\"exception\")'>\n" +
    "				<h1 class='title'>状态</h1>\n" +
    "				<nav>\n" +
    "					<ul>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"prepared\")}'\n" +
    "								ng-click='toggleTab(\"prepared\")'>调派中</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"received\")}'\n" +
    "								ng-click='toggleTab(\"received\")'>已接单</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"started\")}'\n" +
    "								ng-click='toggleTab(\"started\")'>已出发</a></li>\n" +
    "						<li><a \n" +
    "								href='javascript:;' \n" +
    "								ng-class='{active: isCurrentTab(\"done\")}'\n" +
    "								ng-click='toggleTab(\"done\")'>已完成</a></li>\n" +
    "					</ul>\n" +
    "				</nav>\n" +
    "			</div>\n" +
    "			<div class='order-table'>\n" +
    "				<table class='table'>\n" +
    "					<thead>\n" +
    "						<tr>\n" +
    "							<th>NO</th>\n" +
    "							<th>订单编号</th>\n" +
    "							<th>用车时间</th>\n" +
    "							<th>乘客</th>\n" +
    "							<th>乘客号码</th>\n" +
    "							<th>车牌号</th>\n" +
    "							<th>乘客地址</th>\n" +
    "							<th>目的地</th>\n" +
    "							<th ng-if='isCurrentTab(\"exception\")'>状态</th>\n" +
    "						</tr>\n" +
    "					</thead>\n" +
    "					<tbody>\n" +
    "						<tr ng-repeat='item in orders' ng-if='$index < 6'>\n" +
    "							<td>{{$index + 1}}</td>\n" +
    "							<td>{{item.sn}}</td>\n" +
    "							<td>{{item.timeCreated}}</td>\n" +
    "							<td>{{item.user}}</td>\n" +
    "							<td>{{item.contactPhone}}</td>\n" +
    "							<td>{{item.vehicleNumber}}</td>\n" +
    "							<td class='ellipsis' title='{{item.poi}}'>{{item.poi}}</td>\n" +
    "							<td class='ellipsis' title='{{item.destination_poi}}'>{{item.destination_poi}}</td>\n" +
    "							<td ng-if='isCurrentTab(\"exception\")'>{{item.statusName}}</td>\n" +
    "						</tr>\n" +
    "					</tbody>\n" +
    "				</table>\n" +
    "			</div>\n" +
    "		</section>\n" +
    "	</div>\n" +
    "\n" +
    "</section>");
}]);

},{}]},{},[18]);
