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

/******************************************************************************/

var chartDirective = function(chartUserService) {
	return {
		scope: {
			orderTotal: '=',
			orderFuck: '='
		},
		link: function(scope, elem) {
			chartUserService.get(elem);
			scope.$watch('orderTotal + orderFuck', function() {

				chartUserService.draw({
					total: scope.orderTotal,
					fuckCount: scope.orderFuck
				});
			});
		}
	};
};

chartDirective.$inject = ['chartUserService'];

directives.directive('chartUser', chartDirective);