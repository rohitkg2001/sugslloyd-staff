
import { VIEW_SITE, SEARCH_SITE } from "../constant";

export const viewSite = (site) => ({
  type: VIEW_SITE,
  payload: site,
});

export const searchSite = (searchText) => ({
  type: SEARCH_SITE,
  payload: searchText,
});
