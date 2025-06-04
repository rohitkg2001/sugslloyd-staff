import { useEffect, useState } from "react";
import { View, Dimensions, ActivityIndicator, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";
//import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

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
    image,
    date: currentDate,
    time,
  } = route.params || {};

  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: userId } = useSelector((state) => state.staff);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to proceed.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      setLoading(false);
    })();
  }, []);

  const handleEndTrip = () => {
    if (!userId) {
      Alert.alert("Error", "User ID not found. Please log in again.");
      return;
    }

    const conveyanceData = {
      from,
      to,
      vehicle_category,
      amount: parseFloat(amount.toFixed(2)),
      kilometer: Math.round(parseFloat(kilometer)),
      time,
      user_id: userId,
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
      {loading || !from || !to ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 100 }}
        />
      ) : (
        <MapView
          style={{ width: "100%", height: height * 0.5 }}
          initialRegion={{
            latitude: (from.latitude + to.latitude) / 2,
            longitude: (from.longitude + to.longitude) / 2,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          mapType="standard"
        >
          {/* Pickup Marker */}
          <Marker coordinate={from} title="Pickup" pinColor="green" />

          {/* Dropoff Marker */}
          <Marker coordinate={to} title="Dropoff" pinColor="red" />

          {/* Route Directions */}
          {/* <MapViewDirections
            origin={from}
            destination={to}
            apikey="AIzaSyA5JDAMBbrSLpX8YO__G8Br9d-Sh1camko"
            strokeWidth={3}
            strokeColor="blue"
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min`);
            }}
            onError={(errorMessage) => {
              console.error("MapViewDirections error: ", errorMessage);
            }}
          /> */}
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
                  {from || "Not provided"}
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
                  {to || "Not provided"}
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
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#333",
              borderStyle: "dotted",
              width: "100%",
            }}
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
