
import { VIEW_SITE, SEARCH_SITE } from './actionTypes';

const initialState = {
  sitesData: [], 
  searchQuery: '', 
  filteredData: [],
};

const totalSitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_SITE:
      return {
        ...state,
        
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

export default totalSitesReducer;

