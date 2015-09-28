SeatMap.$inject = ['seatMap'];
export default function SeatMap(seatMap) {
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, elem) {
			seatMap.init(elem.get(0).firstChild);	
			scope.$on('$destroy', () => {
				seatMap.destroy();		
			});
		},	
		template: '<div class="map"></div>'	
	};	
}
