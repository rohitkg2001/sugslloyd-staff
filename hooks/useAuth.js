import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initially null to indicate loading

  useEffect(() => {
    const checkLoginStatus = async () => {
      //console.log("Checking if already logged in...");
      try {
        const userToken = await AsyncStorage.getItem("userToken");
       // console.log("User Token Found:", userToken);
        setIsLoggedIn(!!userToken); // Convert string to boolean
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false); // Default to logged out if an error occurs
      }
    };
    checkLoginStatus();
  }, []);

  return { isLoggedIn };
}
