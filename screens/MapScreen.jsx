import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker"; // For Camera functionality

import { H2, P } from "../components/text";
import { styles, typography, spacing } from "../styles";
import Button from "../components/buttons/Button";
import BottomSheet from "../components/bottomsheet/BottomSheet";

import { useDispatch, useSelector } from "react-redux";
import { addConveyance } from "../redux/actions/projectAction";

const { height } = Dimensions.get("window");

const MapScreen = ({ route, navigation }) => {
  const {
    from,
    to,
    vehicle_category,
    amount,
    kilometer,
    date: currentDate,
    time,
    fromCoord,
    toCoord,
  } = route.params || {}; // Receive from and to data, including coordinates if passed

  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.staff);

  const [pickupCoord, setPickupCoord] = useState(fromCoord || null); // If fromCoord is passed, use it
  const [dropoffCoord, setDropoffCoord] = useState(toCoord || null); // If toCoord is passed, use it
  const [pickupAddress, setPickupAddress] = useState(from || ""); // Pickup address from ConveyanceBillForm
  const [dropoffAddress, setDropoffAddress] = useState(to || ""); // Dropoff address from ConveyanceBillForm
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null); // Store captured image

  // UseEffect for geolocation (only if the coordinates aren't already passed)
  useEffect(() => {
    if (fromCoord && toCoord) {
      // If coordinates are passed directly from ConveyanceBillForm, no need to fetch again
      setLoading(false);
    } else if (from && to) {
      // Only perform geocoding if coordinates are not passed, using addresses
      (async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission Denied", "Allow location access to proceed.");
            return;
          }

          // Convert from/to addresses into coordinates if coordinates aren't passed
          const pickupResults = await Location.geocodeAsync(from);
          const dropoffResults = await Location.geocodeAsync(to);

          if (!pickupResults.length || !dropoffResults.length) {
            Alert.alert("Error", "Could not get coordinates from address.");
            return;
          }

          const fromCoord = pickupResults[0];
          const toCoord = dropoffResults[0];

          setPickupCoord(fromCoord);
          setDropoffCoord(toCoord);
          setPickupAddress(from);
          setDropoffAddress(to);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching geocodes:", error);
          Alert.alert("Error", "Failed to load map data.");
        }
      })();
    }
  }, [from, to, fromCoord, toCoord]);

  // Function to handle photo taking
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take photos.");
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setCapturedImage(result.uri); // Save the captured image URI
    }
  };

  // Handle the end of the trip and submit the data
  const handleEndTrip = () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found. Please log in again.");
      return;
    }

    const conveyanceData = {
      from: pickupAddress,
      to: dropoffAddress,
      vehicle_category,
      amount: parseFloat(amount.toFixed(2)),
      kilometer: Math.round(parseFloat(kilometer)),
      time,
      user_id: userId,
      image: capturedImage, // Include the image
    };

    dispatch(addConveyance(conveyanceData))
      .then((success) => {
        if (success) {
          navigation.navigate("conveyanceManagement", conveyanceData);
        } else {
          Alert.alert("Submission Failed", "Trip submission failed.");
        }
      })
      .catch((err) => {
        console.error("Error in dispatch:", err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading || !pickupCoord || !dropoffCoord ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 100 }}
        />
      ) : (
        <MapView
          style={{ width: "100%", height: height * 0.5 }}
          initialRegion={{
            latitude: (pickupCoord.latitude + dropoffCoord.latitude) / 2,
            longitude: (pickupCoord.longitude + dropoffCoord.longitude) / 2,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
          mapType="standard"
        >
          <Marker coordinate={pickupCoord} title="Pickup" pinColor="green">
            <Ionicons name="location-sharp" size={26} color="green" />
          </Marker>

          <Marker coordinate={dropoffCoord} title="Dropoff" pinColor="red">
            <Ionicons name="location-sharp" size={26} color="red" />
          </Marker>

          <Polyline
            coordinates={[pickupCoord, dropoffCoord]}
            strokeColor="black"
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        </MapView>
      )}

      <BottomSheet>
        <View style={[spacing.p2]}>
          <P
            style={[
              typography.font16,
              typography.fontLato,
              typography.textBold,
              spacing.mb3,
              spacing.pl4,
              { textAlign: "left" },
            ]}
          >
            Ride Details
          </P>

          {/* Ride details and other information */}
          <View
            style={[
              spacing.mb2,
              spacing.br2,
              spacing.p2,
              { backgroundColor: "#f9f9f9" },
            ]}
          >
            <View style={[styles.row]}>
              <View style={[spacing.mr2, { flex: 1 }]}>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                    { color: "#2E8B57" },
                  ]}
                >
                  <Ionicons name="pin-sharp" size={16} color="#2E8B57" /> Pickup
                </P>
                <P style={[typography.font12, spacing.mt1]}>
                  {pickupAddress || "Not provided"}
                </P>
              </View>

              <View style={{ flex: 1 }}>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                    { color: "#B22222" },
                  ]}
                >
                  <Ionicons name="location-sharp" size={16} color="red" /> Dropoff
                </P>
                <P style={[typography.font12, spacing.mt1]}>
                  {dropoffAddress || "Not provided"}
                </P>
              </View>
            </View>
          </View>

          {/* Distance and Date */}
          <View
            style={[
              styles.row,
              spacing.p2,
              spacing.br1,
              { backgroundColor: "#f0f0f0" },
            ]}
          >
            <P style={[typography.font14, typography.fontLato]}>
              {vehicle_category || "Not provided"}
            </P>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
              ]}
            >
              ₹ {amount || "Not provided"}
            </P>
          </View>

          <View
            style={[
              styles.row,
              spacing.p2,
              spacing.br2,
              spacing.mt2,
              { backgroundColor: "#f0f0f0" },
            ]}
          >
            <View style={[spacing.mr2, { flex: 1 }]}>
              <P style={[typography.font12, typography.fontLato]}>Distance</P>
              <P style={[typography.font14, spacing.mt1]}>
                {kilometer || "Not provided"} km
              </P>
            </View>

            <View style={{ flex: 1 }}>
              <P style={[typography.font12, typography.fontLato]}>Date</P>
              <P style={[typography.font14, spacing.mt1]}>
                {currentDate || "Not provided"}
              </P>
            </View>
          </View>

          <View
            style={[
              spacing.p3,
              { backgroundColor: "#f9f9f9", alignItems: "center" },
            ]}
          >
            <P
              style={[typography.font12, typography.fontLato, typography.textBold]}
            >
              <Ionicons name="time-sharp" size={16} color="black" /> Time
            </P>
            <P style={[typography.font12, typography.fontLato]}>
              {time || "Not provided"}
            </P>
          </View>

          {/* Camera Button */}
          <Button
            style={[
              styles.btn,
              styles.bgSecondary,
              { justifyContent: "center", width: "100%" },
            ]}
            onPress={takePhoto} // Handle taking a photo
          >
            <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
              Take Photo
            </H2>
          </Button>

          {/* Submit Button */}
          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", width: "100%", top: 50 },
            ]}
            onPress={handleEndTrip}
          >
            <H2
              style={[styles.btnText, styles.textLarge, typography.textLight]}
            >
              End Trip
            </H2>
          </Button>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;
