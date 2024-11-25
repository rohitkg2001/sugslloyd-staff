import { VIEW_INVENTORY, UPDATE_INVENTORY, SEARCH_INVENTORY, COUNT_INVENTORY } from '../constant';

export const viewInventory = (item) => ({
  type: VIEW_INVENTORY,
  payload: item
});

export const updateInventory = (item) => ({
  type: UPDATE_INVENTORY,
  payload: item
});

export const searchInventory = (searchText) => ({
  type: SEARCH_INVENTORY,
  payload: searchText
});

export const countInventory = () => ({
  type: COUNT_INVENTORY
});