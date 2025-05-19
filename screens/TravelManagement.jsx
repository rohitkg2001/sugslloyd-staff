// Import all react native
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native"; // Import useRoute

// Import Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import { getBillById } from "../redux/actions/projectAction";

import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const newTravelData = route.params?.travelData;
  const { firstName } = useSelector((state) => state.staff);
  const [travelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    dispatch(getBillById(68)); // or dynamic userId if available
  }, [dispatch]);

  const { bills } = useSelector((state) => state.project); // from your reducer

  useEffect(() => {
    if (bills?.length > 0) {
      const transformed = bills.map((item) => ({
        ...item?.tada,
        travelfare:
          item?.travelfare?.map((travel) => ({
            ...travel,
          })) || [],
        dailyfare:
          item?.dailyfare?.map((daily) => ({
            ...daily,
          })) || [],
      }));

      setTravelPlans(transformed);
    }
  }, [bills]);

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
            title={`${item.from_city} ➜ ${item.to_city}`}
            subtitle={`Transport: ${item.transport}`}
            onPress={() =>
              navigation.navigate("travelDetailScreen", {
                billPayload: {
                  ...item,
                  travelfare: item.travelfare || [],
                  dailyfare: item.dailyfare || [],
                },
              })
            }
          >
            <View style={[styles.row, { marginTop: 10 }]}>
              <View style={{ flex: 1 }}>
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
                  {new Date(item.start_journey).toLocaleDateString()}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                    textTransform: "uppercase",
                  }}
                >
                  End Date
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {new Date(item.end_journey).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </ClickableCard1>
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
