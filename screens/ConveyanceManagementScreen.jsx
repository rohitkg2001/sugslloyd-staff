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

  const filterData = () => {
    if (activeTab === "Approve") {
      return travel.filter((item) => item.status === "approved");
    } else if (activeTab === "Reject") {
      return travel.filter((item) => item.status === "rejected");
    }
    return travel;
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
        data={filterData()}
        renderItem={({ item, index }) => (
          <ClickableCard1
            key={index}
            item={item}
            title={`${item.pickupLocation} - ${item.dropoffLocation}`}
            subtitle={`${item.date} - ${item.time}`}
            onPress={() =>
              navigation.navigate("conveyanceDetail", { travelItem: item })
            }
          >
            <View>
              <View
                style={[
                  styles.row,
                  spacing.mb2,
                  { justifyContent: "space-between", alignItems: "center" },
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
                { name: "This Week" },
                { name: "This Month" },
                { name: "Approved" },
                { name: "Rejected" },
              ]}
              activeTab={activeTab}
              onTabSelected={setActiveTab}
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
