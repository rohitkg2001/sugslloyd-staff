export const LOGIN_VENDOR = "LOGIN_VENDOR";
export const LOGIN_VENDOR_SUCCESS = "LOGIN_VENDOR_SUCCESS";
export const LOGIN_VENDOR_FAILURE = "LOGIN_VENDOR_FAILURE";
export const LOGIN_VENDOR_LOGOUT = "LOGIN_VENDOR_LOGOUT";
export const LOGIN_VENDOR_CHANGE_PASSWORD = "LOGIN_VENDOR_CHANGE_PASSWORD";
export const LOGIN_VENDOR_VIEW_PROFILE = "LOGIN_VENDOR_VIEW_PROFILE";

export const VIEW_TASK = "VIEW_TASK";
export const UPDATE_TASK = "UPDATE_TASK,";

export const VIEW_SITE = "VIEW_SITE";
export const SEARCH_SITE = "SEARCH_SITE";

export const VIEW_PROJECT = "VIEW_PROJECT";
export const SEARCH_PROJECT = "SEARCH_PROJECT";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const COUNT_PROJECTS = "COUNT_PROJECTS";
export const CHANGE_PROJECT_STATUS = "CHANGE_PROJECT_STATUS";

export const VIEW_PAYMENT = "VIEW_PAYMENT";
export const SEARCH_PAYMENT = "SEARCH_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";
export const COUNT_PAYMENTS = "COUNT_PAYMENTS";

export const initialState = {
  userId: null,
  currentTask: null,
  currentSite: null,
  currentProject: null,
  currentPayment: null,
};

// Set all constants here including assets, texts,etc
