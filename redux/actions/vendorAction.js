import { VIEW_VENDOR, UPDATE_VENDOR, SEARCH_VENDOR, COUNT_VENDOR } from '../constant';

export const viewVendor = (vendor) => ({
  type: VIEW_VENDOR,
  payload: vendor
});

export const updateVendor = (vendor) => ({
  type: UPDATE_VENDOR,
  payload: vendor
});

export const searchVendor = (searchText) => ({
  type: SEARCH_VENDOR,
  payload: searchText
});

export const countVendor = () => ({
  type: COUNT_VENDOR
});