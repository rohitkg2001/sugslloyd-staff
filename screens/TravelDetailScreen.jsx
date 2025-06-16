import { View, ScrollView, Text, Image } from "react-native";
import ContainerComponent from "../components/ContainerComponent";
import { PRIMARY_COLOR } from "../styles";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

export default function TravelDetailScreen() {
  const route = useRoute();
  const { billPayload, staff = {} } = route.params || {};

  const { firstName, lastName } = useSelector((state) => state.staff);

  if (!billPayload) {
    return (
      <ContainerComponent>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No data available.
        </Text>
      </ContainerComponent>
    );
  }

  const {
    visiting_to,
    purpose_of_visit,
    date_of_departure,
    date_of_return,
    outcome_achieved,
    journey = [],
    hotel_expense = [],
    miscellaneous = [],
  } = billPayload;

  const formatDateForDisplay = (date) => {
    if (!date || date === "1970-01-01") {
      return "-";
    }
    return date;
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "N/A";

  const isCompanyPaid = (value) =>
    typeof value === "string" && value.toLowerCase() === "yes";

  return (
    <ContainerComponent>
      <ScrollView style={{ paddingTop: 12 }}>
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

          <View>
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
                top: 12,
                alignSelf: "flex-start",
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

            <Text style={{ fontWeight: "bold", right: 180, bottom: 12 }}>
              {firstName} {lastName}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
          }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, marginRight: 10 }}>{visiting_to}</Text>
          <Text style={{ fontSize: 16, marginLeft: 80 }}>
            {formatDate(date_of_departure)} To {formatDate(date_of_return)}
          </Text>
        </View>

        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Purpose: {purpose_of_visit || "N/A"}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          Outcome: {outcome_achieved || "N/A"}
        </Text>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            marginBottom: 12,
          }}
        />

        {journey.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: PRIMARY_COLOR,
                textAlign: "center",
              }}
            >
              Ticket Details
            </Text>
            {journey.map((entry, index) => {
              const isPaidByCompany = isCompanyPaid(
                entry.tickets_provided_by_company
              );
              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    backgroundColor: "#f9f9f9",
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
                      Company-paid: {String(entry.tickets_provided_by_company)}
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
                      {isPaidByCompany ? "-" : entry.mode_of_transport}
                    </Text>
                    <Text style={{ flex: 1, fontSize: 16, padding: 8 }}>
                      {isPaidByCompany ? "-" : entry.amount}
                    </Text>
                  </View>
                  <View style={{ height: 1, backgroundColor: "#ccc" }} />
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
                      {isPaidByCompany ? "-" : `${entry.from} To ${entry.to}`}
                    </Text>
                    <Text style={{ flex: 1, fontSize: 16, padding: 8 }}>
                      {isPaidByCompany
                        ? "-"
                        : formatDateForDisplay(entry.date_of_journey)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            marginBottom: 12,
          }}
        />

        {hotel_expense.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: PRIMARY_COLOR,
                    textAlign: "center",
                    marginBottom: 12,
                  }}
                >
                  Stay Details
                </Text>

                {hotel_expense.map((entry, index) => {
                  // Convert guest_house_available (1/0) to Yes/No
                  const guestHouseStatus =
                    String(entry.guest_house_available) === "1" ? "Yes" : "No";

                  const isGuestHouseYes = guestHouseStatus === "Yes";

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
                          {/* ✅ Replaced raw value with Yes/No */}
                          Hotel: {guestHouseStatus}
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: 16,
                            padding: 8,
                          }}
                        >
                          {formatDate(entry.check_in_date)} to{" "}
                          {formatDate(entry.check_out_date)}
                        </Text>
                      </View>

                      {/* Divider */}
                      <View style={{ height: 1, backgroundColor: "#ccc" }} />

                      {/* Second Row: Meals and Amount */}
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
                          {isGuestHouseYes ? "-" : entry.breakfast_included}
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: 14,
                            padding: 8,
                            borderRightWidth: 1,
                            borderColor: "#ccc",
                          }}
                        >
                          Dining Cost:{" "}
                          {isGuestHouseYes ? "-" : entry.dining_cost}
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: 14,
                            padding: 8,
                          }}
                        >
                          Amount: {isGuestHouseYes ? "-" : entry.amount}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            marginBottom: 12,
          }}
        />

        {miscellaneous.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: PRIMARY_COLOR,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              Miscellaneous Expenses
            </Text>
            {miscellaneous.map((entry, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  backgroundColor: "#f9f9f9",
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
                    ₹{entry.amount}
                  </Text>
                  <Text
                    style={{
                      flex: 1.5,
                      fontSize: 16,
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    {formatDate(entry.date_of_expense)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ContainerComponent>
  );
}
