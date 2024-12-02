import { VIEW_SITE, SEARCH_SITE, ADD_SITE, FETCH_SITES } from "../constant";
import { totalsitesData } from "..//../utils/faker";

const initialState = {
  sites: [],
  filteredSites: [],
  currentSite: null,
  searchText: "",
  projectCount: 0,
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SITES:
      return {
        ...state,
        sites: action.payload,
      };

    case ADD_SITE:
      return {
        ...state,
        sites: [action.payload, ...state.sites],
        filteredSites: [action.payload, ...state.filteredSites],
      };

    case VIEW_SITE:
      return {
        ...state,
        currentSite: action.payload,
      };
    case SEARCH_SITE:
      const searchText = action.payload.toLowerCase();
      return {
        ...state,
        searchText: action.payload,
        filteredSites: state.sites.filter(
          (site) =>
            site.city.toLowerCase().includes(searchText) ||
            site.state.toLowerCase().includes(searchText) ||
            site.projectCode.toLowerCase().includes(searchText)
        ),
      };
    default:
      return state;
  }
};
