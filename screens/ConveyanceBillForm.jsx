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

const ConveyanceBillForm = () => {
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
      <View
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
        <Text style={[typography.font16, typography.fontLato]}>Select Map</Text>
      </View>
    </ContainerComponent>
  );
};

export default ConveyanceBillForm;
