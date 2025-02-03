import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import ContainerComponent from "../components/ContainerComponent";
import * as Location from "expo-location";
//import MapView, { Marker } from "react-native-maps";
import { styles, spacing, typography, SCREEN_WIDTH, layouts } from "../styles";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { H2 } from "../components/text";
//import { punchIn } from "../redux/actions";
import moment from "moment";

export default function AttendancePunchScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  // Request location permission and fetch location
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    // Get the current location
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  // Update marker location whenever the location changes
  useEffect(() => {
    if (location) {
      setMarkerLocation(location);
    }
  }, [location]);

  // Request permissions on component mount
  useEffect(() => {
    requestLocationPermission();
    requestPermission(); // Request camera permission
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePictureAndNavigate = async () => {
    // TODO: Record current selfie, location and time in global state
    if (cameraRef.current) {
      navigation.navigate("homeScreen"); // Navigate to
      const photo = await cameraRef.current.takePictureAsync();

      if (!location || !photo.uri) {
        return;
      }
     // punchIn(photo.uri, location, moment().format("DD-MM-YYYY HH:mm:ss A"));
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title="Record Your Face" />
      <ScrollView
        style={{ flex: 1, width: SCREEN_WIDTH - 20 }}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <View style={layouts.center}>
          <View
            style={[
              styles.cameraContainer,
              layouts.circle75,
              spacing.mv5,
              layouts.center,
            ]}
          >
            {photoUri ? (
              <View
                style={[
                  styles.cameraContainer,
                  layouts.circle75,
                  spacing.mv5,
                  layouts.center,
                ]}
              >
                <Image source={{ uri: photoUri }} style={layouts.circle75} />
              </View>
            ) : (
              <CameraView
                style={[layouts.circle75]}
                ref={cameraRef}
                facing="front"
              />
            )}
          </View>
        </View>

        {/* TODO:Add map in a border radius */}
        {markerLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={markerLocation} title="Your Location" />
          </MapView>
        ) : (
          <Text>Fetching location...</Text>
        )}
        <Button
          style={[styles.btn, styles.bgPrimary, { justifyContent: "center" }]}
          onPress={takePictureAndNavigate}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            Punch In
          </H2>
        </Button>
      </ScrollView>
    </ContainerComponent>
  );
}
