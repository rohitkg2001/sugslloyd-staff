// A reducer file that will handle all data interaction specific to the STAFF
// login,logout, change_password, view_profile etc
import {
  initialState,
  LOGIN_STAFF,
  LOGIN_STAFF_CHANGE_PASSWORD,
  LOGIN_STAFF_VIEW_PROFILE,
} from "../constant";

export const STAFFReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_STAFF:
      return { ...state, ...payload };
    case LOGIN_STAFF_CHANGE_PASSWORD:
      return { ...state, ...payload };
    case LOGIN_STAFF_VIEW_PROFILE:
      return { ...state, ...payload };

    default:
      return state;
  }
};
