(function(){
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItemsTemplate.html',
		scope: {
			items: '<' ,
			onRemove: '&' 
		},
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

	nid.searchItems = function(search_term){
		nid.found = MenuSearchService.getMatchedMenuItems(search_term);
	};

	nid.remove = function(index){
		nid.found.splice(index, 1);
	};
};

MenuSearchService.$inject = ['$http'];

function MenuSearchService($http){
	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
		var searchTerm = searchTerm;
	//calls $http and return searchTerms that match searchTerm
	return $http({
			method: "GET",
			url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
			}).then(function(result){
				//process result and only keep items that match
				var response = result.data;
				var foundItems = [];
				for(var i=0; i<response.menu_items.length; i++){
					var look = response.menu_items[i]["description"];
				 	if (look.indexOf(searchTerm) !== -1){
				 		foundItems.push(response.menu_items[i]);
				 	}
				 }
				 console.log(foundItems);

				//return processed items
				return foundItems;
			});

	};

};
})();
