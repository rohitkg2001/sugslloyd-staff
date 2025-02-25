import { BASE_URL, LOGIN_STAFF } from "../constant";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { handleAxiosError } from "../../utils/api"; // Import axios utils

export const greet = () => {
  // Write a logic to get morning, afternoon, evening and night as per time from moment
  const currentTime = moment().format("HH");
  if (currentTime >= 0 && currentTime < 12) {
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
    const response = await api.post(`${BASE_URL}/api/login`, { email: user, password: pass });
    const { data, status } = response
    if (data?.user?.id && status === 200) {
      await AsyncStorage.setItem('userToken', String(data.user.id))
      // await AsyncStorage.setItem('')
      dispatch({ type: LOGIN_STAFF, payload: data.user });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return handleAxiosError(err);
  }
};

export const updatePicture = async (id, file) => {
  try {
    const formData = new FormData();
    if (file) {
      formData.append('image', {
        uri: file.uri,
        type: 'image/jpeg'
      });
    }
    const response = await api.post(`${BASE_URL}/api/vendor/upload-avatar/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper headers
        },
      }
    )
    const { data, status } = response
    console.log(data)
  } catch (err) {
    return handleAxiosError(err);
  }
}