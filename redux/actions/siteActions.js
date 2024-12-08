import {
  VIEW_SITE,
  SEARCH_SITE,
  FETCH_SITES,
  ADD_SITE,
  BASE_URL,
} from "../constant";
import statesandcities from "../../utils/statesandcities.json";

export const setStatesAndCities = () => {
  return statesandcities;
};

export const fetchSites = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/sites`);
    const data = await response.json();

    dispatch({ type: FETCH_SITES, payload: data });
  } catch (error) {}
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
