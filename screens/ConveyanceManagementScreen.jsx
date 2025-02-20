// import All react native
import { View } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
// import All components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import TabBar from "../components/TabBar";
import SearchBar from "../components/input/SearchBar";
// import faker
import { travel } from "../utils/faker";
// import redux
import { useSelector } from "react-redux";
// import Styles
import {
  ICON_LARGE,
  ICON_MEDIUM,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
} from "../styles";

export default function ConveyanceManagementScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("This Week");
  const { firstName } = useSelector((state) => state.staff);

  const handleTabSelection = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <ContainerComponent>
      <DashboardHeader
        greeting="Good morning"
        firstName={firstName}
        message="You fall under M3 category"
        style={[
          spacing.p2,

          {
            width: SCREEN_WIDTH,
            backgroundColor: PRIMARY_COLOR,
            height: 70,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            margin: 0,
          },
        ]}
        textStyle={{ color: LIGHT }}
        useEllipsis={true}
      />

      <MyFlatList
        data={travel}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={item.title}
            subtitle={item.trip_schedule}
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
        onPress={() => navigation.navigate("conveyanceBillForm")}
      >
        <Ionicons name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
