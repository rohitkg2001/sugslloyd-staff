import { VIEW_SITE, ADD_SITE, FETCH_SITES, SET_SITE_INFO } from "../constant";

const initialState = {
  sites: [],
  filteredSites: [],
  currentSite: null,
  projectCount: 0,
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SITES:
      return { ...state, sites: action.payload };

    case ADD_SITE:
      return { ...state, sites: action.payload };

    case VIEW_SITE:
      return {
        ...state,
        currentSite: action.payload,
      };
    case SET_SITE_INFO:
      return { ...state, siteInfo: action.payload };
    default:
      return state;
  }
};
