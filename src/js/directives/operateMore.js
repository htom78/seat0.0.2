'use strict';

function OperateMore($document, seatService) {
	return {
		restrict: 'E',
		templateUrl: 'component/operateMore.html',
		scope: {
			item: '=item',
			isCancelBtnShow: '&cancelBtn',
			isPassengerFuckBtnShow: '&passengerBtn',
			isDriverFuckBtnShow: '&driverBtn',
			isAssignBtnShow: '&assignBtn',	
		},
		link: (scope, elem) => {
			scope.showBtns = function() {
				scope.isBtnShow = !scope.isBtnShow;
				if (scope.isBtnShow) {
					scope.item.isBtnShow = true;	
				} else {
					scope.item.isBtnShow = false;	
				}
			};

			scope.handleCancelOrder = function() {
				seatService.handleCancelOrder(scope.item);
			};

			scope.handlePassengerFuckOrder = function() {
				seatService.handleCancelOrder(scope.item)
					.then((response) => {
						scope.item.statusName = '乘客放空';	
					});	
			};

			scope.handleDriverFuckOrder = function() {
				seatService.handleDriverFuckOrder(scope.item)
					.then((response) => {
						scope.item.statusName = '司机放空';	
					});	
			};

			scope.assignCar = function(input) {
				seatService.assignOrderByCarPlate(scope.item, input);
			};

			$document.on('click', (ev) => {
				scope.$apply(() => {
					if (elem.get(0) !== ev.target &&
							elem.has($(ev.target)).length === 0) {
						scope.isBtnShow = false;	
						scope.item.isBtnShow = false;	
					}	
				});	
			});
		}	
	};
}

export default {
	name: 'operateMore',
	fn: OperateMore
};
