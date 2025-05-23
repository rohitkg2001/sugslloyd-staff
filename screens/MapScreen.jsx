import React, { useEffect, useState } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

import { H2, P } from "../components/text";
import { styles, typography, spacing } from "../styles";
import Button from "../components/buttons/Button";
import BottomSheet from "../components/bottomsheet/BottomSheet";

const { height } = Dimensions.get("window");

const MapScreen = ({ route, navigation }) => {
  const {
    dropoffAddress,
    pickupAddress,
    transportType,
    price,
    distance,
    photos,
    date,
    time,
  } = route.params || {};

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
    })();
  }, []);

  const pickupCoord = {
    latitude: pickupAddress?.latitude || location?.latitude,
    longitude: pickupAddress?.longitude || location?.longitude,
  };

  const dropoffCoord = {
    latitude: dropoffAddress?.latitude || location?.latitude + 0.01,
    longitude: dropoffAddress?.longitude || location?.longitude + 0.01,
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
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
          onMapReady={() => setLoading(false)}
        >
          {/* Marker for Pickup Location */}
          <Marker coordinate={pickupCoord} title="Pickup" pinColor="green">
            <Ionicons name="location-sharp" size={26} color="green" />
          </Marker>

          {/* Marker for Dropoff Location */}
          <Marker coordinate={dropoffCoord} title="Dropoff" pinColor="red">
            <Ionicons name="location-sharp" size={26} color="red" />
          </Marker>

          {/* Optional: Current Location Marker */}
          <Marker coordinate={location} title="You" pinColor="blue">
            <Ionicons name="location-sharp" size={26} color="blue" />
          </Marker>

          {/* Polyline from pickup to dropoff */}
          <Polyline
            coordinates={[pickupCoord, dropoffCoord]}
            strokeColor="black"
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        </MapView>
      )}

      {/* BottomSheet with all ride details */}
      <BottomSheet>
        <View style={[spacing.p2]}>
          <P
            style={[
              typography.font16,
              typography.fontLato,
              typography.textBold,
              spacing.mb3,
              spacing.pl4,
              {
                textAlign: "left",
              },
            ]}
          >
            Ride Details
          </P>

          {/* Pickup & Dropoff Location */}
          <View
            style={[
              spacing.mb2,
              spacing.br2,
              spacing.p2,
              {
                backgroundColor: "#f9f9f9",
              },
            ]}
          >
            <View style={[styles.row]}>
              {/* Pickup */}
              <View style={[spacing.mr2, { flex: 1 }]}>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                    { color: "#2E8B57" },
                  ]}
                >
                  <Ionicons name="pin-sharp" size={16} color="#2E8B57" />
                  Pickup
                </P>
                <P style={[typography.font12, spacing.mt1]}>
                  {pickupAddress || "Not provided"}
                </P>
              </View>

              {/* Dropoff */}
              <View style={{ flex: 1 }}>
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    typography.textBold,
                    { color: "#B22222" },
                  ]}
                >
                  <Ionicons name="location-sharp" size={16} color="red" />
                  Dropoff
                </P>
                <P style={[typography.font12, spacing.mt1]}>
                  {dropoffAddress || "Not provided"}
                </P>
              </View>
            </View>
          </View>

          {/* Transport Type & Price */}
          <View
            style={[
              styles.row,
              spacing.p2,
              spacing.br1,
              {
                backgroundColor: "#f0f0f0",
              },
            ]}
          >
            <P style={[typography.font14, typography.fontLato]}>
              {transportType || "Not provided"}
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
              {
                backgroundColor: "#f0f0f0",
              },
            ]}
          >
            {/* Distance */}
            <View style={[spacing.mr2, { flex: 1 }]}>
              <P
                style={[
                  typography.font12,
                  typography.fontLato,
                  // typography.textBold,
                ]}
              >
                Distance
              </P>
              <P style={[typography.font14, spacing.mt1]}>
                {distance || "Not provided"}
              </P>
            </View>

            {/* Date */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font12,
                  typography.fontLato,
                  // typography.textBold,
                ]}
              >
                Date
              </P>
              <P style={[typography.font14, spacing.mt1]}>
                {date || "Not provided"}
              </P>
            </View>
          </View>

          {/* Time */}

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
          {/* Dotted line */}
          <View
            style={[
              {
                borderBottomWidth: 1,
                borderBottomColor: "#333",
                borderStyle: "dotted",
                width: "100%",
                // marginTop: 10,
              },
            ]}
          />

          <Button
            style={[
              styles.btn,
              styles.bgPrimary,
              { justifyContent: "center", width: "100%", top: 50 },
            ]}
            onPress={() =>
              navigation.navigate("conveyanceManagement", {
                pickupAddress,
                dropoffAddress,
                transportType,
                price,
                distance,
                date,
                time,
                photos: photos?.map((photo) =>
                  typeof photo === "string" ? photo : photo.uri
                ),
              })
            }
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
