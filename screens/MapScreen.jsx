import React, { useState, useEffect } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import { H2, H5 } from "../components/text";
import { styles, typography } from "../styles";
import Button from "../components/buttons/Button";

const MapScreen = ({ navigation }) => {
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
      fetchAddress(latitude, longitude);
    })();
  }, []);

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
      // Select pickup location first
      setPickupLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setPickupAddress(address);
    } else if (!dropoffLocation) {
      // Select drop-off location next
      setDropoffLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setDropoffAddress(address);
    } else {
      // If both are selected, allow changing drop-off on next tap
      setDropoffLocation({ latitude, longitude });
      const address = await getAddressFromCoords(latitude, longitude);
      setDropoffAddress(address);
      // Alert.alert("Drop-off Updated", "Drop-off location has been updated.");
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
      </View>
      {/* {region && (
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
       
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "white",
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          elevation: 2,
        }}
      >
        <H5
          style={[typography.fontLato, typography.font12, typography.textBold]}
        >
          0 Km/h
        </H5>
      </View>
      )} */}
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

      <View
        style={{
          position: "absolute",
          // bottom: 10,
          top: 520,
          left: 20,
          backgroundColor: "white",
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          elevation: 2,
        }}
      >
        <H5
          style={[typography.fontLato, typography.font12, typography.textBold]}
        >
          0 Km/h
        </H5>
      </View>

      <View style={{ padding: 10 }}>
        <H5
          style={[
            typography.fontLato,
            typography.font16,
            typography.textBold,
            {
              textAlign: "center",
            },
          ]}
        >
          8 Min
        </H5>
        <H5
          style={[
            typography.fontLato,
            typography.font16,
            typography.textBold,
            {
              textAlign: "center",
            },
          ]}
        >
          800m - 5:37 PM
        </H5>
        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", marginHorizontal: 2 },
          ]}
          onPress={() => navigation.navigate("conveyanceManagement")}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"End Trip"}
          </H2>
        </Button>
      </View>
    </View>
  );
};

export default MapScreen;
