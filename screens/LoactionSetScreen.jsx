import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { styles, typography } from "../styles";
import { H2 } from "../components/text";

const LocationSetScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [distance, setDistance] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert("Permission Denied", "Allow location access to proceed.");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     const { latitude, longitude } = location.coords;
  //     setRegion({
  //       latitude,
  //       longitude,
  //       latitudeDelta: 0.05,
  //       longitudeDelta: 0.05,
  //     });
  //     setPickupLocation({ latitude, longitude });
  //     const address = await getAddressFromCoords(latitude, longitude);
  //     setPickupAddress(address);
  //   })();
  // }, []);

  // const getAddressFromCoords = async (latitude, longitude) => {
  //   try {
  //     let [result] = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude,
  //     });
  //     return `${result.city}`;
  //   } catch (error) {
  //     console.error(error);
  //     return "Address not found";
  //   }
  // };

  // const handleSelectLocation = async (event) => {
  //   const { latitude, longitude } = event.nativeEvent.coordinate;

  //   if (!pickupLocation) {
  //     setPickupLocation({ latitude, longitude });
  //     const address = await getAddressFromCoords(latitude, longitude);
  //     setPickupAddress(address);
  //     console.log("Pickup Location Set:", { latitude, longitude });
  //     console.log("Pickup Address:", address);
  //   } else {
  //     setDropoffLocation({ latitude, longitude });
  //     const address = await getAddressFromCoords(latitude, longitude);
  //     setDropoffAddress(address);
  //     console.log("Drop-off Location Set:", { latitude, longitude });
  //     console.log("Drop-off Address:", address);
  //   }
  // };

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

  const haversineDistance = (coords1, coords2) => {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km

    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2); // Distance in km
  };

  const handleSelectLocation = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    if (!pickupLocation) {
      setPickupLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setPickupAddress(address);
    } else {
      setDropoffLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setDropoffAddress(address);
      const calculatedDistance = haversineDistance(pickupLocation, {
        latitude,
        longitude,
      });
      setDistance(calculatedDistance);
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
          <Icon name="location-outline" size={20} color="red" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            Pickup: {pickupAddress || "Not selected"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="flag-outline" size={20} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            Drop: {dropoffAddress || "Not selected"}
          </Text>
        </View>

        {distance && (
          <Text style={{ color: "white", fontSize: 16, marginTop: 5 }}>
            Distance: {distance} km
          </Text>
        )}
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

      {/* <Button
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
      </Button> */}

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", marginHorizontal: 2 },
        ]}
        onPress={() => {
          navigation.navigate("conveyanceBillForm", {
            pickupLocation: pickupAddress,
            dropoffLocation: dropoffAddress,
            distance,
          });
        }}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {"Confirm Location"}
        </H2>
      </Button>
    </View>
  );
};

export default LocationSetScreen;
