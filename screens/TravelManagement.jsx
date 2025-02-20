import { View } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import {
  ICON_LARGE,
  ICON_MEDIUM,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
} from "../styles";
import { fetchSites } from "../redux/actions/siteActions";
import DashboardHeader from "../components/header/DashboardHeader";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";

const travel = [
  {
    title: "Delhi - Patna",
    project_capacity: "feb 12 - feb 14 * 2 days",
  },
  {
    title: "Patna - Agra",
    project_capacity: "Feb 19 - feb 22 * 3 days",
  },
];

export default function TravelManagement({ navigation }) {
  const [activeTab, setActiveTab] = useState("This Week");
  const { firstName } = useSelector((state) => state.staff);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSites());
  }, [dispatch]);

  const handleTabSelection = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <ContainerComponent>
      <DashboardHeader
        greeting="Good morning"
        firstName={firstName}
        // navigation={navigation}
        message="You fall under M3 category"
        style={[
          spacing.p3,
          spacing.br2,
          {
            backgroundColor: "#e0f7fa",
            height: 70,
          },
        ]}
        useEllipsis={true}
      />

      <MyFlatList
        data={travel}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.title}
            subtitle={item.project_capacity}
            onPress={() => {
              navigation.navigate("travelDetailScreen", {
                travelItem: item,
              });
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[spacing.mh1, spacing.mt1]}
        ListHeaderComponent={() => (
          <View>
            <View
              style={[
                spacing.mv4,
                styles.row,
                spacing.mh1,
                { alignItems: "center" },
              ]}
            >
              <SearchBar
                placeholder="Search"
                style={{ width: SCREEN_WIDTH - 80 }}
              />
              <Button
                style={[
                  styles.btn,
                  styles.bgPrimary,
                  spacing.mh1,
                  { width: 50 },
                ]}
                onPress={() => setShowBottomSheet(true)}
              >
                <Icon name="options-outline" size={ICON_MEDIUM} color={LIGHT} />
              </Button>
            </View>

            <TabBar
              tabs={[
                { name: "This Week" },
                { name: "This Month" },
                { name: "Approve" },
                { name: "Reject" },
              ]}
              activeTab={activeTab}
              onTabSelected={handleTabSelection}
            />
          </View>
        )}
      />

      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("addBillForm")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
