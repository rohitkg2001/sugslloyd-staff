// Import all react native
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native"; // Import useRoute
import { useSelector } from "react-redux";
// Import Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";

// Import all styles
import {
  ICON_LARGE,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
} from "../styles";

export default function TravelManagement({ navigation }) {
  const route = useRoute();
  const newTravelData = route.params?.travelData;
  const { firstName } = useSelector((state) => state.staff);
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    if (newTravelData) {
      const updatedPlans = [
        {
          title: (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {newTravelData.city || "Unknown City"} ➝{" "}
                {newTravelData.destinationCity || "Unknown Destination"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#007bff",
                  marginRight: 8,
                }}
              >
                ({newTravelData.type || "Unknown Transport"})
              </Text>
            </View>
          ),
          trip_schedule: `${new Date(
            newTravelData.start_date
          ).toLocaleDateString()} - ${new Date(
            newTravelData.journeyDate
          ).toLocaleDateString()}`,
          fullData: newTravelData,
        },
        ...travelPlans,
      ];
      setTravelPlans(updatedPlans);
    }
  }, [newTravelData]);

  return (
    <ContainerComponent>
      <DashboardHeader
        greeting="Good morning"
        firstName={firstName}
        message="You fall under M3 category"
        style={{
          width: SCREEN_WIDTH,
          backgroundColor: PRIMARY_COLOR,
          height: 70,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          margin: 0,
        }}
        textStyle={{ color: LIGHT }}
      />

      <MyFlatList
        data={travelPlans}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            title={item.title}
            subtitle={item.trip_schedule}
            onPress={() => {
              const formData = {
                start_date: item.fullData.start_date,
                journeyDate: item.fullData.journeyDate,
                employeeID : item.formData.employeeId || "N/A",
                pnrNumbersStart: item.fullData.pnrNumbersStart || "N/A",
                pnrNumbersReturn: item.fullData.pnrNumbersReturn || "N/A",
                ticket: item.fullData.ticket || "Not Available",
                hotelBill: item.fullData.hotelBill || "Not Available",
                city: item.fullData.city || "Unknown City",
                destinationCity:
                  item.fullData.destinationCity || "Unknown Destination",
                type: item.fullData.type || "Unknown Transport",
              };

              console.log("Navigating with Form Data:", formData);
              navigation.navigate("travelDetailScreen", { formData });
            }}
            cardStyle={{
              backgroundColor: "#e8f8f5",
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("addBillForm")}
      >
        <Icon name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
