import React, { useState, useEffect } from "react";
import { View, Dimensions, Alert, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { H2, H5 } from "../components/text";
import { styles, typography } from "../styles";
import Button from "../components/buttons/Button";
import MyHeader from "../components/header/MyHeader";

const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");

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

  const fetchAddress = async (latitude, longitude) => {
    let [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    const formattedAddress = `${address.name},  ${address.city}`;
    setPickupAddress(formattedAddress);
  };

  const handleSelectLocation = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    if (!pickupLocation) {
      setPickupLocation({ latitude, longitude });
      fetchAddress(latitude, longitude);
    } else {
      setDropoffLocation({ latitude, longitude });
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Ionicons name="flag-outline" size={20} color="white" />
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            Drop:{dropoffLocation}
          </Text>
        </View>
      </View>

      {region && (
        <View>
          <MapView
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height * 0.7,
            }}
            initialRegion={region}
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
                strokeColor="#000"
                strokeWidth={3}
                lineDashPattern={[10, 5]}
              />
            )}
          </MapView>

          {/* Speed Indicator Circle */}
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
              style={[
                typography.fontLato,
                typography.font12,
                typography.textBold,
              ]}
            >
              0 Km/h
            </H5>
          </View>
        </View>
      )}
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
          onPress={() => navigation.navigate("conveyanceCalculate")}
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
