import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, styles, typography, spacing, LIGHT } from "../styles";
import Button from "../components/buttons/Button";
import { H2, H5, P, Span } from "../components/text";

const TravelDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const formData = route.params?.formData || {};

  const startDate =
    formData.start_date instanceof Date
      ? formData.start_date.toLocaleDateString()
      : new Date(formData.start_date).toLocaleDateString();

  const returnDate =
    formData.journeyDate instanceof Date
      ? formData.journeyDate.toLocaleDateString()
      : new Date(formData.journeyDate).toLocaleDateString();

  // Ensure pnrNumbers are always arrays
  const pnrNumbersStart = Array.isArray(formData.pnrNumbersStart)
    ? formData.pnrNumbersStart
    : typeof formData.pnrNumbersStart === "string"
    ? formData.pnrNumbersStart.split(",")
    : [];

  const pnrNumbersReturn = Array.isArray(formData.pnrNumbersReturn)
    ? formData.pnrNumbersReturn
    : typeof formData.pnrNumbersReturn === "string"
    ? formData.pnrNumbersReturn.split(",")
    : [];

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
    // navigation.navigate("travelManagement");
    navigation.navigate("travelManagement", { travelData: formData });
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Travel Details"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View
          style={[
            spacing.pv3,
            {
              backgroundColor: LIGHT,
              width: SCREEN_WIDTH - 8,
            },
          ]}
        >
          <View
            style={[
              styles.row,
              {
                alignItems: "center",
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <P style={[typography.font12, typography.fontLato]}>From</P>
              <Text style={[typography.font16, typography.fontLato]}>
                {formData.city}
              </Text>
            </View>

            <P style={[typography.font20, typography.textBold]}>↔</P>

            <View style={{ alignItems: "center" }}>
              <P style={[typography.font12, typography.fontLato]}>To</P>
              <P style={[typography.font16, typography.fontLato]}>
                {formData.destinationCity}
              </P>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "#000",
              borderBottomWidth: 1,
              marginTop: 10,
              width: "100%",
            }}
          />

          <View style={[spacing.mt1, styles.row, spacing.mv2]}>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                Start date
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {startDate}
              </P>
            </View>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                End date
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {returnDate}
              </P>
            </View>
          </View>

          <View style={[spacing.mt1, styles.row, spacing.mv2]}>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                PNR Numbers (Start)
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {formData.pnrNumbersStart?.join(", ") || "N/A"}
              </P>
            </View>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                PNR Numbers (Return)
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {formData.pnrNumbersReturn?.join(", ") || "N/A"}
              </P>
            </View>
          </View>

          <View style={[spacing.mt1, styles.row, spacing.mv2]}>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                Categories
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {formData.categories}
              </P>
            </View>
            <View>
              <Span
                style={[
                  typography.font10,
                  typography.fontLato,
                  { textTransform: "uppercase", color: "gray" },
                ]}
              >
                Descriptions
              </Span>
              <P style={[typography.font12, typography.fontLato]}>
                {formData.descriptions}
              </P>
            </View>
          </View>

          <View style={[styles.row]}>
            <H5
              style={[
                typography.font14,
                typography.fontLato,
                { textAlign: "left" },
              ]}
            >
              Transport Mode
            </H5>
            <P
              style={[
                typography.font16,
                typography.fontLato,
                spacing.pv1,
                { textAlign: "right" },
              ]}
            >
              {formData.type}
            </P>
          </View>
          <View
            style={{
              borderBottomColor: "#000",
              borderBottomWidth: 1,
              marginTop: 10,
              width: "100%",
            }}
          />
          <View style={[styles.row]}>
            <H5
              style={[
                typography.font18,
                typography.textBold,
                typography.fontLato,
                { textAlign: "left", color: "red" },
              ]}
            >
              Amount
            </H5>
            <P
              style={[
                typography.font18,
                typography.fontLato,
                typography.textBold,
                spacing.pv1,
                { textAlign: "right" },
              ]}
            >
              {`₹ ${formData.totalAmount}`}
            </P>
          </View>
        </View>
      </ScrollView>
      <Button
        style={[
          styles.btn,
          styles.bgPrimary,
          { justifyContent: "center", width: "90%", marginHorizontal: 0 },
        ]}
        onPress={handleSubmit}
      >
        <H2 style={[styles.btnText, styles.textLarge, typography.textLight]}>
          {"Submit"}
        </H2>
      </Button>
    </ContainerComponent>
  );
};

export default TravelDetailScreen;
