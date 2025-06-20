// PreviewScreen.js

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import moment from "moment";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import { styles, typography, spacing, PRIMARY_COLOR, LIGHT } from "../styles";
import { P, H6, Span, H5 } from "../components/text";
import { useDispatch, useSelector } from "react-redux";
import { addBill } from "../redux/actions/projectAction"; // Adjust the import based on your action
import { getBillById } from "../redux/actions/projectAction";

const PreviewScreen = ({ route, navigation }) => {
  const { submittedData } = route.params;
  const { staff } = useSelector((state) => state);
  const { allowedExpense } = useSelector((state) => state.project);
  const { id: userId } = useSelector((state) => state.staff);

  const dispatch = useDispatch();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmitToProduction = async () => {
    try {
      const processedData = {
        ...submittedData,

        ticketEntries: (submittedData.ticketEntries || []).map((entry) => ({
          ...entry,
          tickets_provided_by_company:
            (entry.tickets_provided_by_company || "")
              .toString()
              .toLowerCase() === "yes"
              ? 1
              : 0,
          date_of_journey:
            entry.date_of_journey && !isNaN(new Date(entry.date_of_journey))
              ? new Date(entry.date_of_journey).toISOString().split("T")[0]
              : null,
        })),

        guestHouseEntries: (submittedData.guestHouseEntries || []).map(
          (entry) => ({
            ...entry,
            guest_house_available:
              (entry.guest_house_available || "").toString().toLowerCase() ===
              "yes"
                ? 1
                : 0,
            breakfast_included:
              (entry.breakfast_included || "").toString().toLowerCase() ===
              "yes"
                ? 1
                : 0,
            certificate_by_district_incharge:
              (entry.certificate_by_district_incharge || "")
                .toString()
                .toLowerCase() === "yes"
                ? 1
                : 0,
            check_in_date:
              entry.check_in_date && !isNaN(new Date(entry.check_in_date))
                ? new Date(entry.check_in_date).toISOString().split("T")[0]
                : null,
            check_out_date:
              entry.check_out_date && !isNaN(new Date(entry.check_out_date))
                ? new Date(entry.check_out_date).toISOString().split("T")[0]
                : null,
          })
        ),
      };

      console.log("Sending bill data:", processedData);

      const success = await dispatch(addBill(processedData));

      if (success === true) {
        Alert.alert("Success", "Bill submitted successfully!");
        await dispatch(getBillById(userId));
        navigation.navigate("travelManagement");
      } else {
        Alert.alert("Error", "Failed to submit the bill. Please try again.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred: " + (error?.message || "Unknown error")
      );
    }
  };

  return (
    <ContainerComponent>
      <MyHeader title={"Traveling Bill"} hasIcon={true} isBack={true} />
      <ScrollView
        style={{ backgroundColor: LIGHT }}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[styles.row]}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{
              height: 110,
              width: 210,
              resizeMode: "contain",
              bottom: 15,
              right: 40,
            }}
          />

          <View>
            <H6
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
              ]}
            >
              SUGS LLOYD LIMITED
            </H6>
            <P style={[typography.font12, typography.fontLato]}>
              NOIDA, UTTAR PRADESH
            </P>
            <Span style={[typography.font10, typography.fontLato]}>
              TRAVELLING BILL
            </Span>

            <View
              style={[
                spacing.ph2,
                spacing.br1,
                spacing.pv1,
                spacing.mt1,
                {
                  borderWidth: 0.3,
                  borderColor: "#000",
                  alignSelf: "flex-start",
                },
              ]}
            >
              <H6
                style={[
                  typography.font12,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                Date: {moment().format("DD-MM-YYYY")}
              </H6>
            </View>
          </View>
        </View>
        <H6
          style={[
            typography.font12,
            typography.fontLato,
            typography.textBold,
            { bottom: 14 },
          ]}
        >
          Name: {`${staff.firstName} ${staff.lastName}`} |{" "}
          <P style={[typography.font12, typography.fontLato]}>
            {allowedExpense?.user_category
              ? `You fall under ${allowedExpense.user_category} category`
              : "You fall under -- category"}
          </P>
        </H6>

        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#000",
            bottom: 8,
          }}
        />

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 16, flex: 1 }}>
              {submittedData.visiting_to}
            </Text>

            <Text style={{ fontSize: 16, flex: 2, textAlign: "right" }}>
              {moment(submittedData.date_of_departure).format("DD-MM-YYYY")} To{" "}
              {moment(submittedData.date_of_return).format("DD-MM-YYYY")}
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

          {submittedData.ticketEntries.map((entry, index) => {
            return (
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
                {/* First Row: Company-Paid, Mode, Amount */}
                <View style={{ flexDirection: "row" }}>
                  <H5
                    style={[
                      typography.font12,
                      {
                        flex: 1,
                        padding: 8,
                        borderRightWidth: 1,
                        borderColor: "#ccc",
                      },
                    ]}
                  >
                    Company-Paid: {entry.tickets_provided_by_company || "N/A"}
                  </H5>

                  <Text
                    style={{
                      flex: 1,
                      fontSize: 12,
                      padding: 8,
                      borderRightWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    Mode: {entry.mode_of_transport || "N/A"}
                  </Text>

                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      padding: 8,
                    }}
                  >
                    Amount: {entry.amount || "0"}
                  </Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: "#ccc" }} />

                {/* Second Row: From - To, Journey Date */}
                <View style={{ flexDirection: "row" }}>
                  <P
                    style={[
                      typography.font14,
                      typography.fontLato,
                      {
                        flex: 2,
                        padding: 8,
                        borderRightWidth: 1,
                        borderColor: "#ccc",
                      },
                    ]}
                  >
                    {entry.from || "-"} To {entry.to || "-"}
                  </P>

                  <Text
                    style={{
                      flex: 2,
                      fontSize: 14,
                      padding: 8,
                    }}
                  >
                    Journey Date:{" "}
                    {entry.date_of_journey
                      ? moment(entry.date_of_journey).format("DD-MM-YYYY")
                      : "N/A"}
                  </Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: "#ccc" }} />

                {/* Third Row: PNR Number */}
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      padding: 8,
                      color: "#000",
                    }}
                  >
                    PNR Number: {entry.pnr_number || "N/A"}
                  </Text>
                </View>

                {/* Third Row: Uploaded Ticket File */}
                {entry.ticket?.name && (
                  <Text
                    style={{
                      color: "green",
                      fontSize: 14,
                      marginLeft: 8,
                      marginBottom: 6,
                      marginTop: 4,
                      borderTopWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    Uploaded Ticket: {entry.ticket.name}
                  </Text>
                )}
              </View>
            );
          })}

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

          {submittedData.guestHouseEntries.map((entry, index) => {
            const guestHouseAvailable = String(
              entry.guest_house_available || ""
            )
              .trim()
              .toLowerCase();

            const isGuestHouseYes = guestHouseAvailable === "yes";

            return (
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
                {/* Top Row: Availability and Dates */}
                <View style={{ flexDirection: "row" }}>
                  <Span
                    style={[
                      typography.font14,
                      typography.fontLato,
                      spacing.p2,
                      {
                        flex: 1,
                        borderRightWidth: 1,
                        borderColor: "#ccc",
                      },
                    ]}
                  >
                    Guest House Availability:{" "}
                    {entry.guest_house_available || "N/A"}
                  </Span>

                  <P
                    style={[
                      typography.font14,
                      spacing.p2,
                      {
                        flex: 2,
                      },
                    ]}
                  >
                    {entry.check_in_date
                      ? moment(entry.check_in_date).format("DD-MM-YYYY")
                      : "N/A"}{" "}
                    to{" "}
                    {entry.check_out_date
                      ? moment(entry.check_out_date).format("DD-MM-YYYY")
                      : "N/A"}
                  </P>
                </View>

                <View style={{ height: 1, backgroundColor: "#ccc" }} />

                {/* Second Row: Meals and Amount */}
                <View style={{ flexDirection: "row" }}>
                  <P
                    style={[
                      typography.font14,
                      spacing.p2,
                      {
                        flex: 2,
                        borderRightWidth: 1,
                        borderColor: "#ccc",
                      },
                    ]}
                  >
                    With Meals:{" "}
                    {isGuestHouseYes ? "-" : entry.breakfast_included || "N/A"}
                  </P>

                  <Text
                    style={{
                      flex: 2,
                      fontSize: 14,
                      padding: 8,
                      borderRightWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    Amount:{" "}
                    {isGuestHouseYes
                      ? `₹${entry.final_amount_for_yes || "0.00"}`
                      : entry.amount
                      ? `₹${entry.amount}`
                      : "N/A"}
                  </Text>
                </View>

                {/* Optional Details */}
                {!isGuestHouseYes &&
                  entry.certificate_by_district_incharge?.name && (
                    <Text
                      style={{
                        color: "green",
                        fontSize: 14,
                        marginLeft: 8,
                        marginTop: 4,
                        borderTopWidth: 1,
                        borderColor: "#ccc",
                      }}
                    >
                      Occupancy Certificate:{" "}
                      {entry.certificate_by_district_incharge.name}
                    </Text>
                  )}

                {!isGuestHouseYes && entry.hotel_bill?.name && (
                  <Text
                    style={{
                      color: "green",
                      fontSize: 14,
                      marginLeft: 8,
                      marginBottom: 6,
                      marginTop: 4,
                      borderTopWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    Hotel Bill: {entry.hotel_bill.name}
                  </Text>
                )}

                {!isGuestHouseYes && entry.bill_number && (
                  <Text
                    style={{
                      color: "green",
                      fontSize: 14,
                      marginLeft: 8,
                      marginBottom: 6,
                      marginTop: 4,
                      borderTopWidth: 1,
                      borderColor: "#ccc",
                    }}
                  >
                    Bill Number: {entry.bill_number}
                  </Text>
                )}
              </View>
            );
          })}

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
                  {entry.date_of_expense
                    ? moment(entry.date_of_expense).format("DD-MM-YYYY")
                    : "N/A"}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            {/* Back Button */}
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "#6c757d",
                borderRadius: 8,
                alignItems: "center",
                flex: 1,
                marginRight: 10,
              }}
              onPress={handleBack}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit</Text>
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
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default PreviewScreen;
