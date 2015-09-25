RepresentMap.$inject = ['representMap'];

export default function RepresentMap(representMap){
	return {
		restrict: 'E',
		scope: {},
		link: function(scope, elem) {
			representMap.init(elem.get(0).firstChild);
			scope.$on('$destroy', () => {
				representMap.destroy();
			});
		},
		template: '<div class="map"></div>'	
	};
}
