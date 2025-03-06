import { useEffect, useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import {
  ICON_LARGE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  spacing,
  typography,
} from "../styles";
import { useNavigation } from "@react-navigation/native";

export default function TransportCamera({
  isCameraOpen,
  setIsCameraOpen,
  isSurvey,
  handleSubmission,
}) {
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation(loc.coords);
      }
    })();

    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (photos.length === 5) {
      handleSubmission(photos);
    }
  }, [photos]);

  const handleCapture = async () => {
    if (cameraRef.current && location) {
      const photo = await cameraRef.current.takePictureAsync({ base64: false });

      const photoData = {
        uri: photo.uri,
        lat: location.latitude,
        long: location.longitude,
        timestamp: new Date().toLocaleTimeString(),
      };

      setPhotos((prev) => [photoData, ...prev].slice(0, 5));
    }
  };

  const handleRetake = () => {
    setPhotos([]);
  };

  return (
    <Modal
      visible={isCameraOpen}
      animationType="slide"
      onRequestClose={() => setIsCameraOpen(false)}
    >
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} facing="back" style={styles.camera} />

        {/* Watermark Overlay */}
        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>
            Powered by Dashandots Technology
          </Text>
          <Text style={styles.watermarkText}>
            📍 {location?.latitude}, {location?.longitude}
          </Text>
          <Text style={styles.watermarkText}>⏰ {timestamp}</Text>
        </View>
        <View
          style={[
            spacing.br2,
            spacing.bw2,
            {
              position: "absolute",
              top: "180",
              left: "55",
              borderColor: "white",
              width: SCREEN_WIDTH * 0.7,
              height: SCREEN_HEIGHT * 0.3,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon name="close" size={35} color="white" />
        </TouchableOpacity>

        {/* Controlsl */}
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
            <Icon name="refresh" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCapture}
            style={styles.shutterButton}
          >
            <View style={styles.innerShutter} />
          </TouchableOpacity>
          {!isSurvey && photos.length >= 1 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("mapScreen")}
              style={styles.retakeButton}
            >
              <Icon name="arrow-forward" size={ICON_LARGE} color={"white"} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        <FlatList
          data={photos}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.photoList}
          renderItem={({ item }) => (
            <View style={styles.photoItem}>
              <Image source={{ uri: item.uri }} style={styles.photo} />
              <Text style={styles.photoText}>
                {item.lat.toFixed(4)}, {item.long.toFixed(4)}
              </Text>
              <Text style={styles.photoText}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  watermark: {
    position: "absolute",
    bottom: 220,
    right: 20,
  },
  watermarkText: {
    color: "white",
    fontSize: 12,
  },
  controls: {
    position: "absolute",
    width: "100%",
    bottom: 140,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  shutterButton: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  innerShutter: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25,
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
});
