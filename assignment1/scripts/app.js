(function () {
	'use strict';

	angular.module('LunchCheckApp', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController ($scope) {
		$scope.dishes = "";
		$scope.message_output = "";
		$scope.message = function () {
		var entry = $scope.dishes;
		var entry_array = entry.split(",");
		var entry_array_length = entry_array.length;
		if (entry_array_length == 1 && entry_array[0] == ""){
			$scope.message_output = "Please enter data first";
		}
		else if (entry_array_length > 3){
			$scope.message_output = "Too much!";
		}
		else{
			$scope.message_output = "Enjoy!";
		}
		}
	}


})();