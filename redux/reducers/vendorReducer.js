import { VIEW_VENDOR, UPDATE_VENDOR, SEARCH_VENDOR, COUNT_VENDOR, GET_ALL_VENDORS } from '../constant';

const initialState = {
  vendors: [],
  filteredVendors: [],
  currentVendor: null,
  searchText: '',
  count: 0
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENDORS:
      return { ...state, vendors: action.payload };
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