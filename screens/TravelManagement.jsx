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
  typography,
} from "../styles";
import { H5, H6 } from "../components/text";

export default function TravelManagement({ navigation }) {
  const dispatch = useDispatch();

  const { firstName, id: userId } = useSelector((state) => state.staff);
  const billsData = useSelector((state) => state.project.bills);
  const { allowedExpense } = useSelector((state) => state.project);

  const [travelPlans, setTravelPlans] = useState([]);
  const [selectedTab, setSelectedTab] = useState("week");
  const [searchText, setSearchText] = useState("");

  const tabOptions = [
    { key: "week", title: "This Week" },
    { key: "month", title: "This Month" },
    { key: "all_time", title: "All Time" },
    { key: "status", title: "Status" },
  ];

  useEffect(() => {
    dispatch(getBillById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Fetched Bills:", billsData);
    if (Array.isArray(billsData)) {
      setTravelPlans(billsData);
    }
  }, [billsData]);

  const filterTravelPlans = () => {
    const search = searchText.toLowerCase();
    return travelPlans.filter(
      (item) =>
        (item.visiting_to || "").toLowerCase().includes(search) ||
        (item.purpose_of_visit || "").toLowerCase().includes(search) ||
        (item.outcome_achieved || "").toLowerCase().includes(search)
    );
  };

  return (
    <ContainerComponent>
      <DashboardHeader
        greeting="Good morning"
        firstName={firstName}
        //  message="You fall under M3 category"
        message={
          allowedExpense?.user_category
            ? `You fall under ${allowedExpense.user_category} category`
            : "You fall under -- category"
        }
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
          onChangeText={setSearchText}
          style={{ width: SCREEN_WIDTH - 80 }}
        />
        <Button
          style={[styles.btn, styles.bgPrimary, spacing.mh1, { width: 50 }]}
        >
          <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
        </Button>
      </View>

      <SwipeTab
        tabs={tabOptions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <MyFlatList
        data={filterTravelPlans()}
        renderItem={({ item }) => {
          const start = item.date_of_departure
            ? new Date(item.date_of_departure).toLocaleDateString()
            : "N/A";
          const end = item.date_of_return
            ? new Date(item.date_of_return).toLocaleDateString()
            : "N/A";

          const modeOfTransportList = (item.journey || [])
            .filter((j) => j.mode_of_transport)
            .map((j, idx) => `${j.mode_of_transport}`)
            .join("\n");

          return (
            <ClickableCard1
              title={`To: ${item.visiting_to || "N/A"}`}
              subtitle={`Purpose: ${item.purpose_of_visit || "N/A"}`}
              onPress={() =>
                navigation.navigate("travelDetailScreen", {
                  billPayload: item,
                })
              }
            >
              {/* Row: Start Date | End Date */}
              <View style={[styles.row, { marginBottom: 4 }]}>
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
                  <Text style={{ fontSize: 13 }}>{start}</Text>
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
                  <Text style={{ fontSize: 13 }}>{end}</Text>
                </View>
              </View>

              {/* Mode of Transport Top Right */}
              {modeOfTransportList.length > 0 && (
                <View style={{ alignItems: "flex-end", bottom: 90 }}>
                  <H6
                    style={[
                      typography.font14,
                      typography.fontLato,
                      {
                        textAlign: "right",
                      },
                    ]}
                  >
                    {modeOfTransportList}
                  </H6>
                </View>
              )}
            </ClickableCard1>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        showSearchBar={false}
        ListEmptyComponent={() => (
          <Text style={{ padding: 20, textAlign: "center" }}>
            No travel plans found.
          </Text>
        )}
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
