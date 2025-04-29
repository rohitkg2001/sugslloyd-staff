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
  //  console.log("Form Submitted", formData);
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
              // spacing.pv3,
              spacing.p2,
              spacing.br2,
              {
                // backgroundColor: LIGHT,
                // width: SCREEN_WIDTH - 8,
                backgroundColor: "#e8f8f5",
                elevation: 1,
                top: 10,
              },
            ]}
          >
            {/* Add the First Name section */}
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font12,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Name
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {firstName} {lastName}
                </P>
              </View>
              <View>
                <Span
                  style={[
                    typography.font12,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Employee ID
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.employeeId}
                </P>
              </View>
            </View>
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Department
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.department}
                </P>
              </View>
            </View>
            {/* Travel Dates */}
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  End date
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {returnDate}
                </P>
              </View>
            </View>
            {/* PNR Numbers */}
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Visit Approved By
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.visitApprovedBy}
                </P>
              </View>
              {/* Transport Mode */}
              <View style={[styles.row, { flexDirection: "column" }]}>
                <H5
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Transport Mode
                </H5>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.type}
                </P>
              </View>
            </View>
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Meetings/Visits
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.meetings}
                </P>
              </View>
            </View>

            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  ACHIEVEMENTS
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.outcomes}
                </P>
              </View>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Designation
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.designation}
                </P>
              </View>
            </View>

            {/* Categories & Description */}
            <View style={[spacing.mt1, styles.row, spacing.mv2]}>
              <View>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Descriptions
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.descriptions}
                </P>
              </View>
            </View>

            <View
              style={[
                spacing.mt1,
                styles.row,
                spacing.mv2,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                },
              ]}
            >
              <View style={{ width: "24%" }}>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Total KM
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.totalKm}
                </P>
              </View>

              <View style={{ width: "24%" }}>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Km rate
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.kmRate}
                </P>
              </View>

              <View style={{ width: "24%" }}>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
                  ]}
                >
                  Rent
                </Span>
                <P style={[typography.font12, typography.fontLato]}>
                  {formData.rent}
                </P>
              </View>

              <View style={{ width: "24%" }}>
                <Span
                  style={[
                    typography.font10,
                    typography.textBold,
                    typography.fontLato,
                    { textTransform: "uppercase" },
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
