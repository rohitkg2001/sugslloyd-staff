import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { useTranslation } from "react-i18next";
import {
  PRIMARY_COLOR_TRANSPARENT,
  SCREEN_WIDTH,
  spacing,
  styles,
  typography,
} from "../styles";
import { H2, P } from "../components/text";
import Button from "../components/buttons/Button";

const ConveyanceBillForm = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const { t } = useTranslation();

  return (
    <ContainerComponent>
      <MyHeader title={t("Conveyance Bill")} hasIcon={true} isBack={true} />

      <View
        style={[
          spacing.p4,
          spacing.br3,
          spacing.bw1,
          spacing.m3,
          {
            width: SCREEN_WIDTH - 32,
            backgroundColor: PRIMARY_COLOR_TRANSPARENT,
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
        style={[
          styles.row,
          spacing.br2,
          spacing.bw1,
          spacing.p2,
          {
            marginRight: 200,
            alignItems: "center",
          },
        ]}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="red"
          style={{ marginRight: 8 }}
        />
        <P style={[typography.font16, typography.fontLato]}>Select Map</P>
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
        <Text style={[typography.font16, typography.textBold]}>
          Mode Of Transport
        </Text>
      </View>

      {/* <View style={{ flexDirection: "row", marginRight: 24, top: 12 }}>
        <TouchableOpacity
          style={{ alignItems: "center", marginRight: 16 }}
          onPress={() => navigation.navigate("rideSelection")}
        >
          <View
            style={{
              backgroundColor: "#e0e0e0",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="car-sport-outline" size={40} color="#2a9d8f" />
          </View>
          <Text
            style={[typography.font14, typography.textBold, { marginTop: 8 }]}
          >
            Public transport
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: "center", marginRight: 16 }}>
          <View
            style={{
              backgroundColor: "#e0e0e0",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="car-outline" size={40} color="#e9c46a" />
          </View>
          <Text
            style={[typography.font14, typography.textBold, { marginTop: 8 }]}
          >
            Car
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          // onPress={() => navigation.navigate("rideSelection")}
        >
          <View
            style={{
              backgroundColor: "#e0e0e0",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Ionicons name="bicycle-outline" size={40} color="#e76f51" />
          </View>
          <Text
            style={[typography.font14, typography.textBold, { marginTop: 8 }]}
          >
            Bike
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#264653",
            borderRadius: 10,
            padding: 12,
            marginBottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="car-sport-outline" size={40} color="#f4a261" />
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Public transport
                </Text>
                <Ionicons
                  name="person-outline"
                  size={16}
                  style={{ marginLeft: 5 }}
                />
                <Text
                  style={{
                    backgroundColor: "#d8f3dc",
                    color: "#2d6a4f",
                    fontSize: 12,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                    marginLeft: 8,
                  }}
                >
                  FASTEST
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>
                Quick Bike rides
              </Text>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>
                15Km (appx)
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>₹220</Text>
        </TouchableOpacity>

        <Button
          style={[
            styles.btn,
            styles.bgPrimary,
            { justifyContent: "center", top: 280 },
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
