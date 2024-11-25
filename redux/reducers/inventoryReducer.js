import { VIEW_INVENTORY, UPDATE_INVENTORY, SEARCH_INVENTORY, COUNT_INVENTORY } from '../constant';
import { inventoryData } from "../../utils/faker";

const initialState = {
  inventory: inventoryData,
  filteredInventory: inventoryData,
  currentItem: null,
  searchText: '',
  count: inventoryData.length
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_INVENTORY:
      return {
        ...state,
        currentItem: action.payload
      };
    case UPDATE_INVENTORY:
      const updatedInventory = state.inventory.map(item => 
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        inventory: updatedInventory,
        filteredInventory: updatedInventory,
        currentItem: null
      };
    case SEARCH_INVENTORY:
      const searchText = action.payload.toLowerCase();
      return {
        ...state,
        searchText,
        filteredInventory: state.inventory.filter(item =>
          item.name.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText)
        )
      };
    case COUNT_INVENTORY:
      return {
        ...state,
        count: state.inventory.length
      };
    default:
      return state;
  }
};