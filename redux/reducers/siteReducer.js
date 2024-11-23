import { VIEW_SITE, SEARCH_SITE } from '../actions/siteActions';
import { totalsitesData } from "../../utils/faker";

const initialState = {
  sites: totalsitesData,
  filteredSites: totalsitesData,
  currentSite: null,
  searchText: ''
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_SITE:
      return {
        ...state,
        currentSite: action.payload
      };
    case SEARCH_SITE:
      const searchText = action.payload.toLowerCase();
      return {
        ...state,
        searchText: action.payload,
        filteredSites: state.sites.filter(site => 
          site.city.toLowerCase().includes(searchText) ||
          site.state.toLowerCase().includes(searchText) ||
          site.projectCode.toLowerCase().includes(searchText)
        )
      };

    case SEARCH_SITE:
      const query = action.payload.toLowerCase();
      const filteredData = state.sitesData.filter((site) =>
        site.city.toLowerCase().includes(query) ||
        site.state.toLowerCase().includes(query) ||
        site.projectCode.toLowerCase().includes(query)
      );
      return {
        ...state,
        searchQuery: query,
        filteredData,
      };

    default:
      return state;
  }
};
