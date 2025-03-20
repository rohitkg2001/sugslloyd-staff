import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, styles, typography, spacing, LIGHT } from "../styles";
import Button from "../components/buttons/Button";
import { H2, H5, P, Span } from "../components/text";
import { useSelector } from "react-redux";

const TravelDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const formData = route.params?.formData || {};

  const [showDetails, setShowDetails] = useState(false);

  const { firstName, lastName } = useSelector((state) => state.staff);

  const startDate =
    formData.start_date instanceof Date
      ? formData.start_date.toLocaleDateString()
      : new Date(formData.start_date).toLocaleDateString();

  const returnDate =
    formData.journeyDate instanceof Date
      ? formData.journeyDate.toLocaleDateString()
      : new Date(formData.journeyDate).toLocaleDateString();

  const handleSubmit = () => {
    console.log("Form Submitted", formData);
    navigation.navigate("travelManagement", { travelData: formData });
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Travel Details"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View
          style={[
            spacing.br1,
            spacing.pv5,
            styles.row,
            {
              backgroundColor: "#ced3d2",
              width: SCREEN_WIDTH - 8,
              alignItems: "center",
            },
          ]}
        >
          <View>
            <View style={{ alignItems: "center" }}>
              <H5
                style={[
                  typography.font14,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                {formData.city} - {formData.destinationCity}
              </H5>

              <P
                style={[
                  typography.font14,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                {startDate} - {returnDate}
              </P>
            </View>
          </View>

          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            <Icon
              name={showDetails ? "chevron-up-outline" : "chevron-down-outline"}
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {showDetails && (
          <View
            style={[
              spacing.pv3,
              {
                backgroundColor: LIGHT,
                width: SCREEN_WIDTH - 8,
              },
            ]}
          >
            {/* Add the First Name section */}
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.fontLato,
                    { textTransform: "uppercase", color: "gray" },
                  ]}
                >
                  Name
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {firstName} {lastName}
                </P>
              </View>
            </View>

            {/* Travel Dates */}
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
                  Meetings
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.meetings}
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
                  Department
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.department}
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
                  Employee ID
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.employeeId}
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
                  Visit Approved By
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.visitApprovedBy}
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
                  Objective of the Tour
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.objective}
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
                  Key Meetings/Visits
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.meetings}
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
                Achievements
              </H5>
              <P
                style={[
                  typography.font16,
                  typography.fontLato,
                  spacing.pv1,
                  { textAlign: "right" },
                ]}
              >
                {formData.outcomes}
              </P>
            </View>

            {/* PNR Numbers */}
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

            {/* Categories & Description */}
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

            {/* Transport Mode */}
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

            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.fontLato,
                    { textTransform: "uppercase", color: "gray" },
                  ]}
                >
                  Total KM
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.totalKm}
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
                  Km rate
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.kmRate}
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
                  Rent
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.rent}
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
                  Vehicle No
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.vehicleNo}
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

            {/* Amount */}
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
        )}
      </ScrollView>

      {/* Submit Button */}
      {showDetails && (
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
      )}
    </ContainerComponent>
  );
};

export default TravelDetailScreen;
