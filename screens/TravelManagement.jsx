// Import all react native
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

// Import Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import { getBillById } from "../redux/actions/projectAction";
import SearchBar from "../components/input/SearchBar";
import SwipeTab from "../components/tab/SwipeTab";

import { useDispatch, useSelector } from "react-redux";

// Import all styles
import {
  ICON_LARGE,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
  ICON_MEDIUM,
} from "../styles";

export default function TravelManagement({ navigation, route }) {
  const dispatch = useDispatch();

  const { firstName, id: my_id } = useSelector((state) => state.staff);
  const [travelPlans, setTravelPlans] = useState([]);
  const [selectedTab, setSelectedTab] = useState("week");
  const [searchText, setSearchText] = useState("");
  const { newSubmittedData } = route.params || {};

  const tabOptions = [
    { key: "week", title: "This Week" },
    { key: "month", title: "This Month" },
    { key: "approved", title: "Approved" },
    { key: "rejected", title: "Rejected" },
  ];

  useEffect(() => {
    dispatch(getBillById(my_id));
  }, [dispatch, my_id]);

  const { bills } = useSelector((state) => state.project);

  useEffect(() => {
    if (bills?.length > 0) {
      const transformed = bills.map((item) => ({
        ...item?.tada,
        travelfare: item?.travelfare?.map((travel) => ({ ...travel })) || [],
        dailyfare: item?.dailyfare?.map((daily) => ({ ...daily })) || [],
      }));
      setTravelPlans(transformed);
    }
  }, [bills]);

  // const filterTravelPlans = () => {
  //   // All tabs return full data for now
  //   return travelPlans;
  // };

  const filterTravelPlans = () => {
    return travelPlans.filter((item) => {
      const search = searchText.toLowerCase();
      return (
        item?.from_city?.toLowerCase().includes(search) ||
        item?.to_city?.toLowerCase().includes(search) ||
        item?.transport?.toLowerCase().includes(search)
      );
    });
  };

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

      <View
        style={[spacing.mv4, styles.row, spacing.mh1, { alignItems: "center" }]}
      >
        <SearchBar
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={{ width: SCREEN_WIDTH - 80 }}
        />
        <Button
          style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
        >
          <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
        </Button>
      </View>

      {/* Swipe Tab */}
      <SwipeTab
        tabs={tabOptions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <MyFlatList
        data={filterTravelPlans()}
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
        showSearchBar={false}
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
