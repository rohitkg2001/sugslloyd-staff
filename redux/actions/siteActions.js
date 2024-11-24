// Action Types
export const VIEW_SITE = "VIEW_SITE";
export const SEARCH_SITE = "SEARCH_SITE";

// Action Creators
export const viewSite = (site) => ({
  type: VIEW_SITE,
  payload: site,
});

export const searchSite = (searchText) => ({
  type: SEARCH_SITE,
  payload: searchText,
});
