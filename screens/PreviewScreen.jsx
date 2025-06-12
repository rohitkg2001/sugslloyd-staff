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
import { addBill } from "../redux/actions/projectAction"; // Adjust the import based on your action file

const PreviewScreen = ({ route, navigation }) => {
  const { submittedData } = route.params;
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
    <ContainerComponent style={{ width: SCREEN_WIDTH - 32 }}>
      <MyHeader title={"Traveling Bill"} hasIcon={true} isBack={true} />
      <ScrollView style={{ padding: 16, backgroundColor: "#fff" }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={{
                height: 110,
                width: 140,
                resizeMode: "contain",
                bottom: 15,
                right: 20,
              }}
            />

            <View style={{ marginLeft: 10, bottom: 40 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                SUGS LLOYD LIMITED
              </Text>
              <Text>NOIDA, UTTAR PRADESH</Text>
              <Text>TRAVELLING BILL</Text>
              <Text style={{ fontSize: 14, marginTop: 4 }}>Date: {today}</Text>
            </View>
          </View>

          {/* Thin line */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              bottom: 12,
            }}
          />
        </View>
        <H6
          style={[
            typography.font18,
            typography.fontLato,
            typography.textBold,
            { color: PRIMARY_COLOR, textAlign: "center" },
          ]}
        >
          Basic info
        </H6>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Visiting To: {submittedData.visiting_to}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Purpose of Visit: {submittedData.purpose_of_visit}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Outcome Achieved: {submittedData.outcome_achieved}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Departure Date: {submittedData.date_of_departure}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Return Date: {submittedData.date_of_return}
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
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 18,
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Ticket Provided by Company: {entry.tickets_provided_by_company}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                From: {entry.from}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                To: {entry.to}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Date of Journey: {entry.date_of_journey}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Mode of Transport: {entry.mode_of_transport}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Amount: {entry.amount}
              </Text>
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
            Other Info
          </H6>

          {/* Display guest house entries */}
          {submittedData.guestHouseEntries.map((entry, index) => (
            <View
              key={index}
              style={{
                marginBottom: 16,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 20,
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Guest House Available: {entry.guest_house_available}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Check In Date: {entry.check_in_date}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Check Out Date: {entry.check_out_date}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Breakfast Included: {entry.breakfast_included}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Amount: {entry.amount}
              </Text>
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
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
                top: 20,
              }}
            >
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Description: {entry.description}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Amount: {entry.amount}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>
                Date of Expense: {entry.date_of_expense}
              </Text>
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
