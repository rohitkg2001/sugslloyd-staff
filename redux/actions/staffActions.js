import { LOGIN_STAFF } from "../constant";
import { staff } from "../../utils/faker";

export const login = (user, pass) => async (dispatch) => {
  if (user === staff.email && pass === staff.password) {
    dispatch({ type: LOGIN_STAFF, payload: staff });
    return true;
  } else {
    return false;
  }
};
