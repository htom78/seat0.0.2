var filters = require('./index');
var cmdate = function($filter) {
	return function(input, format) {
		return $filter('date')(new Date(input), format);
	};
};

cmdate.$inject = ['$filter'];

filters.filter('cmdate', cmdate);