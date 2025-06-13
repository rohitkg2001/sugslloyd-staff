// PreviewScreen.js

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import {
  styles,
  typography,
  spacing,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
} from "../styles";
import { P, H6, Span, H5 } from "../components/text";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addBill } from "../redux/actions/projectAction"; // Adjust the import based on your action file

const PreviewScreen = ({ route, navigation }) => {
  const { submittedData } = route.params;
  const { staff } = useSelector((state) => state);

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmitToProduction = async () => {
    try {
      const success = await dispatch(addBill(submittedData));
      if (success) {
        Alert.alert("Success", "Bill submitted successfully!");
        // navigation.navigate("travelManagement");
        navigation.navigate("travelManagement", {
          newSubmittedData: submittedData,
        });
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred: " + (error.message || "Unknown error")
      );
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Traveling Bill"} hasIcon={true} isBack={true} />
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{
              height: 110,
              width: 190,
              resizeMode: "contain",
              bottom: 15,
              right: 20,
            }}
          />

          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              SUGS LLOYD LIMITED
            </Text>
            <Text>NOIDA, UTTAR PRADESH</Text>
            <Text>TRAVELLING BILL</Text>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#000",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
                // marginTop: 8,
                alignSelf: "flex-start",
                top: 12,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Date:{" "}
                {new Date()
                  .toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replaceAll("/", "|") + "|"}
              </Text>
            </View>

            <Text style={{ fontWeight: "bold", right: 180 }}>
              Name: {`${staff.firstName} ${staff.lastName}`}
            </Text>
          </View>
        </View>

        {/* Thin line */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            //bottom: 4,
            top: 20,
          }}
        />
        <H6
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            { color: PRIMARY_COLOR, textAlign: "center" },
          ]}
        >
          {/* Basic info */}
        </H6>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16, flex: 1 }}>
              {submittedData.visiting_to}
            </Text>
            <Text style={{ fontSize: 16, flex: 2, textAlign: "right" }}>
              {submittedData.date_of_departure} To{" "}
              {submittedData.date_of_return}
            </Text>
          </View>

          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Purpose: {submittedData.purpose_of_visit}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Outcome: {submittedData.outcome_achieved}
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              top: 4,
            }}
          />
          <H6
            style={[
              typography.font18,
              typography.fontLato,
              typography.textBold,
              { color: PRIMARY_COLOR, textAlign: "center", top: 12 },
            ]}
          >
            Ticket Details
          </H6>
          {/* Display ticket entries */}
          {submittedData.ticketEntries.map((entry, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                padding: 0, // remove padding from parent to let rows handle their own
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 18,
              }}
            >
              {/* First Row: Company-paid, Mode, Amount */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  Company-paid: {entry.tickets_provided_by_company}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  {entry.tickets_provided_by_company.toLowerCase() === "yes"
                    ? "-"
                    : entry.mode_of_transport}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: 8,
                  }}
                >
                  {entry.tickets_provided_by_company.toLowerCase() === "yes"
                    ? "-"
                    : entry.amount}
                </Text>
              </View>

              {/* Horizontal divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: "#ccc",
                }}
              />

              {/* Second Row: From-To and Date */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  {entry.tickets_provided_by_company.toLowerCase() === "yes"
                    ? "-"
                    : `${entry.from} To ${entry.to}`}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: 8,
                  }}
                >
                  {entry.tickets_provided_by_company.toLowerCase() === "yes"
                    ? "-"
                    : entry.date_of_journey}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              top: 10,
            }}
          />
          <H6
            style={[
              typography.font18,
              typography.fontLato,
              typography.textBold,
              { color: PRIMARY_COLOR, textAlign: "center", top: 12 },
            ]}
          >
            Stay Details
          </H6>

          {/* Display guest house entries */}
          {submittedData.guestHouseEntries.map((entry, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                padding: 0,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 20,
              }}
            >
              {/* First Row: Availability and Check-in/out */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  Availability: {entry.guest_house_available}
                </Text>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                  }}
                >
                  {entry.check_in_date} to {entry.check_out_date}
                </Text>
              </View>

              {/* Horizontal divider */}
              <View
                style={{
                  height: 1,
                  backgroundColor: "#ccc",
                }}
              />

              {/* Second Row: Breakfast and Amount */}
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  With Meals:{" "}
                  {entry.guest_house_available?.trim().toLowerCase() === "yes"
                    ? "-"
                    : entry.breakfast_included}
                </Text>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                  }}
                >
                  {" "}
                  {entry.guest_house_available?.trim().toLowerCase() === "yes"
                    ? "-"
                    : entry.amount}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              top: 10,
            }}
          />
          <H6
            style={[
              typography.font18,
              typography.fontLato,
              typography.textBold,
              { color: PRIMARY_COLOR, textAlign: "center", top: 12 },
            ]}
          >
            Miscellaneous Expenses
          </H6>

          {/* Display expense entries */}
          {submittedData.expenseEntries.map((entry, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                padding: 0,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    flex: 2,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  {entry.description}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    padding: 8,
                    borderRightWidth: 1,
                    borderColor: "#ccc",
                    textAlign: "center",
                  }}
                >
                  {entry.amount}
                </Text>
                <Text
                  style={{
                    flex: 1.5,
                    fontSize: 16,
                    padding: 8,
                    textAlign: "center",
                  }}
                >
                  {entry.date_of_expense}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //marginTop: 20,
            bottom: 12,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#6c757d", // Gray color for Back
              borderRadius: 8,
              alignItems: "center",
              flex: 1,
              marginRight: 10,
              marginTop: 15,
            }}
            onPress={handleBack}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: PRIMARY_COLOR,
              borderRadius: 8,
              alignItems: "center",
              flex: 1,
              marginLeft: 10,
              marginTop: 15,
            }}
            onPress={handleSubmitToProduction}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default PreviewScreen;
