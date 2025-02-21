import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
        <H5
          style={[
            typography.font14,
            typography.textBold,
            typography.fontLato,
            spacing.p2,
            spacing.br2,
            {
              backgroundColor: LIGHT,
            },
          ]}
        >
          Mode Of Transport
        </H5>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <TouchableOpacity
          style={[
            spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: LIGHT,
              elevation: 2,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="car-sport-outline" size={40} color="#f4a261" />
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
              <H6 style={[typography.font14, typography.fontLato]}>
                Hanuman Mandir - patna zoo
              </H6>
              <P style={[typography.font14, typography.fontLato]}>
                15Km (appx)
              </P>
            </View>
          </View>
          <H5
            style={[
              typography.font16,
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
            spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: LIGHT,
              elevation: 2,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="car-outline" size={40} color="#e9c46a" />
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
              <H6 style={[typography.font14, typography.fontLato]}>
                Hanuman Mandir - Patna Zoo
              </H6>
              <P style={[typography.font14, typography.fontLato]}>
                15Km (appx)
              </P>
            </View>
          </View>
          <H6
            style={[
              typography.font16,
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
            spacing.bw05,
            spacing.br2,
            {
              padding: 12,
              marginBottom: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: LIGHT,
              elevation: 2,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="bicycle-outline" size={40} color="#f4a261" />
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
              <H6 style={[typography.font14, typography.fontLato]}>
                Hanuman Mandir - patna zoo
              </H6>
              <P style={[typography.font14, typography.fontLato]}>
                15Km (appx)
              </P>
            </View>
          </View>
          <H6
            style={[
              typography.font16,
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
