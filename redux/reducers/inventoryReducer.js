import {
  VIEW_INVENTORY,
  COUNT_INVENTORY,
  GET_ALL_INVENTORY,
  ADD_INVENTORY,
} from "../constant";

const initialState = {
  inventory: [],
  currentItem: null,
  count: 0,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVENTORY:
      return { ...state, inventory: action.payload };

    case ADD_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };

    case VIEW_INVENTORY:
      return {
        ...state,
        currentItem: action.payload,
      };

    case COUNT_INVENTORY:
      return {
        ...state,
        count: state.inventory.length,
      };

    default:
      return state;
  }
};
