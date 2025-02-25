import { BASE_URL, LOGIN_STAFF } from "../constant";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import api, { handleAxiosError } from "../../utils/api"; // Import axios utils
import axios from "axios";

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
    const response = await api.post(`${BASE_URL}/api/login`, {
      email: user,
      password: pass,
    });
    const { data, status } = response;
    if (data?.user?.id && status === 200) {
      await AsyncStorage.setItem("userToken", String(data.user.id));
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
    if (!file || !file.uri) {
      throw new Error("Invalid file selected");
    }

    // Normalize URI for Android/iOS
    const imageUri =
      Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri;

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `avatar_${id}.jpg`,
    });
    console.log(id);
    const response = await axios.post(
      `${BASE_URL}/api/staff/upload-avatar/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );

    const { data } = response;
    console.log("Upload Successful:", data);
    return data;
  } catch (err) {
    if (err.response) {
      console.error("Server Error:", err.response.data);
    } else if (err.request) {
      console.error("No Response from Server:", err.request);
    } else {
      console.error("Upload Error:", err.message);
    }
    return handleAxiosError(err);
  }
};
