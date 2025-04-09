import { initialState, LOGIN_STAFF, SET_PROJECT_TYPE } from "../constant";

export const staffReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_STAFF:
      return { ...state, ...payload };
    case SET_PROJECT_TYPE:
      return { ...state, ...payload };

    default:
      return state;
  }
};
