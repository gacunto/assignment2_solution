(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // LIST #1 - buy - controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyList = this;

    buyList.items = ShoppingListCheckOffService.getItemsToBuy();

    buyList.markItemAsBought = function (itemIndex) {
      ShoppingListCheckOffService.moveToBoughtList(itemIndex);
    };
  }

  // LIST #2 - bought - controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;

    boughtList.items = ShoppingListCheckOffService.getItemsAlreadyBought();
  }

  // Shoping list service
  function ShoppingListCheckOffService() {
    var service = this;

    // Lists of shopping items
    var itemsToBuy = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Bottle champagne",
        quantity: "10"
      },
      {
        name: "Ferrari",
        quantity: "15"
      },
      {
        name: "Chocolate",
        quantity: "5"
      }
    ];

    var itemsAlreadyBought = [];

    // remove item from buy list and add it to bought list
    service.moveToBoughtList = function (itemIdex) {
      var itemToMove = itemsToBuy.splice(itemIdex, 1);
      itemsAlreadyBought.push(itemToMove[0]);
    };

    // get the list of items to buy
    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    // get the list of items already bought
    service.getItemsAlreadyBought = function () {
      return itemsAlreadyBought;
    };
  }
})();
