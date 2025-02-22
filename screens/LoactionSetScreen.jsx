import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/buttons/Button";
import { styles, typography } from "../styles";
import { H2 } from "../components/text";

const LocationSetScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to proceed.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setPickupLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setPickupAddress(address);
    })();
  }, []);

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      let [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      return `${result.city}`;
    } catch (error) {
      console.error(error);
      return "Address not found";
    }
  };

  const handleSelectLocation = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (!pickupLocation) {
      setPickupLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setPickupAddress(address);
    } else if (!dropoffLocation) {
      setDropoffLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setDropoffAddress(address);
    } else {
      Alert.alert("Locations Set", "Both Pickup and Drop-off are selected.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "green", padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Ionicons name="location-outline" size={20} color="red" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            Pickup: {pickupAddress || "Not selected"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="flag-outline" size={20} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            Drop: {dropoffAddress || "Not selected"}
          </Text>
        </View>
      </View>
      {region && (
        <MapView
          style={{ flex: 1 }}
          region={region}
          onPress={handleSelectLocation}
        >
          {pickupLocation && (
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              pinColor="#00FF00"
            />
          )}
          {dropoffLocation && (
            <Marker
              coordinate={dropoffLocation}
              title="Drop-off Location"
              pinColor="#FF0000"
            />
          )}
          {pickupLocation && dropoffLocation && (
            <Polyline
              coordinates={[pickupLocation, dropoffLocation]}
              strokeColor="black"
              strokeWidth={2}
              lineDashPattern={[5, 5]}
            />
          )}
        </MapView>
      )}

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", marginHorizontal: 2 },
        ]}
        onPress={() =>
          navigation.navigate("conveyanceBillForm", {
            pickupLocation,
            dropoffLocation,
            pickupAddress,
            dropoffAddress,
          })
        }
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {"Confirm Location"}
        </H2>
      </Button>
    </View>
  );
};

export default LocationSetScreen;
