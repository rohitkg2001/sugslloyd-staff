import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export default function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState("");

    useEffect(() => {
        checkStoredPushToken();
    }, []);

    async function checkStoredPushToken() {
        try {
            const storedToken = await AsyncStorage.getItem("expoPushToken");
            if (storedToken) {
              //  console.log("Using stored push token:", storedToken);
                setExpoPushToken(storedToken);
            } else {
                await registerForPushNotifications();
            }
        } catch (error) {
            console.error("Error reading push token from storage:", error);
        }
    }

    async function registerForPushNotifications() {
        try {
           // console.log("Fetching push token...");

            // Ensure permissions are granted before requesting a push token
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== "granted") {
                console.warn("Push notifications permission not granted.");
                return;
            }

            // Android-specific notification channel setup
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F",
                });
            }

            const projectId = "5f39b7f5-d82d-4ffb-8916-4a633c7945d9";
            const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

            if (pushTokenString) {
                //console.log("Fetched push token successfully:", pushTokenString);
                setExpoPushToken(pushTokenString);
                await AsyncStorage.setItem("expoPushToken", pushTokenString);
            } else {
                console.warn("Failed to fetch push token.");
            }
        } catch (error) {
            console.error("Error getting push token:", error);
        }
    }

    return { expoPushToken, registerForPushNotifications };
}
