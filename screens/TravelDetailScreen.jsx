import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { useSelector } from "react-redux";
import { SCREEN_WIDTH, spacing, styles, typography } from "../styles";
import { P, H5 } from "../components/text";

const TravelDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { billPayload } = route.params;
  const { travelfare = [], dailyfare = [], ...tada } = billPayload || {};
  const { firstName, lastName } = useSelector((state) => state.staff);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  const handleSubmit = () => {
    navigation.navigate("travelManagement", {
      travelData: route.params?.formData || {},
    });
  };

  const fare = travelfare[0] || {};
  const dailyFare = dailyfare[0] || {};

  return (
    <ContainerComponent>
      <MyHeader title="TRAVELLING BILL" hasIcon={true} isBack={true} />
      <ScrollView style={[{ width: SCREEN_WIDTH - 16 }]}>
        {/* Main TADA Info */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            {firstName} {lastName}
          </Text>

          <View
            style={{
              backgroundColor: "#f0f0f0",
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 8,
            }}
          >
            <P style={[typography.font14, typography.fontLato]}>
              {formatDate(tada.start_journey)}
            </P>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
          }}
        />

        <View
          style={[
            styles.row,
            {
              // paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            },
          ]}
        >
          <P
            style={[
              typography.font12,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Journey To:
          </P>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              {
                right: 40,
              },
            ]}
          >
            {tada.from_city} to {tada.to_city}
          </P>
        </View>

        <View
          style={[
            styles.row,
            {
              paddingVertical: 4,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            },
          ]}
        >
          <P
            style={[
              typography.font12,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Visit Purpose:
          </P>
          <P
            style={[
              typography.font14,
              typography.fontLato,
              {
                right: 140,
              },
            ]}
          >
            {tada.meeting_visit}
          </P>
        </View>

        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 12,
              backgroundColor: "#fff",
              paddingVertical: 6,
            },
          ]}
        >
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              Start Date
            </Text>
            <Text style={{ fontSize: 14 }}>
              {formatDate(tada.start_journey)}
            </Text>
          </View>

          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              End Date
            </Text>
            <Text style={{ fontSize: 14 }}>{formatDate(tada.end_journey)}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Transport</Text>
            <Text style={{ fontSize: 14 }}>{tada.transport}</Text>
          </View>
        </View>

        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 12,
              backgroundColor: "#fff",
              paddingVertical: 6,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              Start Pnr
            </Text>
            <Text style={{ fontSize: 14 }}>{tada.start_journey_pnr}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              End Pnr
            </Text>
            <Text style={{ fontSize: 14 }}>{tada.end_journey_pnr}</Text>
          </View>
        </View>

        <View
          style={[
            styles.row,
            {
              paddingHorizontal: 12,
              backgroundColor: "#fff",
              paddingVertical: 6,
            },
          ]}
        >
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              Vehicle No
            </Text>
            <Text style={{ fontSize: 14 }}>{tada.vehicle_no}</Text>
          </View>

          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text
              style={{
                fontSize: 12,
                color: "gray",
                textTransform: "uppercase",
              }}
            >
              Rate per KM
            </Text>
            <Text style={{ fontSize: 14 }}>{tada.rate_per_km}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: "gray" }}>Total KM</Text>
            <Text style={{ fontSize: 14 }}>{tada.total_km}</Text>
          </View>
        </View>

        <View
          style={[
            styles.row,
            {
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            },
          ]}
        >
          <P
            style={[
              typography.font12,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Objective of Tour:
          </P>
          <P style={[typography.font14, typography.fontLato]}>
            {tada.objective_tour}
          </P>
        </View>
        <View
          style={[
            styles.row,
            {
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            },
          ]}
        >
          <P
            style={[
              typography.font12,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Outcome Achieved:
          </P>
          <P style={[typography.font14, typography.fontLato]}>
            {tada.outcome_achieve}
          </P>
        </View>
        <View
          style={[
            styles.row,
            {
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: "#fff",
            },
          ]}
        >
          <P
            style={[
              typography.font12,
              typography.fontLato,
              typography.textBold,
            ]}
          >
            Description Category:
          </P>
          <P style={[typography.font14, typography.fontLato]}>
            {tada.description_category}
          </P>
        </View>

        <View>
          <View
            style={[
              styles.row,
              {
                paddingVertical: 6,
                paddingHorizontal: 12,
                backgroundColor: "#fff",
              },
            ]}
          >
            <P
              style={[
                typography.font12,
                typography.fontLato,
                typography.textBold,
              ]}
            >
              Other Expense:
            </P>
            <P style={[typography.font14, typography.fontLato]}>
              {tada.otherexpense ? JSON.stringify(tada.otherexpense) : "N/A"}
            </P>
          </View>

          <View
            style={{
              height: 2,
              backgroundColor: "#ccc",
            }}
          />
        </View>

        {/* Travel Fare Section */}

        <View style={[spacing.mt2]}>
          <View style={[spacing.ph2, { alignSelf: "flex-start" }]}>
            <H5 style={[typography.font14, typography.textBold]}>
              Travel Fare Details *
            </H5>

            <View
              style={{
                height: 1,
                backgroundColor: "#ccc",
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10, backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            {/* From */}
            <View style={{ flex: 1 }}>
              <P style={[typography.font12]}>From</P>
              <P>{fare.from}</P>
            </View>

            {/* To */}
            <View style={{ flex: 1 }}>
              <P style={[typography.font12]}>To</P>
              <P>{fare.to}</P>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />

          <View
            style={[
              styles.row,
              {
                paddingVertical: 4,
                paddingHorizontal: 8,
              },
            ]}
          >
            {/* Departure */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Departure
              </P>
              <P style={{ fontSize: 12, color: "#555" }}>
                <Text style={{ fontWeight: "600" }}>Date: </Text>
                {formatDate(fare.departure_date) || "N/A"}
              </P>
              <Text style={{ fontSize: 12, color: "#555" }}>
                <Text style={{ fontWeight: "600" }}>Time: </Text>
                {fare.departure_time || "N/A"}
              </Text>
            </View>

            {/* Arrival */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Arrival
              </P>
              <Text style={{ fontSize: 12, color: "#555" }}>
                <Text style={{ fontWeight: "600" }}>Date: </Text>
                {formatDate(fare.arrival_date) || "N/A"}
              </Text>
              <Text style={{ fontSize: 12, color: "#555" }}>
                <Text style={{ fontWeight: "600" }}>Time: </Text>
                {fare.arrival_time || "N/A"}
              </Text>
            </View>

            {/* Mode of Travel */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Mode
              </P>
              <Text style={{ fontSize: 12, color: "#555" }}>
                {fare.modeoftravel || "N/A"}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            {/* Vehicle No */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                Vehicle No
              </P>
              <P>{fare.add_vehicle_no || "N/A"}</P>
            </View>

            {/* Total KM */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                Total KM
              </P>
              <P>{fare.add_total_km || "N/A"}</P>
            </View>

            {/* Rate per KM */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                Rate per KM
              </P>
              <P>{fare.add_rate_per_km || "N/A"}</P>
            </View>

            {/* Rent */}
            <View style={{ flex: 1, left: 12 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                ]}
              >
                Rent
              </P>
              <P>{fare.add_rent || "N/A"}</P>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Amount</Text>
            <Text>{fare.amount}</Text>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: "#ccc",
            }}
          />
        </View>

        {/* Daily Fare Section */}

        <View style={[spacing.ph2, { alignSelf: "flex-start" }]}>
          <H5 style={[typography.font14, typography.textBold]}>
            Daily Fare Details *
          </H5>

          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />
        </View>

        <View
          style={{
            marginBottom: 10,
            paddingHorizontal: 8,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            {/* Place */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Place
              </P>
              <Text>{dailyFare.place || "N/A"}</Text>
            </View>

            {/* Hotel Bill No */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Hotel Bill No
              </P>
              <P>{dailyFare.HotelBillNo || "N/A"}</P>
            </View>

            {/* Date Of Stay */}
            <View style={{ flex: 1 }}>
              <P
                style={[
                  typography.font10,
                  typography.fontLato,
                  typography.textBold,
                  spacing.mb1,
                ]}
              >
                Date Of Stay
              </P>
              <P>{formatDate(dailyFare.date_of_stay) || "N/A"}</P>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#ccc",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Amount</Text>
            <Text>
              {dailyFare.amount !== undefined
                ? dailyFare.amount.toString()
                : "N/A"}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 30, paddingHorizontal: 8, marginBottom: 20 }}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default TravelDetailScreen;
