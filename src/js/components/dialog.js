var components = require('./index');

function createElement(clazz) {
	var el = angular.element('<div>');
	el.addClass(clazz);
	return el;
}

var dialogService = function($http, $q, $compile, $templateCache, $document) {
	var defaults = {
		backdrop: false,
		modalClass: 'modal',
		backdropClass: 'dialog-backdrop'
	};
	var body = $document.find('body');

	function Dialog(opts) {
		this.options = angular.extend({}, defaults, opts);
		this.modalEl = createElement(this.options.modalClass);
		this.backdropEl = createElement(this.options.backdropClass);
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
		if(this.options.backdrop) {
			body.append(this.backdropEl);
		}
		this._open = true;
	};

	Dialog.prototype._removeElementsFromDom = function() {
		this.modalEl.remove();
		this.backdropEl.remove();
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