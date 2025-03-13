// import { View, ScrollView, Alert } from "react-native";
// import MyHeader from "../components/header/MyHeader";
// import ContainerComponent from "../components/ContainerComponent";
// import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
// import { H2, H5, P } from "../components/text";
// import Button from "../components/buttons/Button";

// export default function TravelDetailScreen() {
//   return (
//     <ContainerComponent>
//       <MyHeader title={"Booking Summary"} hasIcon={true} isBack={true} />
//       <ScrollView>
//         <View style={[{ width: SCREEN_WIDTH - 16 }]}>
//           <View
//             style={[
//               styles.row,
//               spacing.bbw05,
//               spacing.p2,
//               {
//                 alignItems: "center",
//               },
//             ]}
//           >
//             <View style={{ alignItems: "center" }}>
//               <P style={[typography.font10]}>From</P>
//               <H5
//                 style={[
//                   typography.font18,
//                   typography.textBold,
//                   typography.fontLato,
//                 ]}
//               >
//                 Delhi
//               </H5>
//             </View>
//             <H5 style={{ fontSize: 24 }}>⇄</H5>
//             <View style={{ alignItems: "center" }}>
//               <P style={[typography.font10]}>To</P>
//               <H5
//                 style={[
//                   typography.font18,
//                   typography.textBold,
//                   typography.fontLato,
//                 ]}
//               >
//                 Patna
//               </H5>
//             </View>
//           </View>
//           <View style={[styles.row, spacing.pv2]}>
//             <H5
//               style={[
//                 typography.font14,
//                 // typography.textBold,
//                 typography.fontLato,
//                 { textAlign: "left" },
//               ]}
//             >
//               Pickup Date
//             </H5>
//             <P
//               style={[
//                 typography.font14,
//                 typography.fontLato,
//                 { textAlign: "right" },
//               ]}
//             >
//               12 Feb 2024 - 10:00
//             </P>
//           </View>
//           <View style={[styles.row, spacing.pv2, spacing.bbw05]}>
//             <H5
//               style={[
//                 typography.font14,
//                 //  typography.textBold,
//                 typography.fontLato,

//                 { textAlign: "left" },
//               ]}
//             >
//               Return Date
//             </H5>
//             <P
//               style={[
//                 typography.font14,
//                 typography.fontLato,
//                 { textAlign: "right" },
//               ]}
//             >
//               14 Feb 2024 - 10:00
//             </P>
//           </View>
//           <H5
//             style={[
//               typography.font20,
//               typography.textBold,
//               typography.fontLato,
//               spacing.pv5,
//               {
//                 textAlign: "left",
//               },
//             ]}
//           >
//             Price Details
//           </H5>
//           <View style={[styles.row, spacing.pv2]}>
//             <H5
//               style={[
//                 typography.font14,
//                 typography.textBold,
//                 typography.fontLato,
//                 { textAlign: "left" },
//               ]}
//             >
//               Trip Price
//             </H5>
//             <P
//               style={[
//                 typography.font14,
//                 typography.fontLato,
//                 { textAlign: "right" },
//               ]}
//             >
//               ₹ 230
//             </P>
//           </View>
//           <View style={[styles.row, spacing.pv2]}>
//             <H5
//               style={[
//                 typography.font14,
//                 typography.textBold,
//                 typography.fontLato,
//                 { textAlign: "left" },
//               ]}
//             >
//               Duration
//             </H5>
//             <P
//               style={[
//                 typography.font14,
//                 typography.fontLato,
//                 { textAlign: "right" },
//               ]}
//             >
//               2 days
//             </P>
//           </View>
//           <View style={[styles.row, spacing.pv2]}>
//             <H5
//               style={[
//                 typography.font20,
//                 typography.textBold,
//                 typography.fontLato,
//                 { textAlign: "left" },
//               ]}
//             >
//               Total
//             </H5>
//             <P
//               style={[
//                 typography.font18,
//                 typography.fontLato,
//                 typography.textBold,
//                 { textAlign: "right", color: "red" },
//               ]}
//             >
//               ₹ 230.00
//             </P>
//           </View>
//           import {Alert} from "react-native";
//           <Button
//             style={[
//               styles.btn,
//               styles.bgPrimary,
//               { justifyContent: "center", top: 295 },
//             ]}
//             onPress={() => {
//               Alert.alert(
//                 "Submission Successful",
//                 "Your form has been submitted successfully!",
//                 [{ text: "OK", onPress: () => console.log("OK Pressed") }]
//               );
//             }}
//           >
//             <H2
//               style={[styles.btnText, styles.textLarge, typography.textLight]}
//             >
//               {"Submit"}
//             </H2>
//           </Button>
//         </View>
//       </ScrollView>
//     </ContainerComponent>
//   );
// }

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
        </View>

        {/* PNR Numbers (Start) */}
        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15,

            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#444",
              marginBottom: 5,
            }}
          >
            PNR Numbers (Start)
          </Text>
          {pnrNumbersStart.length > 0 ? (
            pnrNumbersStart.map((pnr, index) => (
              <Text
                key={index}
                style={{ fontSize: 16, color: "#555", marginLeft: 10 }}
              >
                • {typeof pnr === "string" ? pnr.trim() : "Invalid PNR"}
              </Text>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: "#888", fontStyle: "italic" }}>
              No PNR Numbers
            </Text>
          )}
        </View>

        {/* PNR Numbers (Return) */}
        <View
          style={{
            backgroundColor: "#FFF",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#444",
              marginBottom: 5,
            }}
          >
            PNR Numbers (Return)
          </Text>
          {pnrNumbersReturn.length > 0 ? (
            pnrNumbersReturn.map((pnr, index) => (
              <Text
                key={index}
                style={{ fontSize: 16, color: "#555", marginLeft: 10 }}
              >
                • {typeof pnr === "string" ? pnr.trim() : "Invalid PNR"}
              </Text>
            ))
          ) : (
            <Text style={{ fontSize: 16, color: "#888", fontStyle: "italic" }}>
              No PNR Numbers
            </Text>
          )}
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
