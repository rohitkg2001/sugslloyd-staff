import { LOGIN_STAFF } from "../constant";
import moment from "moment";
import { staff } from "../../utils/faker";

export const greet = () => {
  // Write a logic to get morning, afternoon, evening and night as per time from moment
  const currentTime = moment().format("HH");
  if (0 < currentTime && currentTime < 12) {
    return "Good Morning";
  } else if (12 < currentTime && currentTime < 16) {
    return "Good Afternoon";
  } else if (16 < currentTime && currentTime < 21) {
    return "Good Evening";
  } else {
    return "Come Tomorrow";
  }
};

export const login = (user, pass) => async (dispatch) => {
  if (user === staff.email && pass === staff.password) {
    dispatch({ type: LOGIN_STAFF, payload: staff });
    return true;
  } else {
    return false;
  }
};
