import { ItemCtrl } from "./ItemCtrl";
import { UICtrl } from "./UICtrl";
import { StorageCtrl } from "./StorageCtrl";


// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //Disable submit on enter
    document.addEventListener('keypress' , function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    })

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Back button event
     document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

     
     // Clear button event
     document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  };

    

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // // Check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

       // Add total calories to UI
       UICtrl.showTotalCalories(totalCalories);

       //Store in local storage

       StorageCtrl.storeItem(newItem);

      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Click edit Item
  const itemEditClick = function(e){

    if(e.target.classList.contains('edit-item')){

       // Get list item id (item-0, item-1)
       const listId = e.target.parentNode.parentNode.id;

       // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

       // Get item
       const itemToEdit = ItemCtrl.getItemById(id);

         // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();

    }

    e.preventDefault();

  }

  // Update item submit
const itemUpdateSubmit = function (e) {
  
  // Get item input
  const input = UICtrl.getItemInput();

  // Update item
  const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

  // Update UI
  UICtrl.updateListItem(updatedItem);

    // Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Update Local Storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

  e.preventDefault();
}

  // Delete button event
  const itemDeleteSubmit = function(e){

     // Get current item
     const currentItem = ItemCtrl.getCurrentItem();

     // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

     // Delete from UI
     UICtrl.deleteListItem(currentItem.id);

     // Get total Calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    //Delete from Local Storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);


    UICtrl.clearEditState();

    e.preventDefault();

  }

  // Clear items event
  const clearAllItemsClick = function(){
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

      // Get total Calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
  
      UICtrl.clearEditState();

    //Remove From UI
    UICtrl.removeItems();

    StorageCtrl.clearItemsFromStorage();

    //Hide Ul
    UICtrl.hideList();

  }

  // Public methods
  return {
    init: function() {

       // Clear edit state / set initial set
       UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

        // Get total Calories
        const totalCalories = ItemCtrl.getTotalCalories();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();


// console.log('====================================');
// // console.log(ItemCtrl.addItem('Turkey Dinner', '1300'));
// console.log(ItemCtrl.getItems());
// console.log('====================================');