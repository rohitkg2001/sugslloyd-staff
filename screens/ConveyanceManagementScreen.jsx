import { View, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getConveyanceById } from "../redux/actions/projectAction";

// Components
import ContainerComponent from "../components/ContainerComponent";
import ClickableCard1 from "../components/card/ClickableCard1";
import MyFlatList from "../components/utility/MyFlatList";
import Button from "../components/buttons/Button";
import DashboardHeader from "../components/header/DashboardHeader";
import SearchBar from "../components/input/SearchBar";
import SwipeTab from "../components/tab/SwipeTab";

// Styles
import {
  ICON_LARGE,
  ICON_MEDIUM,
  LIGHT,
  spacing,
  styles,
  SCREEN_WIDTH,
  PRIMARY_COLOR,
  typography,
  PRIMARY_COLOR_TRANSPARENT,
} from "../styles";
import { P, Span } from "../components/text";

export default function ConveyanceManagementScreen({ navigation }) {
  // const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("thisWeek");
  const [searchText, setSearchText] = useState("");

  const tabs = [
    { key: "thisWeek", title: "This Week" },
    { key: "thisMonth", title: "This Month" },
    { key: "approved", title: "Approved" },
    { key: "rejected", title: "Rejected" },
  ];

  const { firstName, id: userId } = useSelector((state) => state.staff);
  const conveyances = useSelector((state) => state.project.conveyances || []);

  useEffect(() => {
    if (userId) dispatch(getConveyanceById(userId));
  }, [dispatch, userId]);

  const filterConveyances = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return conveyances.filter((item) => {
      const itemDate = new Date(item.created_at);
      const status = item.status?.toString();

      // Apply tab filter
      let tabMatch = false;
      switch (selectedTab) {
        case "thisWeek":
          tabMatch = itemDate >= startOfWeek;
          break;
        case "thisMonth":
          tabMatch = itemDate >= startOfMonth;
          break;
        case "approved":
          tabMatch = status === "1";
          break;
        case "rejected":
          tabMatch = status === "2";
          break;
        default:
          tabMatch = true;
      }

      // Apply search filter
      const lowerSearch = searchText.toLowerCase();
      const from = item.from?.toLowerCase() || "";
      const to = item.to?.toLowerCase() || "";
      const vehicle = item.vehicles?.[0]?.category?.toLowerCase() || "";

      const searchMatch =
        from.includes(lowerSearch) ||
        to.includes(lowerSearch) ||
        vehicle.includes(lowerSearch);

      return tabMatch && searchMatch;
    });
  };

  const renderConveyances = (data) => (
    <MyFlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <ClickableCard1
          key={index}
          item={item}
          title={`${item.from} - ${item.to}`}
          onPress={() =>
            navigation.navigate("conveyanceDetail", { travelItem: item })
          }
          cardStyle={{ backgroundColor: "#F0F0F0", height: 135 }}
        >
          <View style={[styles.row, { bottom: 30 }]}>
            {[
              { label: "Vehicle Type", value: item.vehicles?.[0]?.category },
              { label: "Kilometer", value: item.kilometer ?? "N/A" },
              { label: "Time", value: item.time ?? "N/A" },
            ].map((field, i) => (
              <View key={i} style={{ flex: 1, marginHorizontal: 6 }}>
                <P style={[typography.font12, typography.fontLato]}>
                  {field.label}
                </P>
                <P style={typography.font12}>{field.value || "Not provided"}</P>
              </View>
            ))}
          </View>

          <View
            style={[
              styles.row,
              spacing.pv1,
              spacing.ph2,
              spacing.br1,
              { backgroundColor: PRIMARY_COLOR_TRANSPARENT, bottom: 16 },
            ]}
          >
            <Span
              style={[
                typography.font14,
                typography.fontLato,
                { color: PRIMARY_COLOR },
              ]}
            >
              Price
            </Span>
            <P
              style={[
                typography.font14,
                typography.fontLato,
                typography.textBold,
                { color: "#1B5E20" },
              ]}
            >
              {item.amount != null
                ? `₹${parseFloat(item.amount).toFixed(2)}`
                : "Not provided"}
            </P>
          </View>
        </ClickableCard1>
      )}
      contentContainerStyle={[spacing.mh1, spacing.mt1]}
      showSearchBar={false}
    />
  );

  return (
    <ContainerComponent style={{ flex: 1 }}>
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
          padding: 16,
          bottom: 8,
        }}
        textStyle={{ color: LIGHT }}
        useEllipsis
      />

      {/* Search & Filter */}
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

      {/* Tabs */}
      <SwipeTab
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {/* Filtered List */}
      <View style={{ flex: 1 }}>{renderConveyances(filterConveyances())}</View>

      {/* Add Button */}
      <Button
        style={styles.addButton}
        onPress={() => navigation.navigate("conveyanceBillForm")}
      >
        <Icon name="add" size={ICON_LARGE} color="white" />
      </Button>
    </ContainerComponent>
  );
}
