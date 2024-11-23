export const VIEW_SITE = "VIEW_SITE";
export const SEARCH_SITE = "SEARCH_SITE";

// import { VIEW_SITE, SEARCH_SITE } from './taskActions';

export const viewSite = (task) => ({
  type: VIEW_SITE,
  payload: task,
});

export const searchSite = (searchText) => ({
  type: SEARCH_SITE,
  payload: searchText,
});
