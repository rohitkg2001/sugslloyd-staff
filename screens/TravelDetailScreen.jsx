import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { SCREEN_WIDTH, styles, typography } from "../styles";
import Button from "../components/buttons/Button";
import { H2 } from "../components/text";

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
    <ContainerComponent
      style={{
        width: SCREEN_WIDTH - 32,
        alignSelf: "center",
      }}
    >
      <MyHeader title={"Travel Details"} hasIcon={true} isBack={true} />
      <ScrollView>
        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15,
          }}
        >
          <DetailItem label="Journey Date" value={startDate} />
          <DetailItem label="Return Date" value={returnDate} />
          <DetailItem label="From" value={formData.city} />
          <DetailItem label="To" value={formData.destinationCity} />
          <DetailItem label="Transport Mode" value={formData.type} />

          <DetailItem
            label="PNR Numbers (Start)"
            value={formData.pnrNumbersStart?.join(", ") || "N/A"}
          />
          <DetailItem
            label="PNR Numbers (Return)"
            value={formData.pnrNumbersReturn?.join(", ") || "N/A"}
          />
          <DetailItem label="Categories" value={formData.categories} />
          <DetailItem label="Descriptions" value={formData.descriptions} />
          <DetailItem label="Amount" value={`₹ ${formData.totalAmount}`} />
        </View>

        {formData.ticket?.name && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
              width: "100%",
            }}
          >
            <DetailItem label="Ticket Uploaded" value={formData.ticket.name} />
          </View>
        )}

        {formData.hotelBill?.name && (
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 3 },
              elevation: 3,
              width: "100%",
            }}
          >
            <DetailItem
              label="Hotel Bill Uploaded"
              value={formData.hotelBill.name}
            />
          </View>
        )}
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

const DetailItem = ({ label, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      width: "100%",
      paddingHorizontal: 0,
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#666", flex: 1 }}>
      {label}:
    </Text>
    <Text style={{ fontSize: 16, color: "#333", flex: 1, textAlign: "right" }}>
      {value || "N/A"}
    </Text>
  </View>
);

export default TravelDetailScreen;
