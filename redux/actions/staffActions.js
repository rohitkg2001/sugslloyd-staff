import { BASE_URL, LOGIN_STAFF, SET_PROJECT_TYPE } from "../constant";
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
  console.log("Login Request:", { email: user, password: pass });

  try {
    const response = await api.post(`${BASE_URL}/api/login`, {
      email: user,
      password: pass,
    });

    console.log("API Response:", response.data); // Check what the API returns

    const { data, status } = response;

    if (data?.user?.id && status === 200) {
      // Ensure token is correctly stored
      await AsyncStorage.setItem("userToken", String(data.token.id));
      console.log("Token stored:", await AsyncStorage.getItem("userToken"));

      // Dispatch actions to update Redux state
      dispatch({ type: LOGIN_STAFF, payload: data.user });
      dispatch({
        type: SET_PROJECT_TYPE,
        payload: data.projects[0]?.project_type,
      });
      // return true;
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (err) {
    console.error("Login Error:", err);
    return {
      success: false,
      message: handleAxiosError(err) || "An error occurred during login",
    };
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
