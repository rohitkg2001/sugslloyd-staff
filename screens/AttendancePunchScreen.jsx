import { useState, useEffect, useRef } from "react";
import { View, Text, Alert, Image, ScrollView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import ContainerComponent from "../components/ContainerComponent";
import * as Location from "expo-location";
import { styles, spacing, typography, SCREEN_WIDTH, layouts } from "../styles";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";

import { H2 } from "../components/text";

export default function AttendancePunchScreen({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
  };

  useEffect(() => {
    if (location) {
      setMarkerLocation(location);
    }
  }, [location]);

  useEffect(() => {
    requestLocationPermission();
    requestPermission();
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
  const nextScreen = route.params?.nextScreen || "homeScreen";

  const takePictureAndNavigate = async () => {
    if (cameraRef.current) {
      // navigation.navigate("homeScreen"); // Navigate to
      // navigation.navigate(nextScreen);

      const photo = await cameraRef.current.takePictureAsync();

      if (!location || !photo.uri) {
        return;
      }
      navigation.navigate(nextScreen);
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title="Record Your Face" hasIcon={true} isBack={true} />
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
