import { View } from "react-native";
import { useState, useEffect } from "react";
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
  typography,
} from "../styles";
import { P, Span } from "../components/text";

export default function ConveyanceManagementScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("This Week");
  const [filteredData, setFilteredData] = useState([]);
  const { firstName } = useSelector((state) => state.staff);

  useEffect(() => {
    filterData();
  }, [activeTab]);

  const filterData = () => {
    const currentDate = new Date();
    let data = [];

    if (activeTab === "This Week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      data = travel.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });
    } else if (activeTab === "This Month") {
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      endOfMonth.setHours(23, 59, 59, 999);

      data = travel.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
      });
    } else if (activeTab === "Approve") {
      data = travel.filter((item) => item.status === "approved");
    } else if (activeTab === "Reject") {
      data = travel.filter((item) => item.status === "rejected");
    }

    setFilteredData(data);
  };

  const getTabCount = (tabName) => {
    const currentDate = new Date();

    if (tabName === "This Week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return travel.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      }).length;
    } else if (tabName === "This Month") {
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      endOfMonth.setHours(23, 59, 59, 999);

      return travel.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
      }).length;
    } else if (tabName === "Approve") {
      return travel.filter((item) => item.status === "approved").length;
    } else if (tabName === "Reject") {
      return travel.filter((item) => item.status === "rejected").length;
    }
    return 0;
  };

  const handleTabSelection = (selectedTab) => {
    const cleanTabName = selectedTab.split(" (")[0];
    setActiveTab(cleanTabName);
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
        data={filteredData}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={`${item.pickupLocation} - ${item.dropoffLocation}`}
            subtitle={`${item.date} - ${item.time}`}
            onPress={() => {
              navigation.navigate("conveyanceDetail", {
                travelItem: item,
              });
            }}
          >
            <View>
              <View
                style={[
                  styles.row,
                  spacing.mb2,
                  {
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <P style={[typography.font16, typography.fontLato]}>
                  {item.modeOfTransport}
                </P>
              </View>
              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  { justifyContent: "space-between", alignItems: "center" },
                ]}
              >
                <Span
                  style={[
                    typography.font16,
                    typography.fontLato,
                    { textTransform: "capitalize" },
                  ]}
                >
                  Price
                </Span>

                <P
                  style={[
                    typography.font20,
                    typography.fontLato,
                    typography.textBold,
                  ]}
                >
                  ₹{item.price}
                </P>
              </View>

              <View
                style={[
                  spacing.mt1,
                  styles.row,
                  {
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  },
                ]}
              >
                <P
                  style={[
                    typography.font16,
                    typography.fontLato,
                    { position: "absolute", bottom: 90, right: 0 },
                  ]}
                >
                  {item.distance}
                </P>
              </View>
            </View>
          </ClickableCard1>
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
                { name: `This Week`, count: getTabCount("This Week") },
                { name: `This Month`, count: getTabCount("This Month") },
                { name: `Approve`, count: getTabCount("Approve") },
                { name: `Reject`, count: getTabCount("Reject") },
              ]}
              activeTab={activeTab}
              onTabSelected={handleTabSelection}
              style={{}}
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
