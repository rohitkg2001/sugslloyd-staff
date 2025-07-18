import { BASE_URL, LOGIN_STAFF } from "../constant";
import moment from "moment";
import { staff } from "../../utils/faker";
import axios from "axios";

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
  try {
    const response = await axios.post(`${BASE_URL}/api/login`,
      { email: user, password: pass }
    );
    const { data, status } = response
    alert(status)
    if (status === 200) {
      dispatch({ type: LOGIN_STAFF, payload: data.user });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};