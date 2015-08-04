var components = require('./index');

var quanDialog = function($http, $q, $compile, $templateCache, $document, $rootScope, $controller) {

	var defaultOptions = {
		backdrop: false,
		modalClass: 'modal',
		backdropClass: 'dialog-backdrop'	
	};

	var body = $document.find('body');

	function createElement(clazz) {
		var elem = angular.element('<div>');	
		elem.addClass(clazz);
		return elem;
	}

	function Dialog(opts) {
		this.options = angular.extend({}, defaultOptions, opts);	
		this.modalElem = createElement(this.options.modalClass);
		this.backdropElem = createElement(this.options.backdropClass);
	}

	Dialog.prototype.open = function(templateUrl, controller) {
		var self = this;
		var options = this.options;	
		options.templateUrl = templateUrl;	
		options.controller = controller;

		if (!options.templateUrl) {
			throw new Error('Dialog.open expected template or templateUrl, neither found');	
		}

		this._loadResolves()
			.then(function(locals) {
				var $scope = locals.$scope = self.$scope = $rootScope.$new();
				self.modalElem.html(locals.$template);
				var ctrl = $controller(controller, locals);
				$compile(self.modalElem.contents())($scope);
				self._addElementsToDom();
				self._open = true;
				self._bindEvents();
			});

		this.defer = $q.defer();
		return this.defer.promise;
	};

	Dialog.prototype.close = function() {
		if (this.isOpen()) {
			this._removeElementsFromDom();
			this._open = false;	
			this.defer.resolve();
			this._unbindEvents();
		}	
	};

	Dialog.prototype._loadResolves = function() {
		var self = this;
		return $http.get(this.options.templateUrl, {cache: $templateCache})
			.then(function(response) {
				return {
					$template: response.data,	
					dialog: self
				};
			});

	};

	Dialog.prototype._bindEvents = function() {
		if (this.options.bodyClick) {
			$('body').on('click', this.handleBodyClick.bind(this));	
		}	
	};

	Dialog.prototype._unbindEvents = function() {
		if (this.options.bodyClick) {
			$('body').off('click', this.handleBodyClick.bind(this));	
		}	
	};

	Dialog.prototype.handleBodyClick = function(ev) {
		var elem = this.modalElem;
		if (elem.has($(ev.target)).length === 0) {
			this.close();	
		}
	};

	Dialog.prototype._removeElementsFromDom = function() {
		this.modalElem.remove();	
		this.backdropElem.remove();
	};

	Dialog.prototype._addElementsToDom = function() {
		body.append(this.modalElem);	
		if (this.options.backdrop) {
			body.append(this.backdropElem);	
		}
	};

	Dialog.prototype.isOpen = function() {
		return this._open;	
	};

	return {
		dialog: function(opts) {
			return new Dialog(opts);	
		}	
	};

};

quanDialog.$inject = [
	'$http', 
	'$q', 
	'$compile', 
	'$templateCache',
	'$document',
	'$rootScope',
	'$controller'
	];

components.factory('quanDialog', quanDialog);
