import React, { useEffect, useState } from "react";
import { View, Dimensions, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

import { H2, P } from "../components/text";
import { styles, typography, spacing } from "../styles";
import Button from "../components/buttons/Button";
import BottomSheet from "../components/bottomsheet/BottomSheet";

import { useDispatch } from "react-redux";
import { addConveyance } from "../redux/actions/projectAction";

const { height } = Dimensions.get("window");

const MapScreen = ({ route, navigation }) => {
  const {
    vehicle_category,
    price,
    kilometer,
    photos,
    date: currentDate,
    time,
  } = route.params || {};

  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickupCoord, setPickupCoord] = useState(null);
  const [dropoffCoord, setDropoffCoord] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const addressData = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addressData.length > 0) {
        const { city } = addressData[0];
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
      setLocation(loc.coords);

      const { latitude, longitude } = loc.coords;

      // Set pickup coordinates
      const fromCoord = { latitude, longitude };
      setPickupCoord(fromCoord);

      // Set dropoff coordinates a small offset away
      const toCoord = {
        latitude: latitude + 0.01,
        longitude: longitude + 0.01,
      };
      setDropoffCoord(toCoord);

      // Get addresses
      const fromAddr = await getAddressFromCoords(latitude, longitude);
      const toAddr = await getAddressFromCoords(
        toCoord.latitude,
        toCoord.longitude
      );
      setPickupAddress(fromAddr);
      setDropoffAddress(toAddr);

      setLoading(false);
    })();
  }, []);

  const handleEndTrip = () => {
    const conveyanceData = {
      from: pickupAddress,
      to: dropoffAddress,
      vehicle_category,
      price,
      kilometer: Math.round(parseFloat(kilometer)),
      created_at: currentDate,
      time,
      user_id: 11,
    };

    console.log("Submitting conveyance data:", conveyanceData);

    dispatch(addConveyance(conveyanceData))
      .then((success) => {
        if (success) {
          console.log("Trip Ended Successfully");
          navigation.navigate("conveyanceManagement", conveyanceData);
        } else {
          console.error("Trip submission failed.");
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
                  <Ionicons name="location-sharp" size={16} color="red" />{" "}
                  Dropoff
                </P>
                <P style={[typography.font12, spacing.mt1]}>
                  {dropoffAddress || "Not provided"}
                </P>
              </View>
            </View>
          </View>

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
              ₹ {price || "Not provided"}
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
                {kilometer || "Not provided"}
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
              {
                backgroundColor: "#f9f9f9",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <P
              style={[
                typography.font12,
                typography.fontLato,
                typography.textBold,
              ]}
            >
              <Ionicons name="time-sharp" size={16} color="black" /> Time
            </P>
            <P style={[typography.font12, typography.fontLato]}>
              {time || "Not provided"}
            </P>
          </View>

          <View
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: "#333",
                borderStyle: "dotted",
                width: "100%",
              },
            ]}
          />

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
