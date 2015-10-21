'use strict';
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
