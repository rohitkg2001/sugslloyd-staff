import { BASE_URL, LOGIN_STAFF } from "../constant";
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
  try {
    console.log(user, pass)
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user, password: pass }),
    });
    console.log(response)
    const data = await response.json();
    console.log(data);
    if (response.ok && data.user) {
      // Dispatch the user object to the store
      dispatch({ type: LOGIN_STAFF, payload: data.user });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

// export const login = (user, pass) => async (dispatch) => {
//   if (user === staff.email && pass === staff.password) {
//     dispatch({ type: LOGIN_STAFF, payload: staff });
//     return true;
//   } else {
//     return false;
//   }
// };

// export const login=()=>{}
