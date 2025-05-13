import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

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
      calculateAmount(km);
    } else if (route.params?.from && route.params?.to) {
      getDistance(route.params.from, route.params.to);
    }
  }, [route.params]);

  const calculateAmount = (km) => {
    setAmount({
      car: parseFloat((km * 4).toFixed(2)), // vehicle_category 1
      bike: parseFloat((km * 3).toFixed(2)), // vehicle_category 2
      publicTransport: parseFloat((km * 5).toFixed(2)), // vehicle_category 3
    });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const getDistance = async (origin, destination) => {
    const apiKey = "AIzaSyA5JDAMBbrSLpX8YO__G8Br9d-Sh1camko"; // Distance  key
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

      const element = data.rows[0].elements[0];
      if (element.status !== "OK") {
        showSnackbar(`Element Error: ${element.status}`);
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
              <GooglePlacesAutocomplete
                placeholder="From"
                fetchDetails
                onPress={(data, details = null) => {
                  const address = details.formatted_address;
                  setFrom(address);
                  if (to) getDistance(address, to);
                }}
                query={{
                  key: "AIzaSyA5JDAMBbrSLpX8YO__G8Br9d-Sh1camko",
                  language: "en",
                }}
                styles={{
                  textInput: {
                    backgroundColor: "transparent",
                    fontSize: 16,
                    flex: 1,
                    height: 40,
                  },
                  listView: { backgroundColor: "white" },
                  container: { flex: 1 },
                }}
              />
              {from !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    setFrom("");
                    setKilometer(null);
                    setAmount({ car: 0, bike: 0, publicTransport: 0 });
                  }}
                >
                  <Ionicons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
              <Ionicons name="location-outline" size={20} color="green" />
            </View>

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
              <GooglePlacesAutocomplete
                placeholder="To"
                fetchDetails
                onPress={(data, details = null) => {
                  const address = details.formatted_address;
                  setTo(address);
                  if (from) getDistance(from, address);
                }}
                query={{
                  key: "AIzaSyA5JDAMBbrSLpX8YO__G8Br9d-Sh1camko",
                  language: "en",
                }}
                styles={{
                  textInput: {
                    backgroundColor: "transparent",
                    fontSize: 16,
                    flex: 1,
                    height: 40,
                  },
                  listView: { backgroundColor: "white" },
                  container: { flex: 1 },
                }}
              />
              {to !== "" && (
                <TouchableOpacity
                  onPress={() => {
                    setTo("");
                    setKilometer(null);
                    setAmount({ car: 0, bike: 0, publicTransport: 0 });
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

        {/* <View>
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
                amount: amount.car,
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
              ₹{amount.car}
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

              setVehicleCategoryId(vehicleCategoryMap.bike);
              navigation.navigate("transportCamera", {
                vehicle_category: vehicleCategoryMap.bike,
                from,
                to,
                amount: amount.bike,
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
              ₹{amount.bike}
            </H6>
          </TouchableOpacity>
        </View> */}

        {/* public transport  */}

        {/* <TouchableOpacity
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
            ₹{amount.publicTransport}
          </H5>
        </TouchableOpacity> */}

        <View>
          {/* Car Option */}
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
                amount: amount.car,
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
                  {from} - {to}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer} km
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
            onPress={() => {
              if (!from || !to) {
                showSnackbar(
                  "Please select both Pickup and Drop locations before proceeding."
                );
                return;
              }
              setVehicleCategoryId(vehicleCategoryMap.bike);
              navigation.navigate("transportCamera", {
                vehicle_category: vehicleCategoryMap.bike,
                from,
                to,
                amount: amount.bike,
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
                  {from} - {to}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer} km
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
                  {from} - {to}
                </P>
                <P
                  style={[
                    typography.font10,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  {kilometer} km
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
      </ScrollView>
    </ContainerComponent>
  );
};

export default ConveyanceBillForm;
