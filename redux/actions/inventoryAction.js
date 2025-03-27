import {
  VIEW_INVENTORY,
  UPDATE_INVENTORY,
  BASE_URL,
  GET_ALL_INVENTORY,
  ADD_INVENTORY,
} from "../constant";

export const viewInventory = (item) => ({
  type: VIEW_INVENTORY,
  payload: item,
});

export const getAllItems = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/inventories`);
    const data = await response.json();

    dispatch({ type: GET_ALL_INVENTORY, payload: data });
  } catch (err) {
    console.error("Error fetching inventory:", err);
  }
};

export const addInventory = (item) => ({
  type: ADD_INVENTORY,
  payload: item,
});

export const updateInventory = (item) => ({
  type: UPDATE_INVENTORY,
  payload: item,
});
