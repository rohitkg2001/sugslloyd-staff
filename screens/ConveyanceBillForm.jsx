import React from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles, typography, spacing, LIGHT, SCREEN_WIDTH } from "../styles";
import { H2, P, H5, H6 } from "../components/text";
import Button from "../components/buttons/Button";

const ConveyanceBillForm = ({ navigation }) => {
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
            />
            <Ionicons name="location-outline" size={20} color="red" />
          </View>

          {/* Select on Map Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("locationSet")}
            style={[
              styles.row,
              spacing.br4,
              spacing.p2,

              {
                backgroundColor: LIGHT,
                elevation: 3,
                top: 8,
                marginRight: 180,
              },
            ]}
          >
            <Ionicons name="location-outline" size={20} color="red" />
            <P
              style={[
                typography.font14,
                typography.fontLato,
                spacing.mr3,
                typography.textBold,
              ]}
            >
              Select on Map
            </P>
          </TouchableOpacity>
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
