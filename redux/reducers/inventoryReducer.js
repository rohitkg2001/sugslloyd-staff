import { VIEW_INVENTORY, UPDATE_INVENTORY, SEARCH_INVENTORY, COUNT_INVENTORY, GET_ALL_INVENTORY } from '../constant';


const initialState = {
  inventory: [],
  currentItem: null,
  searchText: '',
  count: 0
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVENTORY:
      return { ...state, inventory: action.payload };
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