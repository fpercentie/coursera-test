(function(){
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		restrict: 'E',
		scope: {
			foundItems: '<',
			onRemove: '&' 
		}
		// controller: NarrowItDownController,
		// controllerAs: 'NarrowIt',
		// bindToController: true
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];



function NarrowItDownController(MenuSearchService){
	var nid = this;

	nid.found = [];
	nid.search_term = "";

	nid.searchItems = function(){
		var promise = MenuSearchService.getMatchedMenuItems(nid.search_term);
		promise.then(function(response) {
			nid.found = response;
		}).catch (function(error){
      	console.log("Something went wrong!");
    	});
	};

	nid.remove = function(index){
		nid.found.splice(index, 1);
	};
};

MenuSearchService.$inject = ['$http'];

function MenuSearchService($http){
	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
	//calls $http and return searchTerms that match searchTerm
		var response = $http({
			method: "GET",
			url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
			}).then(function(result){
				//process result and only keep items that match
				var items = result.data.menu_items;
				var foundItems = [];
				for(var i=0; i<items.length; i++){
					var look = items[i]["description"];
					if (look.indexOf(searchTerm) !== -1){
						console.log(searchTerm);
				 		foundItems.push(items[i]);
					}
		 		}
		 		console.log(foundItems);
				//return processed items
			 	return foundItems;;
			 });
		return response;
	};

};
})();
