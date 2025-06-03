import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { styles, typography, spacing, LIGHT, SCREEN_WIDTH } from "../styles";
import { P, H5, H6 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";

const ConveyanceBillForm = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [kilometer, setKilometer] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [time, setTime] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [vehicleCategoryId, setVehicleCategoryId] = useState(null);

  const [amount, setAmount] = useState({
    car: 0,
    bike: 0,
    publicTransport: 0,
  });

  const vehicleCategoryMap = {
    car: 1,
    bike: 2,
    publicTransport: 3,
  };

  const [isToSelected, setIsToSelected] = useState(false);

  const handleLocationSelection = (type) => {
    try {
      if (type === "pickup") {
        navigation.navigate("locationSet", { type: "pickup" });
      } else if (type === "drop") {
        navigation.navigate("locationSet", { type: "drop" });
      }
    } catch (error) {
      console.error("Navigation error:", error);
      showSnackbar("Navigation error occurred");
    }
  };

  useEffect(() => {
    // Add null checks for route and route.params
    if (route && route.params) {
      const params = route.params;

      if (params.from) setFrom(params.from);
      if (params.to) setTo(params.to);
      if (params.date) setCurrentDate(params.date);
      if (params.time) setTime(params.time);

      const km = params.kilometer;
      if (km) {
        setKilometer(km);
        calculateAmount(km);
      } else if (params.from && params.to) {
        getDistance(params.from, params.to);
      }
    }
  }, [route]); // Updated dependency array to use route directly

  const calculateAmount = (km) => {
    if (km && !isNaN(km)) {
      setAmount({
        car: parseFloat((km * 4).toFixed(2)), // vehicle_category 1
        bike: parseFloat((km * 3).toFixed(2)), // vehicle_category 2
        publicTransport: parseFloat((km * 5).toFixed(2)), // vehicle_category 3
      });
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
    // Auto hide snackbar after 3 seconds
    setTimeout(() => {
      setSnackbarVisible(false);
    }, 3000);
  };

  const getDistance = async (origin, destination) => {
    if (!origin || !destination) {
      showSnackbar("Please provide both origin and destination");
      return;
    }

    const apiKey = "AIzaSyA5JDAMBbrSLpX8YO__G8Br9d-Sh1camko"; // Distance key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Distance API Response:", JSON.stringify(data, null, 2));

      if (data.status !== "OK") {
        showSnackbar(`API Error: ${data.status}`);
        return;
      }

      // Add null checks for data structure
      if (
        !data.rows ||
        !data.rows[0] ||
        !data.rows[0].elements ||
        !data.rows[0].elements[0]
      ) {
        showSnackbar("Invalid response from distance API");
        return;
      }

      const element = data.rows[0].elements[0];
      if (element.status !== "OK") {
        showSnackbar(`Element Error: ${element.status}`);
        return;
      }

      if (!element.distance || !element.distance.value) {
        showSnackbar("Distance data not available");
        return;
      }

      const km = element.distance.value / 1000;
      setKilometer(km.toFixed(2));
      calculateAmount(km);
    } catch (error) {
      console.error("Distance fetch error:", error);
      showSnackbar("Error fetching distance.");
    }
  };

  useEffect(() => {
    if (from && to && from.trim() !== "" && to.trim() !== "") {
      getDistance(from, to);
    }
  }, [from, to]);

  const handleTransportNavigation = (vehicleType) => {
    if (!from || !to || from.trim() === "" || to.trim() === "") {
      showSnackbar(
        "Please select both From and To locations before proceeding."
      );
      return;
    }

    if (!kilometer || !amount[vehicleType]) {
      showSnackbar("Please wait for distance calculation to complete.");
      return;
    }

    try {
      setVehicleCategoryId(vehicleCategoryMap[vehicleType]);
      navigation.navigate("transportCamera", {
        vehicle_category: vehicleCategoryMap[vehicleType],
        from,
        to,
        amount: amount[vehicleType],
        kilometer,
        date: currentDate,
        time,
      });
    } catch (error) {
      console.error("Navigation error:", error);
      showSnackbar("Navigation error occurred");
    }
  };

  const clearLocation = (type) => {
    if (type === "from") {
      setFrom("");
    } else if (type === "to") {
      setTo("");
    }
    setKilometer(null);
    setAmount({ car: 0, bike: 0, publicTransport: 0 });
  };

  // Create refs for GooglePlacesAutocomplete to avoid filter errors
  const fromRef = React.createRef();
  const toRef = React.createRef();

  return (
    <ContainerComponent>
      <MyHeader title="Drop" hasIcon={true} isBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[spacing.p2, { width: SCREEN_WIDTH }]}
      >
        <P
          style={[
            typography.font14,
            typography.fontLato,
            spacing.mb3,
            spacing.ml3,
            typography.textBold,
          ]}
        >
          Where would you want to Go?
        </P>

        <View
          style={[
            styles.row,
            spacing.pb4,
            spacing.br2,
            spacing.mb2,
            {
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderColor: "#ccc",
              backgroundColor: "#fff",
              marginTop: -4,
              paddingTop: 8,
            },
          ]}
        >
          <View style={{ alignItems: "center", width: 20, bottom: 25 }}>
            <View
              style={[
                spacing.br1,
                { width: 10, height: 10, backgroundColor: "green" },
              ]}
            />
            <View style={{ width: 2, height: 60, backgroundColor: "#aaa" }} />
            <View
              style={[
                spacing.br1,
                { width: 10, height: 10, backgroundColor: "red" },
              ]}
            />
          </View>

          <View style={{ flex: 1 }}>
            {/* From Location */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F8F8",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginBottom: 10,
              }}
            >
              {/* Using standard TextInput instead of GooglePlacesAutocomplete to avoid filter errors */}
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="green"
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  placeholder="From"
                  value={from}
                  onChangeText={(text) => setFrom(text)}
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontFamily: "Lato-Regular",
                    color: "#000",
                  }}
                  placeholderTextColor="#999"
                />
              </View>

              {from !== "" && (
                <TouchableOpacity onPress={() => clearLocation("from")}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            {/* To Location */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F8F8F8",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginBottom: 10,
              }}
            >
              {/* Using standard TextInput instead of GooglePlacesAutocomplete to avoid filter errors */}
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="red"
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  placeholder="To"
                  value={to}
                  onChangeText={(text) => setTo(text)}
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontFamily: "Lato-Regular",
                    color: "#000",
                  }}
                  placeholderTextColor="#999"
                />
              </View>

              {to !== "" && (
                <TouchableOpacity onPress={() => clearLocation("to")}>
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            <View style={[styles.row, { alignItems: "center" }]}>
              <TouchableOpacity
                onPress={() => handleLocationSelection("drop")}
                style={[
                  styles.row,
                  spacing.br4,
                  spacing.p2,
                  {
                    backgroundColor: LIGHT,
                    elevation: 3,
                    top: 8,
                  },
                ]}
              >
                <Ionicons name="location-outline" size={20} color="red" />
                <P
                  style={[
                    typography.font12,
                    typography.fontLato,
                    spacing.mr3,
                    typography.textBold,
                  ]}
                >
                  {isToSelected ? "Change Drop Location" : " Select Location"}
                </P>
              </TouchableOpacity>

              <View style={[styles.row, { alignItems: "center", top: 12 }]}>
                <P
                  style={[typography.font14, typography.fontLato, spacing.mr1]}
                >
                  Distance:
                </P>
                {kilometer && (
                  <P style={[typography.font12, spacing.ml1, spacing.mr1]}>
                    {kilometer} km
                  </P>
                )}
              </View>
            </View>
          </View>
        </View>

        <View>
          <P
            style={[
              typography.font16,
              typography.fontLato,
              spacing.p1,
              spacing.ml2,
              { bottom: 4 },
            ]}
          >
            Mode of Transport
          </P>
        </View>

        <View>
          {/* Car Option */}
          <TouchableOpacity
            onPress={() => handleTransportNavigation("car")}
            style={[
              styles.row,
              spacing.br2,
              spacing.p3,
              spacing.mb3,
              {
                alignItems: "center",
                backgroundColor: LIGHT,
                elevation: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              },
            ]}
          >
            <View
              style={[
                styles.row,
                { flex: 1, alignItems: "center", flexWrap: "wrap" },
              ]}
            >
              <Image
                source={require("../assets/car1.jpeg")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Car
                </H5>
                <P
                  style={[typography.font10, typography.fontLato]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {from && to ? `${from} - ${to}` : "Select locations"}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer ? `${kilometer} km` : "0 km"}
                </P>
              </View>
            </View>
            <H6
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 10 },
              ]}
            >
              ₹{amount.car}
            </H6>
          </TouchableOpacity>

          {/* Bike Option */}
          <TouchableOpacity
            onPress={() => handleTransportNavigation("bike")}
            style={[
              styles.row,
              spacing.br2,
              spacing.p3,
              spacing.mb3,
              {
                alignItems: "center",
                backgroundColor: LIGHT,
                elevation: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              },
            ]}
          >
            <View
              style={[
                styles.row,
                { flex: 1, alignItems: "center", flexWrap: "wrap" },
              ]}
            >
              <Image
                source={require("../assets/bike.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Bike
                </H5>
                <P
                  style={[typography.font10, typography.fontLato]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {from && to ? `${from} - ${to}` : "Select locations"}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer ? `${kilometer} km` : "0 km"}
                </P>
              </View>
            </View>
            <H6
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 10 },
              ]}
            >
              ₹{amount.bike}
            </H6>
          </TouchableOpacity>

          {/* Public Transport Option */}
          <TouchableOpacity
            onPress={() => handleTransportNavigation("publicTransport")}
            style={[
              styles.row,
              spacing.br2,
              spacing.p3,
              spacing.mb3,
              {
                alignItems: "center",
                backgroundColor: LIGHT,
                elevation: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              },
            ]}
          >
            <View
              style={[
                styles.row,
                { flex: 1, alignItems: "center", flexWrap: "wrap" },
              ]}
            >
              <Image
                source={require("../assets/image.png")}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
              />
              <View style={{ flex: 1 }}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Public transport
                </H5>
                <P
                  style={[typography.font10, typography.fontLato]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {from && to ? `${from} - ${to}` : "Select locations"}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer ? `${kilometer} km` : "0 km"}
                </P>
              </View>
            </View>
            <H5
              style={[
                typography.font12,
                typography.textBold,
                typography.fontLato,
                { marginLeft: 10 },
              ]}
            >
              ₹{amount.publicTransport}
            </H5>
          </TouchableOpacity>
        </View>

        {/* Snackbar */}
        {snackbarVisible && (
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 20,
              right: 20,
              backgroundColor: "#333",
              padding: 15,
              borderRadius: 5,
              zIndex: 1000,
            }}
          >
            <P style={{ color: "white", textAlign: "center" }}>
              {snackbarMessage}
            </P>
          </View>
        )}
      </KeyboardAvoidingView>
    </ContainerComponent>
  );
};

export default ConveyanceBillForm;
