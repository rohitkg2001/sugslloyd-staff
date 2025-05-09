import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { styles, typography, spacing, LIGHT, SCREEN_WIDTH } from "../styles";
import { P, H5, H6 } from "../components/text";
import MyHeader from "../components/header/MyHeader";
import ContainerComponent from "../components/ContainerComponent";

const ConveyanceBillForm = ({ navigation, route }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [kilometer, setKilometer] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [time, setTime] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [vehicleCategoryId, setVehicleCategoryId] = useState(null);

  const [prices, setPrices] = useState({
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
    if (type === "pickup") {
      navigation.navigate("locationSet", { type: "pickup" });
    } else if (type === "drop") {
      navigation.navigate("locationSet", { type: "drop" });
    }
  };

  useEffect(() => {
    if (route.params?.from) setFrom(route.params.from);
    if (route.params?.to) setTo(route.params.to);
    if (route.params?.date) setCurrentDate(route.params.date);
    if (route.params?.time) setTime(route.params.time);

    const km = route.params?.kilometer;
    if (km) {
      setKilometer(km);
      calculatePrices(km);
    } else if (route.params?.from && route.params?.to) {
      getDistance(route.params.from, route.params.to);
    }
  }, [route.params]);

  const calculatePrices = (km) => {
    setPrices({
      car: parseFloat((km * 4).toFixed(2)),
      bike: parseFloat((km * 3).toFixed(2)),
      publicTransport: parseFloat((km * 5).toFixed(2)),
    });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };
  const getDistance = async (origin, destination) => {
    const apiKey = "AIzaSyDpTpJ1GNGLpVZKViexBvQtHIbSQRBX6to"; // Make sure it's valid
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("Distance API Response:", JSON.stringify(data, null, 2)); // <-- Add this

      if (data.status !== "OK") {
        showSnackbar(`API Error: ${data.status}`);
        return;
      }

      const element = data.rows[0].elements[0];
      if (element.status !== "OK") {
        showSnackbar(`Element Error: ${element.status}`);
        return;
      }

      const km = element.distance.value / 1000;
      setKilometer(km.toFixed(2));
      calculatePrices(km);
    } catch (error) {
      console.error("Distance fetch error:", error);
      showSnackbar("Error fetching distance.");
    }
  };

  useEffect(() => {
    if (from && to) {
      getDistance(from, to);
    }
  }, [from, to]);

  return (
    <ContainerComponent>
      <MyHeader title="Drop" hasIcon={true} isBack={true} />
      <ScrollView style={[spacing.p2, { width: SCREEN_WIDTH }]}>
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
                { width: 10, height: 10, backgroundColor: "#FFA500" },
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
            <View
              style={[
                styles.row,
                spacing.br5,
                spacing.ph3,
                spacing.pv2,
                spacing.mb2,
                {
                  alignItems: "center",
                  backgroundColor: "#F8F8F8",
                  borderWidth: 1,
                  borderColor: "#ccc",
                },
              ]}
            >
              <TextInput
                placeholder="From"
                placeholderTextColor="#aaa"
                style={[typography.font16, typography.fontLato, { flex: 1 }]}
                value={from}
                // onChangeText={(text) => setFrom(text)}
                onChangeText={(text) => {
                  setFrom(text);
                  if (text && to) {
                    getDistance(text, to);
                  }
                }}
              />
              {from !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    setFrom("");
                    setKilometer(null);
                    setPrices({ car: 0, bike: 0, publicTransport: 0 });
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
              <Ionicons name="location-outline" size={20} color="black" />
            </View>

            <View
              style={[
                styles.row,
                spacing.br5,
                spacing.ph3,
                spacing.pv2,
                spacing.mb2,
                {
                  alignItems: "center",
                  backgroundColor: "#F8F8F8",
                  borderWidth: 1,
                  borderColor: "#ccc",
                },
              ]}
            >
              <TextInput
                placeholder="To"
                placeholderTextColor="#aaa"
                style={[typography.font16, typography.fontLato, { flex: 1 }]}
                value={to}
                // onChangeText={(text) => setTo(text)}
                onChangeText={(text) => {
                  setTo(text);
                  if (from && text) {
                    getDistance(from, text);
                  }
                }}
              />
              {to !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    setTo("");
                    setKilometer(null);
                    setPrices({ car: 0, bike: 0, publicTransport: 0 });
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
              <Ionicons name="location-outline" size={20} color="red" />
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
                  {isToSelected
                    ? "Change Drop Location"
                    : "Select Drop Location"}
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
          <TouchableOpacity
            onPress={() => {
              if (!from || !to) {
                showSnackbar(
                  "Please select both From and To locations before proceeding."
                );
                return;
              }
              setVehicleCategoryId(vehicleCategoryMap.car);
              navigation.navigate("transportCamera", {
                vehicle_category: vehicleCategoryMap.car,
                from,
                to,
                price: prices.car,
                kilometer,
                date: currentDate,
                time,
              });
            }}
            style={[
              styles.row,
              spacing.br2,
              spacing.p3,
              spacing.mb3,
              {
                alignItems: "center",
                backgroundColor: LIGHT,
                elevation: 3,
              },
            ]}
          >
            <View style={[styles.row, { alignItems: "center" }]}>
              <Image
                source={require("../assets/car1.jpeg")}
                style={[
                  spacing.mt2,
                  {
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    alignSelf: "center",
                  },
                ]}
              />
              <View style={[spacing.ml2]}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Car
                </H5>
                <P style={[typography.font12, typography.fontLato]}>
                  {from} - {to}
                </P>
                <P style={[typography.font12, typography.fontLato]}>
                  {kilometer} km
                </P>
              </View>
            </View>
            <H6
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              ₹{prices.car}
            </H6>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (!from || !to) {
                showSnackbar(
                  "Please select both Pickup and Drop locations before proceeding."
                );
                return;
              }
              // navigation.navigate("transportCamera", {
              //   vehicle_category: "Bike",
              //   from,
              //   to,
              //   price: prices.car,
              //   kilometer,
              //   date: currentDate,
              //   time,
              // });
              setVehicleCategoryId(vehicleCategoryMap.bike);
              navigation.navigate("transportCamera", {
                vehicle_category: vehicleCategoryMap.bike,
                from,
                to,
                price: prices.bike,
                kilometer,
                date: currentDate,
                time,
              });
            }}
            style={[
              styles.row,
              spacing.br2,
              spacing.p3,
              spacing.mb3,
              { alignItems: "center", backgroundColor: LIGHT, elevation: 3 },
            ]}
          >
            <View style={[styles.row, { alignItems: "center" }]}>
              <Image
                source={require("../assets/bike.jpg")}
                style={[
                  spacing.mt2,
                  {
                    width: 50,
                    height: 50,
                    resizeMode: "contain",
                    alignSelf: "center",
                  },
                ]}
              />
              <View style={[spacing.ml2]}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Bike
                </H5>
                <P style={[typography.font12, typography.fontLato]}>
                  {from} - {to}
                </P>
                <P style={[typography.font12, typography.fontLato]}>
                  {kilometer} km
                </P>
              </View>
            </View>
            <H6
              style={[
                typography.font14,
                typography.textBold,
                typography.fontLato,
              ]}
            >
              ₹{prices.bike}
            </H6>
          </TouchableOpacity>
        </View>

        {/* public transport  */}

        <TouchableOpacity
          style={[
            styles.row,
            spacing.br2,
            spacing.p3,
            spacing.mb3,
            {
              alignItems: "center",
              backgroundColor: LIGHT,
              elevation: 3,
            },
          ]}
        >
          <View style={[styles.row, { alignItems: "center" }]}>
            <Image
              source={require("../assets/image.png")}
              style={[
                {
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                  alignSelf: "center",
                },
              ]}
            />
            <View style={[spacing.ml2]}>
              <View style={[styles.row, { alignItems: "center" }]}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Public transport
                </H5>
              </View>
              <P style={[typography.font12, typography.fontLato]}>
                {from} - {to}
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                {kilometer} km
              </P>
            </View>
          </View>
          <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
            ]}
          >
            ₹{prices.publicTransport}
          </H5>
        </TouchableOpacity>
      </ScrollView>
    </ContainerComponent>
  );
};

export default ConveyanceBillForm;
