import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import {
  LIGHT,
  PRIMARY_COLOR_TRANSPARENT,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { H2, H5, P, H6 } from "../components/text";
import Button from "../components/buttons/Button";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

const ConveyanceBillForm = ({ navigation, route }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [isSelectingPickup, setIsSelectingPickup] = useState(false);
  const [region, setRegion] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);

  const isFocused = useIsFocused();

  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused && route.params) {
      const { pickupAddress, dropoffAddress } = route.params;

      if (pickupAddress) {
        setCurrentLocation(pickupAddress);
      }
      if (dropoffAddress) {
        setDropLocation(dropoffAddress);
      }
    }
  }, [isFocused, route.params]);

  // const fetchAddress = async (latitude, longitude) => {
  //   try {
  //     let [address] = await Location.reverseGeocodeAsync({
  //       latitude,
  //       longitude,
  //     });
  //     const formattedAddress = ` ${address.city}`;
  //     setCurrentLocation(formattedAddress);
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //     setCurrentLocation("Address not found");
  //   }
  // };

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
  //     fetchAddress(latitude, longitude);
  //   })();
  // }, []);

  return (
    <ContainerComponent>
      <MyHeader title={t("Conveyance Bill")} hasIcon={true} isBack={true} />

      <View
        style={[
          spacing.p4,
          spacing.br2,
          spacing.m3,
          {
            width: SCREEN_WIDTH - 32,
            backgroundColor: PRIMARY_COLOR_TRANSPARENT,
            borderWidth: 0.3,
            borderColor: "gray",
            elevation: 2,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <View
            style={[
              spacing.mr3,
              spacing.br2,
              {
                width: 8,
                height: 8,
                backgroundColor: "green",
              },
            ]}
          />

          {isEditing ? (
            <TextInput
              placeholder="Pickup Location"
              value={currentLocation}
              onChangeText={(text) => setCurrentLocation(text)}
              autoFocus={true}
              onBlur={() => setIsEditing(false)}
              style={[
                typography.font14,
                typography.fontLato,
                spacing.pv1,
                {
                  flex: 1,
                },
              ]}
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text
                style={[
                  typography.font16,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mr2,
                ]}
              >
                {currentLocation ? currentLocation : "Your Current Location"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            height: 1,
            borderStyle: "dotted",
            borderWidth: 0.5,
            borderColor: "#999",
            marginLeft: 20,
            marginBottom: 8,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons
            name="location-sharp"
            size={16}
            color="red"
            style={{ marginRight: 12 }}
          />

          <TextInput
            placeholder="Enter drop location"
            value={dropLocation}
            onChangeText={(text) => setDropLocation(text)}
            style={[
              typography.font16,
              typography.fontLato,
              spacing.pv1,
              {
                color: "gray",
                borderBottomWidth: 1,
                borderColor: "#ccc",
                flex: 1,
              },
            ]}
          />
        </View>
      </View>
      <TouchableOpacity
        // onPress={() => setIsSelectingPickup(true)}
        onPress={() => navigation.navigate("locationSet")}
        style={[
          styles.row,
          spacing.br2,
          // spacing.bw1,
          spacing.p2,
          {
            marginRight: 185,
            alignItems: "center",
            borderWidth: 0.4,
            borderColor: "gray",
          },
        ]}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="red"
          style={{ marginRight: 8 }}
        />
        <P style={[typography.font14, typography.fontLato]}>Select on Map</P>
      </TouchableOpacity>
      {/* Explore Section */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 16,
          marginTop: 16,
          width: SCREEN_WIDTH - 32,
        }}
      >
        <H5
          style={[
            typography.font14,
            typography.textBold,
            typography.fontLato,
            spacing.p2,
            spacing.br2,
          ]}
        >
          Mode Of Transport
        </H5>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity
          style={[
            // spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: LIGHT,
              elevation: 3,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Image Icon */}
            <Image
              source={require("../assets/image.png")}
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

            {/* Text Info */}
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                Hanuman Mandir - Patna Zoo
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                15Km (approx)
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
            ₹120
          </H5>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("transportCamera")}
          style={[
            // spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: LIGHT,
              elevation: 3,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="car-outline" size={40} color="#e9c46a" /> */}
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
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                Hanuman Mandir - Patna Zoo
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                15Km (appx)
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
            ₹350
          </H6>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("transportCamera")}
          style={[
            // spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: LIGHT,
              elevation: 3,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="bicycle-outline" size={40} color="#f4a261" /> */}
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
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                Hanuman Mandir - patna zoo
              </P>
              <P style={[typography.font12, typography.fontLato]}>
                15Km (appx)
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
            ₹220
          </H6>
        </TouchableOpacity>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", top: 80 },
          ]}
          // onPress={onSubmit}
        >
          <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
            {"Book"}
          </H2>
        </Button>
      </View>
    </ContainerComponent>
  );
};

export default ConveyanceBillForm;
