import { VIEW_SITE, SEARCH_SITE, FETCH_SITES, ADD_SITE } from "../constant";
import { totalsitesData as mockSites } from "../../utils/faker";

// export const fetchSites = () => {
//   return (dispatch) => {
//     // Simulating an API call with a small delay
//     setTimeout(() => {
//       dispatch({
//         type: FETCH_SITES,
//         payload: mockSites,
//       });
//     }, 100);
//   };
// };

export const fetchSites = () => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/sites`);
  const data = await response.json();
  dispatch({
    type: FETCH_SITES,
    payload: data,
  });
};

export const viewSite = (site) => ({
  type: VIEW_SITE,
  payload: site,
});

export const searchSite = (searchText) => ({
  type: SEARCH_SITE,
  payload: searchText,
});

export const addSite = (addSite) => ({
  type: ADD_SITE,
  payload: addSite,
});
