import { VIEW_VENDOR, UPDATE_VENDOR, SEARCH_VENDOR, COUNT_VENDOR } from '../constant';
import { totalVendorsData } from "../../utils/faker";

const initialState = {
  vendors: totalVendorsData,
  filteredVendors: totalVendorsData,
  currentVendor: null,
  searchText: '',
  count: totalVendorsData.length
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_VENDOR:
      return {
        ...state,
        currentVendor: action.payload
      };
    case UPDATE_VENDOR:
      const updatedVendors = state.vendors.map(vendor => 
        vendor.id === action.payload.id ? action.payload : vendor
      );
      return {
        ...state,
        vendors: updatedVendors,
        filteredVendors: updatedVendors,
        currentVendor: null,
        count: updatedVendors.length
      };
    case SEARCH_VENDOR:
      const searchText = action.payload.toLowerCase();
      return {
        ...state,
        searchText,
        filteredVendors: state.vendors.filter(vendor =>
          vendor.name.toLowerCase().includes(searchText) ||
          vendor.state.toLowerCase().includes(searchText) ||
          vendor.projectCode.toLowerCase().includes(searchText)
        )
      };
    case COUNT_VENDOR:
      return {
        ...state,
        count: state.vendors.length
      };
    default:
      return state;
  }
};