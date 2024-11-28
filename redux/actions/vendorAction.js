import { VIEW_VENDOR, GET_ALL_VENDORS, UPDATE_VENDOR, SEARCH_VENDOR, COUNT_VENDOR, BASE_URL } from '../constant';

export const getAllVendors = () => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/vendor`, {
    method: 'GET'
  })
  const { vendors } = await response.json()
  dispatch({ type: GET_ALL_VENDORS, payload: vendors })
}
export const getVendorCounts = async () => {
  const response = await fetch(`${BASE_URL}/api/vendor`, {
    method: 'GET'
  })
  const { vendors } = await response.json()
  const totalVendors = vendors && vendors.length
  const activeVendors = Array.isArray(vendors) && vendors.filter((item) => item.status === 'active').length
  const inactiveVendors = Array.isArray(vendors) && vendors.filter((item) => item.status === 'inactive').length
  return { totalVendors, activeVendors, inactiveVendors }
}

export const editVendor = (data, id) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/vendor/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  console.log(data)
  // dispatch({ type: UPDATE_VENDOR, payload: user })
}

export const viewVendor = (vendor) => ({
  type: VIEW_VENDOR, payload: vendor
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