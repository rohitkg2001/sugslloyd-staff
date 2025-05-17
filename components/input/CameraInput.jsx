import { useState, useEffect, useRef, useCallback } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import moment from "moment";
import { ICON_LARGE } from "../../styles";
import * as ImageManipulator from "expo-image-manipulator";

const MAX_PHOTOS = 5;
const MAX_COMPRESSED_SIZE_MB = 1;
const COMPRESSION_STEP = 0.1;
const MIN_COMPRESSION_QUALITY = 0.1;

export default function CameraInput({
  isCameraOpen,
  setIsCameraOpen,
  isSurvey,
  handleUpload,
  complete_pole_number = "",
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermissionChecked, setHasPermissionChecked] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const viewRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [progress] = useState(new Animated.Value(0));

  // Memoized location permission request
  const requestLocationPermission = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getLastKnownPositionAsync({});
      setLocation(location);
    }
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  // Memoized camera permission request
  const requestCameraPermission = useCallback(async () => {
    if (!permission?.granted) {
      const { status } = await requestPermission();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Camera permission is needed to take photos.",
          [{ text: "OK" }]
        );
      }
    }
    setHasPermissionChecked(true);
  }, [permission]);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  // Progress animation effect
  useEffect(() => {
    if (saving) {
      Animated.timing(progress, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      progress.setValue(0);
    }
  }, [saving, progress]);

  // Submission effect when photos reach limit
  useEffect(() => {
    if (photos.length === MAX_PHOTOS) {
      handleUpload(photos);
    }
  }, [photos, handleUpload]);

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  // Optimized image compression function
  const compressImage = useCallback(async (uri) => {
    let compressQuality = 0.8;
    let compressedPhoto = null;
    let compressedSizeMB = Infinity;

    while (
      compressedSizeMB > MAX_COMPRESSED_SIZE_MB &&
      compressQuality >= MIN_COMPRESSION_QUALITY
    ) {
      compressedPhoto = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1080, height: 1920 } }],
        {
          compress: compressQuality,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const compressedInfo = await FileSystem.getInfoAsync(compressedPhoto.uri);
      compressedSizeMB = compressedInfo.size / (1024 * 1024);
      compressQuality -= COMPRESSION_STEP;
    }

    return compressedPhoto;
  }, []);

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current || saving) return;

    try {
      setSaving(true);
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!viewRef.current) return;

      const resultUri = await captureRef(viewRef, { quality: 0.5 });
      const compressedPhoto = await compressImage(resultUri);

      if (!compressedPhoto) return;

      await MediaLibrary.saveToLibraryAsync(compressedPhoto.uri);

      const photoData = {
        uri: compressedPhoto.uri,
        lat: location?.coords?.latitude,
        long: location?.coords?.longitude,
        timestamp: new Date().toLocaleTimeString(),
      };

      setPhotos((prev) => [photoData, ...prev].slice(0, MAX_PHOTOS));
      setCapturedPhoto(null);
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      setSaving(false);
    }
  }, [saving, location, compressImage]);

  const handleRetake = useCallback(() => {
    setPhotos([]);
  }, []);

  const handleSubmitConfirmation = useCallback(() => {
    Alert.alert("Confirm Submission", "Are you sure you want to submit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Submit",
        onPress: () => {
          handleUpload(photos);
          setIsCameraOpen(false);
        },
      },
    ]);
  }, [photos, handleUpload, setIsCameraOpen]);

  const renderPhotoItem = useCallback(
    ({ item }) => (
      <View style={styles.photoItem}>
        <Image source={{ uri: item.uri }} style={styles.photo} />
      </View>
    ),
    []
  );

  const formatCoordinates = useCallback(() => {
    if (!location?.coords) return "N/A N N/A E";
    return `${location.coords.latitude?.toFixed(4) || "N/A"}N ${
      location.coords.longitude?.toFixed(4) || "N/A"
    }E`;
  }, [location]);

  const formatAltitude = useCallback(() => {
    if (!location?.coords?.altitude) return "N/A";
    return `${location.coords.altitude.toFixed(0)}m`;
  }, [location]);

  const renderOverlay = useCallback(
    () => (
      <>
        <Text style={styles.overlayText}>
          {moment().format("DD MMM YYYY HH:mm:ss a")}
        </Text>
        <Text style={styles.overlayText}>{formatCoordinates()}</Text>
        <Text style={styles.overlayText}>{`Alt: ${formatAltitude()}`}</Text>
        <Text style={styles.overlayText}>{complete_pole_number || ""}</Text>
        {!capturedPhoto && (
          <Text style={{ fontSize: 10, color: "red" }}>
            Powered By Dashandots Technology
          </Text>
        )}
      </>
    ),
    [formatCoordinates, formatAltitude, complete_pole_number, capturedPhoto]
  );

  return (
    <Modal visible={isCameraOpen} animationType="slide">
      <View style={styles.cameraContainer}>
        {saving && (
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressBarFill,
                {
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        )}
        {capturedPhoto ? (
          <View
            ref={viewRef}
            collapsable={false}
            style={styles.previewContainer}
          >
            <View style={[styles.topOverlay, { top: 120, right: 120 }]}>
              <Image
                source={require("../../assets/icon.png")}
                style={{ height: 60, width: 60, resizeMode: "contain" }}
              />
            </View>
            <Image
              source={{ uri: capturedPhoto }}
              style={styles.capturedImage}
            />
            <View style={[styles.overlay, { bottom: 40 }]}>
              {renderOverlay()}
            </View>
          </View>
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            onCameraReady={handleCameraReady}
          >
            <View style={styles.topOverlay}>
              <Image
                source={require("../../assets/icon.png")}
                style={{ height: 80, width: 80, resizeMode: "contain" }}
              />
            </View>
            <View style={styles.overlay}>{renderOverlay()}</View>
          </CameraView>
        )}

        <TouchableOpacity
          onPress={() => setIsCameraOpen(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={35} color="white" />
        </TouchableOpacity>
        {!saving && (
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={handleRetake}
              style={styles.retakeButton}
            >
              <Icon name="refresh" size={35} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCapture}
              style={styles.captureButton}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            {!isSurvey && photos.length >= 1 && (
              <TouchableOpacity
                onPress={handleSubmitConfirmation}
                style={styles.retakeButton}
              >
                <Icon name="arrow-forward" size={ICON_LARGE} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}

        <FlatList
          data={photos}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          style={styles.photoList}
          renderItem={renderPhotoItem}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  capturedImage: {
    flex: 1,
    resizeMode: "cover",
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 180,
    right: 10,
    backgroundColor: `rgba(0,0,0,0.4)`,
    padding: 8,
    borderRadius: 4,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18,
  },

  controls: {
    position: "absolute",
    width: "100%",
    bottom: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
  },

  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },

  photoList: {
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: "100%",
  },
  photoItem: {
    marginHorizontal: 5,
    alignItems: "flex-start",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  photoText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  // Add this style to your stylesheet:
  progressBar: {
    height: 4,
    width: 60,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 2,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.7)", // Matching your green color
    borderRadius: 2,
  },
});
