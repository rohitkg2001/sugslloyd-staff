import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const user = await AsyncStorage.getItem("userToken");
            setIsLoggedIn(!!user);
        };
        checkLoginStatus();
    }, []);

    const login = async (token) => {
        await AsyncStorage.setItem("userToken", token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("userToken");
        setIsLoggedIn(false);
    };

    return { isLoggedIn, login, logout };
}
