import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";

export default function usePermissions() {
    const [permissions, setPermissions] = useState({
        push: false,
        camera: false,
        location: false,
    });
    const [permissionsLoading, setPermissionsLoading] = useState(true); // NEW: Track permission loading

    useEffect(() => {
        checkAndRequestPermissions();
    }, []);

    async function checkAndRequestPermissions() {
        setPermissionsLoading(true); // Start loading

        const storedPermissions = await AsyncStorage.getItem("permissions");
        if (storedPermissions) {
            setPermissions(JSON.parse(storedPermissions));
            setPermissionsLoading(false);
            return;
        }

        let push = await requestPushNotificationPermission();
        let camera = await requestCameraPermission();
        let location = await requestLocationPermission();

        const newPermissions = { push, camera, location };
        await AsyncStorage.setItem("permissions", JSON.stringify(newPermissions));
        setPermissions(newPermissions);
        setPermissionsLoading(false); // Done loading
    }

    async function requestPushNotificationPermission() {
        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        let { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            status = newStatus;
        }

        if (status !== "granted") {
            Alert.alert("Permission Denied", "Push notifications will not work without permission.");
            return false;
        }

        return true;
    }

    async function requestCameraPermission() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("Status", status)
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Camera access is required for this app.");
            return false;
        }
        return true;
    }

    async function requestLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "Location access is required.");
            return false;
        }
        return true;
    }

    return { permissions, permissionsLoading }; // NEW: Expose loading state
}
