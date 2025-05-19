import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import ContainerComponent from "../components/ContainerComponent";
import MyHeader from "../components/header/MyHeader";
import Button from "../components/buttons/Button";
import { useSelector } from "react-redux";
import { SCREEN_WIDTH } from "../styles";

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
      <MyHeader title="Travel Details" hasIcon={true} isBack={true} />
      <ScrollView style={[{ width: SCREEN_WIDTH - 16 }]}>
        {/* Main TADA Info */}

        <Text style={{ fontSize: 16, color: "black" }}>
          {firstName} {lastName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>From</Text>
          <Text>{tada.from_city}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>To</Text>
          <Text>{tada.to_city}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Start Journey</Text>
          <Text>{formatDate(tada.start_journey)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>End Journey</Text>
          <Text>{formatDate(tada.end_journey)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Transport</Text>
          <Text>{tada.transport}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>PNR (Start)</Text>
          <Text>{tada.start_journey_pnr}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>PNR (End)</Text>
          <Text>{tada.end_journey_pnr}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Vehicle No</Text>
          <Text>{tada.vehicle_no}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Rate per KM</Text>
          <Text>{tada.rate_per_km}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Total KM</Text>
          <Text>{tada.total_km}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Objective of Tour</Text>
          <Text>{tada.objective_tour}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Meeting Visit</Text>
          <Text>{tada.meeting_visit}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Outcome Achieved</Text>
          <Text>{tada.outcome_achieve}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Category</Text>
          <Text>{tada.category}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Description Category</Text>
          <Text>{tada.description_category}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 4,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ fontWeight: "600" }}>Other Expense</Text>
          <Text>
            {tada.otherexpense ? JSON.stringify(tada.otherexpense) : "N/A"}
          </Text>
        </View>

        {/* Travel Fare Section */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            paddingHorizontal: 8,
          }}
        >
          Travel Fare Details:
        </Text>

        <View style={{ marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>From</Text>
            <Text>{fare.from}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>To</Text>
            <Text>{fare.to}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Departure Date</Text>
            <Text>{formatDate(fare.departure_date) || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Departure Time</Text>
            <Text>{fare.departure_time || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Arrival Date</Text>
            <Text>{formatDate(fare.arrival_date) || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Arrival Time</Text>
            <Text>{fare.arrival_time || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Mode of Travel</Text>
            <Text>{fare.modeoftravel}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Total KM</Text>
            <Text>{fare.add_total_km}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Rate per KM</Text>
            <Text>{fare.add_rate_per_km}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Rent</Text>
            <Text>{fare.add_rent}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
              paddingHorizontal: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Vehicle No</Text>
            <Text>{fare.add_vehicle_no}</Text>
          </View>
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
        </View>

        {/* Daily Fare Section */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 20,
            paddingHorizontal: 8,
          }}
        >
          Daily Fare Details:
        </Text>

        <View style={{ marginBottom: 10, paddingHorizontal: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Place</Text>
            <Text>{dailyFare.place || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Hotel Bill No</Text>
            <Text>{dailyFare.HotelBillNo || "N/A"}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "600" }}>Date Of Stay</Text>
            <Text>{formatDate(dailyFare.date_of_stay) || "N/A"}</Text>
          </View>
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
