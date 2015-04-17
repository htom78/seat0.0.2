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