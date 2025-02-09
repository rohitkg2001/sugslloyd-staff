import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export default function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState("");

    async function registerForPushNotifications() {
        try {
            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                });
            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                return;
            }

            const projectId = "5f39b7f5-d82d-4ffb-8916-4a633c7945d9";
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;

            setExpoPushToken(pushTokenString);
            await AsyncStorage.setItem("expoPushToken", pushTokenString);
        } catch (error) {
            console.error("Error getting push token:", error);
        }
    }

    return { registerForPushNotifications, expoPushToken };
}
