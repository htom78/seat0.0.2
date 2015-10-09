var directives = require('./index');

var wordsPlace = function(
		$rootScope, 
		$q, 
		mapService, 
		$http, 
		$templateCache, 
		$compile, 
		$document, 
		$timeout, 
		seatMap, 
		gpsGcjExchangeUtils,
		$location
		) {
	return {
		scope: {
			words: '=wordsPlace',
			startList: '='
		},
		link: function(scope, elem) {
			var startList = [];
			scope.$watch('words', function(words) {
				if (words && scope.isSearch) {
					scope.initIndex();
					mapService.queryByKeyword(words)
						.then(function(data) {
							scope.addresses = data;
						});
				} else if (!words && scope.isSearch) {
					scope.addresses = startList;
				}
			});

			scope.$watch('startList', function() {
				if (scope.startList && scope.startList.length > 0 ) {
					startList = scope.startList.map(function(item) {
						return {name: item};
					});
				}
			});

			scope.element = elem;

			$http.get('addressList.html', {cache: $templateCache})
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

			scope.initIndex();

			elem.on({
				focus: function() {
					//scope.addresses
					if (!$(this).val()) {
						scope.$apply(function() {
							scope.addresses = startList;
						});
					}
				},

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
						if (scope.words && scope.words.trim()) {
							mapService.geocode(scope.words)
								.then(function(response) {
									if (response.lng === 0) {
										return $q.reject();	
									}
									response.path = $location.url();
									$rootScope.$broadcast('mapPosition', response);
								});
						}
					}, 200);
				}
			});
		}
	};
};

wordsPlace.$inject = ['$rootScope', '$q', 'mapService', '$http', '$templateCache', '$compile', '$document', '$timeout', 'seatMap', 'gpsGcjExchangeUtils', '$location'];

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
			var input = scope.input;
			elem.width(input.innerWidth());
			scope.$on('$destroy', function() {
				elem.remove();
			});

			input.on({

				focus: function() {
					scope.$apply(function() {
						scope.show = true;
					});
					var pos = input.offset();
					elem
						.css({
							left: pos.left,
							top: pos.top + input.innerHeight() + 2
						});
				},

				blur: function() {
					if (document.activeElement !== document.body && 
								elem.has($(document.activeElement)).length === 0) {
						scope.$apply(() => {
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
