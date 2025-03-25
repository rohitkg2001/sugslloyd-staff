import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles, typography, spacing, LIGHT, SCREEN_WIDTH } from "../styles";
import { H2, P, H5, H6 } from "../components/text";
import Button from "../components/buttons/Button";

const ConveyanceBillForm = ({ navigation, route }) => {
  // State for Pickup and Drop Locations
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [distance, setDistance] = useState(null);
  const [prices, setPrices] = useState({
    car: 0,
    bike: 0,
    publicTransport: 0,
  });

  const [isDropLocationSelected, setIsDropLocationSelected] = useState(false); // Track if drop location is selected

  // Function to handle location selection (pickup and drop)
  const handleLocationSelection = (type) => {
    if (type === "pickup") {
      // Navigate to location selection screen for pickup
      navigation.navigate("locationSet", { type: "pickup" });
    } else if (type === "drop") {
      // Navigate to location selection screen for drop
      navigation.navigate("locationSet", { type: "drop" });
    }
  };

  // useEffect(() => {
  //   if (route.params?.pickupLocation) {
  //     setPickupLocation(route.params.pickupLocation);
  //   }
  //   if (route.params?.dropoffLocation) {
  //     setDropLocation(route.params.dropoffLocation);
  //   }
  //   if (route.params?.distance) {
  //     setDistance(route.params.distance); // Store distance value
  //   }
  // }, [route.params]);

  useEffect(() => {
    if (route.params?.pickupLocation)
      setPickupLocation(route.params.pickupLocation);
    if (route.params?.dropoffLocation)
      setDropLocation(route.params.dropoffLocation);
    if (route.params?.distance) {
      setDistance(route.params.distance);
      calculatePrices(route.params.distance);
    }
  }, [route.params]);

  const calculatePrices = (distance) => {
    setPrices({
      car: distance * 10,
      bike: distance * 20,
      publicTransport: distance * 5,
    });
  };

  return (
    <View style={[spacing.p2, { width: SCREEN_WIDTH }]}>
      <P style={[typography.font16, typography.fontLato, spacing.mb3]}>
        Where would you want to Go?
      </P>

      <View
        style={[
          styles.row,
          spacing.pb4,
          spacing.br2,
          spacing.mb3,
          {
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "#ccc",
            backgroundColor: "#fff",
          },
        ]}
      >
        <View style={{ alignItems: "center", width: 20 }}>
          <View
            style={[
              spacing.br1,
              {
                width: 10,
                height: 10,
                backgroundColor: "#FFA500",
              },
            ]}
          />
          <View
            style={[
              {
                width: 2,
                height: 40,
                backgroundColor: "#aaa",
              },
            ]}
          />
          <View
            style={[
              spacing.br1,
              {
                width: 10,
                height: 10,
                backgroundColor: "#000",
              },
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
              placeholder="Pickup Location"
              placeholderTextColor="#aaa"
              style={[typography.font16, typography.fontLato, { flex: 1 }]}
              value={pickupLocation} // Bind value to pickupLocation state
              onChangeText={(text) => setPickupLocation(text)} // Update pickup location
            />
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
              placeholder="Drop Location"
              placeholderTextColor="#aaa"
              style={[typography.font16, typography.fontLato, { flex: 1 }]}
              value={dropLocation} // Bind value to dropLocation state
              onChangeText={(text) => setDropLocation(text)} // Update drop location
            />
            <Ionicons name="location-outline" size={20} color="red" />
          </View>

          {/* Allow the user to select or change the drop location */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
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
                {isDropLocationSelected
                  ? "Change Drop Location"
                  : "Select Drop Location"}
              </P>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <P style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
                Distance:
              </P>
              {distance && (
                <P
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  {distance} km
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
            {
              bottom: 4,
            },
          ]}
        >
          Mode of Transport
        </P>
      </View>

      {/* Transport Options */}
      <View>
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
              <P style={[typography.font14, typography.fontLato]}>
                {/* Hanuman Mandir - Patna Zoo */}
                {pickupLocation}-{dropLocation}
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                {distance} km
              </P>
            </View>
          </View>
          {/* <H5
            style={[
              typography.font14,
              typography.textBold,
              typography.fontLato,
            ]}
          >
            ₹120
          </H5> */}
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

        <TouchableOpacity
          onPress={() => navigation.navigate("transportCamera")}
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
              <View style={[styles.row, { alignItems: "center" }]}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Car
                </H5>
              </View>
              <P style={[typography.font14, typography.fontLato]}>
                {pickupLocation}-{dropLocation}
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                {distance} km
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
          onPress={() => navigation.navigate("transportCamera")}
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
              <View style={[styles.row, { alignItems: "center" }]}>
                <H5
                  style={[
                    typography.font14,
                    typography.textBold,
                    typography.fontLato,
                  ]}
                >
                  Bike
                </H5>
              </View>
              <P style={[typography.font14, typography.fontLato]}>
                {pickupLocation}-{dropLocation}
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                {distance} km
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

      {/* Proceed Button */}
      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", top: 100 },
        ]}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {"Proceed"}
        </H2>
      </Button>
    </View>
  );
};

export default ConveyanceBillForm;
