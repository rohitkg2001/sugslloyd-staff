
export const VIEW_SITE = 'VIEW_SITE';
export const SEARCH_SITE = 'SEARCH_SITE';

// import { VIEW_SITE, SEARCH_SITE } from './actionTypes';

export const viewSite = (siteData) => ({
  type: VIEW_SITE,
  payload: siteData,
});


export const searchSite = (query) => ({
  type: SEARCH_SITE,
  payload: query,
});
