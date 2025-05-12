import React, { useState, useEffect } from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../components/buttons/Button";
import { styles, typography } from "../styles";
import { H2 } from "../components/text";

const LocationSetScreen = ({ navigation }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [region, setRegion] = useState({
    latitude: 28.6139,
    longitude: 77.209,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [kilometer, setKilometer] = useState(null);
  const [date, setDate] = useState("");
  const [timees, setTimees] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDate(now.toLocaleDateString());
      setTimees(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Allow location access to proceed.");
          setLoading(false);
          return;
        }

        const location = await Location.getLastKnownPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const { latitude, longitude } = location.coords;

        setFrom({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        getAddressFromCoords(latitude, longitude).then((address) => {
          setPickupAddress(address);
        });
      } catch (error) {
        console.error("Location Error:", error);
        Alert.alert("Error", "Could not fetch location.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const [result] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      return result?.city || "Unknown Location";
    } catch (error) {
      console.error("Reverse Geocoding Error:", error);
      return "Address not found";
    }
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (angle) => (angle * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  const handleSelectLocation = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setTo({ latitude, longitude });
    const address = await getAddressFromCoords(latitude, longitude);
    setDropoffAddress(address);

    if (from) {
      const calculatedDistance = haversineDistance(from, {
        latitude,
        longitude,
      });
      setKilometer(calculatedDistance);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
        <Text style={{ marginTop: 10 }}>Fetching location...</Text>
      </View>
    );
  }

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

        {kilometer && (
          <Text style={{ color: "white", fontSize: 16, marginTop: 5 }}>
            Distance: {kilometer} km
          </Text>
        )}

        <View style={{ position: "absolute", top: 30, right: 22 }}>
          <Text style={{ color: "white", fontSize: 16 }}>Date: {date}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Time: {timees}</Text>
        </View>
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        region={region}
        onPress={handleSelectLocation}
        showsUserLocation={true}
      >
        {from && (
          <Marker
            coordinate={from}
            title="Pickup Location"
            pinColor="#00FF00"
          />
        )}
        {to && (
          <Marker
            coordinate={to}
            title="Drop-off Location"
            pinColor="#FF0000"
          />
        )}
        {from && to && (
          <Polyline
            coordinates={[from, to]}
            strokeColor="black"
            strokeWidth={2}
            lineDashPattern={[5, 5]}
          />
        )}
      </MapView>

      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", marginHorizontal: 2 },
        ]}
        onPress={() => {
          navigation.navigate("conveyanceBillForm", {
            from: pickupAddress,
            to: dropoffAddress,
            kilometer: kilometer,
            date: date,
            time: timees,
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
