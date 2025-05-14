// import { useEffect, useState, useRef } from "react";
// import { CameraView } from "expo-camera";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   Image,
//   FlatList,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import * as Location from "expo-location";
// import { ICON_LARGE, SCREEN_HEIGHT, SCREEN_WIDTH, spacing } from "../styles";
// import { useNavigation } from "@react-navigation/native";

// export default function TransportCamera({
//   isCameraOpen,
//   setIsCameraOpen,
//   handleSubmission,
//   route,
// }) {
//   const [photos, setPhotos] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [timestamp, setTimestamp] = useState("");
//   const cameraRef = useRef(null);
//   const navigation = useNavigation();

//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [dropoffLocation, setDropoffLocation] = useState(null);
//   const [pickupAddress, setPickupAddress] = useState("");
//   const [dropoffAddress, setDropoffAddress] = useState("");
//   const [transportType, setTransportType] = useState("");
//   const [price, setPrice] = useState(0);
//   const [distance, setDistance] = useState(0);
//   const [currentDate, setCurrentDate] = useState("");
//   const [currentTime, setCurrentTime] = useState("");

//   const CORNER_SIZE = 60;
//   const BORDER_WIDTH = 8;

//   useEffect(() => {
//     if (route?.params?.transportType) {
//       setTransportType(route.params.transportType);
//     }
//     if (route?.params?.price) {
//       setPrice(route.params.price);
//     }
//     if (route?.params?.distance) {
//       setDistance(route.params.distance);
//     }

//     // Setting Current Date and Time when component mounts
//     const date = new Date();
//     setCurrentDate(date.toLocaleDateString()); // Format: MM/DD/YYYY
//     setCurrentTime(date.toLocaleTimeString()); // Format: HH:MM:SS AM/PM
//   }, [route]);

//   const getAddressFromCoords = async (latitude, longitude) => {
//     try {
//       let addressData = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude,
//       });
//       if (addressData.length > 0) {
//         let { city } = addressData[0];
//         return city ? `${city}` : "Address not found";
//       }
//       return "Address not found";
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       return "Address fetch error";
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Allow location access to proceed.");
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       const { latitude, longitude } = loc.coords;
//       setPickupLocation({ latitude, longitude });

//       const pickupAddr = await getAddressFromCoords(latitude, longitude);
//       setPickupAddress(pickupAddr);

//       let dropLat = latitude + 0.01;
//       let dropLong = longitude + 0.01;
//       setDropoffLocation({ latitude: dropLat, longitude: dropLong });

