(function(){
	'use strict';
	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService) {
		var tobuyitem = this;

		tobuyitem.name = "";
		tobuyitem.quantity = "";

		tobuyitem.items = ShoppingListCheckOffService.getToBuyItems();

		tobuyitem.message = "Everything is bought!"

		tobuyitem.switchItemArray = function(index) {
			
			ShoppingListCheckOffService.switchItemArray(index);
			
			}
		}

	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyboughtitem = this;

		alreadyboughtitem.name = "";
		alreadyboughtitem.quantity = "";

		alreadyboughtitem.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

		alreadyboughtitem.message = "Nothing bought yet."	
			
	}

	function ShoppingListCheckOffService () {
		var service = this;
		var tbMessage = "";
		var abMessage = "";

		//List of ToBuy items
		var tobuyitems = 
			[{name: "cookies", quantity: 10}, 
			{name: "milk", quantity: 2}, 
			{name: "tofu", quantity: 4}, 
			{name: "kale", quantity: 5}, 
			{name: "chicken wings", quantity: 7}];

		//List of AlreadyBought items
		var alreadyboughtitems = [];

		service.getToBuyItems = function(){
			return tobuyitems;
		}

		service.getAlreadyBoughtItems = function(){
			return alreadyboughtitems;
		}

		service.switchItemArray = function(index){
			var itemToAdd = {
				name: tobuyitems[index].name,
				quantity: tobuyitems[index].quantity
			};
			alreadyboughtitems.push(itemToAdd);
			tobuyitems.splice(index, 1);
	

		}
	}

	})();