//       const dropAddr = await getAddressFromCoords(dropLat, dropLong);
//       setDropoffAddress(dropAddr);
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === "granted") {
//         let loc = await Location.getCurrentPositionAsync({});
//         //  console.log(loc);
//         setLocation(loc.coords);
//       }
//     })();

//     const interval = setInterval(() => {
//       setTimestamp(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (photos.length === 5) {
//       handleSubmission(photos);
//     }
//   }, [photos]);

//   const handleCapture = async () => {
//     if (cameraRef.current && location) {
//       const photo = await cameraRef.current.takePictureAsync({ base64: false });

//       const photoData = {
//         uri: photo.uri,
//         lat: location.latitude,
//         long: location.longitude,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       setPhotos((prev) => [photoData, ...prev].slice(0, 5));
//     }
//   };

//   const handleRetake = () => {
//     setPhotos([]);
//   };

//   return (
//     <Modal
//       visible={isCameraOpen}
//       animationType="slide"
//       onRequestClose={() => setIsCameraOpen(false)}
//     >
//       <View style={styles.cameraContainer}>
//         <CameraView ref={cameraRef} facing="back" style={styles.camera} />
//         <View
//           style={{
//             flex: 1,
//             position: "absolute",
//             top: 130,
//             left: 40,
//             width: SCREEN_WIDTH * 0.8,
//             height: SCREEN_HEIGHT * 0.4,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {/* Border Frame moved inside corners */}
//           <View
//             style={{
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             {/* Top Left Corner */}
//             <View
//               style={{
//                 width: CORNER_SIZE,
//                 height: CORNER_SIZE,
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 borderWidth: BORDER_WIDTH,
//                 borderColor: "red",
//                 borderRightWidth: 0,
//                 borderBottomWidth: 0,
//                 borderTopLeftRadius: 12,
//               }}
//             />
//             {/* Top Right Corner */}
//             <View
//               style={{
//                 width: CORNER_SIZE,
//                 height: CORNER_SIZE,
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 borderWidth: BORDER_WIDTH,
//                 borderColor: "orange",
//                 borderLeftWidth: 0,
//                 borderBottomWidth: 0,
//                 borderTopRightRadius: 12,
//               }}
//             />
//             {/* Bottom Left Corner */}
//             <View
//               style={{
//                 width: CORNER_SIZE,
//                 height: CORNER_SIZE,
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 borderWidth: BORDER_WIDTH,
//                 borderColor: "blue",
//                 borderRightWidth: 0,
//                 borderTopWidth: 0,
//                 borderBottomLeftRadius: 12,
//               }}
//             />
//             {/* Bottom Right Corner */}
//             <View
//               style={{
//                 width: CORNER_SIZE,
//                 height: CORNER_SIZE,
//                 position: "absolute",
//                 bottom: 0,
//                 right: 0,
//                 borderWidth: BORDER_WIDTH,
//                 borderColor: "green",
//                 borderLeftWidth: 0,
//                 borderTopWidth: 0,
//                 borderBottomRightRadius: 12,
//               }}
//             />

//             <View
//               style={{
//                 flex: 1,
//                 margin: BORDER_WIDTH + 1,
//                 borderColor: "rgba(255, 255, 255, 0.2)",
//                 borderWidth: 1,
//               }}
//             />
//           </View>
//         </View>

//         {/* Watermark Overlay */}
//         <View style={styles.watermark}>
//           <Text style={styles.watermarkText}>
//             Powered by Dashandots Technology
//           </Text>
//           <Text style={styles.watermarkText}>
//             📍 {location?.latitude}, {location?.longitude}
//           </Text>
//           <Text style={styles.watermarkText}>⏰ {timestamp}</Text>
//         </View>

//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.closeButton}
//         >
//           <Icon name="close" size={35} color="white" />
//         </TouchableOpacity>

//         {/* Controls */}
//         <View style={styles.controls}>
//           <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
//             <Icon name="refresh" size={35} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleCapture}
//             style={styles.shutterButton}
//           >
//             <View style={styles.innerShutter} />
//           </TouchableOpacity>
//           {photos.length >= 1 ? (
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("mapScreen", {
//                   pickupAddress,
//                   dropoffAddress,
//                   transportType,
//                   price,
//                   distance,
//                   photos,
//                   date: currentDate,
//                   time: currentTime,
//                 })
//               }
//               style={styles.retakeButton}
//             >
//               <Icon name="arrow-forward" size={ICON_LARGE} color={"white"} />
//             </TouchableOpacity>
//           ) : (
//             <View />
//           )}
//         </View>

//         <FlatList
//           data={photos}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           style={styles.photoList}
//           renderItem={({ item }) => (
//             <View style={styles.photoItem}>
//               <Image source={{ uri: item.uri }} style={styles.photo} />
//               <Text style={styles.photoText}>
//                 {item.lat.toFixed(4)}, {item.long.toFixed(4)}
//               </Text>
//               <Text style={styles.photoText}>{item.timestamp}</Text>
//             </View>
//           )}
//         />
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     alignSelf: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//   },
//   cameraContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
//   camera: {
//     flex: 1,
//   },
//   watermark: {
//     position: "absolute",
//     bottom: 220,
//     right: 20,
//   },
//   watermarkText: {
//     color: "white",
//     fontSize: 12,
//   },
//   controls: {
//     position: "absolute",
//     width: "100%",
//     bottom: 140,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingHorizontal: 30,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//   },
//   shutterButton: {
//     width: 70,
//     height: 70,
//     backgroundColor: "white",
//     borderRadius: 35,
//     borderWidth: 3,
//     borderColor: "gray",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   innerShutter: {
//     width: 50,
//     height: 50,
//     backgroundColor: "red",
//     borderRadius: 25,
//   },
//   photoList: {
//     position: "absolute",
//     bottom: 0,
//     paddingVertical: 10,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     width: "100%",
//   },
//   photoItem: {
//     marginHorizontal: 5,
//     alignItems: "flex-start",
//   },
//   photo: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   photoText: {
//     color: "white",
//     fontSize: 10,
//     textAlign: "center",
//   },
// });

import { useEffect, useState, useRef } from "react";
import { CameraView } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import { ICON_LARGE, SCREEN_HEIGHT, SCREEN_WIDTH } from "../styles";
import { useNavigation } from "@react-navigation/native";

export default function TransportCamera({
  isCameraOpen,
  setIsCameraOpen,
  handleSubmission,
  route,
}) {
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState("");
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const { vehicle_category, from, to, amount, kilometer, date, time } =
    route?.params || {};

  const CORNER_SIZE = 60;
  const BORDER_WIDTH = 8;

  useEffect(() => {
    const d = new Date();
    setCurrentDate(d.toLocaleDateString());
    setCurrentTime(d.toLocaleTimeString());
  }, []);

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      let addressData = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addressData.length > 0) {
        let { city } = addressData[0];
        return city ? `${city}` : "Address not found";
      }
      return "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address fetch error";
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to proceed.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setLocation(loc.coords);

      const pickupAddr = await getAddressFromCoords(latitude, longitude);
      setPickupAddress(pickupAddr);

      let dropLat = latitude + 0.01;
      let dropLong = longitude + 0.01;

      const dropAddr = await getAddressFromCoords(dropLat, dropLong);
      setDropoffAddress(dropAddr);
    })();
  }, []);

  useEffect(() => {
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

        {/* Frame Overlay */}
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 130,
            left: 40,
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_HEIGHT * 0.4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", height: "100%" }}>
           
            <View style={{ ...cornerStyle.topLeft }} />
            <View style={{ ...cornerStyle.topRight }} />
            <View style={{ ...cornerStyle.bottomLeft }} />
            <View style={{ ...cornerStyle.bottomRight }} />
          </View>
        </View>

        {/* <View style={styles.infoBox}>
          <Text style={styles.infoText}>From: {from}</Text>
          <Text style={styles.infoText}>To: {to}</Text>
          <Text style={styles.infoText}>Kilometers: {kilometer} km</Text>
          <Text style={styles.infoText}>Amount: ₹{amount}</Text>
        </View> */}

        {/* Watermark */}
        <View style={styles.watermark}>
          <Text style={styles.watermarkText}>
            Powered by Dashandots Technology
          </Text>
          <Text style={styles.watermarkText}>
            📍 {location?.latitude}, {location?.longitude}
          </Text>
          <Text style={styles.watermarkText}>⏰ {timestamp}</Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon name="close" size={35} color="white" />
        </TouchableOpacity>

        {/* Controls */}
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

          {photos.length >= 1 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("mapScreen", {
                  vehicle_category,
                  from,
                  to,
                  amount,
                  kilometer,
                  date: currentDate,
                  time: currentTime,
                  pickupAddress,
                  dropoffAddress,
                  photos,
                })
              }
              style={styles.retakeButton}
            >
              <Icon name="arrow-forward" size={ICON_LARGE} color={"white"} />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        {/* Photo Preview List */}
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

const cornerStyle = StyleSheet.create({
  topLeft: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 8,
    borderColor: "red",
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 8,
    borderColor: "orange",
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderWidth: 8,
    borderColor: "blue",
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 8,
    borderColor: "green",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
});

const styles = StyleSheet.create({
  infoBox: {
    position: "absolute",
    top: 90,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 8,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    marginBottom: 2,
  },
  // eske upper ka style delaet karna hai
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  watermark: {
    position: "absolute",
    bottom: 180,
    left: 10,
  },
  watermarkText: {
    color: "white",
    fontSize: 12,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  controls: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  shutterButton: {
    width: 70,
    height: 70,
    backgroundColor: "white",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  innerShutter: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 25,
  },
  retakeButton: {
    padding: 10,
  },
  photoList: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  photoItem: {
    marginRight: 10,
    alignItems: "center",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  photoText: {
    color: "white",
    fontSize: 10,
  },
});
